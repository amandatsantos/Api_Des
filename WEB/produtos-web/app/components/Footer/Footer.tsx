import styles from "./footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <h1 className={styles.h1}>Feito com ❤️ em Itapetinga</h1>
      </nav>
    </footer>
  );
};

export default Footer;
