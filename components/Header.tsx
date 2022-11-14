import { ReactElement, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import { FrontPropType } from "../types";
import gsap from "gsap";
import Image from "next/image";
import beefImg from "../public/logos/beef.svg";
import useCalcScroll from "../hooks/useCalcScroll";
import _ from "lodash";

const Header: React.FC<FrontPropType> = (): ReactElement => {
  const clipPathRef = useRef<HTMLHeadingElement>(null);
  const fakeSubTitleRef = useRef<HTMLHeadingElement>(null);
  const realSubTitleRef = useRef<HTMLHeadingElement>(null);
  const fakeTitleRef = useRef<HTMLHeadingElement>(null);
  const realTitleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const calcScroll = useCalcScroll();

  useEffect(() => {
    if (
      !clipPathRef.current ||
      !fakeSubTitleRef.current ||
      !fakeTitleRef.current ||
      !realSubTitleRef.current ||
      !realTitleRef.current ||
      !containerRef.current
    )
      return;

    const clipPath = clipPathRef.current;
    const fakeSubTitle = fakeSubTitleRef.current;
    const fakeTitle = fakeTitleRef.current;
    const realSubTitle = realSubTitleRef.current;
    const realTitle = realTitleRef.current;

    const windowScrollListener = (e: Event) => {
      e.preventDefault();

      const scrollProgress = calcScroll(containerRef);

      if (scrollProgress >= 1.3 || scrollProgress <= 0) {
        return;
      } else if (scrollProgress >= 1) {
        clipPath.style.clipPath = "inset(-100% 0px 0px)";
      } else {
        gsap.to(clipPath, 0.1, {
          clipPath: `inset(${100 - scrollProgress * 100}% 0px 0px)`,
          ease: "linear",
        });
      }

      gsap.to(fakeSubTitle, 0.3, {
        transform: `translateY(${15 - scrollProgress * 15}vmin)`,
        ease: "linear",
      });
      gsap.to(fakeTitle, 0.3, {
        transform: `translateY(${-15 + scrollProgress * 15}vmin)`,
        ease: "linear",
      });
      gsap.to(realSubTitle, 0.3, {
        transform: `translateY(${15 - scrollProgress * 15}vmin)`,
        ease: "linear",
      });
      gsap.to(realTitle, 0.3, {
        transform: `translateY(${-15 + scrollProgress * 15}vmin)`,
        ease: "linear",
      });
    };

    window.addEventListener("scroll", windowScrollListener);

    return () => {
      window.removeEventListener("scroll", windowScrollListener);
    };
  }, [calcScroll, containerRef]);

  return (
    <header ref={containerRef} className={styles.container}>
      <div /* className={styles.bg} */ />
      <div className={styles.content}>
        <div className={styles.fake}>
          <div
            ref={fakeSubTitleRef}
            className={styles["sub-title"]}
            style={{ transform: `translateY(15vmin)` }}
          >
            RAREBEEF&apos;s
          </div>
          <div className={styles.logo}>
            <Image src={beefImg} alt="RARE BEEF" />
          </div>
          <div
            ref={fakeTitleRef}
            className={styles.title}
            style={{ transform: `translateY(-15vmin)` }}
          >
            Portfolio
          </div>
        </div>
        <hgroup
          ref={clipPathRef}
          className={styles.real}
          style={{ clipPath: "inset(100% 0px 0px)" }}
        >
          <h1 ref={realSubTitleRef} className={styles["sub-title"]}>
            RAREBEEF&apos;s
          </h1>
          <div className={styles.logo}>
            <Image src={beefImg} alt="RARE BEEF" priority />
          </div>
          <h1 ref={realTitleRef} className={styles.title}>
            Portfolio
          </h1>
        </hgroup>
      </div>
    </header>
  );
};

export default Header;
