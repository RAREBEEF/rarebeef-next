import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./Flashlight.module.scss";
import Button from "./Button";
import Link from "next/link";
import NextImage from "next/image";

const Flashlight = () => {
  const cvsRef = useRef<HTMLCanvasElement>(null);
  const [cvs, setCvs] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [cvsSize, setCvsSize] = useState<[number, number]>([0, 0]);
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);
  const isReady = useMemo(() => !!cvs && !!ctx, [cvs, ctx]);
  const animationFrameId = useRef<number | null>(null);

  // 캔버스와 컨텍스트, 커서 없애기
  useEffect(() => {
    if (cvsRef.current) {
      setCvs(cvsRef.current);
      setCtx(cvsRef.current.getContext("2d"));
    }

    // document.body.style.cursor = "none";

    // return () => {
    //   document.body.style.cursor = "auto";
    // };
  }, []);

  // 윈도우 리사이즈
  useEffect(() => {
    if (!isReady) return;

    const cvsSizing = () => {
      const { innerWidth: width, innerHeight: height } = window;
      setCvsSize([width, height]);
      if (cvs) {
        cvs.width = width;
        cvs.height = height;
      }
    };

    cvsSizing();

    window.addEventListener("resize", cvsSizing);

    return () => {
      window.removeEventListener("resize", cvsSizing);
    };
  }, [cvs, isReady]);

  // 마우스 & 터치 무브
  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    setMousePos([clientX, clientY]);
  };
  const onTouchMove = (e: TouchEvent<HTMLElement>) => {
    const { clientX, clientY } = e.touches[0];
    setMousePos([clientX, clientY]);
  };

  // 그리기
  const draw = useCallback(
    ({
      ctx,
      mousePos,
      cvsSize,
    }: {
      ctx: CanvasRenderingContext2D;
      mousePos: [number, number];
      cvsSize: [number, number];
    }) => {
      const [mouseX, mouseY] = mousePos;
      const [cvsWidth, cvsHeight] = cvsSize;
      const drawCommands: Array<(ctx: CanvasRenderingContext2D) => void> = [];

      drawCommands.push((ctx: CanvasRenderingContext2D) => {
        const vmax = Math.max(...cvsSize);
        const img = new Image();
        img.src = `/images/flashlight.svg`;

        // 캔버스 중앙과 마우스x 사이 거리
        const deltaFromCenterX = cvsWidth / 2 - mouseX;
        // 캔버스 바닥과 마우스y 사이 거리
        const deltaFromBottomY = cvsHeight - mouseY;
        // // deltaFromBottomY 정규화
        const normalizedDeltaY = deltaFromBottomY / cvsHeight;

        // 플래시라이트 이미지 너비
        const width = vmax * 5;
        // 플래시라이트 이미지 높이, normalizedDeltaY에 따라 가변.
        const height = vmax * 5 + vmax * normalizedDeltaY * 5;
        // 각도 계산, deltaFromCenterX에 따라 가변.
        const angle =
          -Math.atan2(mouseY - cvsHeight * 1.5, deltaFromCenterX) +
          (-90 * Math.PI) / 180;

        // 계산한 각도로 컨텍스트 회전
        ctx.rotate(angle);

        // 회전된 좌표계 내에서 마우스 위치 계산
        const rotatedMouseX =
          mouseX * Math.cos(angle) + mouseY * Math.sin(angle);
        const rotatedMouseY =
          -mouseX * Math.sin(angle) + mouseY * Math.cos(angle);

        ctx.drawImage(
          img,
          rotatedMouseX - width / 2,
          rotatedMouseY - height / 2,
          width,
          height
        );

        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });

      drawCommands.unshift((ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, cvsWidth, cvsHeight);
      });

      for (let i = 0; i < drawCommands.length; i++) {
        const command = drawCommands[i];
        command(ctx);
      }
    },
    []
  );

  const updateFrame = useCallback(() => {
    animationFrameId.current = requestAnimationFrame(() => {
      draw({
        ctx: ctx as CanvasRenderingContext2D,
        mousePos,
        cvsSize,
      });

      updateFrame();
    });
  }, [ctx, cvsSize, draw, mousePos]);

  // 그리기 실행
  useEffect(() => {
    if (!isReady) return;

    updateFrame();

    return () => {
      animationFrameId.current &&
        cancelAnimationFrame(animationFrameId.current);
    };
  }, [ctx, cvsSize, draw, isReady, mousePos, updateFrame]);

  return (
    <section
      className={styles["container"]}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* <button className={styles["projects-btn"]}>
        <NextImage
          src="/logos/beef.svg"
          width={cvsSize[0] / 5}
          height={cvsSize[0] / 5}
          alt="RAREBEEF"
        ></NextImage>
      </button> */}
      <canvas ref={cvsRef} className={styles["canvas"]}></canvas>
    </section>
  );
};

export default Flashlight;
