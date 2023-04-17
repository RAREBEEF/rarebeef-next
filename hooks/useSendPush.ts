import axios from "axios";

const useSendPush = () => {
  const sendPush = async ({
    title = "",
    body,
    click_action,
  }: {
    title?: string;
    body: string;
    click_action: string;
  }) => {
    const message = {
      notification: {
        title,
        body,
        icon: "/logos/beef.svg",
      },
      data: {
        click_action,
      },
    };

    axios.request({
      method: "POST",
      url: "api/send-fcm",
      data: { message },
    });
  };

  return sendPush;
};

export default useSendPush;
