import { useState } from "react";
import { GuestBookPropType } from "../types";
import Button from "./Button";
import styles from "./GuestBook.module.scss";
import classNames from "classnames";
import dayjs from "dayjs";
import Inko from "inko";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../fb";
import useCheckIsAdmin from "../hooks/useCheckIsAdmin";
import { getAuth } from "firebase/auth";

const GuestBook: React.FC<GuestBookPropType> = ({ data }) => {
  const [pwCheck, setPwCheck] = useState<string>("");
  const checkIsAdmin = useCheckIsAdmin();
  const inko = new Inko();

  const onPwCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwCheck(e.target.value);
  };

  const onDelete = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const auth = getAuth();

    if (checkIsAdmin(auth.currentUser) || inko.ko2en(pwCheck) !== data.pw) {
      const ok = window.confirm("삭제하시겠습니까?");

      if (ok) {
        await deleteDoc(doc(db, "GuestBook", data.id));
      }
    } else if (pwCheck.length === 0) {
      window.alert("비밀번호를 입력해주세요.");
      return;
    } else {
      window.alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  return (
    <li className={styles["container"]}>
      <main className={classNames(styles.text, styles.content)}>
        {data.content}
      </main>
      <div className={styles["bottom-wrapper"]}>
        <div className={styles["info"]}>
          <div className={classNames(styles.text, styles.name)}>
            {data.name}
          </div>
          <div className={classNames(styles.text, styles.date)}>
            {dayjs(data.createdAt).format("YYYY.MM.DD HH:mm")}
          </div>
        </div>
        <form className={styles.form} onSubmit={onDelete}>
          <input
            hidden
            type="text"
            autoComplete="username"
            defaultValue={data.name}
          />
          <input
            type="password"
            placeholder="비밀번호"
            autoComplete="current-password"
            value={pwCheck}
            onChange={onPwCheckChange}
            className={styles["input--check-pw"]}
          />
          <Button text="삭제" classes={["GuestBook"]} />
        </form>
      </div>
    </li>
  );
};

export default GuestBook;
