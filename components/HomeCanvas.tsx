import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HomeCanvas.module.scss";
import Matter from "matter-js";

const HomeCanvas = ({
  scrollProgress,
  entered,
}: {
  scrollProgress: number;
  entered: boolean;
}) => {
  // const cvsRef = useRef<HTMLDivElement>(null);
  const cvsRef = useRef<HTMLCanvasElement>(null);
  const [cvs, setCvs] = useState<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [offscreenCvs, setOffscreenCvs] = useState<HTMLCanvasElement | null>(
    null
  );
  const [offscreenCtx, setOffscreenCtx] =
    useState<CanvasRenderingContext2D | null>(null);
  const ANIMATION_FRAME_ID = useRef<null | number>(null);
  const [keyframes, setKeyframes] = useState<Array<any>>([]);
  const [curveReverse, setCurveReverse] = useState<boolean>(false);
  const [cpx, setCpx] = useState<[number, number]>([0, 0]);

  // const [mousePos, setMousePos] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const windowResizeHandler = () => {
      setCpx([window.innerWidth / 2, window.innerWidth / 2]);
      setKeyframes([
        {
          progress: 0,
          x: window.innerWidth / 2,
          y: -60,
          cpx1: window.innerWidth / 2,
          cpy1: 0,
          cpx2: window.innerWidth / 2,
          cpy2: 0,
        },
        {
          progress: 0.5,
          x: window.innerWidth / 2,
          y: window.innerHeight * 0.5,
          cpx1: window.innerWidth / 2 - 20,
          cpy1: window.innerHeight * 0.15,
          cpx2: window.innerWidth / 2 + 40,
          cpy2: window.innerHeight * 0.3,
        },
        {
          progress: 0.75,
          x: window.innerWidth / 2,
          y: window.innerHeight * 0.75,
          cpx1: window.innerWidth / 2 + 10,
          cpy1: window.innerHeight * 0.25,
          cpx2: window.innerWidth / 2 - 10,
          cpy2: window.innerHeight * 0.5,
        },
        {
          progress: 1,
          x: window.innerWidth / 2,
          y: window.innerHeight,
          cpx1: window.innerWidth / 2,
          cpy1: window.innerHeight * 0.5,
          cpx2: window.innerWidth / 2,
          cpy2: window.innerHeight,
        },
      ]);
    };
    window.addEventListener("resize", windowResizeHandler);
    windowResizeHandler();

    return () => {
      window.removeEventListener("resize", windowResizeHandler);
    };
  }, []);

  useEffect(() => {
    if (!cvsRef.current || !entered) return;
    setCvs(cvsRef.current);
    setCtx(cvsRef.current.getContext("2d"));
    const offscreenCanvas = document.createElement("canvas");
    const offscreenContext = offscreenCanvas.getContext("2d");
    setOffscreenCvs(offscreenCanvas);
    setOffscreenCtx(offscreenContext);
  }, [entered]);

  const getInterpolatedPosition = useCallback(
    (progress: number) => {
      for (let i = 0; i < keyframes.length - 1; i++) {
        const currentFrame = keyframes[i];
        const nextFrame = keyframes[i + 1];

        if (
          progress >= currentFrame.progress &&
          progress <= nextFrame.progress
        ) {
          const localProgress =
            (progress - currentFrame.progress) /
            (nextFrame.progress - currentFrame.progress);
          const x =
            currentFrame.x + localProgress * (nextFrame.x - currentFrame.x);
          const y =
            currentFrame.y + localProgress * (nextFrame.y - currentFrame.y);
          const cpx1 =
            currentFrame.cpx1 +
            localProgress * (nextFrame.cpx1 - currentFrame.cpx1);
          const cpx2 =
            currentFrame.cpx2 +
            localProgress * (nextFrame.cpx2 - currentFrame.cpx2);
          const cpy1 =
            currentFrame.cpy1 +
            localProgress * (nextFrame.cpy1 - currentFrame.cpy1);
          const cpy2 =
            currentFrame.cpy2 +
            localProgress * (nextFrame.cpy2 - currentFrame.cpy2);
          return { x, cpx1, cpy1, cpx2, cpy2, y };
        }
      }
      return keyframes[keyframes.length - 1];
    },
    [keyframes]
  );

  // const animate = useCallback(() => {
  //   if (!cvs || !ctx || !entered || !offscreenCvs || !offscreenCtx) return;
  //   const dpr = window.devicePixelRatio || 1;
  //   // CSS 크기 설정
  //   cvs.style.width = "100vw";
  //   cvs.style.height = "100vh";

  //   // 실제 캔버스 크기를 dpr을 고려해 설정
  //   cvs.width = window.innerWidth * dpr * 2;
  //   cvs.height = window.innerHeight * dpr * 2;
  //   offscreenCvs!.width = window.innerWidth * dpr * 2;
  //   offscreenCvs!.height = window.innerHeight * dpr * 2;

  //   // 컨텍스트 스케일 조정
  //   offscreenCtx.scale(dpr, dpr);

  //   const { x, y, cpy1, cpy2 } = getInterpolatedPosition(scrollProgress);

  //   offscreenCtx.clearRect(0, 0, cvs.width, cvs.height);
  //   offscreenCtx.beginPath();
  //   offscreenCtx.moveTo(window.innerWidth / 2, -60); // 시작점
  //   // offscreenCtx.lineTo(x, y);
  //   // offscreenCtx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);

  //   const viewportCenter = window.innerWidth / 2;

  //   console.log(scrollProgress);

  //   setCpx((prev) => {
  //     let [cpx1, cpx2] = prev;

  //     if (curveReverse) {
  //       if (cpx1 < viewportCenter + scrollProgress * 100) {
  //         cpx1 += 1;
  //       } else {
  //         setCurveReverse(false);
  //       }
  //     } else {
  //       if (cpx1 > viewportCenter - scrollProgress * 100) {
  //         cpx1 -= 1;
  //       } else {
  //         setCurveReverse(true);
  //       }
  //     }

  //     return [cpx1, cpx2];
  //   });

  //   offscreenCtx.bezierCurveTo(cpx[0], cpy1, cpx[1], cpy2, x, y);
  //   //   // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
  //   //   offscreenCtx.bezierCurveTo(150, 100, 200, 50, 300, 100);
  //   //   offscreenCtx.bezierCurveTo(400, 150, 450, 100, 500, 150);
  //   //   offscreenCtx.bezierCurveTo(600, 200, 650, 150, 700, 200);

  //   offscreenCtx.strokeStyle = "black"; // 선 색상
  //   offscreenCtx.lineWidth = 2; // 선 두께
  //   offscreenCtx.stroke(); // 선 그리기

  //   const hook = new Image();
  //   hook.src = "/images/fishing-hook.png";
  //   offscreenCtx.drawImage(hook, window.innerWidth / 2 - 25, y, 50, 50);

  //   ctx.drawImage(offscreenCvs, 0, 0);

  //   ANIMATION_FRAME_ID.current = requestAnimationFrame(animate);
  // }, [
  //   cpx,
  //   curveReverse,
  //   ctx,
  //   cvs,
  //   entered,
  //   getInterpolatedPosition,
  //   offscreenCtx,
  //   offscreenCvs,
  //   scrollProgress,
  // ]);

  // useEffect(() => {
  //   const windowMouseMoveHandler = (e: MouseEvent) => {
  //     setMousePos([e.clientX, e.clientY]);
  //   };
  //   window.addEventListener("mousemove", windowMouseMoveHandler);

  //   return () => {
  //     window.removeEventListener("mousemove", windowMouseMoveHandler);
  //   };
  // }, []);

  const animate = useCallback(() => {
    if (!cvs || !ctx || !entered || !offscreenCvs || !offscreenCtx) return;
    const dpr = window.devicePixelRatio || 1;
    // CSS 크기 설정
    cvs.style.width = "100vw";
    cvs.style.height = "100vh";

    // 실제 캔버스 크기를 dpr을 고려해 설정
    cvs.width = window.innerWidth * dpr * 2;
    cvs.height = window.innerHeight * dpr * 2;
    offscreenCvs!.width = window.innerWidth * dpr * 2;
    offscreenCvs!.height = window.innerHeight * dpr * 2;

    // 컨텍스트 스케일 조정
    offscreenCtx.scale(dpr, dpr);

    // const [mouseX, mouseY] = mousePos;

    const { x, y, cpy1, cpy2 } = getInterpolatedPosition(scrollProgress);
    const viewportCenter = window.innerWidth / 2;

    offscreenCtx.clearRect(0, 0, cvs.width, cvs.height);
    offscreenCtx.beginPath();
    offscreenCtx.moveTo(x, -60); // 시작점
    // offscreenCtx.lineTo(x, y);
    // offscreenCtx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x, y);

    // setCpx((prev) => {
    //   let [cpx1, cpx2] = prev;

    //   if (curveReverse) {
    //     if (cpx1 < viewportCenter + scrollProgress * 100) {
    //       cpx1 += 1;
    //     } else {
    //       setCurveReverse(false);
    //     }
    //   } else {
    //     if (cpx1 > viewportCenter - scrollProgress * 100) {
    //       cpx1 -= 1;
    //     } else {
    //       setCurveReverse(true);
    //     }
    //   }

    //   return [cpx1, cpx2];
    // });

    offscreenCtx.bezierCurveTo(cpx[0], cpy1, cpx[1], cpy2, viewportCenter, y);
    //   // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    //   offscreenCtx.bezierCurveTo(150, 100, 200, 50, 300, 100);
    //   offscreenCtx.bezierCurveTo(400, 150, 450, 100, 500, 150);
    //   offscreenCtx.bezierCurveTo(600, 200, 650, 150, 700, 200);

    offscreenCtx.strokeStyle = "black"; // 선 색상
    offscreenCtx.lineWidth = 2; // 선 두께
    offscreenCtx.stroke(); // 선 그리기

    const hook = new Image();
    hook.src = "/images/fishing-hook.png";
    offscreenCtx.drawImage(hook, viewportCenter - 25, y, 50, 50);

    ctx.drawImage(offscreenCvs, 0, 0);

    ANIMATION_FRAME_ID.current = requestAnimationFrame(animate);
  }, [
    cpx,
    ctx,
    cvs,
    entered,
    getInterpolatedPosition,
    offscreenCtx,
    offscreenCvs,
    scrollProgress,
    // mousePos,
  ]);

  useEffect(() => {
    ANIMATION_FRAME_ID.current = requestAnimationFrame(animate);

    return () => {
      ANIMATION_FRAME_ID.current &&
        cancelAnimationFrame(ANIMATION_FRAME_ID.current);
    };
  }, [scrollProgress, cvs, ctx, getInterpolatedPosition, entered, animate]);

  return <canvas ref={cvsRef} className={styles["canvas"]}></canvas>;
  // return (
  //   <div ref={cvsRef} id="matter-container" className={styles.container}></div>
  // );
};

export default HomeCanvas;

// useEffect(() => {
//   if (!cvsRef.current) return;

//   console.log("run");

//   const Engine = Matter.Engine,
//     Render = Matter.Render,
//     Runner = Matter.Runner,
//     Body = Matter.Body,
//     Bodies = Matter.Bodies,
//     Mouse = Matter.Mouse,
//     MouseConstraint = Matter.MouseConstraint,
//     Constraint = Matter.Constraint,
//     Composites = Matter.Composites,
//     Composite = Matter.Composite;
//   // create an engine
//   var engine = Engine.create();

//   // create a renderer
//   var render = Render.create({
//     // element: cvsRef.current,
//     canvas: cvsRef.current,
//     engine: engine,
//   });

//   const mouse = Mouse.create(render.canvas);
//   const mouseConstraint = MouseConstraint.create(engine, {
//     mouse: mouse,
//     constraint: {
//       stiffness: 1,
//       render: {
//         visible: false,
//       },
//     },
//   });

//   // create two boxes and a ground
//   // var boxA = Bodies.rectangle(400, 200, 80, 80);
//   // var boxB = Bodies.rectangle(450, 50, 80, 80);

//   var group = Body.nextGroup(true);

//   var ropeC = Composites.stack(
//     600,
//     50,
//     13,
//     1,
//     10,
//     10,
//     function (x: number, y: number) {
//       return Bodies.rectangle(x - 20, y, 50, 20, {
//         collisionFilter: { group: group },
//       });
//     }
//   );

//   Composites.chain(ropeC, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
//   Composite.add(
//     ropeC,
//     Constraint.create({
//       bodyB: ropeC.bodies[0],
//       pointB: { x: -20, y: 0 },
//       pointA: {
//         x: ropeC.bodies[0].position.x,
//         y: ropeC.bodies[0].position.y,
//       },
//       stiffness: 0.5,
//     })
//   );
//   const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

//   // add all of the bodies to the world
//   Composite.add(engine.world, [mouseConstraint, ropeC, ground]);

//   // run the renderer
//   Render.run(render);

//   // create runner
//   const runner = Runner.create();

//   // run the engine
//   Runner.run(runner, engine);
// }, [cvsRef]);
