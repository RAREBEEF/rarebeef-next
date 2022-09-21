/* eslint-disable @next/next/no-img-element */
import { ReactElement, useEffect, useRef } from "react";
import styles from "./Front.module.scss";
import { FrontPropType } from "../types";
import classNames from "classnames";
import gsap from "gsap";

const Front: React.FC<FrontPropType> = (): ReactElement => {
  const clipPathRef = useRef<HTMLHeadingElement>(null);
  const fakeSubTitleRef = useRef<HTMLHeadingElement>(null);
  const realSubTitleRef = useRef<HTMLHeadingElement>(null);
  const fakeTitleRef = useRef<HTMLHeadingElement>(null);
  const realTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const windowScrollListener = () => {
      // (Y스크롤 / (continaer 요소 높이(200vh) - sticky 요소 높이(100vh))) * 100
      // === Y스크롤 / 100vh * 100
      let scrollProgress = (window.scrollY / window.innerHeight) * 100;

      if (
        !clipPathRef.current ||
        !fakeSubTitleRef.current ||
        !fakeTitleRef.current ||
        !realSubTitleRef.current ||
        !realTitleRef.current ||
        scrollProgress >= 130
      ) {
        return;
      }

      const clipPath = clipPathRef.current;
      const fakeSubTitle = fakeSubTitleRef.current;
      const fakeTitle = fakeTitleRef.current;
      const realSubTitle = realSubTitleRef.current;
      const realTitle = realTitleRef.current;

      if (scrollProgress >= 100) {
        clipPath.style.clipPath = "inset(-100% 0px 0px)";
      } else {
        gsap.to(clipPath, 0.1, {
          clipPath: `inset(${100 - scrollProgress}% 0px 0px)`,
        });
      }

      gsap.to(fakeSubTitle, 0.3, {
        transform: `translateY(${15 - scrollProgress * 0.15}vmin)`,
      });
      gsap.to(fakeTitle, 0.3, {
        transform: `translateY(${-15 + scrollProgress * 0.15}vmin)`,
      });
      gsap.to(realSubTitle, 0.3, {
        transform: `translateY(${15 - scrollProgress * 0.15}vmin)`,
      });
      gsap.to(realTitle, 0.3, {
        transform: `translateY(${-15 + scrollProgress * 0.15}vmin)`,
      });
    };

    window.addEventListener("scroll", windowScrollListener);

    return () => {
      window.removeEventListener("scroll", windowScrollListener);
    };
  }, []);

  return (
    <section className={classNames(styles.container)}>
      <div className={styles.bg} />
      <main className={styles.content}>
        <div className={styles.fake}>
          <img
            className={styles["falling-logo"]}
            src="/logos/beef.svg"
            alt="RAREBEEF"
          />
          <img
            className={styles["falling-logo"]}
            src="/logos/beef.svg"
            alt="RAREBEEF"
          />
          <img
            className={styles["falling-logo"]}
            src="/logos/beef.svg"
            alt="RAREBEEF"
          />
          <img
            className={styles["falling-logo"]}
            src="/logos/beef.svg"
            alt="RAREBEEF"
          />
          <h1
            ref={fakeSubTitleRef}
            className={styles["sub-title"]}
            style={{ transform: `translateY(15vmin)` }}
          >
            RAREBEEF&apos;s
          </h1>
          <img
            className={classNames(styles.logo)}
            src="/logos/beef.svg"
            alt="RARE BEEF"
          />
          <h1
            ref={fakeTitleRef}
            className={styles.title}
            style={{ transform: `translateY(-15vmin)` }}
          >
            Portfolio
          </h1>
        </div>
        <hgroup
          ref={clipPathRef}
          className={styles.real}
          style={{ clipPath: "inset(100% 0px 0px)" }}
        >
          <h1 ref={realSubTitleRef} className={styles["sub-title"]}>
            RAREBEEF&apos;s
          </h1>
          <img className={styles.logo} src="/logos/beef.svg" alt="RARE BEEF" />
          <h1 ref={realTitleRef} className={styles.title}>
            Portfolio
          </h1>
        </hgroup>
      </main>
    </section>
  );
};

export default Front;
