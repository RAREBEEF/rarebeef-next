import NextImage from "next/image";
import styles from "./HomeScreenshots.module.scss";
import screenshot0 from "../public/screenshots/intro-project0.png";
import screenshot10 from "../public/screenshots/intro-project10.png";
import screenshot1 from "../public/screenshots/intro-project1.png";
import screenshot2 from "../public/screenshots/intro-project2.png";
import screenshot3 from "../public/screenshots/intro-project3.png";
import screenshot4 from "../public/screenshots/intro-project4.png";
import screenshot5 from "../public/screenshots/intro-project5.png";
import screenshot6 from "../public/screenshots/intro-project6.png";
import screenshot7 from "../public/screenshots/intro-project7.png";
import screenshot8 from "../public/screenshots/intro-project8.png";
import screenshot9 from "../public/screenshots/intro-project9.png";
import { MouseEvent, useEffect, useState } from "react";
import gsap from "gsap";
import classNames from "classnames";
import Link from "next/link";

const HomeScreenshots = ({
  scrollProgress,
  entered,
}: {
  scrollProgress: number;
  entered: boolean;
}) => {
  const [viewportSize, setViewportSize] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const [slideGsaps, setSlideGsaps] = useState<Array<gsap.core.Tween>>([]);
  const [mouseOverRow, setMouseOverRow] = useState<null | number>(null);

  // 뷰포트 너비 변경 감지
  useEffect(() => {
    setViewportSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    });

    return () => {
      window.removeEventListener("resize", () => {
        setViewportSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      });
    };
  }, []);

  // 이미지 마우스 반응 애니메이션
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!entered) return;

    const imageFromTop = e.currentTarget.getBoundingClientRect().top;

    const mouseXFromCenter =
      (e.clientX -
        e.currentTarget.getBoundingClientRect().left -
        e.currentTarget.clientWidth / 2) /
      (e.currentTarget.clientWidth / 2);
    const mouseYFromCenter =
      (e.clientY -
        e.currentTarget.getBoundingClientRect().top -
        e.currentTarget.clientHeight / 2) /
      (e.currentTarget.clientHeight / 2);

    const moveX = -mouseXFromCenter * 2;
    const moveY = -mouseYFromCenter * 2;

    gsap.to(e.currentTarget.childNodes[0], {
      transform: `translateX(${-50 + moveX}%) translateY(${
        -50 - ((imageFromTop / window.innerHeight) * 50 - 25 - moveY)
      }%) scale(1.2)`,
    });
  };

  // 스크롤 시 이미지 애니메이션
  useEffect(() => {
    if (!entered) return;

    const wrappers = document.querySelectorAll("." + styles["img-wrapper"]);

    wrappers.forEach((wrapper) => {
      const imageFromTop = wrapper.getBoundingClientRect().top;

      gsap.to(wrapper.children[0], {
        transform: `translateX(-50%) translateY(${
          -50 - ((imageFromTop / viewportSize.height) * 50 - 25)
        }%) scale(1.2)`,
      });
    });
  }, [entered, scrollProgress, viewportSize.height]);

  // 슬라이드 계산 및 애니메이션
  useEffect(() => {
    const rows = document.querySelectorAll(`.${styles.row}`);

    rows.forEach((row, i) => {
      const slidePageWidth = row.getBoundingClientRect().width;
      const padding = viewportSize.width * 0.05;
      const itemWidth = row.children[0].getBoundingClientRect().width;

      const items = Array.from(row.children);
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        item.addEventListener("mouseenter", () => {
          setMouseOverRow(i);
        });
        item.addEventListener("mouseleave", () => {
          setMouseOverRow(null);
        });
        clone.addEventListener("mouseenter", () => {
          setMouseOverRow(i);
        });
        clone.addEventListener("mouseleave", () => {
          setMouseOverRow(null);
        });
        row.appendChild(clone);
      });

      const slide = gsap.fromTo(
        row,
        {
          translateX:
            i % 2 === 0
              ? `${(-i * (itemWidth + padding)) / 2 - slidePageWidth}px`
              : `${(-i * (itemWidth + padding)) / 2}px`,
          duration: 20,
          ease: "linear",
          repeat: -1,
        },
        {
          // 64 -> padding
          translateX:
            i % 2 === 0
              ? `${(-i * (itemWidth + padding)) / 2 + padding}`
              : `${
                  (-i * (itemWidth + padding)) / 2 - slidePageWidth - padding
                }`,
          duration: 20,
          ease: "linear",
          repeat: -1,
        }
      );

      // const slide = gsap.fromTo(
      //   row,
      //   {
      //     translateX: `${(-i * (itemWidth + padding)) / 2}px`,
      //     duration: 10,
      //     ease: "linear",
      //     repeat: -1,
      //   },
      //   {
      //     // 64 -> padding
      //     translateX: `${
      //       (-i * (itemWidth + padding)) / 2 - slidePageWidth - padding
      //     }`,
      //     duration: 10,
      //     ease: "linear",
      //     repeat: -1,
      //   }
      // );

      setSlideGsaps((prev) => {
        const newSlideGsaps = prev;
        prev[i] = slide;
        return newSlideGsaps;
      });
    });

    return () => {
      rows.forEach((row) => {
        const children = row.children;
        Array.from(children)
          .slice(-4)
          .forEach((child) => child.remove());
      });
    };
  }, [viewportSize.width]);

  // 슬라이드 타임스케일
  useEffect(() => {
    if (mouseOverRow !== null) {
      slideGsaps[mouseOverRow].timeScale(0.2);
      // slideGsaps[mouseOverRow].reversed(true);
    } else {
      slideGsaps.forEach((gsap) => {
        gsap.timeScale(1);
        // gsap.reversed(false);
      });
    }
  }, [mouseOverRow, slideGsaps]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot0}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot2}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot4}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot6}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div className={styles.row}>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot1}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot3}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot5}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot7}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
      </div>
      <div className={styles.row}>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot1}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot3}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot5}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
        <div
          onMouseMove={onMouseMove}
          className={classNames(styles["img-wrapper"])}
        >
          <NextImage
            className={classNames("inner-screenshot")}
            src={screenshot7}
            alt="project screenshot"
          />
          <Link
            className={styles["btn--visit"]}
            href="https://folio-jpeg.rarebeef.co.kr"
            target="_blank"
          >
            Visit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeScreenshots;
