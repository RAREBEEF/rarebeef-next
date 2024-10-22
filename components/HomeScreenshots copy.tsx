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

  useEffect(() => {
    if (!entered) return;

    const wrappers = document.querySelectorAll("." + styles["img-wrapper"]);

    wrappers.forEach((wrapper, i) => {
      const imageFromTop = wrapper.getBoundingClientRect().top;

      gsap.to(wrapper.children[0], {
        transform: `translateX(-50%) translateY(${
          -50 - ((imageFromTop / window.innerHeight) * 50 - 25)
        }%) scale(1.2)`,
      });
    });
  }, [entered, scrollProgress]);

  return (
    <div className={styles.container}>
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
        className={classNames(styles["img-wrapper"], "wrapper-slow")}
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
        className={classNames(styles["img-wrapper"], "wrapper-slow")}
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
      {/*  */}
      {/*  */}
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
  );
};

export default HomeScreenshots;
