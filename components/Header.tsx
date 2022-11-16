import { ReactElement, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import { FrontPropType } from "../types";
import useCalcScroll from "../hooks/useCalcScroll";
import _ from "lodash";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Header: React.FC<FrontPropType> = (): ReactElement => {
  const headerContainerRef = useRef<Array<any>>([]);
  const stickyElRef = useRef<HTMLDivElement>(null);
  const firstLinesRef = useRef<Array<any>>([]);
  const lastLinesRef = useRef<Array<any>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const calcScroll = useCalcScroll();
  const ScrollAnimation = useScrollAnimation();

  useEffect(() => {
    if (
      !headerContainerRef.current ||
      !containerRef.current ||
      !stickyElRef.current ||
      !firstLinesRef.current ||
      !lastLinesRef.current
    )
      return;

    const headerContainers = headerContainerRef.current;
    const clipPathTarget = headerContainers[1];
    const firstLines = firstLinesRef.current;
    const lastLines = lastLinesRef.current;

    const clipPathAnimation = new ScrollAnimation(
      [clipPathTarget],
      {
        duration: 0,
        ease: "linear",
        clipPath: "inset(-100% 0px 0px)",
      },
      {
        duration: 0,
        ease: "linear",
        clipPath: "inset(100% 0px 0px)",
      }
    );
    const scaleAnimation = new ScrollAnimation(
      headerContainers,
      {},
      { duration: 0, ease: "linear", scale: 1 }
    );
    const firstLinesAnimation = new ScrollAnimation(
      firstLines,
      { duration: 0, ease: "linear", translateX: 0 },
      { duration: 0, ease: "linear", translateX: "-26.5px" }
    );
    const lastLinesAnimation = new ScrollAnimation(
      lastLines,
      { duration: 0, ease: "linear", translateX: 0 },
      { duration: 0, ease: "linear", translateX: "42.5px" }
    );

    const windowScrollListener = (e: Event) => {
      e.preventDefault();

      // 스크롤 진행도
      let scrollProgress = calcScroll(containerRef, stickyElRef);

      // 진행도에 따른 x축, clip-path, 스케일 애니메이션 처리
      if (scrollProgress >= 1) {
        // 진행도 1 이상일 때,
        // 헤더 x축 기본값
        // clip-path 초기값
        firstLinesAnimation.setDefault();
        lastLinesAnimation.setDefault();
        clipPathAnimation.setDefault();
      } else if (scrollProgress < 0) {
        // 진행도 0 미만일 때,
        // 헤더 x축 & clip-path 초기값
        // scrollProgress에 ease 적용 후 스케일 애니메이션 실행
        firstLinesAnimation.setInit();
        lastLinesAnimation.setInit();
        clipPathAnimation.setInit();
        scrollProgress = scrollProgress * scrollProgress * scrollProgress;
        scaleAnimation.startAnimation({
          duration: 0,
          ease: "linear",
          scale: -scrollProgress * 20 + 1,
        });
      } else {
        // 진행도 1 미만 0 이상일 때,
        // 스케일 기본값
        // 헤더 x축 & clip-path 애니메이션 실행
        scaleAnimation.setDefault();
        firstLinesAnimation.startAnimation({
          duration: 0,
          ease: "linear",
          translateX: `${
            scrollProgress < 0 ? -26.5 : -26.5 + 26.5 * scrollProgress
          }`,
        });
        lastLinesAnimation.startAnimation({
          duration: 0,
          ease: "linear",
          translateX: `${
            scrollProgress < 0 ? 42.5 : 42.5 - 42.5 * scrollProgress
          }`,
        });
        clipPathAnimation.startAnimation({
          duration: 0,
          ease: "linear",
          clipPath: `inset(${100 - scrollProgress * 100}% 0px 0px)`,
        });
      }
    };

    window.addEventListener("scroll", windowScrollListener);

    return () => {
      window.removeEventListener("scroll", windowScrollListener);
    };
  }, [ScrollAnimation, calcScroll]);

  return (
    <header ref={containerRef} className={styles.container}>
      <div ref={stickyElRef} className={styles.content}>
        <div
          ref={(el) => (headerContainerRef.current[0] = el)}
          className={styles.fake}
          style={{ transform: "scale(73.88)" }}
        >
          <div
            ref={(el) => (firstLinesRef.current[0] = el)}
            style={{ transform: "translateX(-26.5px)" }}
          >
            Rare
          </div>
          <div>beef&apos;s</div>
          <div
            ref={(el) => (lastLinesRef.current[0] = el)}
            style={{ transform: "translateX(42.5px)" }}
          >
            portfolio
          </div>
        </div>
        <h1
          ref={(el) => (headerContainerRef.current[1] = el)}
          className={styles.real}
          style={{ clipPath: "inset(100% 0px 0px)" }}
        >
          <div
            ref={(el) => (firstLinesRef.current[1] = el)}
            style={{ transform: "translateX(-26.5px)" }}
          >
            Rare
          </div>
          <div>beef&apos;s</div>
          <div
            ref={(el) => (lastLinesRef.current[1] = el)}
            style={{ transform: "translateX(42.5px)" }}
          >
            portfolio
          </div>
        </h1>
      </div>
    </header>
  );
};

export default Header;
