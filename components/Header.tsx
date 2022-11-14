import { ReactElement, useEffect, useRef } from "react";
import styles from "./Header.module.scss";
import { FrontPropType } from "../types";
import gsap from "gsap";
import useCalcScroll from "../hooks/useCalcScroll";
import _ from "lodash";

const Header: React.FC<FrontPropType> = (): ReactElement => {
  const animationTargetsRef = useRef<Array<any>>([]);
  const firstLinesRef = useRef<Array<any>>([]);
  const lastLinesRef = useRef<Array<any>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const calcScroll = useCalcScroll();

  useEffect(() => {
    if (
      !animationTargetsRef.current ||
      !containerRef.current ||
      !firstLinesRef.current ||
      !lastLinesRef.current
    )
      return;

    const targets = animationTargetsRef.current;
    const firstLines = firstLinesRef.current;
    const lastLines = lastLinesRef.current;

    const windowScrollListener = (e: Event) => {
      e.preventDefault();

      // 스크롤 진행도, 100% = 1, 0% = 0, 한계점 x
      let scrollProgress = calcScroll(containerRef);

      // 진행도에 따른 x축, clip-path, 스케일 애니메이션 처리
      if (scrollProgress >= 1) {
        // 진행도 1 이상
        // x축, clip-path 기본값
        targets[1].style.clipPath = "inset(-100% 0px 0px)";
        firstLines.forEach((line) => {
          line.style.transform = "translateX(0)";
        });
        lastLines.forEach((line) => {
          line.style.transform = "translateX(0)";
        });
      } else if (scrollProgress < 0) {
        // 진행도 0 미만
        // x축 & clip-path 초기값
        // 스케일 애니메이션 실행
        targets[1].style.clipPath = "inset(100% 0px 0px)";
        firstLines.forEach((line) => {
          line.style.transform = "translateX(-26.5px)";
        });
        lastLines.forEach((line) => {
          line.style.transform = "translateX(42.5px)";
        });
        scrollProgress = scrollProgress * scrollProgress * scrollProgress;
        targets.forEach((target) => {
          gsap.to(target, {
            duration: 0,
            scale: -scrollProgress * 20 + 1,
          });
        });
      } else {
        // 진행도 1 미만 0 이상
        // 스케일 기본값
        // x축 & clip-path 애니메이션 실행
        targets.forEach((target) => {
          target.style.transform = "scale(1)";
        });
        gsap.to(targets[1], {
          duration: 0,
          clipPath: `inset(${100 - scrollProgress * 100}% 0px 0px)`,
          ease: "linear",
        });
        firstLines.forEach((line) => {
          gsap.to(line, {
            translateX: `${
              scrollProgress < 0 ? -26.5 : -26.5 + 26.5 * scrollProgress
            }`,
          });
        });
        lastLines.forEach((line) => {
          gsap.to(line, {
            translateX: `${
              scrollProgress < 0 ? 42.5 : 42.5 - 42.5 * scrollProgress
            }`,
          });
        });
      }
    };

    window.addEventListener("scroll", windowScrollListener);

    return () => {
      window.removeEventListener("scroll", windowScrollListener);
    };
  }, [calcScroll, containerRef]);

  return (
    <header ref={containerRef} className={styles.container}>
      <div />
      <div className={styles.content}>
        <div
          ref={(el) => (animationTargetsRef.current[0] = el)}
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
          ref={(el) => (animationTargetsRef.current[1] = el)}
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
