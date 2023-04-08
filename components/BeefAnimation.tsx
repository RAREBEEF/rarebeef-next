import classNames from "classnames";
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import styles from "./BeefAnimation.module.scss";
import NextImage from "next/image";
import arrowIcon from "../public/icons/angle-left-solid.svg";
import Link from "next/link";
import Cube from "./Cube";
import altImage from "../public/animation/beef_animation_0120.jpg";
import Button from "./Button";

const BeefAnimation = () => {
  const [init, setInit] = useState<boolean>(false);
  const [cubeUnmaount, setCubeUnmount] = useState<boolean>(false);
  const [canISkip, setCanISkip] = useState<boolean>(false);
  const [skipAnimation, setSkipAnimation] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [showScrollGuide, setShowScrollGuide] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const MAX_FRAME = 120; // 사실 시작은 0부터라 120까지 총 121 프레임
  const curFrame = useCallback(
    (index: number) =>
      `/animation/beef_animation_${index.toString().padStart(4, "0")}.jpg`,
    []
  );

  // 모든 이미지가 준비되었는지 체크
  useEffect(() => {
    const allImgs: Array<HTMLImageElement> = [];
    let waitingForLoad: Array<HTMLImageElement> = [];
    let isAllReady = false;
    let isQueueEnd = false;
    let isTimerEnd = false;

    const executeWhenReady = () => {
      console.log("All frames are ready.");
      clearTimeout(youCanSkip);
      setInit(true);
      setTimeout(() => setCubeUnmount(true), 700);
    };

    // 최소 로딩 시간 2초
    setTimeout(() => {
      isTimerEnd = true;
      isAllReady && executeWhenReady();
    }, 2000);

    // 이미지 불러오기
    for (let i = 0; i <= MAX_FRAME; i++) {
      const img = new Image();
      img.src = curFrame(i);
      allImgs.push(img);
    }

    /**
     * 모든 이미지의 로드 여부를 1회씩 체크
     * 아직 로드되지 않은 이미지는 waitingForLoad에 등록
     * 큐가 완료되었을 때 로드되지 않은 이미지가 없다면 모든 로딩 프로세스 종료
     * */
    const imgLoadCheckQueue = (imgs: Array<HTMLImageElement>) => {
      if (skipAnimation) return;

      // 모든 큐 완료
      if (!imgs || imgs.length === 0) {
        console.log("Queue completed. Waiting for all frames to ready.");
        isQueueEnd = true;

        // 모든 이미지 로드 완료 여부
        if (!waitingForLoad || waitingForLoad.length === 0) {
          isTimerEnd && executeWhenReady();
          isAllReady = true;
        }

        return;
      }

      const current = imgs[0];

      // 로드 완료/미완료 이미지 구분
      if (current.complete) {
        console.log(
          "Frame " + current.src.match(/[0-9]{4}(?=.jpg$)/i) + " is ready."
        );
      } else {
        waitingForLoad.push(current);

        current.onload = () => {
          console.log(
            "Frame " + current.src.match(/[0-9]{4}(?=.jpg$)/i) + " is ready."
          );
          checkNotLoadedImgs(waitingForLoad);
        };
      }

      // 다음 큐
      imgs.shift();
      imgLoadCheckQueue(imgs);
    };

    imgLoadCheckQueue(allImgs);

    /**
     * 로드가 왼료되지 않았던 이미지들의 완료 여부 체크
     * */
    const checkNotLoadedImgs = (imgs: Array<HTMLImageElement>) => {
      if (!imgs || imgs.length === 0 || isAllReady || skipAnimation) {
        return;
      }

      const notLoaded = waitingForLoad.filter((img) => !img.complete);

      if (notLoaded.length === 0 && isQueueEnd) {
        isTimerEnd && executeWhenReady();
        isAllReady = true;

        return;
      }

      waitingForLoad = notLoaded;
    };

    // 스킵 버튼 출력하기
    const youCanSkip = setTimeout(() => {
      setCanISkip(true);
    }, 5000);
  }, [curFrame, skipAnimation]);

  // 스크롤에 맞춰 캔버스에 이미지 렌더링
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !init || skipAnimation)
      return;

    const cvs = canvasRef.current;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const container = containerRef.current;
    cvs.width = 768;
    cvs.height = 672;

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
        Math.abs(container.getBoundingClientRect().top) /
        (container.clientHeight - window.innerHeight);

      const frame = Math.ceil(scrollProgress * MAX_FRAME);

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
  }, [curFrame, init, skipAnimation]);

  // 애니메이션 스킵
  const skip = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSkipAnimation(true);
    setInit(true);
    setShowScrollGuide(false);
    setShowBtn(true);
    setTimeout(() => setCubeUnmount(true), 700);
  };

  return (
    <section
      className={classNames(
        styles.container,
        init && styles.init,
        skipAnimation && styles["skiped"]
      )}
      ref={containerRef}
    >
      {!cubeUnmaount && (
        <div
          className={classNames(
            styles.loading,
            init && styles.hidden,
            canISkip && styles["show-skip"]
          )}
        >
          <Cube />
          <p>Loading</p>
          <Button onClick={skip} text="인트로 스킵하기" />
        </div>
      )}
      <div className={styles["alt-image-wrapper"]}>
        <NextImage
          src={altImage}
          alt="RAREBEEF's portfolio"
          fill={true}
          objectFit="contain"
        />
      </div>
      {!skipAnimation && (
        <div ref={wrapperRef} className={styles["canvas-wrapper"]}>
          <canvas className={styles.canvas} ref={canvasRef} />
        </div>
      )}
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
