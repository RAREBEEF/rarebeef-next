import axios from "axios";
import { useDispatch } from "react-redux";
import { getTokenThunk } from "../redux/modules/getToken";
import { ReduxStateType, getTokenStateType } from "../types";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useSendPush = () => {
  const dispatch = useDispatch();
  const { data: token } = useSelector(
    (state: ReduxStateType): getTokenStateType => state.getToken
  );

  useEffect(() => {
    dispatch<any>(getTokenThunk());
  }, [dispatch])

  const sendPush = async ({
    title = "",
    body,
    click_action,
  }: {
    title?: string;
    body: string;
    click_action: string;
  }) => {
    if (token.list.length === 0) {
      console.log("No tokens available");
      return;
    }
    
    const fcmServerKey = process.env.NEXT_PUBLIC_FCM_SERVER_KEY;

    const message = {
      notification: {
        title,
        body,
        icon: "/logos/beef.svg"
      },
      data: {
        click_action
      },
      registration_ids: token.list,
    };

    const config = {
      headers: {
        Authorization: `key=${fcmServerKey}`,
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("https://fcm.googleapis.com/fcm/send", message, config)
      .then((response) => {
        console.log("Successfully sent message:", response.data);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  };

  return sendPush;
};

export default useSendPush;
