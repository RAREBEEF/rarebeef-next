import { useEffect } from "react";
import styles from "./PushRequest.module.scss";
import { PushRequestPropType } from "../types";
import Button from "./Button";
import { getMessaging, getToken } from "firebase/messaging";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import * as FB from "../fb";

const PushRequest: React.FC<PushRequestPropType> = ({
  showModal,
  setShowModal,
}) => {
  // 푸시 허용 요청 이력 체크
  useEffect(() => {
    const permission = localStorage.getItem("notificationPermission");
    const userAgent = navigator?.userAgent?.toLowerCase();
    const isIos =
      userAgent.indexOf("iphone") !== -1 || userAgent.indexOf("ipad") !== -1;
    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    console.log(permission, userAgent, isIos, isStandalone);

    // ios이면서 스탠드얼론이 아니면 푸시를 보낼 수 없다.
    if (isIos && !isStandalone) {
      console.log("Nooooooooooooo");
      setShowModal(false);
      return;
    }

    switch (permission) {
      case "true":
        setShowModal(false);
        break;
      case "false":
        setShowModal(false);
        break;
      default:
        setShowModal(true);
    }
  }, [setShowModal]);

  const uploadToken = async (currentToken: string) => {
    const docRef = doc(FB.db, "subscribe", "tokens");
    await updateDoc(docRef, {
      list: arrayUnion(currentToken),
    })
      .then(() => {
        localStorage.setItem("notificationPermission", "true");
      })
      .catch((error) => {
        console.log(error);
        window.alert(
          "서버 연결에 실패하였습니다.\n잠시 후 다시 시도해 주세요."
        );
        return;
      });
  };

  // 푸시 허용 요청
  const requestPermission = () => {
    // 우선 모달 닫고
    setShowModal(false);

    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        // 푸시 거부 시
        localStorage.setItem("notificationPermission", "false");
      } else {
        // 푸시 허용 시
        const messaging = getMessaging();

        getToken(messaging, {
          // 토큰 생성
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
        })
          .then(async (currentToken) => {
            if (!currentToken) {
              // 토큰 생성 불가
              window.alert(
                "푸시 토큰 생성에 실패하였습니다.\n잠시 후 다시 시도해 주세요."
              );
              return;
            } else {
              // 인증 후 토큰 업로드
              const auth = FB.getAuth();

              if (!auth.currentUser) {
                await FB.signInAnonymously(auth)
                  .then(() => {
                    uploadToken(currentToken);
                  })
                  .catch((error) => {
                    console.log(error);
                    window.alert(
                      "익명 인증에 실패하였습니다.\n잠시 후 다시 시도해 주세요."
                    );
                  });
              } else {
                uploadToken(currentToken);
              }
            }
          })
          .catch((error) => {
            window.alert(
              "푸시 등록 중 문제가 발생하였습니다.\n잠시 후 다시 시도해 주세요."
            );
            console.log("An error occurred while retrieving token. ", error);
            return;
          });
      }
    });
  };

  // 푸시 거부
  const denyPermission = () => {
    localStorage.setItem("notificationPermission", "false");
    setShowModal(false);
  };

  return showModal ? (
    <section className={styles["request-permission"]}>
      <div className={styles["request-permission__modal"]}>
        <p>
          푸시를 통해 새로운 프로젝트와 방명록 등의 알림을 받아보실 수 있습니다.
          <br />
          푸시 알림을 허용하시겠습니까?
        </p>
        <div className={styles["request-permission__modal__btn-wrapper"]}>
          <Button text="허용" onClick={requestPermission} />
          <Button text="거부" onClick={denyPermission} />
        </div>
      </div>
    </section>
  ) : null;
};

export default PushRequest;
