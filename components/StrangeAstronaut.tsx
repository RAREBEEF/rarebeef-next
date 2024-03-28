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

export interface ENV {
  BODY_COLOR: string;
  FEET_COLOR: string;
  LINE_COLOR: string;
  BODY_WIDTH: number;
  BODY_HEIGHT: number;
  LIMBS_WIDTH: number;
}

interface Foot {
  x: number;
  y: number;
  targetX: number | null;
  targetY: number | null;
  trackingMouse?: boolean;
}

export type Feet = [Foot, Foot, Foot, Foot] | null;

interface Area {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
  width: number;
  height: number;
}

const skin: any = {
  current: "default",
  getSkinList: function () {
    return Object.keys(this).filter(
      (name) => !["current", "getSkinList", "getThis"].includes(name)
    );
  },
  default: {
    color: {
      body: "#F5F5F5",
      feet: "#ffec00",
      outline: "lightgray",
    },
    image: {
      head: {
        right: `/images/astronauts/default_character_right.png`,
        left: `/images/astronauts/default_character_left.png`,
      },
      finger: {
        left: `/images/astronauts/finger_left.svg`,
        right: `/images/astronauts/finger_right.svg`,
      },
    },
  },
  black: {
    color: {
      body: "#151515",
      feet: "#ffec00",
      outline: "lightgray",
    },
    image: {
      head: {
        right: `/images/astronauts/black_character_right.png`,
        left: `/images/astronauts/black_character_left.png`,
      },
      finger: {
        left: `/images/astronauts/finger_left.svg`,
        right: `/images/astronauts/finger_right.svg`,
      },
    },
  },
  blue: {
    color: {
      body: "#3384C6",
      feet: "#ffec00",
      outline: "lightgray",
    },
    image: {
      head: {
        right: `/images/astronauts/blue_character_right.png`,
        left: `/images/astronauts/blue_character_left.png`,
      },
      finger: {
        left: `/images/astronauts/finger_left.svg`,
        right: `/images/astronauts/finger_right.svg`,
      },
    },
  },
  red: {
    color: {
      body: "#E61C44",
      feet: "#ffec00",
      outline: "lightgray",
    },
    image: {
      head: {
        right: `/images/astronauts/red_character_right.png`,
        left: `/images/astronauts/red_character_left.png`,
      },
      finger: {
        left: `/images/astronauts/finger_left.svg`,
        right: `/images/astronauts/finger_right.svg`,
      },
    },
  },
  green: {
    color: {
      body: "#00A260",
      feet: "#ffec00",
      outline: "lightgray",
    },
    image: {
      head: {
        right: `/images/astronauts/green_character_right.png`,
        left: `/images/astronauts/green_character_left.png`,
      },
      finger: {
        left: `/images/astronauts/finger_left.svg`,
        right: `/images/astronauts/finger_right.svg`,
      },
    },
  },
  pink: {
    color: {
      body: "#E95883",
      feet: "#ffec00",
      outline: "lightgray",
    },
    image: {
      head: {
        right: `/images/astronauts/pink_character_right.png`,
        left: `/images/astronauts/pink_character_left.png`,
      },
      finger: {
        left: `/images/astronauts/finger_left.svg`,
        right: `/images/astronauts/finger_right.svg`,
      },
    },
  },
  glitch: {
    includesAllSkin: false,
    image: {
      head: {
        right: `/images/astronauts/glitch_character_right_1.png`,
        left: `/images/astronauts/glitch_character_left_1.png`,
      },
      effect: [
        "/images/astronauts/glitch_effect_0.png",
        "/images/astronauts/glitch_effect_1.png",
        "/images/astronauts/glitch_effect_2.png",
      ],
      finger: {
        left: `/images/astronauts/finger_left.svg`,
        right: `/images/astronauts/finger_right.svg`,
      },
    },
    color: {
      blue: "rgb(90, 198, 198)",
      red: "rgb(220, 80, 80)",
      body: "#F5F5F5",
      feet: "#ffec00",
      outline: "lightgray",
    },
    srcs: {
      head: {
        left: new Array(6)
          .fill(null)
          .map((_, i) => `/images/astronauts/glitch_character_left_${i}.png`),
        right: new Array(6)
          .fill(null)
          .map((_, i) => `/images/astronauts/glitch_character_right_${i}.png`),
      },
      effect: new Array(9)
        .fill(null)
        .map((_, i) => `/images/astronauts/glitch_effect_${i}.png`),
    },
    /**
     * 글리치 이미지(0~12) 혹은 그 외 다른 모든 스킨들 중 하나로 글리치 스킨의 외형을 랜덤화하는 메소드
     */
    randomize: function () {
      const includeOtherSkins = this.includesAllSkin;
      const skinList = includeOtherSkins ? skin.getSkinList() : [];

      // 글리치 이펙트 (0~8)
      for (let i = 0; i < 3; i++) {
        const randomEffectInt = Math.round(Math.random() * 8);
        this.image.effect[i] = this.srcs.effect[randomEffectInt];
      }
      // 글리치 머리 이미지 개수 (6)
      const glitchImgCount = this.srcs.head.right.length;
      // 0 ~ 6
      // [glitch0, glitch1, glitch2, glitch3, glitch4, glitch5]
      // 7 ~ 13
      // ['default', 'black', 'blue', 'red', 'green', 'pink', 'glitch']
      // 맥시멈을 12로 제한해 13번인 글리치가 나오지 않도록
      const randomBodyInt = Math.round(
        Math.random() * (glitchImgCount + skinList.length - 1)
      );
      // 랜덤값이 글리치 범위 내면 글리치 머리 이미지와 색상 사용
      if (randomBodyInt < glitchImgCount) {
        this.image.head.right = this.srcs.head.right[randomBodyInt];
        this.image.head.left = this.srcs.head.left[randomBodyInt];
        this.color.body = "#F5F5F5";
      } else {
        // 랜덤값이 글리치 범위 외면 값에 해당하는 스킨의 머리 이미지와 색상 사용
        const currentColor = skinList[randomBodyInt - glitchImgCount];
        this.image.head.right = skin[currentColor].image.head.right;
        this.image.head.left = skin[currentColor].image.head.left;
        this.color.body = skin[currentColor].color.body;
      }
    },
  },
};

const StrangeAstronaut = ({ currentSkin }: { currentSkin: string }) => {
  const cvsRef = useRef<HTMLCanvasElement>(null);
  const [cvs, setCvs] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [offscreenCvs, setOffscreenCvs] = useState<HTMLCanvasElement | null>(
    null
  );
  const [offscreenCtx, setOffscreenCtx] =
    useState<CanvasRenderingContext2D | null>(null);

  const [feet, setFeet] = useState<[Foot, Foot, Foot, Foot] | null>(null);
  const [currentMoving, setCurrentMoving] = useState<0 | 1 | 2 | 3>(0);
  const [mode, setMode] = useState<"moving" | "pointing">("moving");
  const [headToRight, setHeadToRight] = useState<boolean>(true);
  const [mousePos, setMousePos] = useState<[number, number] | null>(null);
  const [bodyPos, setBodyPos] = useState<[number, number] | null>(null);
  const [cvsSize, setCvsSize] = useState<[number, number]>([10, 10]);
  const isReady = useMemo(
    () => !!cvs && !!ctx && !!offscreenCvs && !!offscreenCtx,
    [cvs, ctx, offscreenCvs, offscreenCtx]
  );

  const ENV = useMemo(() => {
    const BODY_WIDTH = Math.max(...cvsSize) * 0.01;

    return {
      BODY_COLOR: "#0d52af",
      FEET_COLOR: "#ffec00",
      LINE_COLOR: "lightgray",
      BODY_WIDTH: BODY_WIDTH,
      BODY_HEIGHT: BODY_WIDTH * 2.3,
      LIMBS_WIDTH: BODY_WIDTH * 0.8,
    };
  }, [cvsSize]);

  const ANIMATION_FRAME_ID = useRef<null | number>(null);

  // 컨테이너와 캔버스 체크 & 상태 저장, 마우스 위치 초기화
  useEffect(() => {
    if (!cvsRef.current) return;
    setCvs(cvsRef.current);
    setCtx(cvsRef.current.getContext("2d"));
    const offscreenCanvas = document.createElement("canvas");
    const offscreenContext = offscreenCanvas.getContext("2d");
    setOffscreenCvs(offscreenCanvas);
    setOffscreenCtx(offscreenContext);
  }, [cvsRef]);

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

  const onResize = useCallback(() => {
    if (!cvs || !offscreenCvs) return;
    const { innerWidth, innerHeight } = window;
    const width = innerWidth * 2,
      height = innerHeight * 2;
    cvs!.width = width;
    cvs!.height = height;
    offscreenCvs!.width = width;
    offscreenCvs!.height = height;
    setCvsSize([width, height]);
  }, [cvs, offscreenCvs]);

  // 핸들러 등록
  useEffect(() => {
    onResize();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  /**
   * 팔다리의 랜덤위치를 반환하는 함수*/
  const getRandomFeetPos = useCallback(
    (
      currentMoving: 0 | 1 | 2 | 3,
      directionX: number,
      directionY: number
    ): { x: number; y: number } => {
      const { BODY_HEIGHT } = ENV;
      const [bodyX, bodyY] = bodyPos ?? (mousePos || [0, 0]);
      const range = BODY_HEIGHT * 2;

      let xMin: number = 0;
      let xMax: number = 0;
      let yMax: number = 0;
      let yMin: number = 0;

      // 오른손
      if (currentMoving === 0) {
        xMin = bodyX + directionX * BODY_HEIGHT;
        xMax = bodyX + range + directionX * BODY_HEIGHT;
        yMin = bodyY - range + directionY * BODY_HEIGHT;
        yMax = bodyY + directionY * BODY_HEIGHT;
        // 왼손
      } else if (currentMoving === 1) {
        xMin = bodyX - range + directionX * BODY_HEIGHT;
        xMax = bodyX + directionX * BODY_HEIGHT;
        yMin = bodyY - range + directionY * BODY_HEIGHT;
        yMax = bodyY + directionY * BODY_HEIGHT;
        //왼다리
      } else if (currentMoving === 2) {
        xMin = bodyX - range + directionX * BODY_HEIGHT;
        xMax = bodyX + directionX * BODY_HEIGHT;
        yMin = BODY_HEIGHT / 2 + bodyY + directionY * BODY_HEIGHT;
        yMax = BODY_HEIGHT / 2 + bodyY + range + directionY * BODY_HEIGHT;
        //오른다리
      } else if (currentMoving === 3) {
        xMin = bodyX + directionX * BODY_HEIGHT;
        xMax = bodyX + range + directionX * BODY_HEIGHT;
        yMin = BODY_HEIGHT / 2 + bodyY + directionY * BODY_HEIGHT;
        yMax = BODY_HEIGHT / 2 + bodyY + range + directionY * BODY_HEIGHT;
      }

      const x = Math.random() * (xMax - xMin) + xMin;
      const y = Math.random() * (yMax - yMin) + yMin;

      return { x, y };
    },
    [ENV, bodyPos, mousePos]
  );

  // 팔다리 위치 계산
  const updateFeet = useCallback(
    ({
      mousePos,
      bodyPos,
      mode,
      currentMoving,
      env,
    }: {
      mousePos: [number, number] | null;
      bodyPos: [number, number] | null;
      mode: "moving" | "pointing";
      currentMoving: 0 | 1 | 2 | 3;
      env: ENV;
    }) => {
      if (!mousePos) return;

      const { BODY_HEIGHT, LIMBS_WIDTH } = env;
      const [mouseX, mouseY] = mousePos;
      const [bodyX, bodyY] = bodyPos ?? mousePos;

      // 마우스와 몸통 사이 거리
      const mouseBodyDeltaX = mouseX - bodyX;
      const mouseBodyDeltaY = mouseY - bodyY;
      const mouseBodyDistance = Math.sqrt(
        mouseBodyDeltaX ** 2 + mouseBodyDeltaY ** 2
      );
      // 몸통 기준 마우스 방향
      const directionX = Math.sign(mouseBodyDeltaX); // 몸통 기준 마우스가 우측이면 +, 좌측이면 -
      const directionY = Math.sign(mouseBodyDeltaY); // 몸통 기준 마우스가 위면 -, 아래면 +

      setFeet((prev) => {
        let newFeet = prev ?? [
          {
            ...getRandomFeetPos(0, 1, 1),
            targetX: null,
            targetY: null,
            trackingMouse: false,
          },
          {
            ...getRandomFeetPos(1, 1, 1),
            targetX: null,
            targetY: null,
            trackingMouse: false,
          },
          { ...getRandomFeetPos(2, 1, 1), targetX: null, targetY: null },
          { ...getRandomFeetPos(3, 1, 1), targetX: null, targetY: null },
        ];

        setBodyPos(() => {
          let newBodyX = bodyX;
          let newBodyY = bodyY;

          // 몸통 좌표 계산
          const targetBodyX = newFeet.reduce((acc, cur) => acc + cur.x, 0) / 4;
          const targetBodyY = newFeet.reduce((acc, cur) => acc + cur.y, 0) / 4;

          const bodyDeltaX = targetBodyX - bodyX;
          const bodyDeltaY = targetBodyY - bodyY;
          const distance = Math.sqrt(bodyDeltaX ** 2 + bodyDeltaY ** 2);

          const dampingFactor = 0.8;
          const curSpeed = distance / 4;
          const SPEED = curSpeed * dampingFactor;

          const angle = Math.atan2(bodyDeltaY, bodyDeltaX);
          const velocityX = SPEED * Math.cos(angle);
          const velocityY = SPEED * Math.sin(angle);

          // 마우스가 몸통 근처에서 벗어났으면 이동모드로 변경
          if (mouseBodyDistance >= BODY_HEIGHT * 3.5) {
            newFeet[0].trackingMouse = false;
            newFeet[1].trackingMouse = false;
            setMode("moving");
          }

          return [newBodyX + velocityX, newBodyY + velocityY];
        });

        // 이동모드(마우스를 향해서 움직이는 중)
        if (mode === "moving") {
          // 커서 방향에 따라 머리 방향 변경
          // 이동 시에는 수직으로 움직일 때 움직임을 완화하기 위한 데드존 설정
          if (Math.abs(bodyX - mouseX) >= BODY_HEIGHT) {
            setHeadToRight(directionX > 0);
          }
          // 계산할 팔다리의 데이터
          const {
            x: feetX,
            y: feetY,
            targetX,
            targetY,
          } = newFeet[currentMoving];

          // 아직 타겟이 없으면 새로운 타겟 좌표 계산
          if (!targetX || !targetY) {
            // 이동범위 계산

            const { x: newTargetX, y: newTargetY } = getRandomFeetPos(
              currentMoving,
              directionX,
              directionY
            );

            newFeet[currentMoving] = {
              ...newFeet[currentMoving],
              targetX: newTargetX,
              targetY: newTargetY,
            };
          } else {
            // 타겟이 있으면 속력 계산 및 이동
            const deltaX = targetX - feetX;
            const deltaY = targetY - feetY;
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

            const dampingFactor = 0.6;
            const curSpeed = distance / 3;
            const SPEED =
              curSpeed < BODY_HEIGHT / 5 ? 0 : curSpeed * dampingFactor;

            if (SPEED > 0) {
              const angle = Math.atan2(deltaY, deltaX);
              const velocityX = SPEED * Math.cos(angle);
              const velocityY = SPEED * Math.sin(angle);
              newFeet[currentMoving].x = feetX + velocityX;
              newFeet[currentMoving].y = feetY + velocityY;
            } else {
              newFeet[currentMoving].x = targetX;
              newFeet[currentMoving].y = targetY;
            }
          }

          // 팔다리가 목표 위치에 도달하면 다음 팔다리로 바톤터치
          if (feetX === targetX && feetY === targetY) {
            switch (currentMoving) {
              case 0:
                setCurrentMoving(2);
                break;
              case 1:
                setCurrentMoving(3);
                break;
              case 2:
                setCurrentMoving(1);
                break;
              case 3:
                setCurrentMoving(0);
                break;
            }
            newFeet[currentMoving].targetX = null;
            newFeet[currentMoving].targetY = null;

            // 현재 팔다리가 목표 위치에 도달했고 몸통도 마우스에 인접했다면 포인팅모드로 변경
            if (mouseBodyDistance < BODY_HEIGHT * 2.5) setMode("pointing");
          }
        } else {
          // 포인팅모드(위치는 고정하고 커서를 가리기는 모드), 커서가 우측이면 오른손, 좌측이면 왼손으로
          const pointingHand = 0 <= mouseX - bodyX ? 0 : 1;
          newFeet[pointingHand].trackingMouse = true;
          newFeet[1 - pointingHand].trackingMouse = false;

          // 커서 방향에 따라 머리 방향 설정, 이동모드와 다르게 포인팅모드에는 데드존이 없다.
          setHeadToRight(directionX > 0);

          // 포인팅 중인 손의 데이터
          const { x, y } = newFeet[pointingHand];

          // 포인팅 중인 손의 위치 업데이트
          const targetX =
            mouseX +
            LIMBS_WIDTH *
              ((bodyX - mouseX + Math.sign(mouseX - bodyX) * LIMBS_WIDTH * 2) /
                (LIMBS_WIDTH * 4));
          const targetY =
            mouseY - Math.sign(mouseY - bodyY) * LIMBS_WIDTH * 1.5;
          const deltaX = targetX - x;
          const deltaY = targetY - y;
          const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

          const dampingFactor = 0.8;
          const curSpeed = distance / 5;
          const SPEED = curSpeed * dampingFactor;

          const angle = Math.atan2(deltaY, deltaX);
          const velocityX = SPEED * Math.cos(angle);
          const velocityY = SPEED * Math.sin(angle);
          newFeet[pointingHand].x = x + velocityX;
          newFeet[pointingHand].y = y + velocityY;
        }
        return newFeet;
      });
    },
    [getRandomFeetPos]
  );

  // 그리기
  const draw = useCallback(
    ({
      mousePos,
      bodyPos,
      cvsSize,
      feet,
      env,
      offscreenCtx,
      offscreenCvs,
      ctx,
    }: {
      mousePos: [number, number];
      bodyPos: [number, number] | null;
      cvsSize: [number, number];
      feet: Feet;
      env: ENV;
      ctx: CanvasRenderingContext2D;
      offscreenCtx: CanvasRenderingContext2D;
      offscreenCvs: HTMLCanvasElement;
    }) => {
      if (!bodyPos) return;
      const [cvsWidth, cvsHeight] = cvsSize;
      const { LIMBS_WIDTH, BODY_HEIGHT, BODY_WIDTH } = env;
      const [bodyX, bodyY] = bodyPos;
      const [mouseX, mouseY] = mousePos;
      const isGlitch = currentSkin === "glitch";
      let glitchRandomValue = 0;
      if (isGlitch) {
        skin.glitch.randomize();
        glitchRandomValue =
          (BODY_WIDTH / Math.round(Math.random() * (25 - 20) + 20)) *
          (Math.random() < 0.5 ? -1 : 1);
      }

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
          x += glitchRandomValue;
          y += glitchRandomValue;
          let jointX = bodyX + glitchRandomValue;
          let jointY = bodyY + glitchRandomValue;
          let controlX = (x + jointX) / 2 + glitchRandomValue;
          let controlY = (y + jointY) / 2 + glitchRandomValue;

          // 오른팔
          if (i === 0) {
            jointX += BODY_WIDTH / 2 - LIMBS_WIDTH / 2;
            jointY -= BODY_HEIGHT / 2;

            // 왼팔
          } else if (i === 1) {
            jointX -= BODY_WIDTH / 2 - LIMBS_WIDTH / 2;
            jointY -= BODY_HEIGHT / 2;

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

          // 팔다리 테두리
          (i <= 1 ? drawCommands3 : drawCommands2).push((ctx) => {
            ctx.strokeStyle = "#000000";
            ctx.lineCap = "round";
            ctx.lineWidth = LIMBS_WIDTH * 1.1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(controlX, controlY, jointX, jointY);
            ctx.stroke();
          });

          // 팔다리
          (i <= 1 ? drawCommands3 : drawCommands2).push((ctx) => {
            ctx.strokeStyle = skin[currentSkin].color.body;
            ctx.lineCap = "round";
            ctx.lineWidth = LIMBS_WIDTH;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(controlX, controlY, jointX, jointY);
            ctx.stroke();
          });

          // 팔다리 그림자
          drawShadowCommads.push((ctx) => {
            ctx.moveTo(x, y);
            ctx.quadraticCurveTo(
              controlX - BODY_WIDTH,
              controlY + BODY_WIDTH,
              jointX - BODY_WIDTH,
              jointY + BODY_WIDTH
            );
          });

          if (isGlitch) {
            (i <= 1 ? drawCommands3 : drawCommands2).unshift((ctx) => {
              ctx.strokeStyle = skin.glitch.color.red;
              ctx.lineCap = "round";
              ctx.lineWidth = LIMBS_WIDTH * 1.1 + glitchRandomValue * 2;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.quadraticCurveTo(
                controlX + glitchRandomValue * 2,
                controlY + glitchRandomValue * 2,
                jointX + glitchRandomValue * 2,
                jointY + glitchRandomValue * 2
              );
              ctx.stroke();
              ctx.strokeStyle = skin.glitch.color.blue;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.quadraticCurveTo(
                controlX - glitchRandomValue * 2,
                controlY - glitchRandomValue * 2,
                jointX - glitchRandomValue * 2,
                jointY - glitchRandomValue * 2
              );
              ctx.stroke();
            });

            const glitchEffect1 = new Image();
            const glitchEffect2 = new Image();
            const glitchEffect3 = new Image();
            glitchEffect1.src = skin.glitch.image.effect[0];
            glitchEffect2.src = skin.glitch.image.effect[1];
            glitchEffect3.src = skin.glitch.image.effect[2];

            let effectX1 = x;
            let effectY1 = y;
            let effectX2 = jointX;
            let effectY2 = jointY;
            let effectX3 = controlX;
            let effectY3 = controlY;

            const deltaX = x - jointX;
            const deltaY = y - jointY;
            const effectSize = Math.sqrt(deltaX ** 2 + deltaY ** 2) / 2;

            if (i <= 1) {
              effectY1 -= effectSize / 2;
              effectY2 -= effectSize / 2;
              effectY3 -= effectSize / 2;
              if (i === 0) {
                effectX1 -= effectSize / 2;
                effectX3 -= effectSize / 4;
              } else if (i === 1) {
                effectX1 -= effectSize / 2;
                effectX2 -= effectSize;
                effectX3 -= effectSize;
              }
            } else {
              effectY1 -= effectSize / 2;
              if (i === 2) {
                effectX1 -= effectSize / 2;
                effectX2 -= effectSize;
                effectX3 -= effectSize;
              } else if (i === 3) {
                effectX1 -= effectSize / 2;
                effectX2 -= effectSize / 2;
                effectX3 -= effectSize / 2;
              }
            }

            drawCommands3.push((ctx) => {
              ctx.drawImage(
                glitchEffect1,
                effectX1,
                effectY1,
                effectSize,
                effectSize
              );
            });
            drawCommands3.push((ctx) => {
              ctx.drawImage(
                glitchEffect2,
                effectX2,
                effectY2,
                effectSize,
                effectSize
              );
            });
            drawCommands3.push((ctx) => {
              ctx.drawImage(
                glitchEffect3,
                effectX3,
                effectY3,
                effectSize,
                effectSize
              );
            });
          }
        }
      }

      // 몸통 테두리
      drawCommands2.push((ctx) => {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.rect(
          bodyX - (BODY_WIDTH * 1.1) / 2,
          bodyY - BODY_HEIGHT / 2,
          BODY_WIDTH * 1.1,
          BODY_HEIGHT - BODY_HEIGHT / 5
        );
        ctx.closePath();
        ctx.fill();
      });
      // 몸통
      drawCommands2.push((ctx) => {
        ctx.fillStyle = skin[currentSkin].color.body;
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
      drawShadowCommads.push((ctx) => {
        ctx.moveTo(bodyX - BODY_WIDTH, bodyY);
        ctx.lineTo(bodyX - BODY_WIDTH, bodyY + BODY_HEIGHT - BODY_WIDTH / 2);
      });

      // 어깨
      drawCommands2.push((ctx) => {
        ctx.fillStyle = skin[currentSkin].color.body;
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

      // 엉덩이 테두리
      drawCommands2.push((ctx) => {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(
          bodyX + glitchRandomValue,
          bodyY + BODY_HEIGHT / 2 - BODY_HEIGHT / 5 + glitchRandomValue,
          (BODY_WIDTH * 1.1) / 2,
          Math.PI * 2,
          Math.PI * 3
        );
        ctx.closePath();
        ctx.fill();
      });

      // 엉덩이
      drawCommands2.push((ctx) => {
        ctx.fillStyle = skin[currentSkin].color.body;
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
        for (let j = 0; j < feet?.length; j++) {
          const i = isGlitch ? Math.round(Math.random() * 3) : j;
          const { x, y, trackingMouse } = feet[i];
          const deltaX = x - mouseX;
          const deltaY = y - mouseY;
          const angle = -Math.atan2(deltaX, deltaY);

          // 오른손
          if (i === 0) {
            if (trackingMouse) {
              const img = new Image();
              img.src = skin[currentSkin].image.finger.right;

              drawCommands3.unshift((ctx) => {
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
              drawCommands2.unshift((ctx) => {
                ctx.fillStyle = skin[currentSkin].color.feet;
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
              img.src = skin[currentSkin].image.finger.left;

              drawCommands3.unshift((ctx) => {
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
              drawCommands2.unshift((ctx) => {
                ctx.fillStyle = skin[currentSkin].color.feet;
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
            drawCommands2.unshift((ctx) => {
              ctx.fillStyle = skin[currentSkin].color.feet;
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

      // // 머리 및 타이머
      const headImg = new Image();
      headImg.src = headToRight
        ? skin[currentSkin].image.head.right
        : skin[currentSkin].image.head.left;

      drawCommands3.push((ctx) => {
        ctx.drawImage(
          headImg,
          bodyX - BODY_WIDTH * 2.1,
          bodyY - BODY_HEIGHT * 1.5,
          BODY_WIDTH * 4.2,
          BODY_WIDTH * 4.2
        );
      });

      // 머리 그림자
      drawShadowCommads.push((ctx) => {
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
        (ctx) => {
          ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
          ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
          ctx.lineCap = "round";
          ctx.lineWidth = LIMBS_WIDTH * 1.05;
          ctx.beginPath();
        },
        ...drawShadowCommads,
        (ctx) => {
          ctx.stroke();
        }
      );

      // 캔버스 전체 지우기 및 설정
      drawCommands1.unshift((ctx) => {
        ctx.clearRect(0, 0, cvsWidth, cvsHeight);
      });

      const allDrawCommands = drawCommands1.concat(
        drawCommands2,
        drawCommands3
      );

      // 머리 이미지의 로드가 완료되면
      headImg.onload = () => {
        // 모든 그리기 명령 실행
        for (let i = 0; i < allDrawCommands.length; i++) {
          const command = allDrawCommands[i];
          command(offscreenCtx);
        }

        // 더블 버퍼링
        ctx.clearRect(0, 0, ...cvsSize);
        ctx.drawImage(offscreenCvs, 0, 0);
      };
    },
    [currentSkin, headToRight]
  );

  const updateAndDraw = useCallback(() => {
    if (!mousePos) return;
    ANIMATION_FRAME_ID.current = requestAnimationFrame(() => {
      updateFeet({
        mousePos,
        bodyPos,
        mode,
        currentMoving,
        env: ENV,
      });

      draw({
        mousePos,
        bodyPos,
        cvsSize,
        feet,
        env: ENV,
        ctx: ctx as CanvasRenderingContext2D,
        offscreenCtx: offscreenCtx as CanvasRenderingContext2D,
        offscreenCvs: offscreenCvs as HTMLCanvasElement,
      });

      updateAndDraw();
    });
  }, [
    mousePos,
    updateFeet,
    bodyPos,
    mode,
    currentMoving,
    ENV,
    draw,
    cvsSize,
    feet,
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

  return <canvas className={styles.canvas} ref={cvsRef} />;
};

export default StrangeAstronaut;
