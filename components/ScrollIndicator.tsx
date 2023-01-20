import { useEffect, useRef, useState } from "react";
import { ScrollIndicatorPropType } from "../types";
import styles from "./ScrollIndicator.module.scss";
import _ from "lodash";

const ScrollIndicator: React.FC<ScrollIndicatorPropType> = ({
  homeContainerRef,
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (!homeContainerRef.current || !window) return;

    const { clientHeight } = homeContainerRef.current;

    const windowScrollListener = () => {
      const { scrollY, innerHeight } = window;
      const progress = (scrollY / (clientHeight - innerHeight)) * 100;
      setScrollProgress(progress > 100 ? 100 : progress);
    };

    window.addEventListener("scroll", _.throttle(windowScrollListener, 500));

    return () => {
      window.removeEventListener(
        "scroll",
        _.throttle(windowScrollListener, 500)
      );
    };
  }, [homeContainerRef]);

  return (
    <div className={styles.container}>
      <div className={styles.indicator}>
        <div
          className={styles.bar}
          style={{ transform: `translateX(${-100 + scrollProgress}%)` }}
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
