import axios from 'axios';
import { doc, getDoc } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../fb';

const sendFCMNotification = async (data: any) => {
  const fcmServerKey = process.env.NEXT_PUBLIC_FCM_SERVER_KEY;
  const docRef = doc(db, "subscribe", "tokens");
  let tokenList;

  await getDoc(docRef).then((doc) => {
    tokenList = doc?.data()?.list;
  });

  const config = {
    headers: {
      Authorization: `key=${fcmServerKey}`,
      "Content-Type": "application/json",
    },
  };

  const res = await axios
  .post("https://fcm.googleapis.com/fcm/send", {...data, registration_ids: tokenList,}, config);

  return res;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;
    try {
      const result = await sendFCMNotification(message);
      res.status(200).json({ result });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(405).end();
  }
};

export default handler;