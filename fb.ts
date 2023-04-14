import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection as c,
  addDoc as aD,
  updateDoc as uD,
  query as q,
  onSnapshot as oS,
  orderBy as oB,
  doc as d,
  deleteDoc as dD,
} from "firebase/firestore";
import { getAuth as gA, signInAnonymously as sIA } from "firebase/auth";
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
  const messaging = getMessaging(app);
}

export const db = getFirestore(app);

export const collection = c;

export const addDoc = aD;

export const updateDoc = uD;

export const query = q;

export const onSnapshot = oS;

export const orderBy = oB;

export const doc = d;

export const deleteDoc = dD;

export const getAuth = gA;

export const signInAnonymously = sIA;
