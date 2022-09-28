import Image from "next/image";
import styles from "./Loading.module.scss";
import loadingIcon from "../public/icons/loading.svg";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles["icon--loading"]}>
        <Image src={loadingIcon} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loading;
