import {
  MouseEvent,
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./interactive.module.scss";
import _ from "lodash";
import Seo from "../../components/Seo";
import img from "../../public/screenshots/interactive.png";

interface Dot {
  x: number;
  y: number;
  originX: number;
  originY: number;
  radius: number;
  startAngle: number;
  endAngle: number;
  color: string;
  active: boolean;
}

interface Area {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
}

const Interactive = () => {
  const cvsRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [cvs, setCvs] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [dots, setDots] = useState<Array<Dot>>([]);
  const [cvsSize, setCvsSize] = useState<[number, number]>([0, 0]);
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);

  const isReady = useMemo(
    () => !!cvs && !!ctx && !!container,
    [cvs, ctx, container]
  );

  const SPEED = 1;
  const AREA_DIVIDE = 10;
  const AREA_GAP = 20;
  const DOT_COLOR = "#5e5e5e";
  const NEAR_DOT_COLOR = "#14FFEC";
  const MOUSE_RANGE = useMemo(
    () => (Math.max(...cvsSize) / AREA_DIVIDE) * 1,
    [cvsSize]
  );

  // 컨테이너와 캔버스 체크 & 상태 저장
  useEffect(() => {
    if (!containerRef.current || !cvsRef.current) return;
    setContainer(containerRef.current);
    setCvs(cvsRef.current);
    setCtx(cvsRef.current.getContext("2d"));
  }, [containerRef, cvsRef]);

  // 최초 및 리사이즈 시 렌더링
  const createDots = useCallback(
    (width: number, height: number) => {
      if (!isReady) return;

      const dots: Array<Dot> = [];

      // 캔버스 사이즈 지정
      cvs!.width = width;
      cvs!.height = height;

      // 영역 구분
      const areas: Array<Area> = [];
      const areaWidth = (width - AREA_GAP * (AREA_DIVIDE - 1)) / AREA_DIVIDE;
      const areaHeight = (height - AREA_GAP * (AREA_DIVIDE - 1)) / AREA_DIVIDE;

      for (let i = 1; i <= AREA_DIVIDE; i++) {
        const startY = (areaHeight + AREA_GAP) * (i - 1);
        const endY = startY + areaHeight;

        for (let j = 1; j <= AREA_DIVIDE; j++) {
          const startX = (areaWidth + AREA_GAP) * (j - 1);
          const endX = startX + areaWidth;

          areas.push({ startX, startY, endX, endY });
        }
      }

      // 각 영역당 하나씩 랜덤의 위치에 점 생성
      for (const area of areas) {
        const { startX, endX, startY, endY } = area;
        const x = Math.floor(Math.random() * (endX - startX) + startX);
        const y = Math.floor(Math.random() * (endY - startY) + startY);

        const dot = {
          x,
          y,
          targetX: null,
          targetY: null,
          originX: x,
          originY: y,
          radius: 5,
          startAngle: 0,
          endAngle: Math.PI * 2,
          color: DOT_COLOR,
          active: false,
        };

        dots.push(dot);
      }

      setDots(dots);
    },
    [isReady, cvs]
  );

  // 컨테이너 리사이즈 감시
  const resizeObserver = useMemo(() => {
    if (typeof window === "undefined") return null;

    return new window.ResizeObserver(
      _.debounce((entries) => {
        for (const entry of entries) {
          const { inlineSize: width, blockSize: height } =
            entry.borderBoxSize[0];
          setCvsSize([width, height]);
          createDots(width, height);
        }
      }, 100)
    );
  }, [createDots]);

  useEffect(() => {
    if (!isReady || !resizeObserver) return;

    resizeObserver.observe(container as HTMLElement);

    return () => {
      resizeObserver.unobserve(container as HTMLElement);
    };
  }, [container, isReady, resizeObserver]);

  // 마우스 움직임
  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();

    const mousePos: [number, number] = [
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY,
    ];

    setMousePos(mousePos);
  };
  // 드래그
  const onTouchMove = (e: TouchEvent<HTMLCanvasElement>) => {
    e.stopPropagation();

    const mousePos: [number, number] = [
      e.touches[0].clientX,
      e.touches[0].clientY,
    ];

    setMousePos(mousePos);
  };

  useEffect(() => {
    if (!isReady) return;

    const [mouseX, mouseY] = mousePos;

    // 마우스와 점들의 거리 계산
    const updateDots = () => {
      setDots((prev) => {
        const newDots: Array<Dot> = [];

        for (const dot of prev) {
          let speed = SPEED;
          const { x: dotX, originX, y: dotY, originY } = dot;
          const mouseDeltaX = mouseX - originX;
          const mouseDeltaY = mouseY - originY;
          const mouseDistance = Math.sqrt(mouseDeltaX ** 2 + mouseDeltaY ** 2);
          const active = mouseDistance <= MOUSE_RANGE ? true : false;
          let x, y, targetX, targetY: number;

          if (active) {
            targetX = mouseX - mouseDeltaX * 0.9;
            targetY = mouseY - mouseDeltaY * 0.9;
          } else {
            targetX = originX;
            targetY = originY;
            speed /= 10;
          }

          const deltaX = targetX - dotX; // 현재 x와 타겟 x의 거리
          const deltaY = targetY - dotY; // 현재 y와 타겟 y의 거리
          // 현재 점과 타겟 점 사이의 거리(유클리드 거리 공식)
          const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

          if (distance > speed) {
            // 핸재 점(foot[x, y])에서 타겟 점(nearDot[x, y])을 바라보는 라디안 각도
            const angle = Math.atan2(deltaY, deltaX);
            // 속도와 각도를 통해 각 방향의 속력 구하기
            const velocityX = speed * Math.cos(angle);
            const velocityY = speed * Math.sin(angle);
            // 새로운 x,y 좌표 계산
            x = dotX + velocityX;
            y = dotY + velocityY;
          } else {
            x = targetX;
            y = targetY;
          }

          newDots.push({
            ...dot,
            active,
            color: active ? NEAR_DOT_COLOR : DOT_COLOR,
            x,
            y,
          });
        }

        return newDots;
      });
    };

    // 렌더
    const draw = (dots: Array<Dot>) => {
      ctx!.clearRect(0, 0, cvsSize[0], cvsSize[1]);
      ctx!.lineCap = "round";

      for (const dot of dots) {
        const { x, y, radius, startAngle, endAngle, color, active } = dot;

        if (active) {
          // const sign = Math.floor(Math.random() * 10) + 1 > 5 ? -1 : +1;
          // const controlX = (x + mouseX) / 2 + (randomInt < 5 ? 20 : -20);
          // const controlY = (y + mouseY) / 2 + (randomInt < 5 ? 20 : -20);
          const controlX1 = (2 * x + mouseX) / 3 + 5;
          const controlY1 = (2 * y + mouseY) / 3 - 5;
          const controlX2 = (x + 2 * mouseX) / 3 - 5;
          const controlY2 = (y + 2 * mouseY) / 3 + 5;

          ctx!.beginPath();
          ctx!.strokeStyle = "rgba(148, 198, 194, 0.5)";
          ctx!.moveTo(x, y);
          ctx!.lineTo(controlX1, controlY1);
          ctx!.lineWidth = 4;
          ctx!.stroke();
          ctx!.beginPath();

          ctx!.beginPath();
          ctx!.moveTo(controlX1, controlY1);
          ctx!.lineTo(controlX2, controlY2);
          ctx!.strokeStyle = "rgba(148, 198, 194, 0.5)";
          ctx!.lineWidth = 4;
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.moveTo(controlX2, controlY2);
          ctx!.lineTo(mouseX, mouseY);
          ctx!.strokeStyle = "rgba(148, 198, 194, 0.5)";
          ctx!.lineWidth = 4;
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.strokeStyle = NEAR_DOT_COLOR;
          ctx!.moveTo(x, y);
          ctx!.lineTo(controlX1, controlY1);
          ctx!.lineWidth = 1;
          ctx!.stroke();
          ctx!.beginPath();

          ctx!.beginPath();
          ctx!.moveTo(controlX1, controlY1);
          ctx!.lineTo(controlX2, controlY2);
          ctx!.strokeStyle = NEAR_DOT_COLOR;
          ctx!.lineWidth = 1;
          ctx!.stroke();

          ctx!.beginPath();
          ctx!.moveTo(controlX2, controlY2);
          ctx!.lineTo(mouseX, mouseY);
          ctx!.strokeStyle = NEAR_DOT_COLOR;
          ctx!.lineWidth = 1;
          ctx!.stroke();

          ctx!.beginPath();
          const gradient = ctx!.createRadialGradient(x, y, 0, x, y, 15);
          gradient.addColorStop(0, NEAR_DOT_COLOR);
          gradient.addColorStop(0.2, NEAR_DOT_COLOR);
          gradient.addColorStop(0.4, "rgba(145, 255, 246, 0.3)");
          gradient.addColorStop(0.6, "rgba(148, 198, 194, 0.3)");
          gradient.addColorStop(1, "rgba(33, 33, 33, 0.1)");
          ctx!.arc(x, y, 15, startAngle, endAngle);
          ctx!.fillStyle = gradient;
          ctx!.fill();
          ctx!.closePath();
        } else {
          ctx!.beginPath();
          ctx!.arc(x, y, radius, startAngle, endAngle);
          ctx!.fillStyle = color;
          ctx!.fill();
          ctx!.closePath();
        }
      }

      ctx!.beginPath();
      const gradient = ctx!.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        Math.max(...cvsSize) * 2
      );
      gradient.addColorStop(0, NEAR_DOT_COLOR);
      gradient.addColorStop(0.005, NEAR_DOT_COLOR);
      gradient.addColorStop(0.02, "rgba(200, 255, 255, 0.5)");
      gradient.addColorStop(0.08, "rgba(49, 63, 62, 0.3)");
      gradient.addColorStop(0.1, "rgba(33, 33, 33)");
      ctx!.arc(mouseX, mouseY, Math.max(...cvsSize) * 2, Math.PI * 2, 0);
      ctx!.fillStyle = gradient;
      ctx!.fill();
      ctx!.closePath();
    };

    const id = requestAnimationFrame(() => {
      console.log("frame");
      updateDots();
      draw(dots);
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, [ctx, cvsSize, dots, isReady, mousePos, MOUSE_RANGE]);

  return (
    <main ref={containerRef} className={styles.container}>
      <Seo
        title="INTERACTIVE"
        description="머리 속에 떠오르는 몇가지 인터렉티브 아이디어를 javascript canvas로 구현해 보았습니다. 최종 버전이 아니며 추가 업데이트를 진행할 예정입니다."
        url={`https://rarebeef.co.kr/projects/interactive`}
        img={img.src}
      />
      <canvas
        className={styles.canvas}
        ref={cvsRef}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
      />
    </main>
  );
};

export default Interactive;
