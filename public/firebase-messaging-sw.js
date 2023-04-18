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

self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json().data;
    const options = {
      body: data.body,
      icon: data.image,
      image: data.image,
      vibrate: [200, 100, 200],
      data: {
        click_action: data.click_action,
      },
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  } else {
    console.log("This push event has no data.");
  }
});

self.addEventListener("notificationclick", function (event) {
  event.preventDefault();
  event.notification.close();

  const urlToOpen = event.notification.data.click_action;

  const promiseChain = clients
    .matchAll({
      type: "window",
      includeUncontrolled: true,
    })
    .then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});
