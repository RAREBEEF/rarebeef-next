import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import angleToRadians from "../tools/angleToRadians";
import { PhonesPropType } from "../types";
import gsap from "gsap";
import useCalcScroll from "../hooks/useCalcScroll";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

const Phones: React.FC<PhonesPropType> = ({ sectionRef }) => {
  const calcScroll = useCalcScroll();
  const [scale, setScale] = useState<number>(
    ((window.innerWidth - 300) / 1200) * 0.3 + 0.7
  );
  const controlRef = useRef<any>(null);
  const groupRef = useRef<any>(null);

  useEffect(() => {
    if (!controlRef.current) {
      return;
    }

    const control = controlRef.current;

    control.dispose();
    control.enableZoom = false;
    control.enablePan = false;
    control.enableRotate = false;
    control.reverseOrbit = false;
    control.object.position.z = 0;
    control.object.position.x = -5;
    control.object.position.y = -1;
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !controlRef.current) {
      return;
    }

    const controlPos = controlRef.current.object.position;

    const windowScrollListener = () => {
      let scrollProgress = calcScroll(sectionRef);

      if (scrollProgress <= 0 || scrollProgress >= 1.5) {
        return;
      } else if (scrollProgress >= 0 && scrollProgress < 0.2) {
        // scrollProgress가 0~0.2 사이인 경우에도 최대값을 1로 잡기 위해 5를 곱한다.
        scrollProgress *= 5;

        gsap.to(controlPos, 0.3, {
          x: -5 + 5 * scrollProgress,
          y: -1,
          z: 0 + 3 * scrollProgress,
          ease: "linear",
        });
      } else if (scrollProgress >= 0.2 && scrollProgress < 0.4) {
        // scrollProgress가 0.2~0.4 사이인 경우에도 최소값을 0, 최대값을 1로 잡기 위해 0.2를 빼고 5를 곱한다. 이후 반복
        scrollProgress = (scrollProgress - 0.2) * 5;

        gsap.to(controlPos, 0.3, {
          x: 0 + 5 * scrollProgress,
          y: -1,
          z: 3 - 3 * scrollProgress,
          ease: "linear",
        });
      } else if (scrollProgress >= 0.4 && scrollProgress < 0.6) {
        scrollProgress = (scrollProgress - 0.4) * 5;

        gsap.to(controlPos, 0.3, {
          x: 5 - 5 * scrollProgress,
          y: -1,
          z: 0 - 1 * scrollProgress,
          ease: "linear",
        });
      } else if (scrollProgress >= 0.6 && scrollProgress < 0.8) {
        scrollProgress = (scrollProgress - 0.6) * 5;

        gsap.to(controlPos, 0.3, {
          x: 0,
          y: -1 - 5.5 * scrollProgress,
          z: -1,
          ease: "linear",
        });
      } else if (scrollProgress >= 0.8 && scrollProgress <= 1.05) {
        scrollProgress = (scrollProgress - 0.8) * 5;

        gsap.to(controlPos, 0.3, {
          x: 0 - 5 * scrollProgress,
          y: -6.5 + 6 * scrollProgress,
          z: -1 + 6 * scrollProgress,
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
  }, [calcScroll, sectionRef]);

  return (
    <>
      <group
        ref={groupRef}
        scale={scale}
        // rotation={[0, angleToRadians(-45), 0]}
        // rotation={[0, angleToRadians(45), 0]}
        // rotation={[0, 0, 0]}
        // position={[0, -1, 0]}
      >
        <ToDoModel
          rotation={[angleToRadians(90), 0, 0]}
          // scale={0.02}
          scale={0.03}
          // position={[-1.1, 0.3, 0]}
          position={[0, 0, 0.5]}
        />
        <WeatherModel
          rotation={[angleToRadians(90), 0, angleToRadians(180)]}
          scale={0.03}
          // position={[1.1, -0.3, 0]}
          position={[0, -2, -0.5]}
        />
        <OrbitControls ref={controlRef} />
        {/* <PerspectiveCamera  /> */}
        {/* <spotLight
          args={["#fff", 1, 80, angleToRadians(100), 0.4]}
          position={[0, 0, -10]}
        /> */}
        {/* <spotLight
          args={["#fff", 1, 80, angleToRadians(200), 0]}
          position={[0, 5, 0]}
        /> */}
        <pointLight args={["#fff", 3]} position={[0, 0, -10]} />
        <pointLight args={["#fff", 3]} position={[0, 0, 10]} />
      </group>
    </>
  );
};

export default Phones;

type ToDoGLTFResult = GLTF & {
  nodes: {
    object_A_0: THREE.Mesh;
    object001_alu_0: THREE.Mesh;
    object002_fash_0: THREE.Mesh;
    object003_gryl_0: THREE.Mesh;
    object004_lense_0: THREE.Mesh;
    object005_dchr_0: THREE.Mesh;
    object006_bezel_0: THREE.Mesh;
    object007_but_0: THREE.Mesh;
    object008_ant_0: THREE.Mesh;
    object009_chr_0: THREE.Mesh;
    object010_scr_0: THREE.Mesh;
    object011_glsl_0: THREE.Mesh;
    object012_glass_0: THREE.Mesh;
    object013_misc1_0: THREE.Mesh;
    object014_logo_0: THREE.Mesh;
  };
  materials: {
    ["material.001"]: THREE.MeshStandardMaterial;
    ["material_1.001"]: THREE.MeshStandardMaterial;
    ["fash.001"]: THREE.MeshStandardMaterial;
    ["gryl.001"]: THREE.MeshStandardMaterial;
    ["lense.001"]: THREE.MeshStandardMaterial;
    ["dchr.001"]: THREE.MeshStandardMaterial;
    ["bezel.003"]: THREE.MeshStandardMaterial;
    ["material_7.001"]: THREE.MeshStandardMaterial;
    ["material_8.001"]: THREE.MeshStandardMaterial;
    ["material_9.001"]: THREE.MeshStandardMaterial;
    ["material_10.001"]: THREE.MeshStandardMaterial;
    ["glsl.001"]: THREE.MeshStandardMaterial;
    ["glass.001"]: THREE.MeshStandardMaterial;
    ["misc1.001"]: THREE.MeshStandardMaterial;
    ["logo.001"]: THREE.MeshStandardMaterial;
  };
};

type WeatherGLTFResult = GLTF & {
  nodes: {
    object_A_0: THREE.Mesh;
    object001_alu_0: THREE.Mesh;
    object002_fash_0: THREE.Mesh;
    object003_gryl_0: THREE.Mesh;
    object004_lense_0: THREE.Mesh;
    object005_dchr_0: THREE.Mesh;
    object006_bezel_0: THREE.Mesh;
    object007_but_0: THREE.Mesh;
    object008_ant_0: THREE.Mesh;
    object009_chr_0: THREE.Mesh;
    object010_scr_0: THREE.Mesh;
    object011_glsl_0: THREE.Mesh;
    object012_glass_0: THREE.Mesh;
    object013_misc1_0: THREE.Mesh;
    object014_logo_0: THREE.Mesh;
  };
  materials: {
    ["material.001"]: THREE.MeshStandardMaterial;
    ["material_1.001"]: THREE.MeshStandardMaterial;
    ["fash.001"]: THREE.MeshStandardMaterial;
    ["gryl.001"]: THREE.MeshStandardMaterial;
    ["lense.001"]: THREE.MeshStandardMaterial;
    ["dchr.001"]: THREE.MeshStandardMaterial;
    ["bezel.003"]: THREE.MeshStandardMaterial;
    ["material_7.001"]: THREE.MeshStandardMaterial;
    ["material_8.001"]: THREE.MeshStandardMaterial;
    ["material_9.001"]: THREE.MeshStandardMaterial;
    ["material_10.001"]: THREE.MeshStandardMaterial;
    ["glsl.001"]: THREE.MeshStandardMaterial;
    ["glass.001"]: THREE.MeshStandardMaterial;
    ["misc1.001"]: THREE.MeshStandardMaterial;
    ["logo.001"]: THREE.MeshStandardMaterial;
  };
};

function ToDoModel({ ...props }: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("models/toDo.glb") as ToDoGLTFResult;
  return (
    <group ref={group} {...props} dispose={null} {...props}>
      <group rotation={[-Math.PI, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[-0.04, 0.81, 0.05]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object_A_0.geometry}
              material={materials["material.001"]}
            />
          </group>
          <group
            position={[-0.05, 0, 0.05]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object001_alu_0.geometry}
              material={materials["material_1.001"]}
            />
          </group>
          <group
            position={[11.65, 69.22, -1.8]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object002_fash_0.geometry}
              material={materials["fash.001"]}
            />
          </group>
          <group
            position={[4.22, 59.37, 0.51]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object003_gryl_0.geometry}
              material={materials["gryl.001"]}
            />
          </group>
          <group
            position={[17.27, 61.04, 0.28]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object004_lense_0.geometry}
              material={materials["lense.001"]}
            />
          </group>
          <group
            position={[18.84, 58.09, -3.35]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object005_dchr_0.geometry}
              material={materials["dchr.001"]}
            />
          </group>
          <group
            position={[-0.05, 0, 3.49]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object006_bezel_0.geometry}
              material={materials["bezel.003"]}
            />
          </group>
          <group
            position={[0, 36.09, 0.1]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object007_but_0.geometry}
              material={materials["material_7.001"]}
            />
          </group>
          <group
            position={[-0.05, 0, 0.05]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object008_ant_0.geometry}
              material={materials["material_8.001"]}
            />
          </group>
          <group
            position={[18.84, 58.08, -3.11]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object009_chr_0.geometry}
              material={materials["material_9.001"]}
            />
          </group>
          <group
            position={[-0.05, 0, 3.86]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object010_scr_0.geometry}
              material={materials["material_10.001"]}
            />
          </group>
          <group
            position={[18.84, 58.08, -3.65]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object011_glsl_0.geometry}
              material={materials["glsl.001"]}
            />
          </group>
          <group
            position={[-0.05, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object012_glass_0.geometry}
              material={materials["glass.001"]}
            />
          </group>
          <group
            position={[18.83, 59.04, 0.03]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object013_misc1_0.geometry}
              material={materials["misc1.001"]}
            />
          </group>
          <group
            position={[0.5, 6.14, -3.08]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object014_logo_0.geometry}
              material={materials["logo.001"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

function WeatherModel({ ...props }: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF(
    "models/weather.glb"
  ) as WeatherGLTFResult;
  return (
    <group ref={group} {...props} dispose={null} {...props}>
      <group rotation={[-Math.PI, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group
            position={[-0.04, 0.81, 0.05]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object_A_0.geometry}
              material={materials["material.001"]}
            />
          </group>
          <group
            position={[-0.05, 0, 0.05]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object001_alu_0.geometry}
              material={materials["material_1.001"]}
            />
          </group>
          <group
            position={[11.65, 69.22, -1.8]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object002_fash_0.geometry}
              material={materials["fash.001"]}
            />
          </group>
          <group
            position={[4.22, 59.37, 0.51]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object003_gryl_0.geometry}
              material={materials["gryl.001"]}
            />
          </group>
          <group
            position={[17.27, 61.04, 0.28]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object004_lense_0.geometry}
              material={materials["lense.001"]}
            />
          </group>
          <group
            position={[18.84, 58.09, -3.35]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object005_dchr_0.geometry}
              material={materials["dchr.001"]}
            />
          </group>
          <group
            position={[-0.05, 0, 3.49]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object006_bezel_0.geometry}
              material={materials["bezel.003"]}
            />
          </group>
          <group
            position={[0, 36.09, 0.1]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object007_but_0.geometry}
              material={materials["material_7.001"]}
            />
          </group>
          <group
            position={[-0.05, 0, 0.05]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object008_ant_0.geometry}
              material={materials["material_8.001"]}
            />
          </group>
          <group
            position={[18.84, 58.08, -3.11]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object009_chr_0.geometry}
              material={materials["material_9.001"]}
            />
          </group>
          <group
            position={[-0.05, 0, 3.86]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object010_scr_0.geometry}
              material={materials["material_10.001"]}
            />
          </group>
          <group
            position={[18.84, 58.08, -3.65]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object011_glsl_0.geometry}
              material={materials["glsl.001"]}
            />
          </group>
          <group
            position={[-0.05, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object012_glass_0.geometry}
              material={materials["glass.001"]}
            />
          </group>
          <group
            position={[18.83, 59.04, 0.03]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object013_misc1_0.geometry}
              material={materials["misc1.001"]}
            />
          </group>
          <group
            position={[0.5, 6.14, -3.08]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <mesh
              geometry={nodes.object014_logo_0.geometry}
              material={materials["logo.001"]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("models/weather.glb");

useGLTF.preload("models/toDo.glb");
