/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useState } from "react";
import styles from "./Toolbar.module.scss";
import { ToolbarPropType } from "../types";
import classNames from "classnames";
import _ from "lodash";
import { useRouter } from "next/router";
import StrangeAstronaut from "./StrangeAstronaut";

const Toolbar: React.FC<ToolbarPropType> = (): ReactElement => {
  const { query } = useRouter();
  const [showToTop, setShowToTop] = useState<boolean>(false);
  const [showMouseEffect, setShowMouseEffect] = useState<boolean>(false);
  const [skin, setSkin] = useState<string>("default");

  // 저장된 스킨 불러오기
  useEffect(() => {
    const storedSkin = window.localStorage.getItem("skin") || "default";
    setSkin(storedSkin);
  }, []);

  // 쿼리스트링에서 선택한 스킨 불러오기
  useEffect(() => {
    if (query.id === "strangeastronaut") {
      setShowMouseEffect(true);
      query.skin && setSkin(query.skin as string);
    }
  }, [query]);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onToggleMouseEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowMouseEffect((prev) => !prev);
  };

  useEffect(() => {
    const windowScrollHandler = _.throttle((e: Event) => {
      e.preventDefault();

      if (window.scrollY >= window.innerHeight * 2) {
        setShowToTop(true);
      } else {
        setShowToTop(false);
      }
    }, 500);

    window.addEventListener("scroll", windowScrollHandler);

    return () => {
      window.removeEventListener("scroll", windowScrollHandler);
    };
  }, []);

  return (
    <div className={classNames(styles.container)}>
      <a
        href="https://github.com/RAREBEEF"
        target={"_blank"}
        rel="noreferrer"
        className={styles.item}
      >
        <img
          className={classNames(styles["icon--github"], styles.icon)}
          src="/icons/github-brands.svg"
          alt="link to github"
        />
        <p className={styles.tooltip}>Github</p>
      </a>
      <a
        href="https://velog.io/@drrobot409"
        target={"_blank"}
        rel="noreferrer"
        className={styles.item}
      >
        <img
          className={classNames(styles["icon--velog"], styles.icon)}
          src="/icons/velog.svg"
          alt="link to velog"
        />
        <p className={styles.tooltip}>Velog</p>
      </a>
      <a
        href="mailto:drrobot409@gmail.com?body=-&nbsp;Send from rarebeef's portfolio."
        className={styles.item}
      >
        <img
          className={classNames(styles["icon--mail"], styles.icon)}
          src="/icons/circle-envelope-regular.svg"
          alt="Send mail"
        />
        <p className={styles.tooltip}>Mail</p>
      </a>
      <button className={classNames(styles.item)} onClick={onToggleMouseEffect}>
        <img
          className={classNames(styles.icon)}
          src="/icons/strange-astronaut.svg"
          alt="Toggle Strange Astronaut"
        />
        <p className={styles.tooltip}>Toggle Strange Astronaut</p>
      </button>
      <button
        className={classNames(
          styles.item,
          styles["to-top"],
          showToTop && styles.show
        )}
      >
        <img
          className={classNames(styles["icon--to-top"], styles.icon)}
          src="/icons/circle-chevron-up-solid.svg"
          alt="scroll to top"
          onClick={toTop}
        />
        <p className={styles.tooltip}>Scroll to top</p>
      </button>
      {showMouseEffect && <StrangeAstronaut currentSkin={skin} />}
    </div>
  );
};

export default Toolbar;
