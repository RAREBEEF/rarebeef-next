importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBdL1pg4yw-su0PAzTepfsC_XuNQ87SoxI",
  authDomain: "rarebeef-app.firebaseapp.com",
  projectId: "rarebeef-app",
  storageBucket: "rarebeef-app.appspot.com",
  messagingSenderId: "905000831692",
  appId: "1:905000831692:web:5059beb5bef386db13d069",
});

const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const { title, body, icon, click_action } = payload.notification;

//   return self.registration.showNotification(title, {
//     body,
//     // icon,
//     click_action,
//   });
// });

self.addEventListener('push', function(event) {
  if (event.data) {
    const notification = event.notification.json();
    const options = {
      body: notification.body,
      icon: notification.icon,
      image: notification.image,
      vibrate: [200, 100, 200],
      data: {
        url: notification.click_action
      },
      actions: [
        {
          action: 'open_url',
          title: 'Open URL'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };
    event.waitUntil(
      self.registration.showNotification(notification.title, options)
    );
  } else {
    console.log('This push event has no data.');
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const url = event.notification.data.click_action;
  const action = event.action;
  if (action === 'open_url' && url) {
    event.waitUntil(clients.openWindow(url));
  }
});