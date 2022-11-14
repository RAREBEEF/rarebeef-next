/* eslint-disable @next/next/no-img-element */
import { ReactElement, useCallback, useEffect, useState } from "react";
import styles from "./Toolbar.module.scss";
import { ToolbarPropType } from "../types";
import classNames from "classnames";
import _ from "lodash";

const Toolbar: React.FC<ToolbarPropType> = (): ReactElement => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [clientHeight, setClientHeight] = useState<number>(0);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const windowResizeListener = (e: Event) => {
      e.preventDefault();

      setClientHeight(window.innerHeight);
    };

    const windowScrollListener = (e: Event) => {
      e.preventDefault();

      setScrollTop(window.scrollY);
    };

    window.addEventListener("scroll", _.throttle(windowScrollListener, 500));
    window.addEventListener("resize", _.debounce(windowResizeListener, 500));

    return () => {
      window.removeEventListener(
        "scroll",
        _.throttle(windowScrollListener, 500)
      );
      window.removeEventListener(
        "resize",
        _.debounce(windowResizeListener, 500)
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
          scrollTop > clientHeight / 2 + 2500 && styles.show
        )}
        src="/icons/circle-chevron-up-solid.svg"
        alt="To top"
        onClick={toTop}
      />
    </div>
  );
};

export default Toolbar;
