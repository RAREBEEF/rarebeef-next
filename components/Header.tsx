import { ReactElement, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import { FrontPropType } from "../types";
import useCalcScroll from "../hooks/useCalcScroll";
import _, { first } from "lodash";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Header: React.FC<FrontPropType> = (): ReactElement => {
  const headerContainerRef = useRef<Array<any>>([]);
  const stickyElRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<Array<any>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const calcScroll = useCalcScroll();
  const ScrollAnimation = useScrollAnimation();

  useEffect(() => {
    if (
      !headerContainerRef.current ||
      !containerRef.current ||
      !stickyElRef.current ||
      !linesRef.current
    )
      return;

    const container = containerRef.current;
    const stickyEl = stickyElRef.current;
    const headerContainers = headerContainerRef.current;
    const clipPathTarget = headerContainers[1];
    const lines = linesRef.current;

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
    const firstLineAnimation = new ScrollAnimation(
      [lines[0]],
      {
        translateY: "0",
        opacity: 1,
      },
      {
        translateY: "50px",
        opacity: 0,
      }
    );
    const secondLineAnimation = new ScrollAnimation(
      [lines[1]],
      {
        translateY: "0",
        opacity: 1,
      },
      {
        translateY: "50px",
        opacity: 0,
      }
    );
    const lastLineAnimation = new ScrollAnimation(
      [lines[2]],
      {
        translateY: "0",
      },
      {
        translateY: "100px",
      }
    );

    const windowScrollListener = (e: Event) => {
      e.preventDefault();

      // 스크롤 진행도
      let scrollProgress = calcScroll(container, stickyEl);

      if (scrollProgress > 1) {
        clipPathAnimation.setDefault();
      } else if (scrollProgress >= 0 && scrollProgress < 0.25) {
        scrollProgress *= 4;

        lastLineAnimation.startAnimation({
          translateY: `${-100 + 100 * scrollProgress}px`,
        });

        firstLineAnimation.setInit();
        secondLineAnimation.setInit();
        clipPathAnimation.setInit();
      } else if (scrollProgress >= 0.25 && scrollProgress < 0.5) {
        scrollProgress = (scrollProgress - 0.25) * 4;

        secondLineAnimation.startAnimation({
          opacity: 1 * scrollProgress,
          translateY: `${50 - 50 * scrollProgress}px`,
        });

        firstLineAnimation.setInit();
        lastLineAnimation.setDefault();
        clipPathAnimation.setInit();
      } else if (scrollProgress >= 0.5 && scrollProgress < 0.75) {
        scrollProgress = (scrollProgress - 0.5) * 4;

        firstLineAnimation.startAnimation({
          opacity: 1 * scrollProgress,
          translateY: `${50 - 50 * scrollProgress}px`,
        });

        secondLineAnimation.setDefault();
        lastLineAnimation.setDefault();
        clipPathAnimation.setInit();
      } else if (scrollProgress > 0.75) {
        scrollProgress = (scrollProgress - 0.75) * 4;

        clipPathAnimation.startAnimation({
          duration: 0,
          ease: "linear",
          clipPath: `inset(${100 - scrollProgress * 100}% 0px 0px)`,
        });

        firstLineAnimation.setDefault();
        secondLineAnimation.setDefault();
        lastLineAnimation.setDefault();
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
        >
          <div
            ref={(el) => (linesRef.current[0] = el)}
            style={{ opacity: 0, transform: "translateY: 50px" }}
          >
            Rare
          </div>
          <div
            ref={(el) => (linesRef.current[1] = el)}
            style={{ opacity: 0, transform: "translateY: 50px" }}
          >
            beef&apos;s
          </div>
          <div
            ref={(el) => (linesRef.current[2] = el)}
            style={{ transform: "translateY: -100px" }}
          >
            portfolio
          </div>
        </div>
        <div
          ref={(el) => (headerContainerRef.current[1] = el)}
          className={styles.real}
          style={{ clipPath: "inset(100% 0px 0px)" }}
        >
          <hgroup>
            <h1>Rare</h1>
            <h1>beef&apos;s</h1>
            <h1>portfolio</h1>
          </hgroup>
        </div>
      </div>
    </header>
  );
};

export default Header;
