import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../fb";
import admin, { ServiceAccount } from "firebase-admin";

interface NotificationData {
  data: {
    title: string;
    body: string;
    image: string;
    click_action: string;
  }
}

const sendFCMNotification = async (data: NotificationData) => {
  const serviceAccount: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
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
    await sendFCMNotification(message)
      .catch((error) => console.log(error));
  } else {
    res.status(405).end();
  }
};

export default handler;
