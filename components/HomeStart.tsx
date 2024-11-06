import { MouseEvent, useEffect, useRef, useState } from "react";
import useCalcScroll from "../hooks/useCalcScroll";
import _ from "lodash";
import styles from "./HomeStart.module.scss";
import classNames from "classnames";
import gsap from "gsap";
import HomeCanvas from "./HomeCanvas";
import HomeScreenshots from "./HomeScreenshots";

const HomeStart = () => {
  const [entered, setEntered] = useState<boolean>(false);
  const [headerAway, setHeaderAway] = useState<boolean>(false);
  const [startObserve, setStartObserve] = useState<boolean>(false);
  const stickyItemRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLElement>(null);
  const calcScroll = useCalcScroll();
  const [device, setDevice] = useState<"mobile" | "pc">("mobile");
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // 디바이스 환경 체크
  useEffect(() => {
    if (!entered) return;

    const checkDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = userAgent.match(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      );
      if (isMobile) {
        const stickyItem = stickyItemRef.current;
        gsap.to(stickyItem, {
          translateX: 0,
          translateY: 0,
          scale: 1,
        });
      }
      setDevice(isMobile ? "mobile" : "pc");
    };
    window.addEventListener("resize", checkDevice);
    checkDevice();

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, [setDevice, entered]);

  // 화면 진입 감지
  useEffect(() => {
    if (!stickyContainerRef.current) {
      return;
    }
    const stickyContainer = stickyContainerRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio <= 0) {
          setEntered(false);
        } else {
          setEntered(true);
        }
      });
    });

    observer.observe(stickyContainer);
  }, []);

  useEffect(() => {
    if (!entered || !stickyContainerRef.current || !stickyItemRef.current)
      return;

    const windowScrollHandler = () => {
      const stickyContainer = stickyContainerRef.current;
      const stickyItem = stickyItemRef.current;
      if (!stickyContainer || !stickyItem) return;

      const scrollProgress = calcScroll(stickyContainer, stickyItem);

      // if (scrollProgress > 0.2) {
      //   setHeaderAway(true);
      // } else {
      //   setHeaderAway(false);
      // }
      gsap.to("." + styles.title, {
        // filter: `blur(${5 * scrollProgress}px)`,
        scale: 0.8 + scrollProgress * 0.5,
      });

      setScrollProgress(scrollProgress);
    };

    windowScrollHandler();

    window.addEventListener("scroll", windowScrollHandler);

    return () => {
      window.removeEventListener("scroll", windowScrollHandler);
    };
  }, [calcScroll, entered, headerAway]);

  return (
    <section
      ref={stickyContainerRef}
      className={classNames(
        styles.container,
        headerAway && styles.headerAway,
        device === "mobile" && styles.mobile
      )}
    >
      <div className={styles.title}>
        <div className={styles["title_author"]}>RAREBEEF&apos;s</div>
        <h1 className={styles["title_main"]}>
          <div>FRONTEND</div> <div>PORTFOLIO</div>
        </h1>
        <div className={styles["scroll-to-continue"]}>SCROLL TO CONTINUE</div>
      </div>

      <div ref={stickyItemRef} className={classNames(styles["sticky-item"])}>
        <HomeCanvas entered={entered} scrollProgress={scrollProgress} />
        <HomeScreenshots scrollProgress={scrollProgress} entered={entered} />
      </div>
    </section>
  );
};

export default HomeStart;
