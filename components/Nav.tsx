/* eslint-disable @next/next/no-img-element */
import React, { MouseEvent, ReactElement, useEffect, useState } from "react";
import { NavPropType } from "../types";
import styles from "./Nav.module.scss";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const Nav: React.FC<NavPropType> = ({ setShowModal }): ReactElement => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { pathname, events } = useRouter();
  const [showPushRequest, setShowPushRequest] = useState<boolean>(false);

  useEffect(() => {
    const permission = localStorage.getItem("notificationPermission");

    switch (permission) {
      case "true":
        setShowPushRequest(false);
        break;
      case "false":
        setShowPushRequest(true);
        break;
      case "unsupport":
        setShowPushRequest(false);
        break;
      default:
        setShowPushRequest(false);
    }
  }, [showMenu]);

  useEffect(() => {
    const routeChangeHandler = () => {
      sessionStorage.setItem("navigatingCurApp", "true");
      setShowMenu(false);
    };

    events.on("routeChangeStart", routeChangeHandler);

    return () => {
      events.off("routeChangeStart", routeChangeHandler);
    };
  }, [events, pathname]);

  const onMenuClick = () => {
    setShowMenu((prev) => !prev);
  };

  const onPushRequestClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowMenu((prev) => !prev);
    setShowModal(true);
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
        <li
          className={classNames(
            styles.item,
            "menu-click-area",
            (pathname === "/" || pathname.startsWith("/projects")) &&
              styles.current
          )}
        >
          <Link
            href="/"
            className={classNames(styles["item__text"], "menu-click-area")}
          >
            Projects
          </Link>
        </li>
        <li
          className={classNames(
            styles.item,
            "menu-click-area",
            pathname === "/about" && styles.current
          )}
        >
          <Link
            href="/about"
            className={classNames(styles["item__text"], "menu-click-area")}
          >
            About
          </Link>
        </li>
        <li
          className={classNames(
            styles.item,
            "menu-click-area",
            pathname === "/contact" && styles.current
          )}
        >
          <Link
            href="/contact"
            className={classNames(styles["item__text"], "menu-click-area")}
          >
            Contact
          </Link>
        </li>
        {showPushRequest && (
          <li className={classNames(styles.item, "menu-click-area")}>
            <button
              onClick={onPushRequestClick}
              className={classNames(styles["item__text"], "menu-click-area")}
            >
              Push request
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
