import classNames from "classnames";
import { useState } from "react";
import Button from "../components/Button";
import GuestBookWrapper from "../components/GuestBookWrapper";
import ProjectHeader from "../components/ProjectHeader";
import styles from "./contact.module.scss";
import { ContactPropType } from "../types";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGuestBookThunk } from "../redux/modules/getGuestBook";
import Seo from "../components/Seo";
import Script from "next/script";
import buttonStyles from "../components/Button.module.scss";

const Contact: React.FC<ContactPropType> = () => {
  const [copyAlert, setCopyAlert] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getGuestBookThunk());
  }, [dispatch]);

  const onCopyClick = () => {
    navigator.clipboard
      .writeText("drrobot409@gmail.com")
      .then(() => {
        setCopyAlert("복사됨");
      })
      .catch((error) => {
        console.error(error);
        setCopyAlert("복사 실패");
      });
  };

  useEffect(() => {
    // @ts-ignore
    if (typeof twttr !== "undefined") twttr.widgets.load();
  }, []);

  return (
    <main className={styles.container}>
      <Seo
        title="CONTACT"
        description="방명록을 작성해 보세요."
      />
      <ProjectHeader
        title={["Contact"]}
        subTitle={["Welcome feedback"]}
        classes={["Contact"]}
      />
      <div className={styles.content}>
        <section className={styles.section}>
          <div className={styles["header-mail-wrapper"]}>
            <h4 className={classNames(styles.header, styles["header-mail"])}>
              Mail
            </h4>
            <span className={styles["alert-copy"]}>{copyAlert}</span>
          </div>
          <div className={styles["btn-group"]}>
            <Button text="drrobot409@gmail.com" onClick={onCopyClick} />
            <Button
              href="mailto:drrobot409@gmail.com?body=-&nbsp;Send from rarebeef's portfolio."
              icon="/icons/paper-plane-thin.svg"
              classes={["Contact__send-mail"]}
            />
          </div>
        </section>
        <section className={styles.section}>
          <h4 className={styles.header}>Github</h4>
          <div className={styles["btn-group"]}>
            <Button
              href="https://github.com/RAREBEEF"
              text="github.com/RAREBEEF"
            />
          </div>
        </section>
        <section className={styles.section}>
          <h4 className={styles.header}>Blog</h4>
          <div className={styles["btn-group"]}>
            <Button
              href="https://velog.io/@drrobot409"
              text="velog.io/@drrobot409"
            />
          </div>
        </section>
        <section className={styles.section}>
          <h4 className={styles.header}>Twitter</h4>
          <a
            id="tweet-container"
            className={classNames("twitter-timeline", buttonStyles.button)}
            data-theme="light"
            data-dnt="true"
            href="https://twitter.com/dev_rarebeef?ref_src=twsrc%5Etfw"
          >
            Tweets by dev_rarebeef
          </a>
          <Script async src="https://platform.twitter.com/widgets.js" />
        </section>
        <section className={styles.section}>
          <h4 className={styles.header}>Guest book</h4>
          <GuestBookWrapper />
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
