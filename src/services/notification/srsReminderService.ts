/**
 * SRS Daily Review Reminder Service
 * Handles user preferences, scheduling checks, and system notification dispatches
 * for overdue Flashcard SRS reviews.
 */

export interface SrsReminderPrefs {
  enabled: boolean;
  reminderTime: string; // "HH:MM" 24h format, e.g. "09:00"
  lastNotifiedDate: string | null; // "YYYY-MM-DD"
}

export const REMINDER_PREFS_KEY = 'vstep_srs_reminder_prefs_v1';

export const DEFAULT_REMINDER_PREFS: SrsReminderPrefs = {
  enabled: false,
  reminderTime: '09:00',
  lastNotifiedDate: null,
};

export function formatDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Pure evaluation function to check if an SRS review notification is due.
 */
export function isReminderDue(
  now: Date,
  reminderTime: string,
  lastNotifiedDate: string | null,
  dueCount: number
): boolean {
  if (dueCount <= 0) return false;

  const todayKey = formatDateKey(now);
  if (lastNotifiedDate === todayKey) return false;

  const parts = reminderTime.split(':');
  if (parts.length !== 2) return false;

  const targetHours = parseInt(parts[0], 10);
  const targetMinutes = parseInt(parts[1], 10);
  if (isNaN(targetHours) || isNaN(targetMinutes)) return false;

  const targetTotalMinutes = targetHours * 60 + targetMinutes;
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();

  return currentTotalMinutes >= targetTotalMinutes;
}

export function getReminderPrefs(): SrsReminderPrefs {
  if (typeof localStorage === 'undefined') return { ...DEFAULT_REMINDER_PREFS };

  try {
    const raw = localStorage.getItem(REMINDER_PREFS_KEY);
    if (!raw) return { ...DEFAULT_REMINDER_PREFS };
    const parsed = JSON.parse(raw);
    return {
      enabled: typeof parsed.enabled === 'boolean' ? parsed.enabled : DEFAULT_REMINDER_PREFS.enabled,
      reminderTime: typeof parsed.reminderTime === 'string' ? parsed.reminderTime : DEFAULT_REMINDER_PREFS.reminderTime,
      lastNotifiedDate: typeof parsed.lastNotifiedDate === 'string' ? parsed.lastNotifiedDate : null,
    };
  } catch {
    return { ...DEFAULT_REMINDER_PREFS };
  }
}

export function saveReminderPrefs(prefs: SrsReminderPrefs): void {
  if (typeof localStorage === 'undefined') return;

  try {
    localStorage.setItem(REMINDER_PREFS_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error('Failed to save SRS reminder prefs to localStorage:', err);
  }
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (err) {
    console.error('Error requesting notification permission:', err);
    return 'unsupported';
  }
}

/**
 * Triggers an SRS reminder notification.
 * Dispatches via ServiceWorkerRegistration if available, falling back to Notification constructor.
 */
export async function triggerSrsReminder(dueCount: number, isTest = false): Promise<boolean> {
  const perm = getNotificationPermission();
  if (perm !== 'granted') return false;

  const title = isTest
    ? 'VSTEP Master — Thử nghiệm thông báo'
    : 'VSTEP Master — Đến giờ ôn tập SRS!';

  const body = isTest
    ? 'Hệ thống thông báo SRS đã hoạt động bình thường trên thiết bị của bạn.'
    : `Bạn có ${dueCount} thẻ từ vựng cần ôn hôm nay. Giữ vững chuỗi ngày học để đạt mục tiêu B1/B2!`;

  const notificationOptions: NotificationOptions & { renotify?: boolean; vibrate?: number[] } = {
    body,
    icon: '/pwa-192x192.png',
    badge: '/pwa-192x192.png',
    tag: 'vstep-srs-daily-reminder',
    renotify: true,
    vibrate: [100, 50, 100],
    data: { url: '/flashcards' },
  };

  let dispatched = false;

  // Try Service Worker registration first (recommended for PWAs and Android)
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg && typeof reg.showNotification === 'function') {
        await reg.showNotification(title, notificationOptions);
        dispatched = true;
      }
    } catch (swErr) {
      console.debug('Service Worker showNotification failed, trying fallback:', swErr);
    }
  }

  // Fallback to standard window Notification
  if (!dispatched && typeof Notification !== 'undefined') {
    try {
      new Notification(title, notificationOptions);
      dispatched = true;
    } catch (notifErr) {
      console.error('Notification fallback failed:', notifErr);
    }
  }

  if (dispatched && !isTest) {
    const currentPrefs = getReminderPrefs();
    saveReminderPrefs({
      ...currentPrefs,
      lastNotifiedDate: formatDateKey(new Date()),
    });
  }

  return dispatched;
}

/**
 * Heartbeat evaluation: checks if reminder should be sent right now and dispatches it.
 */
export async function checkAndTriggerDueReminder(dueCount: number): Promise<boolean> {
  const perm = getNotificationPermission();
  if (perm !== 'granted') return false;

  const prefs = getReminderPrefs();
  if (!prefs.enabled) return false;

  const now = new Date();
  const shouldNotify = isReminderDue(now, prefs.reminderTime, prefs.lastNotifiedDate, dueCount);

  if (shouldNotify) {
    return await triggerSrsReminder(dueCount, false);
  }

  return false;
}
