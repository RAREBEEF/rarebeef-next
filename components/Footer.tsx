import styles from "./Footer.module.scss";
import hookedBeefImg from "../public/images/hooked-beef.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        &copy; {new Date().getFullYear()}. RAREBEEF All Rights Reserved.
      </div>

      {/* <div className={styles["hooked-beef-wrapper"]}>
        <Image src={hookedBeefImg} width="75" height="150" alt="HOOKED BEEF" />
      </div> */}
    </footer>
  );
};

export default Footer;
