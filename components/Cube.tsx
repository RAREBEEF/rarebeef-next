import classNames from "classnames";
import styles from "./Cube.module.scss";

const Cube = () => {
  return (
    <section className={styles.container}>
      <div
        className={styles.cube}
      >
        <div className={classNames(styles.face, styles.front)}></div>
        <div className={classNames(styles.face, styles.back)}></div>
        <div className={classNames(styles.face, styles.top)}></div>
        <div className={classNames(styles.face, styles.bottom)}></div>
        <div className={classNames(styles.face, styles.left)}></div>
        <div className={classNames(styles.face, styles.right)}></div>
      </div>
    </section>
  );
};

export default Cube;
