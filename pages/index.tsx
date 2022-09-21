import React, { useRef } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { HomePropType } from "../types";
import Section from "../components/Section";
import Front from "../components/Front";
import paletteVault from "../sections/paletteVault";
import dailiary from "../sections/dailiary";
import RareBeef from "../components/RareBeef";
import placeReview from "../sections/placeReview";
import ReactNative from "../components/ReactNative";
import metaBeef from "../sections/metaBeef";
import memoryTest from "../sections/memoryTest";
import simpleMemo from "../sections/simpleMemo";
import clock from "../sections/clock";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

const Index: React.FC<HomePropType> = () => {
  const HomeRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={HomeRef} className={classNames(styles.container)}>
      <Seo title="PORTFOLIO" />
      <Front />
      <div className={styles.contour} />
      <RareBeef />
      <Section data={dailiary} />
      <Section data={paletteVault} />
      <ReactNative />
      <Section data={placeReview} />
      <Section data={memoryTest} />
      <Section data={metaBeef} />
      <Section data={clock} />
      <Section data={simpleMemo} />
      <Footer />
    </main>
  );
};

export default Index;
