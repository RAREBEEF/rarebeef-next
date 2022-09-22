import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { BeefPropType } from "../types";
import gsap from "gsap";
import angleToRadians from "../tools/angleToRadians";
import useCalcScroll from "../hooks/useCalcScroll";
import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { BeefModelPropType } from "../types";
import { PlateModelPropType } from "../types";

const Beef: React.FC<BeefPropType> = ({ sectionRef, setText }) => {
  const calcScroll = useCalcScroll(sectionRef);
  const [scale, setScale] = useState<number>(
    ((window.innerWidth - 300) / 1200) * 0.3 + 0.7
  );
  const controlRef = useRef<any>(null);
  const groupRef = useRef<any>(null);
  const beefRef = useRef<any>(null);
  const plateRef = useRef<any>(null);
  const lightRef = useRef<any>(null);

  useEffect((): void => {
    if (!controlRef.current || !beefRef.current) {
      return;
    }

    const control = controlRef.current;
    const beef = beefRef.current;

    control.dispose();
    control.enableZoom = false;
    control.enablePan = false;
    control.enableRotate = false;
    control.reverseOrbit = false;
    control.object.position.x = 0;
    control.object.position.y = 10;
    control.object.position.z = 20;
    beef.position.y = 30;
  }, []);

  useEffect(() => {
    const windowScrollListener = () => {
      if (
        !sectionRef.current ||
        !controlRef.current ||
        !groupRef.current ||
        !beefRef.current
      ) {
        return;
      }

      const controlPos = controlRef.current.object.position;
      const beefPos = beefRef.current.position;
      const groupPos = groupRef.current.position;

      let scrollProgress = calcScroll(5);

      if (scrollProgress <= 0 || scrollProgress >= 1.9) {
        return;
      }

      if (scrollProgress >= 0.15 && scrollProgress < 0.3) {
        setText(1);
      } else if (scrollProgress >= 0.45 && scrollProgress < 0.6) {
        setText(2);
      } else if (scrollProgress >= 0.75 && scrollProgress < 0.9) {
        setText(3);
      } else if (scrollProgress >= 0.95 && scrollProgress < 1) {
        setText(4);
      } else if (scrollProgress >= 1) {
        setText(4);
        gsap.to(groupPos, 0.2, {
          x: 3.2,
          y: 0,
          z: 0,
        });
      } else {
        setText(0);
      }

      if (scrollProgress >= 0 && scrollProgress < 0.2) {
        scrollProgress *= 5;

        gsap.to(groupPos, 0.2, {
          x: 0,
          y: 0,
          z: 0,
        });
        gsap.to(controlPos, 0.2, {
          x: 0,
          y: 10,
          z: 20 - 5 * scrollProgress,
          ease: "linear",
        });
        gsap.to(beefPos, 0.2, {
          y: 30 - 10 * scrollProgress,
          ease: "linear",
        });
      } else if (scrollProgress >= 0.2 && scrollProgress < 0.4) {
        scrollProgress = (scrollProgress - 0.2) * 5;

        gsap.to(groupPos, 0.2, {
          x: 0,
          y: 0,
          z: 0,
        });
        gsap.to(controlPos, 0.2, {
          x: 0,
          y: 10,
          z: 15 - 5 * scrollProgress,
          ease: "linear",
        });
        gsap.to(beefPos, 0.2, {
          y: 20 - 10 * scrollProgress,
          ease: "linear",
        });
      } else if (scrollProgress >= 0.4 && scrollProgress < 0.6) {
        scrollProgress = (scrollProgress - 0.4) * 5;

        gsap.to(groupPos, 0.2, {
          x: 0,
          y: 0,
          z: 0,
        });
        gsap.to(controlPos, 0.2, {
          x: 0,
          y: 10 - 2 * scrollProgress,
          z: 10 - 5 * scrollProgress,
          ease: "linear",
        });
        gsap.to(beefPos, 0.2, {
          y: 10 - 5 * scrollProgress,
          ease: "linear",
        });
      } else if (scrollProgress >= 0.6 && scrollProgress < 0.8) {
        scrollProgress = (scrollProgress - 0.6) * 5;

        gsap.to(groupPos, 0.2, {
          x: 0,
          y: 0,
          z: 0,
        });
        gsap.to(controlPos, 0.2, {
          x: 0,
          y: 8 - 4 * scrollProgress,
          z: 5 - 5 * scrollProgress,
          ease: "linear",
        });
        gsap.to(beefPos, 0.2, {
          y: 5 - 5 * scrollProgress,
          ease: "linear",
        });
      } else if (scrollProgress >= 0.8 && scrollProgress <= 1) {
        scrollProgress = (scrollProgress - 0.8) * 5;

        gsap.to(groupPos, 0.2, {
          x: 0 + 3.2 * scrollProgress,
          y: 0,
          z: 0,
        });
        gsap.to(controlPos, 0.2, {
          x: 0,
          y: 4,
          z: 0,
          ease: "linear",
        });
        gsap.to(beefPos, 0.2, {
          y: 0,
          ease: "linear",
        });
      }
    };

    window.addEventListener("scroll", windowScrollListener);

    const windowResizeListener = () => {
      setScale(
        window.innerWidth < 300
          ? 0.7
          : window.innerWidth > 1500
          ? 1
          : ((window.innerWidth - 300) / 1200) * 0.3 + 0.7
      );
    };

    window.addEventListener("resize", windowResizeListener);

    return () => {
      window.removeEventListener("scroll", windowScrollListener);
      window.removeEventListener("resize", windowResizeListener);
    };
  }, [calcScroll, sectionRef, setText]);

  return (
    <group scale={scale}>
      <group ref={groupRef}>
        <BeefModel beefRef={beefRef} />
        <PlateModel plateRef={plateRef} />
        <spotLight
          args={["#fff", 1, 15, angleToRadians(140), 0, 0]}
          position={[0, 10, 3]}
          ref={lightRef}
          castShadow
        />
      </group>
      <OrbitControls ref={controlRef} />
      <ambientLight args={["#fff", 0.2]} />
    </group>
  );
};

export default Beef;

type BeefGLTFResult = GLTF & {
  nodes: {
    겉면001: THREE.Mesh;
    표면001: THREE.Mesh;
    무늬1001: THREE.Mesh;
    무늬2001: THREE.Mesh;
    무늬3001: THREE.Mesh;
    테두리002: THREE.Mesh;
  };
  materials: {
    겉면: THREE.MeshStandardMaterial;
    표면: THREE.MeshStandardMaterial;
    무늬: THREE.MeshStandardMaterial;
    테두리: THREE.MeshStandardMaterial;
  };
};

type PlateGLTFResult = GLTF & {
  nodes: {
    실린더002: THREE.Mesh;
  };
  materials: {
    ["매테리얼.003"]: THREE.MeshStandardMaterial;
  };
};

const BeefModel: React.FC<BeefModelPropType> = ({ beefRef }) => {
  const { nodes, materials } = useGLTF("/models/beef.glb") as BeefGLTFResult;

  // const onBeefClick = () => {
  //   const win = window.open(
  //     "https://drive.google.com/file/d/1sfBqd8BRLTbYAK3rcXpflO4fBj0hIRj5/view?usp=sharing",
  //     "_blank"
  //   );

  //   if (!win) {
  //     return;
  //   }

  //   win.focus();
  // };
  // const onPointerEnter = () => {
  //   const bodyEl = document.querySelector("body");

  //   if (!bodyEl) {
  //     return;
  //   }

  //   bodyEl.style.cursor = "pointer";
  // };
  // const onPointerLeave = () => {
  //   const bodyEl = document.querySelector("body");

  //   if (!bodyEl) {
  //     return;
  //   }

  //   bodyEl.style.cursor = "default";
  // };
  return (
    <group
      ref={beefRef}
      dispose={null}
      scale={0.95}
      position={[0.05, 0, 0.3]}
      rotation={[angleToRadians(-90), 0, angleToRadians(5)]}
    >
      <mesh
        // onClick={onBeefClick}
        // onPointerEnter={onPointerEnter}
        // onPointerLeave={onPointerLeave}
        geometry={nodes.겉면001.geometry}
        material={materials.겉면}
        position={[-0.35, 0.05, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[11.58, 1, 14.34]}
        castShadow
      />
      <mesh
        geometry={nodes.표면001.geometry}
        material={materials.표면}
        position={[-0.35, 0.04, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[11.58, 1, 14.34]}
      />
      <mesh
        geometry={nodes.무늬1001.geometry}
        material={materials.무늬}
        position={[-1.24, 0.47, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[11.58, 1, 14.34]}
      />
      <mesh
        geometry={nodes.무늬2001.geometry}
        material={materials.무늬}
        position={[1.36, -0.38, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[11.58, 1, 14.34]}
      />
      <mesh
        geometry={nodes.무늬3001.geometry}
        material={materials.무늬}
        position={[0.03, -0.23, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[11.58, 1, 14.34]}
      />
      <mesh
        geometry={nodes.테두리002.geometry}
        material={materials.테두리}
        position={[-0.35, 0.04, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[11.58, 1, 14.34]}
      />
    </group>
  );
};

const PlateModel: React.FC<PlateModelPropType> = ({ plateRef }) => {
  const { nodes, materials } = useGLTF("models/plate.glb") as PlateGLTFResult;
  return (
    <group
      ref={plateRef}
      dispose={null}
      scale={0.9}
      position={[-0.2, -0.45, 0]}
    >
      <mesh
        geometry={nodes.실린더002.geometry}
        material={materials["매테리얼.003"]}
        position={[0.2, 0, 0]}
        scale={[3.26, 0.02, 3.26]}
        receiveShadow
      />
    </group>
  );
};

useGLTF.preload("/models/beef.glb");
useGLTF.preload("models/plate.glb");
