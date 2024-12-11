import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <p className={styles.paragraph}>Gerenciamento de produtos</p>
        <Link href="../pages/Clients" className={styles.button}>
          Começar Agora
        </Link>
      </section>
    </div>
  );
}
