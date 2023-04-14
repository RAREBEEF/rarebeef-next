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

messaging.onBackgroundMessage((payload) => {
  const { title, body, icon, click_action } = payload.notification;

  return self.registration.showNotification(title, {
    body,
    icon,
    data: { click_action },
  });
});
