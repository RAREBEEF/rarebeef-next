import styles from "./ProjectList.module.scss";

const ProjectList = () => {
  return (
    <section className={styles.container}>
      <div className={styles["inner-container"]}>
        <div className={styles["header"]}>Project List</div>
        <div className={styles["snap-item"]}>Why RAREBEEF?</div>
        <div className={styles["snap-item"]}>Raebef</div>
        <div className={styles["snap-item"]}>
          Splatoon 3 hompage clone coding
        </div>
        <div className={styles["snap-item"]}>Diary</div>
        <div className={styles["snap-item"]}>Palette Vault</div>
        <div className={styles["snap-item"]}>ToDo & Weather App</div>
        <div className={styles["snap-item"]}>Place Review</div>
        <div className={styles["snap-item"]}>Memory Test</div>
        <div className={styles["snap-item"]}>Meta Beef</div>
        <div className={styles["snap-item"]}>Simple memo</div>
        <div className={styles["bottom-blind"]}></div>
      </div>
    </section>
  );
};

export default ProjectList;
