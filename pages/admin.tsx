import styles from "./admin.module.scss";
import React, { useEffect, useState } from "react";
import ProjectHeader from "../components/ProjectHeader";
import { ProfilePropType } from "../types";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import useInput from "../hooks/useInput";
import Button from "../components/Button";
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import useSendPush from "../hooks/useSendPush";

const Admin: React.FC<ProfilePropType> = () => {
  const [verified, setVerified] = useState<boolean>(false);
  const { replace } = useRouter();
  const {
    value: title,
    setValue: setTitle,
    onChange: onTitleChange,
  } = useInput();
  const { value: body, setValue: setBody, onChange: onBodyChange } = useInput();
  const {
    value: url,
    setValue: setUrl,
    onChange: onUrlChange,
  } = useInput("https://www.rarebeef.co.kr/");
  const sendPush = useSendPush();

  // 최초 관리자 로그인 여부 체크
  useEffect(() => {
    const auth = getAuth();

    if (
      auth.currentUser &&
      auth.currentUser.uid === process.env.NEXT_PUBLIC_ADMIN_UID &&
      auth.currentUser.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {
      setVerified(true);
    }
  }, []);

  // 로그인
  const login = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        return await signInWithPopup(auth, provider).then((credential) => {
          if (
            credential.user.uid === process.env.NEXT_PUBLIC_ADMIN_UID &&
            credential.user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
          ) {
            setVerified(true);
          } else {
            window.alert("권한이 없습니다.");
            replace("/");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        window.alert("로그인에 실패하였습니다.");
      });
  };

  const onSendPushClick = async () => {
    try {
    await sendPush({ title, body, click_action: url })
  } catch (error) {
    console.log(error);
    window.alert("푸시 발송에 실패하였습니다.\n" + error);
    return;
  }

  setTitle("");
  setBody("");
  setUrl("https://www.rarebeef.co.kr/");
  window.alert("푸시가 발송되었습니다.")
  };

  return (
    <main className={styles.container}>
      <Seo title="ADMIN" />
      <ProjectHeader title={["Admin"]} />
      <div className={styles.content}>
        {!verified ? (
          <section className={styles.section}>
            <Button text="로그인" onClick={login} />
          </section>
        ) : (
          <section className={styles.section}>
            <h4 className={styles.header}>푸시 발송</h4>
            <div className={styles.text}>
              <input
                value={title}
                onChange={onTitleChange}
                placeholder="제목"
              />
              <input value={body} onChange={onBodyChange} placeholder="내용" />
              <input value={url} onChange={onUrlChange} placeholder="URL" />
            </div>
            <Button text="전송하기" onClick={onSendPushClick} />
          </section>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Admin;
