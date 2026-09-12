/**
 * Custom Service Worker Extensions for VSTEP Master PWA
 * Handles notification clicks, background sync, and periodic review reminders.
 */

/* global self, clients */

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const urlToOpen = (event.notification.data && event.notification.data.url)
    ? event.notification.data.url
    : '/flashcards';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if a tab with VSTEP flashcards is already open
      for (const client of windowClients) {
        if (client.url.includes('/flashcards') && 'focus' in client) {
          return client.focus();
        }
      }
      // If no matching flashcard tab is open, open a new window
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Periodic Background Sync for Android Chromium PWAs
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'vstep-srs-reminder') {
    event.waitUntil(
      self.registration.showNotification('VSTEP Master — Đến giờ ôn tập SRS!', {
        body: 'Đừng quên ôn tập các từ vựng đến hạn hôm nay để duy trì trí nhớ!',
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png',
        tag: 'vstep-srs-daily-reminder',
        renotify: true,
        vibrate: [100, 50, 100],
        data: { url: '/flashcards' },
      })
    );
  }
});
