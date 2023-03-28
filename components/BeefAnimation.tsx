import classNames from "classnames";
import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./BeefAnimation.module.scss";
import gsap, { Power2 } from "gsap";
import { useRouter } from "next/router";
import NextImage from "next/image";

import arrowIcon from "../public/icons/angle-left-solid.svg";
import Link from "next/link";

const BeefAnimation = () => {
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [showScrollGuide, setShowScrollGuide] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
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
      for (let i = 1; i < maxFrame; i++) {
        const img = new Image();
        img.src = curFrame(i);
      }
    };

    const img = new Image();

    img.src = curFrame(0);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };

    const update = (i: number) => {
      img.src = curFrame(i);
      ctx.drawImage(img, 0, 0);
    };

    preload();

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

  // const linkToProjects = (e: MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault();

  //   if (!wrapperRef.current) return;
  //   setShowBtn(false);

  //   const wrapper = wrapperRef.current;
  //   const list = listRef.current;

  //   gsap
  //     .to([wrapper, list], {
  //       duration: 4,
  //       translateY: "-700vh",
  //       ease: Power2.easeIn,
  //     })
  //     .then(() => {
  //       push("/projects");
  //     });
  // };

  return (
    <section className={styles.container} ref={containerRef}>
      <div ref={wrapperRef} className={styles.wrapper}>
        <canvas className={styles.canvas} ref={canvasRef}></canvas>
      </div>

      <nav
        className={classNames(
          styles["to-projects-wrapper"],
          showBtn && styles.show
        )}
      >
        <Link href="/projects" className={styles["to-projects"]}>
          Click to look around
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
