import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  try {
    const messaging = getMessaging(app);

    if (localStorage.getItem("notificationPermission") === "unsupport") {
      localStorage.removeItem("notificationPermission");
    }
  } catch (error) {
    console.error(error);
    localStorage.setItem("notificationPermission", "unsupport");
  }
}

export const db = getFirestore(app);
