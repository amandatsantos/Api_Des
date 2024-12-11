import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <p className={styles.paragraph}>Gerenciamento de produtos</p>
        <button className={styles.button}>Começar Agora</button>
      </section>
    </div>
  );
}
