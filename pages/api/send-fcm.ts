import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../fb";
import admin from "firebase-admin";

interface NotificationData {
  data: {
    title: string;
    body: string;
    image: string;
    click_action: string;
  }
}

const sendFCMNotification = async (data: NotificationData) => {
  const serviceAccount: any = {
    type: "service_account",
    project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
    private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
    client_id: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_ID,
    auth_uri: process.env.NEXT_PUBLIC_FIREBASE_AUTH_URI,
    token_uri: process.env.NEXT_PUBLIC_FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_X509_CERT_URL,
  };

  // Firebase Admin SDK 초기화
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const docRef = doc(db, "subscribe", "tokens");
  let tokenList: Array<string> = []
  
  await getDoc(docRef).then((doc) => {
    tokenList = doc?.data()?.list;
  });

  if (tokenList.length === 0) return;

  const notificationData = {
    ...data,
    tokens: tokenList
  }

  const res = await admin
    .messaging()
    .sendMulticast(notificationData);

  return res;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { message } = req.body;
    await sendFCMNotification(message).then((result) => res.status(200).json({result}))
      .catch((error) => console.log(error));
  } else {
    res.status(405).end();
  }
};

export default handler;

export const config = {
  type: "experimental",
};
