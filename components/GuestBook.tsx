import { useState } from "react";
import { GuestBookPropType } from "../types";
import Button from "./Button";
import styles from "./GuestBook.module.scss";
import * as FB from "../fb";
import classNames from "classnames";

const GuestBook: React.FC<GuestBookPropType> = ({ data }) => {
  const [pwCheck, setPwCheck] = useState<string>("");

  const onPwCheckChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPwCheck(e.target.value);
  };

  const onDelete = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (pwCheck.length === 0) {
      window.alert("비밀번호를 입력해주세요.");

      return;
    }

    if (pwCheck !== process.env.REACT_APP_PW && pwCheck !== data.pw) {
      window.alert("비밀번호가 일치하지 않습니다.");

      return;
    }

    const ok = window.confirm("삭제하시겠습니까?");

    if (!ok) {
      return;
    }

    await FB.deleteDoc(FB.doc(FB.db, "GuestBook", data.id));
  };

  return (
    <li className={styles["container"]}>
      <main className={classNames(styles.text, styles.content)}>
        {data.content}
      </main>
      <div className={styles["bottom-wrapper"]}>
        <div className={styles["info"]}>
          <div className={classNames(styles.text, styles.name)}>
            {data.name} ({data.displayIp})
          </div>
          <div className={classNames(styles.text, styles.date)}>{`${new Date(
            data.createdAt
          ).getFullYear()}/${
            new Date(data.createdAt).getMonth() < 9 ? "0" : ""
          }${new Date(data.createdAt).getMonth() + 1}/${
            new Date(data.createdAt).getDate() < 10 ? "0" : ""
          }${new Date(data.createdAt).getDate()} ${
            new Date(data.createdAt).getHours() < 10 ? "0" : ""
          }${new Date(data.createdAt).getHours()}:${
            new Date(data.createdAt).getMinutes() < 10 ? "0" : ""
          }${new Date(data.createdAt).getMinutes()}`}</div>
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
