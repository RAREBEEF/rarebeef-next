import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./HuggyWuggy.module.scss";
import _ from "lodash";
import generateId from "../tools/generateId";
import dotSort from "../tools/dotSort";

export interface ENV {
  AREA_DIVIDE: number;
  AREA_GAP: number;
  BODY_COLOR: string;
  FEET_COLOR: string;
  LINE_COLOR: string;
  DOT_COLOR: string;
  BODY_WIDTH: number;
  BODY_HEIGHT: number;
  LIMBS_WIDTH: number;
}

export type Dots = {
  [key in string]: Dot;
};

interface Dot {
  x: number;
  y: number;
  trackingMouse: boolean;
}

interface DotDistance {
  id: string;
  distance: number;
}

export type Feet = [Dot, Dot, Dot, Dot] | null;
export type NearDots = [string, string, string, string] | null;

interface Area {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  width: number;
  height: number;
}

const HuggyWuggy = () => {
  const cvsRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [cvs, setCvs] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [offscreenCvs, setOffscreenCvs] = useState<HTMLCanvasElement | null>(
    null
  );
  const [offscreenCtx, setOffscreenCtx] =
    useState<CanvasRenderingContext2D | null>(null);
  const [dots, setDots] = useState<Dots>({});
  // const [nearDots, setNearDots] = useState<NearDots>(null);
  // const [areas, setAreas] = useState<Array<Area>>([]);
  // const [quadrants, setQuadrants] = useState<Array<Array<DotDistance>>>([]);
  const [feet, setFeet] = useState<[Dot, Dot, Dot, Dot] | null>(null);
  const [bodyPos, setBodyPos] = useState<[number, number]>([0, 0]);
  const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);
  const [cvsSize, setCvsSize] = useState<[number, number]>([10, 10]);
  const isReady = useMemo(
    () => !!cvs && !!ctx && !!container && !!offscreenCvs && !!offscreenCtx,
    [cvs, ctx, container, offscreenCvs, offscreenCtx]
  );

  const ENV = useMemo(() => {
    const areaDivide = 20;
    const bodyWidth = Math.max(...cvsSize) / areaDivide / 3.8;

    return {
      AREA_DIVIDE: areaDivide,
      AREA_GAP: 10,
      BODY_COLOR: "#0d52af",
      FEET_COLOR: "#ffec00",
      LINE_COLOR: "lightgray",
      DOT_COLOR: "rgba(0, 0, 0, 0.2)",
      BODY_WIDTH: bodyWidth,
      BODY_HEIGHT: bodyWidth * 2.3,
      LIMBS_WIDTH: bodyWidth * 0.8,
    };
  }, [cvsSize]);

  const ANIMATION_FRAME_ID = useRef<null | number>(null);

  // 컨테이너와 캔버스 체크 & 상태 저장, 마우스 위치 초기화
  useEffect(() => {
    if (!containerRef.current || !cvsRef.current) return;
    containerRef.current.style.scale = "0.5";
    setContainer(containerRef.current);
    setCvs(cvsRef.current);
    setCtx(cvsRef.current.getContext("2d"));
    const offscreenCanvas = document.createElement("canvas");
    const offscreenContext = offscreenCanvas.getContext("2d");
    setOffscreenCvs(offscreenCanvas);
    setOffscreenCtx(offscreenContext);
  }, [containerRef, cvsRef]);

  // 최초 및 리사이즈 시 영역 구분 및 점 생성
  const createDots = useCallback(
    (cvsWidth: number, cvsHeight: number) => {
      if (!isReady) return;
      const { AREA_GAP, AREA_DIVIDE } = ENV;
      const dots: Dots = {};

      cvs!.width = cvsWidth;
      cvs!.height = cvsHeight;
      offscreenCvs!.width = cvsWidth;
      offscreenCvs!.height = cvsHeight;

      // 영역 구분
      const areas: Array<Area> = [];
      const areaWidth = (cvsWidth - AREA_GAP * AREA_DIVIDE) / AREA_DIVIDE;
      const areaHeight = (cvsHeight - AREA_GAP * AREA_DIVIDE) / AREA_DIVIDE;

      for (let i = 1; i <= AREA_DIVIDE; i++) {
        const startY = AREA_GAP / 2 + (areaHeight + AREA_GAP) * (i - 1);
        const endY = startY + areaHeight;

        for (let j = 1; j <= AREA_DIVIDE; j++) {
          const startX = AREA_GAP / 2 + (areaWidth + AREA_GAP) * (j - 1);
          const endX = startX + areaWidth;

          areas.push({
            startX,
            startY,
            endX,
            endY,
            width: areaWidth,
            height: areaHeight,
          });
        }
      }

      // setAreas(areas);

      // 각 영역당 하나씩 랜덤의 위치에 점 생성
      for (const area of areas) {
        const { startX, endX, startY, endY } = area;
        const x = Math.floor(Math.random() * (endX - startX) + startX);
        const y = Math.floor(Math.random() * (endY - startY) + startY);

        const dot = {
          x,
          y,
          trackingMouse: false,
        };

        dots[generateId()] = dot;
      }

      setDots(dots);
    },
    [isReady, cvs, offscreenCvs] // ENV는 dependency로 등록하지 말 것
  );

  // 컨테이너 리사이즈 감시
  const resizeObserver = useMemo(
    () =>
      new ResizeObserver(
        _.debounce((entries) => {
          for (const entry of entries) {
            const { inlineSize: width, blockSize: height } =
              entry.borderBoxSize[0];
            setCvsSize([width * 2, height * 2]);
            createDots(width * 2, height * 2);
            setMousePos([
              window.innerWidth / 2 - 50 / 2,
              window.innerHeight / 2 - 50 / 2,
            ]);
            setBodyPos([
              window.innerWidth / 2 - 150,
              window.innerHeight / 2 - 100,
            ]);
          }
        }, 100)
      ),
    [createDots]
  );

  useEffect(() => {
    if (!isReady) return;

    resizeObserver.observe(container as HTMLElement);

    return () => {
      resizeObserver.unobserve(container as HTMLElement);
    };
  }, [container, isReady, resizeObserver]);

  // 마우스 무브 핸들러
  const onMouseMove = (e: MouseEvent) => {
    const mousePos: [number, number] = [e.clientX * 2, e.clientY * 2];

    setMousePos(mousePos);
  };

  // 터치 무브 핸들러
  const onTouchMove = (e: TouchEvent) => {
    e.stopPropagation();

    const mousePos: [number, number] = [
      e.touches[0].clientX * 2,
      e.touches[0].clientY * 2,
    ];

    setMousePos(mousePos);
  };

  // 핸들러 등록
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  // 팔다리 위치 계산
  const updateFeet = useCallback(
    ({
      mousePos,
      bodyPos,
      dots,
      // nearDotSetter,
      feetSetter,
      sortFx,
      env,
      bodySetter,
    }: {
      mousePos: [number, number];
      bodyPos: [number, number];
      dots: Dots;
      // nearDotSetter: Dispatch<SetStateAction<NearDots>>;
      feetSetter: Dispatch<SetStateAction<Feet>>;
      bodySetter: Dispatch<SetStateAction<[number, number]>>;
      env: ENV;
      sortFx: (
        dots: Array<{
          id: string;
          distance: number;
        }>
      ) => Array<{
        id: string;
        distance: number;
      }>;
    }) => {
      const { BODY_HEIGHT, LIMBS_WIDTH } = env;
      const [bodyX, bodyY] = bodyPos;
      const [mouseX, mouseY] = mousePos;
      const mouseBodyX = mouseX;
      const mouseBodyY = mouseY + BODY_HEIGHT;

      // 몸통 위치
      bodySetter((prev) => {
        const [bodyX, bodyY] = prev;
        let newX = bodyX;
        let newY = bodyY;

        // 마우스와 몸통 사이의 거리
        const deltaX = mouseBodyX - bodyX;
        const deltaY = mouseBodyY - bodyY;
        // 몸통이 마우스의 정위치로 너무 따라다니지 않고 거리를 유지하며 움직일 수 있도록 거리에서 일정 값을 빼준다.
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2) - BODY_HEIGHT * 2;

        // 속도 계산
        const dampingFactor = 0.5; // 감쇠 계수
        const curSpeed = distance / 5; // 남은 거리에 기반하여 속도 계산
        const SPEED = curSpeed < 0.01 ? 0 : curSpeed * dampingFactor; // 감쇠 계수를 적용한 속도

        // 현재 속도가 0보다 클 경우
        // 속력을 계산해 위치를 업데이트한다.
        if (SPEED > 0) {
          // 현재 몸통 위치에서 목표 위치를 바라보는 라디안 각도
          const angle = Math.atan2(deltaY, deltaX);
          // 속도와 각도를 통해 각 방향의 속력 구하기
          const velocityX = SPEED * Math.cos(angle);
          const velocityY = SPEED * Math.sin(angle);
          // 새로운 x,y 좌표 계산
          newX += velocityX;
          newY += velocityY;
          // 현재 속도가 0보다 작거나 같을 경우
          // 움직이지 않는다.
        } else {
          return [bodyX, bodyY];
        }

        return [newX, newY];
      });

      const quadrant1: Array<DotDistance> = [],
        quadrant2: Array<DotDistance> = [],
        quadrant3: Array<DotDistance> = [],
        quadrant4: Array<DotDistance> = [];

      // 각 점과 마우스 사이 거리 계산 후 사분면으로 나눠서 저장
      for (const [id, dot] of Object.entries(dots)) {
        const { x: dotX, y: dotY } = dot;
        const [bodyX, bodyY] = bodyPos;

        const deltaX = bodyX - dotX;
        const deltaY = bodyY - dotY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const dotDistance = { id, distance };

        if (dotX <= bodyX) {
          if (dotY <= bodyY) {
            quadrant2.push(dotDistance);
          } else {
            quadrant3.push(dotDistance);
          }
        } else {
          if (dotY <= bodyY) {
            quadrant1.push(dotDistance);
          } else {
            quadrant4.push(dotDistance);
          }
        }
      }

      // 각 사분면의 점들을 마우스 거리 가까운 순으로 정렬
      const sortedQuadrant1 = sortFx(quadrant1),
        sortedQuadrant2 = sortFx(quadrant2),
        sortedQuadrant3 = sortFx(quadrant3),
        sortedQuadrant4 = sortFx(quadrant4);

      // setQuadrants([
      //   sortedQuadrant1,
      //   sortedQuadrant2,
      //   sortedQuadrant3,
      //   sortedQuadrant4,
      // ]);

      const nearDot1 = sortedQuadrant1[0]?.id || sortedQuadrant3[1]?.id,
        nearDot2 = sortedQuadrant2[0]?.id || sortedQuadrant4[1]?.id,
        nearDot3 = sortedQuadrant3[0]?.id || sortedQuadrant1[1]?.id,
        nearDot4 = sortedQuadrant4[0]?.id || sortedQuadrant2[1]?.id,
        nearDots: NearDots = [nearDot1, nearDot2, nearDot3, nearDot4];

      // nearDotSetter(nearDots);

      feetSetter((prev) => {
        let newFeet: Feet = prev;

        if (
          !prev &&
          (!dots[nearDot1] ||
            !dots[nearDot2] ||
            !dots[nearDot3] ||
            !dots[nearDot4])
        )
          return null;

        newFeet ??= [
          dots[nearDot1],
          dots[nearDot2],
          dots[nearDot3],
          dots[nearDot4],
        ];

        for (let i = 0; i < newFeet.length; i++) {
          const foot = newFeet[i];
          const { x: footX, y: footY } = foot;
          const nearDot = nearDots[i];
          let targetX, targetY: number | null;

          // 타겟 설정.
          // 활성화된 손은 마우스 위치를 따라가고 그 외는 인접한 점으로 이동
          const isTrackingMouse =
            (i === 0 && bodyX <= mouseBodyX) || (i === 1 && bodyX > mouseBodyX);
          if (isTrackingMouse) {
            targetX =
              mouseX +
              LIMBS_WIDTH *
                ((bodyX -
                  mouseX -
                  Math.sign(bodyX - mouseX) * LIMBS_WIDTH * 2) /
                  (LIMBS_WIDTH * 4));
            targetY = mouseY + Math.sign(bodyY - mouseY) * LIMBS_WIDTH * 1.5;
          } else {
            targetX = dots[nearDot]?.x;
            targetY = dots[nearDot]?.y;
          }

          if (!targetX || !targetY) continue;

          let newX, newY: number;

          const deltaX = targetX - footX; // 현재 x와 타겟 x의 거리
          const deltaY = targetY - footY; // 현재 y와 타겟 y의 거리
          // 현재 점과 타겟 점 사이의 거리(유클리드 거리 공식)
          const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

          const dampingFactor = 0.8; // 감쇠 계수
          const curSpeed = distance / 2.5; // 남은 거리에 기반하여 속도 계산
          const SPEED = curSpeed < 0.01 ? 0 : curSpeed * dampingFactor; // 감쇠 계수를 적용한 속도

          // 현재 속도가 0보다 클 경우
          // 속력을 계산해 위치를 업데이트한다.
          if (SPEED > 0) {
            // 현재 점(foot[x, y])에서 타겟 점(nearDot[x, y])을 바라보는 라디안 각도
            const angle = Math.atan2(deltaY, deltaX);
            // 속도와 각도를 통해 각 방향의 속력 구하기
            const velocityX = SPEED * Math.cos(angle);
            const velocityY = SPEED * Math.sin(angle);
            // 새로운 x,y 좌표 계산
            newX = footX + velocityX;
            newY = footY + velocityY;
            // 현재 속도가 0보다 작거나 같을 경우
            // 타겟 위치로 바로 이동한다.
          } else {
            newX = targetX;
            newY = targetY;
          }

          newFeet[i] = {
            ...newFeet[i],
            x: newX,
            y: newY,
            trackingMouse: isTrackingMouse,
          };
        }

        return newFeet;
      });
    },
    []
  );

  // 그리기
  const draw = useCallback(
    ({
      mousePos,
      bodyPos,
      cvsSize,
      feet,
      dots,
      env,
      offscreenCtx,
      offscreenCvs,
      ctx,
    }: {
      mousePos: [number, number];
      bodyPos: [number, number];
      cvsSize: [number, number];
      feet: Feet;
      dots: Dots;
      env: ENV;
      ctx: CanvasRenderingContext2D;
      offscreenCtx: CanvasRenderingContext2D;
      offscreenCvs: HTMLCanvasElement;
    }) => {
      const [cvsWidth, cvsHeight] = cvsSize;
      const { LIMBS_WIDTH, BODY_COLOR, FEET_COLOR, BODY_HEIGHT, BODY_WIDTH } =
        env;
      const [bodyX, bodyY] = bodyPos;
      const [mouseX, mouseY] = mousePos;

      // 그리기 명령 배열
      const drawCommands1: Array<(ctx: CanvasRenderingContext2D) => void> = [];
      const drawCommands2: Array<(ctx: CanvasRenderingContext2D) => void> = [];
      const drawCommands3: Array<(ctx: CanvasRenderingContext2D) => void> = [];
      const drawShadowCommads: Array<(ctx: CanvasRenderingContext2D) => void> =
        [];

      // 팔다리 몸통 그리기
      // 팔다리
      if (!!feet) {
        for (let i = 0; i < feet.length; i++) {
          let { x, y } = feet[i];
          let jointX = bodyX;
          let jointY = bodyY;
          let controlX = (x + jointX) / 2;
          let controlY = (y + jointY) / 2;

          // 오른팔
          if (i === 0) {
            jointX += BODY_WIDTH / 2 - LIMBS_WIDTH / 2;
            jointY -= BODY_HEIGHT / 2;
            // controlY += LIMBS_WIDTH;

            // 왼팔
          } else if (i === 1) {
            jointX -= BODY_WIDTH / 2 - LIMBS_WIDTH / 2;
            jointY -= BODY_HEIGHT / 2;
            // controlY += LIMBS_WIDTH;

            // 왼다리
          } else if (i === 2) {
            jointX -= BODY_WIDTH / 2 - LIMBS_WIDTH / 2;
            jointY += BODY_HEIGHT / 2 - LIMBS_WIDTH / 2;
            controlY -= LIMBS_WIDTH;

            // 오른 다리
          } else {
            jointX += BODY_WIDTH / 2 - LIMBS_WIDTH / 2;
            jointY += BODY_HEIGHT / 2 - LIMBS_WIDTH / 2;
            controlY -= LIMBS_WIDTH;
          }

          (i <= 1 ? drawCommands3 : drawCommands2).push(
            (ctx: CanvasRenderingContext2D) => {
              ctx.strokeStyle = BODY_COLOR;
              ctx.lineCap = "round";
              ctx.lineWidth = LIMBS_WIDTH;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.quadraticCurveTo(controlX, controlY, jointX, jointY);
              ctx.stroke();
            }
          );

          // 팔다리 그림자
          drawShadowCommads.push((ctx: CanvasRenderingContext2D) => {
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(
              controlX - BODY_WIDTH,
              controlY + BODY_WIDTH,
              jointX - BODY_WIDTH,
              jointY + BODY_WIDTH
            );
          });
        }
      }

      // 몸통
      drawCommands2.push((ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = BODY_COLOR;
        ctx.beginPath();
        ctx.rect(
          bodyX - BODY_WIDTH / 2,
          bodyY - BODY_HEIGHT / 2,
          BODY_WIDTH,
          BODY_HEIGHT - BODY_HEIGHT / 5
        );
        ctx.closePath();
        ctx.fill();
      });

      // 몸통 그림자
      drawShadowCommads.push((ctx: CanvasRenderingContext2D) => {
        ctx.moveTo(bodyX - BODY_WIDTH, bodyY);
        ctx.lineTo(bodyX - BODY_WIDTH, bodyY + BODY_HEIGHT - BODY_WIDTH / 2);
      });

      // 어깨
      drawCommands2.push((ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = BODY_COLOR;
        ctx.beginPath();
        ctx.arc(
          bodyX,
          bodyY - BODY_HEIGHT / 2,
          BODY_WIDTH / 2,
          Math.PI,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.fill();
      });

      // 엉덩이
      drawCommands2.push((ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = BODY_COLOR;
        ctx.beginPath();
        ctx.arc(
          bodyX,
          bodyY + BODY_HEIGHT / 2 - BODY_HEIGHT / 5,
          BODY_WIDTH / 2,
          Math.PI * 2,
          Math.PI * 3
        );
        ctx.closePath();
        ctx.fill();
      });

      // 손발 그리기
      if (!!feet) {
        for (let i = 0; i < feet?.length; i++) {
          const { x, y, trackingMouse } = feet[i];

          const deltaX = x - mouseX;
          const deltaY = y - mouseY;
          const angle = -Math.atan2(deltaX, deltaY);

          // 오른손
          if (i === 0) {
            if (trackingMouse) {
              const img = new Image();
              img.src = `/images/huggy_wuggy_finger.svg`;

              drawCommands3.unshift((ctx: CanvasRenderingContext2D) => {
                // 계산한 각도로 컨텍스트 회전
                ctx.rotate(angle);

                const rotatedRHandX = x * Math.cos(angle) + y * Math.sin(angle);
                const rotatedRHandY =
                  -x * Math.sin(angle) + y * Math.cos(angle);

                ctx.drawImage(
                  img,
                  rotatedRHandX - LIMBS_WIDTH,
                  rotatedRHandY - LIMBS_WIDTH * 1.5,
                  LIMBS_WIDTH * 2,
                  LIMBS_WIDTH * 2
                );

                ctx.setTransform(1, 0, 0, 1, 0, 0);
              });
            } else {
              drawCommands2.unshift((ctx: CanvasRenderingContext2D) => {
                ctx.fillStyle = FEET_COLOR;
                ctx.beginPath();
                ctx.ellipse(
                  x,
                  y - LIMBS_WIDTH / 4,
                  LIMBS_WIDTH * 0.5,
                  LIMBS_WIDTH * 0.8,
                  (Math.PI / 180) * 20,
                  0,
                  Math.PI * 2
                );
                ctx.ellipse(
                  x - LIMBS_WIDTH / 2,
                  y - LIMBS_WIDTH / 4,
                  LIMBS_WIDTH * 0.4,
                  LIMBS_WIDTH * 0.2,
                  (Math.PI / 180) * 45,
                  0,
                  Math.PI * 2
                );
                ctx.closePath();
                ctx.fill();
              });
            }
            // 왼손
          } else if (i === 1) {
            if (trackingMouse) {
              const img = new Image();
              img.src = `/images/huggy_wuggy_left_finger.svg`;

              drawCommands3.unshift((ctx: CanvasRenderingContext2D) => {
                // 계산한 각도로 컨텍스트 회전
                ctx.rotate(angle);

                const rotatedRHandX = x * Math.cos(angle) + y * Math.sin(angle);
                const rotatedRHandY =
                  -x * Math.sin(angle) + y * Math.cos(angle);

                ctx.drawImage(
                  img,
                  rotatedRHandX - LIMBS_WIDTH,
                  rotatedRHandY - LIMBS_WIDTH * 1.5,
                  LIMBS_WIDTH * 2,
                  LIMBS_WIDTH * 2
                );

                ctx.setTransform(1, 0, 0, 1, 0, 0);
              });
            } else {
              drawCommands2.unshift((ctx: CanvasRenderingContext2D) => {
                ctx.fillStyle = FEET_COLOR;
                ctx.beginPath();
                ctx.ellipse(
                  x,
                  y - LIMBS_WIDTH / 4,
                  LIMBS_WIDTH * 0.5,
                  LIMBS_WIDTH * 0.8,
                  (Math.PI / 180) * 340,
                  0,
                  Math.PI * 2
                );
                ctx.ellipse(
                  x + LIMBS_WIDTH / 2,
                  y - LIMBS_WIDTH / 4,
                  LIMBS_WIDTH * 0.4,
                  LIMBS_WIDTH * 0.2,
                  (Math.PI / 180) * 135,
                  0,
                  Math.PI * 2
                );
                ctx.closePath();
                ctx.fill();
              });
            }
            // 발
          } else {
            drawCommands2.unshift((ctx: CanvasRenderingContext2D) => {
              ctx.fillStyle = FEET_COLOR;
              ctx.beginPath();
              ctx.ellipse(
                x,
                y - LIMBS_WIDTH / 5,
                LIMBS_WIDTH * 0.6,
                LIMBS_WIDTH * 0.8,
                0,
                0,
                Math.PI * 2
              );
              ctx.closePath();
              ctx.fill();
            });
          }
        }
      }

      // 머리
      const headImg = new Image();
      headImg.src = `/logos/huggy_wuggy.svg`;
      drawCommands3.push((ctx: CanvasRenderingContext2D) => {
        ctx.drawImage(
          headImg,
          bodyX - BODY_WIDTH * 1.5,
          bodyY - BODY_HEIGHT * 1.5,
          BODY_WIDTH * 3,
          BODY_WIDTH * 3
        );
      });

      drawShadowCommads.push((ctx: CanvasRenderingContext2D) => {
        ctx.arc(
          bodyX - BODY_WIDTH,
          bodyY - BODY_HEIGHT + BODY_WIDTH,
          LIMBS_WIDTH / 2,
          Math.PI * 2,
          0
        );
      });

      // 그림자 그리기 명령을 drawCommands1으로 합치기
      drawCommands1.unshift(
        (ctx: CanvasRenderingContext2D) => {
          ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
          ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
          ctx.lineCap = "round";
          ctx.lineWidth = LIMBS_WIDTH * 1.05;
          ctx.beginPath();
        },
        ...drawShadowCommads,
        (ctx: CanvasRenderingContext2D) => {
          ctx.stroke();
        }
      );

      // 캔버스 전체 지우기 및 설정
      drawCommands1.unshift((ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, cvsWidth, cvsHeight);
      });

      const allDrawCommands = drawCommands1.concat(
        drawCommands2,
        drawCommands3
      );

      headImg.onload = () => {
        // 모든 그리기 명령 실행
        for (let i = 0; i < allDrawCommands.length; i++) {
          const command = allDrawCommands[i];
          command(offscreenCtx);
        }

        // 더블 버퍼링
        ctx.clearRect(0, 0, ...cvsSize);
        ctx.drawImage(offscreenCvs!, 0, 0);
      };
    },
    []
  );

  const updateAndDraw = useCallback(() => {
    ANIMATION_FRAME_ID.current = requestAnimationFrame(() => {
      updateFeet({
        mousePos,
        bodyPos,
        dots,
        // nearDotSetter: setNearDots,
        feetSetter: setFeet,
        bodySetter: setBodyPos,
        sortFx: dotSort,
        env: ENV,
      });

      draw({
        mousePos,
        bodyPos,
        cvsSize,
        feet,
        dots,
        env: ENV,
        ctx: ctx as CanvasRenderingContext2D,
        offscreenCtx: offscreenCtx as CanvasRenderingContext2D,
        offscreenCvs: offscreenCvs as HTMLCanvasElement,
      });

      updateAndDraw();
    });
  }, [
    updateFeet,
    mousePos,
    bodyPos,
    dots,
    draw,
    cvsSize,
    feet,
    ENV,
    ctx,
    offscreenCtx,
    offscreenCvs,
  ]);

  useEffect(() => {
    if (!isReady) return;

    updateAndDraw();

    return () => {
      ANIMATION_FRAME_ID.current &&
        cancelAnimationFrame(ANIMATION_FRAME_ID.current);
    };
  }, [isReady, updateAndDraw]);

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas className={styles.canvas} ref={cvsRef} />
    </div>
  );
};

export default HuggyWuggy;
