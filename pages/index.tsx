import React, { useRef } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
import { HomePropType } from "../types";
import Section from "../components/Section";
import Header from "../components/Header";
import paletteVault from "../sections/paletteVault";
import raebef from "../sections/raebef";
import splatoon from "../sections/splatoon";
import diary from "../sections/diary";
import RareBeef from "../components/RareBeef";
import placeReview from "../sections/placeReview";
import ReactNative from "../components/ReactNative";
import metaBeef from "../sections/metaBeef";
import memoryTest from "../sections/memoryTest";
import simpleMemo from "../sections/simpleMemo";
import clock from "../sections/clock";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import ClockApp from "../components/ClockApp";
import MemoryTestApp from "../components/MemoryTestApp";
import Front from "../components/Front";
import ScrollIndicator from "../components/ScrollIndicator";
import ProjectList from "../components/ProjectList";

const Index: React.FC<HomePropType> = () => {
  const homeContainerRef = useRef<HTMLDivElement>(null);

  return (
    <main ref={homeContainerRef} className={classNames(styles.container)}>
      <Seo title="PORTFOLIO" />
      {/* <Front /> */}
      <Header />
      {/* <ProjectList /> */}
      <div className={styles.contour} />
      <RareBeef />
      <Section data={raebef} />
      <Section data={splatoon} />
      <Section data={diary} />
      <Section data={paletteVault} />
      <ReactNative />
      {/* <Section data={placeReview} /> */}
      <Section data={memoryTest}>
        <MemoryTestApp />
      </Section>
      <Section data={metaBeef} />
      {/* <Section data={clock}>
        <ClockApp />
      </Section> */}
      <Section data={simpleMemo} />
      <Footer />
      {/* <ScrollIndicator homeContainerRef={homeContainerRef} /> */}
    </main>
  );
};

export default Index;
