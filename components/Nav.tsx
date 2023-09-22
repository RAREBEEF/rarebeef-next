/* eslint-disable @next/next/no-img-element */
import React, { ReactElement, useEffect, useState } from "react";
import { NavPropType } from "../types";
import styles from "./Nav.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav: React.FC<NavPropType> = (): ReactElement => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { pathname, events } = useRouter();

  useEffect(() => {
    const routeChangeHandler = () => {
      setShowMenu(false);
    };
    events.on("routeChangeStart", routeChangeHandler);

    return () => {
      events.off("routeChangeStart", routeChangeHandler);
    };
  }, [events]);

  const onMenuClick = () => {
    setShowMenu((prev) => !prev);
  };

  // 메뉴 외부 클릭 감지
  useEffect(() => {
    const windowClickHandler = (e: Event) => {
      const target = e.target as HTMLElement;

      !target.classList.contains("menu-click-area") && setShowMenu(false);
    };

    if (showMenu) {
      window.addEventListener("click", windowClickHandler);
    } else {
      window.removeEventListener("click", windowClickHandler);
    }

    return () => {
      window.removeEventListener("click", windowClickHandler);
    };
  }, [showMenu]);

  return (
    <nav
      className={classNames(
        styles.container,
        "menu-click-area",
        showMenu && styles["show-menu"]
      )}
    >
      <img
        className={classNames(styles["icon--menu"], "menu-click-area")}
        src="/icons/circle-bars.svg"
        alt="menu"
        onClick={onMenuClick}
      />
      <img
        className={classNames(styles["icon--menu-close"], "menu-click-area")}
        src="icons/xmark-solid.svg"
        alt="close menu"
        onClick={onMenuClick}
      />

      <ul className={classNames(styles["list"], "menu-click-area")}>
        {/* <Link
          href="/"
          className={classNames(
            styles.item,
            "menu-click-area",
            pathname === "/" && styles.current
          )}
        >
          <li className={classNames(styles["item__text"], "menu-click-area")}>
            Intro
          </li>
        </Link> */}
        <Link
          href="/"
          className={classNames(
            styles.item,
            "menu-click-area",
            pathname === "/" && styles.current
          )}
        >
          <li className={classNames(styles["item__text"], "menu-click-area")}>
            Projects
          </li>
        </Link>
        <Link
          href="/about"
          className={classNames(
            styles.item,
            "menu-click-area",
            pathname === "/about" && styles.current
          )}
        >
          <li className={classNames(styles["item__text"], "menu-click-area")}>
            About
          </li>
        </Link>
        <Link
          href="/contact"
          className={classNames(
            styles.item,
            "menu-click-area",
            pathname === "/contact" && styles.current
          )}
        >
          <li className={classNames(styles["item__text"], "menu-click-area")}>
            Contact
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Nav;
