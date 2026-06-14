import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.logo}>📐 PL Resolver</span>
            <p>Solução computacional para o Desafio ENADE 2021</p>
          </div>
          <div className={styles.links}>
            <a href="#problema">Problema</a>
            <a href="#modelo">Modelagem</a>
            <a href="#resolver">Resolver</a>
            <a href="#passo-a-passo">Passo a Passo</a>
          </div>
          <div className={styles.info}>
            <span className="badge badge-purple">ENADE 2021</span>
            <span className="badge badge-cyan">Sistemas de Informação</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <span>© 2024 — Sistemas de Informação | Atividade de Otimização de Produção</span>
          <span>React + Vite · Deploy Vercel</span>
        </div>
      </div>
    </footer>
  )
}
