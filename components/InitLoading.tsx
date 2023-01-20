import styles from "./InitLoading.module.scss";
import { InitLoadingPropType } from "../types";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Lottie from "lottie-web";
import loadingAnimation from "../public/json/loadingAnimation.json";

const InitLoading: React.FC<InitLoadingPropType> = ({ init }) => {
  const [disable, setDisable] = useState<boolean>(false);
  const animator = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animator.current) return;

    const animation = Lottie.loadAnimation({
      container: animator.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: loadingAnimation,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  useEffect(() => {
    if (!init) return;

    const timer = setTimeout(() => {
      setDisable(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, [init]);

  return (
    <div
      className={classNames(styles.container, init && styles["fade-out"])}
      style={{ display: disable ? "none" : "flex" }}
    >
      <div>
        <div ref={animator} />
      </div>
      <p className={styles["text"]}>Loading</p>
    </div>
  );
};

export default InitLoading;
