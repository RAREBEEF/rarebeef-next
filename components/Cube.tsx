import classNames from "classnames";
import styles from "./Cube.module.scss";

const Cube = () => {
  return (
    <section className={styles.container}>
      <div
        className={styles.cube}
        onClick={() =>
          window.open(
            "https://velog.io/@drrobot409/%ED%9A%8C%EC%A0%84-%EA%B0%80%EB%8A%A5%ED%95%9C-%EC%A0%95%EC%9C%A1%EB%A9%B4%EC%B2%B4",
            "_blank"
          )
        }
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
