import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles["icon--loading"]}
        src="/icons/loading.svg"
        alt="Loading..."
      />
    </div>
  );
};

export default Loading;
