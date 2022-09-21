import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      &copy; {new Date().getFullYear()}. RAREBEEF All Rights Reserved.
    </footer>
  );
};

export default Footer;
