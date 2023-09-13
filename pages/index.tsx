import React, { useRef } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { HomePropType } from "../types";
import Seo from "../components/Seo";
import BeefAnimation from "../components/BeefAnimation";
import Flashlight from "../components/Flashlight";
import Google from "../components/Google";

const Index: React.FC<HomePropType> = () => {
  const homeContainerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={homeContainerRef} className={classNames(styles.container)}>
      <Seo />
      {/* <BeefAnimation /> */}
      {/* <Flashlight /> */}
      {/* <Google /> */}
      <p
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        시작 화면 리뉴얼 작업 중입니다.
      </p>
    </main>
  );
};

export default Index;
