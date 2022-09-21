import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { NavPropType } from "../types";
import styles from "./Nav.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";
import Link from "next/link";

const Nav: React.FC<NavPropType> = (): ReactElement => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [resizing, setResizing] = useState<boolean>(false);
  const [size, setSize] = useState<number>(50);
  const [clientWidth, setClientWidth] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      // Update UI notify the user they can install the PWA
      // Optionally, send analytics event that PWA install promo was shown.
      console.log(e);
      console.log("beforeinstallprompt");
    });
  }, []);

  useEffect(() => {
    setClientWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (
      router.pathname !== "/" &&
      router.pathname !== "/contact" &&
      router.pathname !== "/about"
    ) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const windowResizeListener = (): void => {
      setClientWidth(window.innerWidth);
    };

    window.addEventListener("resize", windowResizeListener);

    return (): void => {
      window.removeEventListener("resize", windowResizeListener);
    };
  }, []);

  const onMenuClick = (): void => {
    setShowMenu((prev) => !prev);
  };

  const onItemClick = (): void => {
    window.scrollTo({ top: 0 });
  };

  const windowMouseMoveListener = useCallback(
    (e: any): void => {
      e.preventDefault();

      setSize((prev) =>
        prev - (e.movementX / clientWidth) * 100 < 0
          ? 0
          : prev - (e.movementX / clientWidth) * 100 > 100
          ? 100
          : prev - (e.movementX / clientWidth) * 100
      );
    },
    [clientWidth]
  );

  const windowMouseUpListener = useCallback((): void => {
    setResizing(false);
    window.removeEventListener("mousemove", windowMouseMoveListener);
  }, [windowMouseMoveListener]);

  const onResizeClickStart = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();

    setResizing(true);
    window.addEventListener("mousemove", windowMouseMoveListener);
    window.addEventListener("mouseup", windowMouseUpListener, { once: true });
  };

  return (
    <nav
      className={classNames(styles.container, showMenu && styles["show-menu"])}
    >
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
      <div className={styles["menu"]}>
        <div className={styles["menu__left-side"]} onClick={onMenuClick} />
        <div
          className={styles["menu__resizer"]}
          onMouseDown={onResizeClickStart}
        >
          <img
            className={styles["icon--resize"]}
            src="/icons/ellipsis-vertical-solid.svg"
            alt="resize"
          />
        </div>
        <ul
          className={styles["menu__right-side"]}
          style={{
            width: showMenu ? `${size}vw` : 0,
            transition: resizing ? "none" : "all 1s",
          }}
        >
          <Link
            href="/"
            className={classNames(styles.item, styles.flip)}
            onClick={onItemClick}
          >
            <a>Home</a>
          </Link>
          <Link
            href="/about"
            className={classNames(styles.item, styles.flip)}
            onClick={onItemClick}
          >
            <a>About me</a>
          </Link>
          <Link
            href="/contact"
            className={classNames(styles.item, styles.flip)}
            onClick={onItemClick}
          >
            <a>Contact</a>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
