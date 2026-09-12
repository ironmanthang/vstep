/**
 * PWA App Badging API Helper
 * Sets or clears the numeric badge on the PWA app icon on supported platforms
 * (Android Chrome/Chromium PWA, Chromium Desktop, iOS 16.4+ standalone PWA).
 */

interface BadgeCapableNavigator {
  setAppBadge?: (contents?: number) => Promise<void>;
  clearAppBadge?: () => Promise<void>;
}

export async function setBadge(count: number): Promise<void> {
  if (typeof navigator === 'undefined') return;

  const nav = navigator as unknown as BadgeCapableNavigator;
  if (typeof nav.setAppBadge !== 'function') return;

  try {
    if (count > 0) {
      await nav.setAppBadge(count);
    } else if (typeof nav.clearAppBadge === 'function') {
      await nav.clearAppBadge();
    }
  } catch (err) {
    // Badging API can fail silently if permission is revoked or not supported in current mode
    console.debug('Failed to set app badge:', err);
  }
}

export async function clearBadge(): Promise<void> {
  if (typeof navigator === 'undefined') return;

  const nav = navigator as unknown as BadgeCapableNavigator;
  if (typeof nav.clearAppBadge !== 'function') return;

  try {
    await nav.clearAppBadge();
  } catch (err) {
    console.debug('Failed to clear app badge:', err);
  }
}
