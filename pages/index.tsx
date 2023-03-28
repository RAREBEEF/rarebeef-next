import React, { useRef } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { HomePropType } from "../types";

import Seo from "../components/Seo";
import BeefAnimation from "../components/BeefAnimation";

const Index: React.FC<HomePropType> = () => {
  const homeContainerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={homeContainerRef} className={classNames(styles.container)}>
      <Seo />
      <BeefAnimation />
    </main>
  );
};

export default Index;
