
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

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

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://i.ibb.co/k2nGxqwY/1763225878291.jpg',
    badge: 'https://i.ibb.co/k2nGxqwY/1763225878291.jpg',
    data: { url: '/' }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});
