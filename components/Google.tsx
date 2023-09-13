import Link from "next/link";
import styles from "./Google.module.scss";
import { KeyboardEvent, useState } from "react";
import classNames from "classnames";

const Google = () => {
  const [tryingSearch, setTryingSearch] = useState<boolean>(false);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setTryingSearch(true);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles["nav-left"]}>
            <li className={styles["nav-item"]}>
              <Link href="/about">게시자 정보</Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link href="/contact">문의하기</Link>
            </li>
          </ul>
          {/* <ul className={styles["nav-right"]}>
            <li className={styles["nav-item"]}>
              <Link href="/">Gmail</Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link href="/">이미지</Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link href="/">메뉴</Link>
            </li>
            <li className={styles["nav-item"]}>
              <Link href="/">로그인</Link>
            </li>
          </ul> */}
        </nav>
      </header>
      <section className={styles["flex-wrapper"]}>
        {/* <h1 className={styles.logo}>
          <span className={styles.blue}>P</span>
          <span className={styles.red}>o</span>
          <span className={styles.yellow}>r</span>
          <span className={styles.blue}>t</span>
          <span className={styles.green}>f</span>
          <span className={styles.red}>o</span>
          <span className={styles.yellow}>l</span>
          <span className={styles.blue}>i</span>
          <span className={styles.green}>o</span>
        </h1> */}
        <h1 className={styles.logo}>
          <span className={styles.blue}>G</span>
          <span className={styles.red}>o</span>
          <span className={styles.yellow}>o</span>
          <span className={styles.blue}>g</span>
          <span className={styles.green}>l</span>
          <span className={styles.red}>e</span>
        </h1>
        <section className={styles.search}>
          <form
            className={classNames(styles.form, tryingSearch && styles.drop)}
          >
            <div className={styles["input-wrapper"]}>
              <span className={styles["search-icon"]}>
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </span>
              <textarea
                spellCheck="false"
                rows={1}
                onKeyDown={onKeyDown}
                onChange={(e) => {
                  e.target.style.height = "22px";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
              ></textarea>
            </div>
          </form>
          <div className={styles["btn-group"]}>
            <button>마우스 효과 끄기</button>
            <Link href="/projects">projects로 이동하기</Link>
          </div>
        </section>
        <div className={styles.empty}></div>
      </section>
      <footer>
        &copy; {new Date().getFullYear()}. RAREBEEF All Rights Reserved.
      </footer>
    </div>
  );
};

export default Google;
