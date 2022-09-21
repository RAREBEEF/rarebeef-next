import classNames from "classnames";
import { useState } from "react";
import Button from "../components/Button";
import GuestBookWrapper from "../components/GuestBookWrapper";
import SectionHeader from "../components/SectionHeader";
import styles from "./contact.module.scss";
import { ContactPropType } from "../types";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGuestBookThunk } from "../redux/modules/getGuestBook";
import Seo from "../components/Seo";

const Contact: React.FC<ContactPropType> = () => {
  const [copyAlert, setCopyAlert] = useState<string>("");

  const dispatch = useDispatch();

  useEffect((): void => {
    dispatch<any>(getGuestBookThunk());
  }, [dispatch]);

  const onCopyClick = (): void => {
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

  return (
    <main className={styles.container}>
      <Seo
        title="CONTACT"
        description="RAREBEEF의 Contact 페이지입니다. 방명록을 작성해 보세요. 메일 : drrobot409@gmail.com / Github: github.com/RAREBEEF / 블로그 : velog.io/@drrobot409"
      />
      <SectionHeader
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
          <h4 className={styles.header}>Guest book</h4>
          <GuestBookWrapper />
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
