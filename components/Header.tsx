import { ReactElement, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import { FrontPropType } from "../types";
import useCalcScroll from "../hooks/useCalcScroll";
import _, { first } from "lodash";
import useScrollAnimation from "../hooks/useScrollAnimation";

const Header: React.FC<FrontPropType> = (): ReactElement => {
  const headerContainerRef = useRef<Array<any>>([]);
  const verticalRef = useRef<HTMLDivElement>(null);
  const stickyElRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<Array<any>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const calcScroll = useCalcScroll();
  const ScrollAnimation = useScrollAnimation();

  useEffect(() => {
    if (
      !headerContainerRef.current ||
      !verticalRef.current ||
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
    const vertical = verticalRef.current;

    // 애니메이션 객체 생성
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
        translateY: "150px",
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
        translateY: "100px",
        opacity: 0,
      }
    );
    const lastLineAnimation = new ScrollAnimation(
      [lines[2]],
      {
        translateY: "0",
        opacity: 1,
      },
      {
        translateY: "50px",
        opacity: 0,
      }
    );
    const verticalAnimation = new ScrollAnimation(
      [vertical],
      {
        translateY: "-150vh",
      },
      {
        translateY: "50vh",
      }
    );

    const windowScrollListener = (e: Event) => {
      e.preventDefault();

      // 스크롤 진행도
      let scrollProgress = calcScroll(container, stickyEl);

      // 스크롤 진행도가 0.6 미만일 경우 텍스트 수직 애니메이션 실행
      if (scrollProgress < 0.6) {
        let textAnimationProgress = scrollProgress * 1.6;
        textAnimationProgress =
          textAnimationProgress === 0
            ? 0
            : textAnimationProgress === 1
            ? 1
            : textAnimationProgress < 0.5
            ? Math.pow(2, 20 * textAnimationProgress - 10) / 2
            : (2 - Math.pow(2, -20 * textAnimationProgress + 10)) / 2;

        verticalAnimation.startAnimation({
          translateY: `${50 - 200 * textAnimationProgress}vh`,
        });
      }

      // 분기별 텍스트 애니메이션
      if (scrollProgress >= 1) {
        clipPathAnimation.setDefault();
        firstLineAnimation.setDefault();
        secondLineAnimation.setDefault();
        lastLineAnimation.setDefault();
      } else if (scrollProgress >= 0 && scrollProgress < 0.2) {
        scrollProgress *= 5;
        scrollProgress =
          scrollProgress === 0
            ? 0
            : scrollProgress === 1
            ? 1
            : scrollProgress < 0.5
            ? Math.pow(2, 20 * scrollProgress - 10) / 2
            : (2 - Math.pow(2, -20 * scrollProgress + 10)) / 2;

        firstLineAnimation.startAnimation({
          translateY: `${150 - 50 * scrollProgress}px`,
          opacity: 1 * scrollProgress,
        });

        secondLineAnimation.setInit();
        lastLineAnimation.setInit();
        clipPathAnimation.setInit();
      } else if (scrollProgress >= 0.2 && scrollProgress < 0.4) {
        scrollProgress = (scrollProgress - 0.2) * 5;
        scrollProgress =
          scrollProgress === 0
            ? 0
            : scrollProgress === 1
            ? 1
            : scrollProgress < 0.5
            ? Math.pow(2, 20 * scrollProgress - 10) / 2
            : (2 - Math.pow(2, -20 * scrollProgress + 10)) / 2;

        firstLineAnimation.startAnimation({
          translateY: `${100 - 50 * scrollProgress}px`,
          opacity: 1,
        });
        secondLineAnimation.startAnimation({
          translateY: `${100 - 50 * scrollProgress}px`,
          opacity: 1 * scrollProgress,
        });

        lastLineAnimation.setInit();
        clipPathAnimation.setInit();
      } else if (scrollProgress >= 0.4 && scrollProgress < 0.6) {
        scrollProgress = (scrollProgress - 0.4) * 5;
        scrollProgress =
          scrollProgress === 0
            ? 0
            : scrollProgress === 1
            ? 1
            : scrollProgress < 0.5
            ? Math.pow(2, 20 * scrollProgress - 10) / 2
            : (2 - Math.pow(2, -20 * scrollProgress + 10)) / 2;

        firstLineAnimation.startAnimation({
          translateY: `${50 - 50 * scrollProgress}px`,
          opacity: 1,
        });
        secondLineAnimation.startAnimation({
          translateY: `${50 - 50 * scrollProgress}px`,
          opacity: 1,
        });
        lastLineAnimation.startAnimation({
          translateY: `${50 - 50 * scrollProgress}px`,
          opacity: 1 * scrollProgress,
        });

        clipPathAnimation.setInit();
      } else if (scrollProgress >= 0.6 && scrollProgress < 1) {
        scrollProgress = (scrollProgress - 0.6) * 2.5;
        scrollProgress =
          scrollProgress === 0
            ? 0
            : scrollProgress === 1
            ? 1
            : scrollProgress < 0.5
            ? Math.pow(2, 20 * scrollProgress - 10) / 2
            : (2 - Math.pow(2, -20 * scrollProgress + 10)) / 2;

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
            style={{ opacity: 0, transform: "translateY: 100px" }}
          >
            beef&apos;s
          </div>
          <div
            ref={(el) => (linesRef.current[2] = el)}
            style={{ opacity: 0, transform: "translateY: 150px" }}
          >
            portfolio
          </div>
          <div ref={verticalRef} className={styles.vertical}>
            <div>RARE</div>
            <div>BEEF</div>
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

// if (scrollProgress > 1) {
//   clipPathAnimation.setDefault();
// } else if (scrollProgress >= 0 && scrollProgress < 0.25) {
//   scrollProgress *= 4;

//   firstLineAnimation.startAnimation({
//     opacity: 1 * scrollProgress,
//     translateY: `${100 - 100 * scrollProgress}px`,
//   });

//   lastLineAnimation.setInit();
//   secondLineAnimation.setInit();
//   clipPathAnimation.setInit();
// } else if (scrollProgress >= 0.25 && scrollProgress < 0.5) {
//   scrollProgress = (scrollProgress - 0.25) * 4;

//   secondLineAnimation.startAnimation({
//     opacity: 1 * scrollProgress,
//     translateY: `${100 - 100 * scrollProgress}px`,
//   });

//   lastLineAnimation.setInit();
//   firstLineAnimation.setDefault();
//   clipPathAnimation.setInit();
// } else if (scrollProgress >= 0.5 && scrollProgress < 0.75) {
//   scrollProgress = (scrollProgress - 0.5) * 4;

//   lastLineAnimation.startAnimation({
//     opacity: 1 * scrollProgress,
//     translateY: `${100 - 100 * scrollProgress}px`,
//   });

//   secondLineAnimation.setDefault();
//   firstLineAnimation.setDefault();
//   clipPathAnimation.setInit();
// } else if (scrollProgress > 0.75) {
//   scrollProgress = (scrollProgress - 0.75) * 4;

//   clipPathAnimation.startAnimation({
//     duration: 0,
//     ease: "linear",
//     clipPath: `inset(${100 - scrollProgress * 100}% 0px 0px)`,
//   });

//   firstLineAnimation.setDefault();
//   secondLineAnimation.setDefault();
//   lastLineAnimation.setDefault();
// }
