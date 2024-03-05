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
  const [dots, setDots] = useState<Dots>({});
  // const [nearDots, setNearDots] = useState<NearDots>(null);
  // const [areas, setAreas] = useState<Array<Area>>([]);
  // const [quadrants, setQuadrants] = useState<Array<Array<DotDistance>>>([]);
  const [feet, setFeet] = useState<[Dot, Dot, Dot, Dot] | null>(null);
  const [bodyPos, setBodyPos] = useState<[number, number] | null>(null);
  const [mousePos, setMousePos] = useState<[number, number] | null>(null);
  const [cvsSize, setCvsSize] = useState<[number, number]>([10, 10]);
  const isReady = useMemo(
    () => !!cvs && !!ctx && !!offscreenCvs && !!offscreenCtx,
    [cvs, ctx, offscreenCvs, offscreenCtx]
  );

  const [headToRight, setHeadToRight] = useState<boolean>(true);
  const ENV = useMemo(() => {
    const areaDivide = 20;
    const BODY_WIDTH = Math.max(...cvsSize) / areaDivide / 3.8;

    return {
      AREA_DIVIDE: areaDivide,
      AREA_GAP: 10,
      BODY_COLOR: "#0d52af",
      FEET_COLOR: "#ffec00",
      LINE_COLOR: "lightgray",
      DOT_COLOR: "rgba(0, 0, 0, 0.2)",
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

      for (let i = 1; i <= AREA_DIVIDE + 2; i++) {
        const startY =
          AREA_GAP / 2 +
          (areaHeight + AREA_GAP) * (i - 1) -
          (areaHeight + AREA_GAP);
        const endY = startY + areaHeight;

        for (let j = 1; j <= AREA_DIVIDE + 2; j++) {
          const startX =
            AREA_GAP / 2 +
            (areaWidth + AREA_GAP) * (j - 1) -
            (areaWidth + AREA_GAP);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isReady, cvs, offscreenCvs] // ENV는 dependency로 등록하지 말 것
  );

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
    const { innerWidth, innerHeight } = window;
    setCvsSize([innerWidth * 2, innerHeight * 2]);
    createDots(innerWidth * 2, innerHeight * 2);
  }, [createDots]);

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
      mousePos: [number, number] | null;
      bodyPos: [number, number] | null;
      dots: Dots;
      // nearDotSetter: Dispatch<SetStateAction<NearDots>>;
      feetSetter: Dispatch<SetStateAction<Feet>>;
      bodySetter: Dispatch<SetStateAction<[number, number] | null>>;
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
      if (!mousePos) return;

      const { BODY_HEIGHT, LIMBS_WIDTH } = env;
      const [mouseX, mouseY] = mousePos;
      const mouseBodyX = mouseX;
      const mouseBodyY = mouseY + BODY_HEIGHT;
      const [bodyX, bodyY] = bodyPos ?? mousePos;

      feetSetter((prev) => {
        let newFeet: Feet = prev;

        // 마우스와 팔다리 위치를 기반으로 몸통 위치 계산
        bodySetter(() => {
          let newBodyX = bodyX;
          let newBodyY = bodyY;

          // 마우스와 몸통 사이의 거리
          let deltaX = mouseBodyX - bodyX;
          let deltaY = mouseBodyY - bodyY;
          // 몸통이 마우스의 정위치로 너무 따라다니지 않고 거리를 유지하며 움직일 수 있도록 거리에서 일정 값을 빼준다.
          let distance = Math.sqrt(deltaX ** 2 + deltaY ** 2) - BODY_HEIGHT * 2;

          const isNearPointer = distance <= BODY_HEIGHT * 2 && !!newFeet;

          if (isNearPointer) {
            const centerFeetX =
              (newFeet!.reduce(
                (acc, cur, i) => (cur.trackingMouse ? acc : acc + cur.x),
                0
              ) +
                mouseX) /
                4 || 0;
            const centerFeetY =
              (newFeet!.reduce(
                (acc, cur, i) => (cur.trackingMouse ? acc : acc + cur.y),
                0
              ) +
                mouseY) /
                4 || 0;
            deltaX = centerFeetX - bodyX;
            deltaY = centerFeetY - bodyY;
            // 몸통이 마우스 정위치로 움직이고 싶다면 아래 값으로 사용
            distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
          }

          // 속도 계산
          const dampingFactor = 0.5; // 감쇠 계수
          const curSpeed = distance / (isNearPointer ? 2.5 : 5); // 남은 거리에 기반하여 속도 계산
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
            newBodyX += velocityX;
            newBodyY += velocityY;
            // 현재 속도가 0보다 작거나 같을 경우
            // 움직이지 않는다.
          } else {
            return [bodyX, bodyY];
          }

          return [newBodyX, newBodyY];
        });

        const quadrant1: Array<DotDistance> = [],
          quadrant2: Array<DotDistance> = [],
          quadrant3: Array<DotDistance> = [],
          quadrant4: Array<DotDistance> = [];

        // 각 점과 마우스 사이 거리 계산 후 사분면으로 나눠서 저장
        for (const [id, dot] of Object.entries(dots)) {
          const { x: dotX, y: dotY } = dot;
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

        const nearDot1 = sortedQuadrant1[0]?.id,
          nearDot2 = sortedQuadrant2[0]?.id,
          nearDot3 =
            dots[sortedQuadrant3[0]?.id]?.y > bodyY + BODY_HEIGHT * 0.3
              ? sortedQuadrant3[0]?.id
              : sortedQuadrant3[1]?.id,
          nearDot4 =
            dots[sortedQuadrant4[0]?.id]?.y > bodyY + BODY_HEIGHT * 0.3
              ? sortedQuadrant4[0]?.id
              : sortedQuadrant4[1]?.id,
          nearDots = [nearDot1, nearDot2, nearDot3, nearDot4];

        // nearDotSetter(nearDots);

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

          // 마우스 방향따라 머리 방향 지정
          if (i === 0 && isTrackingMouse) {
            setHeadToRight(true);
          } else if (i === 1 && isTrackingMouse) {
            setHeadToRight(false);
          }

          if (isTrackingMouse) {
            targetX =
              mouseX +
              LIMBS_WIDTH *
                ((bodyX -
                  mouseX -
                  Math.sign(bodyX - mouseX) * LIMBS_WIDTH * 2) /
                  (LIMBS_WIDTH * 4));
            targetY = mouseY + Math.sign(bodyY - mouseY) * LIMBS_WIDTH * 1.5;

            const deltaX = targetX - footX; // 현재 x와 타겟 x의 거리
            const deltaY = targetY - footY; // 현재 y와 타겟 y의 거리
            // 현재 점과 타겟 점 사이의 거리(유클리드 거리 공식)
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

            if (distance >= BODY_HEIGHT * 3) {
              const directionX = mouseX - bodyX;
              const directionY = mouseY - bodyY;
              const length = Math.sqrt(
                directionX * directionX + directionY * directionY
              );
              const unitDirectionX = directionX / length;
              const unitDirectionY = directionY / length;
              targetX = bodyX + unitDirectionX * BODY_HEIGHT * 3;
              targetY = bodyY + unitDirectionY * BODY_HEIGHT * 3;
            }
          } else {
            targetX = dots[nearDot]?.x;
            targetY = dots[nearDot]?.y;
          }

          if (!targetX || !targetY) continue;

          let newFootX, newFootY: number;

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
            newFootX = footX + velocityX;
            newFootY = footY + velocityY;
            // 현재 속도가 0보다 작거나 같을 경우
            // 타겟 위치로 바로 이동한다.
          } else {
            newFootX = targetX;
            newFootY = targetY;
          }

          newFeet[i] = {
            ...newFeet[i],
            x: newFootX,
            y: newFootY,
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
      bodyPos: [number, number] | null;
      cvsSize: [number, number];
      feet: Feet;
      dots: Dots;
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

  return <canvas className={styles.canvas} ref={cvsRef} />;
};

export default StrangeAstronaut;
