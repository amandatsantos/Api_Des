import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="../" className={styles.link}>
          Home
        </Link>
        <Link href="../pages/Clients" className={styles.link}>
          Clientes
        </Link>
        <Link href="../pages/Purchase" className={styles.link}>
          Compras
        </Link>
        <Link href="../pages/Products" className={styles.link}>
          Produtos
        </Link>
      </nav>
    </header>
  );
};

export default Header;
