
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Standard config for your project
firebase.initializeApp({
  apiKey: "AIzaSyDqZcbgRV_XKh84Hz9XWoLi57OHJtSkWbI",
  authDomain: "my-ff-shop-352fd.firebaseapp.com",
  databaseURL: "https://my-ff-shop-352fd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-ff-shop-352fd",
  storageBucket: "my-ff-shop-352fd.firebasestorage.app",
  messagingSenderId: "1026791961950",
  appId: "1:1026791961950:web:b252f8efc0c17c59608bcf"
});

const messaging = firebase.messaging();

// This handles the background notifications when the app is NOT active
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title || 'FF SHOP';
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://i.ibb.co/k2nGxqwY/1763225878291.jpg', // Using your project logo
    badge: 'https://i.ibb.co/k2nGxqwY/1763225878291.jpg',
    vibrate: [200, 100, 200],
    data: {
      url: payload.data?.url || '/'
    },
    tag: 'ff-shop-notif' // Prevents notification stacking if you want
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click to open the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there is already a window open and focus it
      for (let i = 0; i < windowClients.length; i++) {
        let client = windowClients[i];
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
