import React, { ReactElement, Suspense, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";
import styles from "./RareBeef.module.scss";
import { Canvas } from "@react-three/fiber";
import classNames from "classnames";
import Loading from "../components/Loading";
import Beef from "../scenes/Beef";

const RareBeef = (): ReactElement => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<number>(0);

  return (
    <section className={styles.container} ref={sectionRef}>
      <SectionHeader
        title={["Why", "RAREBEEF?"]}
        subTitle={["Origin", "of", "RAREBEEF"]}
        classes={["RareBeef"]}
      />
      <main className={styles.content}>
        <Suspense fallback={<Loading />}>
          <Canvas className={styles.canvas} shadows dpr={[1, 1.2]}>
            <Beef sectionRef={sectionRef} setText={setText} />
          </Canvas>
        </Suspense>
        <p
          className={classNames(styles["main-text"], text === 1 && styles.show)}
        >
          RAREBEEF는 제가 오래전부터 사용해 온 닉네임 &quot;소고기는레어&quot;에서
          비롯되었습니다.
        </p>
        <p
          className={classNames(styles["main-text"], text === 2 && styles.show)}
        >
          깊은 뜻을 담고 있는 것은 아니지만 오랜 기간 많은 정이 들었고, 또
          심볼로 사용하기 좋은 닉네임이라는 생각이 들었습니다.
        </p>
        <p
          className={classNames(styles["main-text"], text === 3 && styles.show)}
        >
          따라서 이제는 닉네임을 넘어 2D 로고와 3D 모델을 제작하는 등 심볼로서의
          역할을 부여하고 사용 중에 있습니다.
        </p>
        <hgroup className={styles["header-group"]}>
          <h1
            className={classNames(styles["header"], text === 4 && styles.show)}
          >
            THE
          </h1>
          <h1
            className={classNames(styles["header"], text === 4 && styles.show)}
          >
            RARE
          </h1>
          <h1
            className={classNames(styles["header"], text === 4 && styles.show)}
          >
            BEEF
          </h1>
        </hgroup>
      </main>
    </section>
  );
};

export default RareBeef;
