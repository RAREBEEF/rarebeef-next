import styles from "./InitLoading.module.scss";
import loadingIcon from "../public/icons/loading.svg";
import Image from "next/image";
import { InitLoadingPropType } from "../types";
import { useEffect, useState } from "react";
import classNames from "classnames";

const InitLoading: React.FC<InitLoadingPropType> = ({ init }) => {
  const [disable, setDisable] = useState<boolean>(false);

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
      <div className={styles["icon--loading"]}>
        <Image src={loadingIcon} alt="Loading..." />
      </div>
    </div>
  );
};

export default InitLoading;
