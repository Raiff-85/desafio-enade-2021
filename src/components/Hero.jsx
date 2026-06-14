import styles from './Hero.module.css'

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />
      <div className="container">
        <div className={styles.inner}>
          <div className={`${styles.badges} animate-fadeInUp`}>
            <span className="badge badge-purple">
              <span>📐</span> ENADE 2021
            </span>
            <span className="badge badge-cyan">
              <span>⚡</span> Sistemas de Informação
            </span>
          </div>

          <h1 className={`${styles.title} animate-fadeInUp`} style={{ animationDelay: '0.1s' }}>
            Programação Linear
            <br />
            <span className="gradient-text">Otimização de Produção</span>
          </h1>

          <p className={`${styles.desc} animate-fadeInUp`} style={{ animationDelay: '0.2s' }}>
            Modelagem matemática e solução computacional do problema de otimização
            de custos de produção em duas fábricas — questão real do ENADE 2021
            para o curso de Sistemas de Informação.
          </p>

          <div className={`${styles.stats} animate-fadeInUp`} style={{ animationDelay: '0.3s' }}>
            <div className={styles.stat}>
              <span className={styles.statValue}>2</span>
              <span className={styles.statLabel}>Fábricas</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>3</span>
              <span className={styles.statLabel}>Produtos</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>3</span>
              <span className={styles.statLabel}>Restrições</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>1</span>
              <span className={styles.statLabel}>Ótimo Global</span>
            </div>
          </div>

          <div className={`${styles.actions} animate-fadeInUp`} style={{ animationDelay: '0.4s' }}>
            <a href="#modelo" className="btn btn-primary">
              Ver Modelagem ↓
            </a>
            <a href="#solver" className="btn btn-outline">
              Executar Solver →
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
