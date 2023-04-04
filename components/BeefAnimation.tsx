import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import styles from "./BeefAnimation.module.scss";
import NextImage from "next/image";

import arrowIcon from "../public/icons/angle-left-solid.svg";
import Link from "next/link";
import Cube from "./Cube";

const BeefAnimation = () => {
  const [init, setInit] = useState<boolean>(false);
  const [cubeUnmaount, setCubeUnmount] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [showScrollGuide, setShowScrollGuide] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const cvs = canvasRef.current;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const container = containerRef.current;
    const maxFrame = 120;
    cvs.width = 768;
    cvs.height = 672;

    const curFrame = (index: number) =>
      `/animation/beef_animation_${index.toString().padStart(4, "0")}.jpg`;

    const preload = () => {
      let isTimeout = false;
      let loadEnd = false;

      setTimeout(() => {
        isTimeout = true;
        if (loadEnd) {
          setInit(true);
          setTimeout(() => setCubeUnmount(true), 700);
        }
      }, 2000);

      for (let i = 1; i < maxFrame; i++) {
        const img = new Image();
        img.src = curFrame(i);
      }

      loadEnd = true;

      if (isTimeout) {
        setInit(true);
        setTimeout(() => setCubeUnmount(true), 700);
      }
    };

    preload();

    const img = new Image();

    img.src = curFrame(0);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };

    const update = (i: number) => {
      img.src = curFrame(i);
      ctx.drawImage(img, 0, 0);
    };

    const windowScrollHandler = () => {
      const scrollProgress =
        -container.getBoundingClientRect().top /
        (container.clientHeight - window.innerHeight);

      if (scrollProgress > 1) return;

      const frame = Math.ceil(scrollProgress * maxFrame);

      requestAnimationFrame(() => update(frame));

      if (scrollProgress > 0.1) {
        setShowScrollGuide(false);
      } else {
        setShowScrollGuide(true);
      }

      if (scrollProgress < 0.8) {
        setShowBtn(false);
      } else {
        setShowBtn(true);
      }
    };

    window.addEventListener("scroll", windowScrollHandler);

    return () => {
      window.removeEventListener("scroll", windowScrollHandler);
    };
  }, []);

  return (
    <section
      className={classNames(styles.container, init && styles.init)}
      ref={containerRef}
    >
      {!cubeUnmaount && (
        <div className={classNames(styles.loading, init && styles.hidden)}>
          <Cube />
          <p>Loading</p>
        </div>
      )}
      <div ref={wrapperRef} className={styles.wrapper}>
        <canvas
          className={styles.canvas}
          ref={canvasRef}
          style={{ cursor: showBtn ? "pointer" : "default" }}
          onClick={() =>
            showBtn &&
            window.open(
              "https://velog.io/@drrobot409/Blender-3D-%EB%A1%9C%EA%B3%A0-%EC%A0%9C%EC%9E%91",
              "_blank"
            )
          }
        />
      </div>

      <nav
        className={classNames(
          styles["to-projects-wrapper"],
          showBtn && styles.show
        )}
      >
        <Link href="/projects" className={styles["to-projects"]}>
          Link to project list
        </Link>
      </nav>

      <div
        className={classNames(
          styles["scroll-guide"],
          showScrollGuide && styles.show
        )}
      >
        <NextImage
          src={arrowIcon}
          width={50}
          height={50}
          priority
          alt="Scroll down"
        />
      </div>
    </section>
  );
};

export default BeefAnimation;
