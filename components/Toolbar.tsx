/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import styles from "./Toolbar.module.scss";
import { ToolbarPropType } from "../types";
import classNames from "classnames";
import _ from "lodash";

const Toolbar: React.FC<ToolbarPropType> = (): ReactElement => {
  const [show, setShow] = useState<boolean>(false);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const windowScrollHandler = (e: Event) => {
      e.preventDefault();

      if (window.scrollY >= window.innerHeight * 2) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", _.throttle(windowScrollHandler, 500));

    return () => {
      window.removeEventListener(
        "scroll",
        _.throttle(windowScrollHandler, 500)
      );
    };
  }, []);

  return (
    <div className={classNames(styles.container)}>
      <a href="https://github.com/RAREBEEF" target={"_blank"} rel="noreferrer">
        <img
          className={classNames(styles["icon--github"], styles.icon)}
          src="/icons/github-brands.svg"
          alt="Github"
        />
      </a>
      <a href="https://velog.io/@drrobot409" target={"_blank"} rel="noreferrer">
        <img
          className={classNames(styles["icon--velog"], styles.icon)}
          src="/icons/velog.svg"
          alt="Velog"
        />
      </a>
      <a href="mailto:drrobot409@gmail.com?body=-&nbsp;Send from rarebeef's portfolio.">
        <img
          className={classNames(styles["icon--mail"], styles.icon)}
          src="/icons/circle-envelope-regular.svg"
          alt="Send mail"
        />
      </a>
      <img
        className={classNames(
          styles["icon--to-top"],
          styles.icon,
          show && styles.show
        )}
        src="/icons/circle-chevron-up-solid.svg"
        alt="To top"
        onClick={toTop}
      />
    </div>
  );
};

export default Toolbar;
