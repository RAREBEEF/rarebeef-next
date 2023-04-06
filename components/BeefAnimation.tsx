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
  const [imgElements, setImgElements] = useState<Array<JSX.Element>>([]);
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
    const curFrame = (index: number) =>
      `/animation/beef_animation_${index.toString().padStart(4, "0")}.jpg`;
    cvs.width = 768;
    cvs.height = 672;

    const imgs: Array<JSX.Element> = [];

    const preload = () => {
      let isTimerEnd = false;
      let isLoadEnd = false;

      const executeWhenReady = () => {
        setInit(true);
        setTimeout(() => setCubeUnmount(true), 700);
      };

      setTimeout(() => {
        isTimerEnd = true;
        isLoadEnd && executeWhenReady();
      }, 2000);

      for (let i = 0; i <= maxFrame; i++) {
        const nextImg = <img key={i} src={curFrame(i)} alt="RAREBEEF" />;
        imgs.push(nextImg);
      }

      setImgElements(imgs);

      const relayLoadCheck = (i: number) => {
        if (i > maxFrame) {
          console.log("all frames are ready");
          isLoadEnd = true;
          isTimerEnd && executeWhenReady();
          return;
        }

        const img = new Image();
        img.src = imgs[i].props.src;

        if (img.complete) {
          console.log(`frame ${i} ready`);
          relayLoadCheck(i + 1);
        } else {
          img.onload = () => {
            console.log(`frame ${i} ready`);
            relayLoadCheck(i + 1);
          };
        }
      };

      relayLoadCheck(0);
    };

    preload();

    const img = new Image();

    img.src = imgs[0].props.src;

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
    };

    const update = (i: number) => {
      img.src = imgs[i].props.src;
      ctx.drawImage(img, 0, 0);
    };

    const renderCurrentImage = (e?: Event) => {
      const scrollProgress = Math.abs(
        container.getBoundingClientRect().top /
          (container.clientHeight - window.innerHeight)
      );

      if (scrollProgress > 1) return;

      const frame = Math.ceil(scrollProgress * maxFrame) || 0;

      requestAnimationFrame(() => update(frame));

      if (scrollProgress > 0.1) {
        setShowScrollGuide(false);
      } else {
        setShowScrollGuide(true);
      }

      if (!(e instanceof Event) || scrollProgress < 0.8) {
        setShowBtn(false);
      } else {
        setShowBtn(true);
      }
    };

    renderCurrentImage();

    window.addEventListener("scroll", (e) => renderCurrentImage(e));

    return () => {
      window.removeEventListener("scroll", (e) => renderCurrentImage(e));
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
        </div>
      )}
      <div ref={wrapperRef} className={styles.wrapper}>
        <canvas className={styles.canvas} ref={canvasRef} />
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
      <div className={styles.preload}>
        {imgElements}
      </div>
    </section>
  );
};

export default BeefAnimation;

// import classNames from "classnames";
// import { useEffect, useRef, useState } from "react";
// import styles from "./BeefAnimation.module.scss";
// import NextImage from "next/image";
// import arrowIcon from "../public/icons/angle-left-solid.svg";
// import Link from "next/link";
// import Cube from "./Cube";
// import Image from "next/image";

// const BeefAnimation = () => {
//   const [init, setInit] = useState<boolean>(false);
//   const [cubeUnmaount, setCubeUnmount] = useState<boolean>(false);
//   const [showBtn, setShowBtn] = useState<boolean>(false);
//   const [showScrollGuide, setShowScrollGuide] = useState<boolean>(true);
//   const [imgs, setImgs] = useState<Array<JSX.Element> | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const maxFrame = 120;

//   // 이미지 로딩 체크
//   useEffect(() => {
//     if (!imgs) return;

//     const executeWhenReady = () => {
//       setInit(true);
//       setTimeout(() => {
//         setCubeUnmount(true);
//       }, 700);
//     };

//     // 이미 로드된 경우
//     if (imgs[120].complete) {
//       executeWhenReady();
//       // 최초 로드일 경우
//     } else {
//       let isLoadEnd = false;
//       let isTimerEnd = false;

//       // 최소 로딩 시간(2초)
//       setTimeout(() => {
//         isTimerEnd = true;
//         isLoadEnd && executeWhenReady();
//       }, 2000);

//       // 이미지 로드 체크
//       imgs[120].onload = () => {
//         isLoadEnd = true;
//         isTimerEnd && executeWhenReady();
//       };
//     }
//   }, [imgs]);

//   // 이미지 로드
//   useEffect(() => {
//     const curFrame = (index: number) =>
//       `/animation/beef_animation_${index.toString().padStart(4, "0")}.jpg`;

//     const preloadImgs: Array<JSX.Element> = [];

//     for (let i = 0; i <= maxFrame; i++) {
//       // const img = new Image();
//       // img.src = curFrame(i);
//       const img = <Image src={curFrame(i)} alt={`RAREBEEF animation frame ${i}`} />
//       preloadImgs.push(img);
//     }

//     setImgs(preloadImgs);
//   }, []);

//   // 렌더
//   useEffect(() => {
//     if (!containerRef.current || !canvasRef.current || !imgs) return;

//     const cvs = canvasRef.current;
//     const ctx = cvs.getContext("2d");

//     if (!ctx) return;

//     const container = containerRef.current;

//     cvs.width = 768;
//     cvs.height = 672;

//     // 사진 교체
//     const update = (i: number) => {
//       const img = imgs[i];
//       ctx.drawImage(img, 0, 0);
//     };

//     const renderCurImg = (e?: Event) => {
//       const scrollProgress = Math.abs(
//         container.getBoundingClientRect().top /
//           (container.clientHeight - window.innerHeight)
//       );

//       const frame = Math.ceil(scrollProgress * maxFrame) || 0;

//       requestAnimationFrame(() => update(frame));

//       if (scrollProgress > 0.1) {
//         setShowScrollGuide(false);
//       } else {
//         setShowScrollGuide(true);
//       }

//       if (!(e instanceof Event) || scrollProgress < 0.8) {
//         setShowBtn(false);
//       } else {
//         setShowBtn(true);
//       }
//     };

//     renderCurImg();

//     window.addEventListener("scroll", (e) => renderCurImg(e));

//     return () => {
//       window.removeEventListener("scroll", (e) => renderCurImg(e));
//     };
//   }, [imgs]);

//   return (
//     <section
//       className={classNames(styles.container, init && styles.init)}
//       ref={containerRef}
//     >
//       {!cubeUnmaount && (
//         <div className={classNames(styles.loading, init && styles.hidden)}>
//           <Cube />
//         </div>
//       )}
//       <div ref={wrapperRef} className={styles.wrapper}>
//         <canvas className={styles.canvas} ref={canvasRef} />
//       </div>

//       <nav
//         className={classNames(
//           styles["to-projects-wrapper"],
//           showBtn && styles.show
//         )}
//       >
//         <Link href="/projects" className={styles["to-projects"]}>
//           Link to project list
//         </Link>
//       </nav>

//       <div
//         className={classNames(
//           styles["scroll-guide"],
//           showScrollGuide && styles.show
//         )}
//       >
//         <NextImage
//           src={arrowIcon}
//           width={50}
//           height={50}
//           priority
//           alt="Scroll down"
//         />
//       </div>
//       <div>{imgs?.map((img) =>)}</div>
//     </section>
//   );
// };

// export default BeefAnimation;
