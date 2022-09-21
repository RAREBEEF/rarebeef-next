import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { NavPropType } from "../types";
import styles from "./Nav.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";

const Nav: React.FC<NavPropType> = (): ReactElement => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (
      router.pathname !== "/" &&
      router.pathname !== "/contact" &&
      router.pathname !== "/about"
    ) {
      router.push("/");
    }
  }, [router]);

  const onMenuClick = (): void => {
    setShowMenu((prev) => !prev);
  };

  const onItemClick = (): void => {
    window.scrollTo({ top: 0 });
  };

  return (
    <nav
      className={classNames(styles.container, showMenu && styles["show-menu"])}
    >
      <ul className={styles["list"]}>
        <Link href="/">
          <a className={styles.item} onClick={onItemClick}>
            <li className={styles["item__text"]}>Home</li>
          </a>
        </Link>
        <Link href="/about">
          <a className={styles.item} onClick={onItemClick}>
            <li className={styles["item__text"]}>About</li>
          </a>
        </Link>
        <Link href="/contact">
          <a className={styles.item} onClick={onItemClick}>
            <li className={styles["item__text"]}>Contact</li>
          </a>
        </Link>
      </ul>
      <img
        className={styles["icon--menu"]}
        src="/icons/circle-bars.svg"
        alt="menu"
        onClick={onMenuClick}
      />
      <img
        className={styles["icon--menu-close"]}
        src="icons/xmark-solid.svg"
        alt="close menu"
        onClick={onMenuClick}
      />
    </nav>
  );
};

export default Nav;
