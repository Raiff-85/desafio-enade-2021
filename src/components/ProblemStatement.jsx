import styles from './ProblemStatement.module.css'

export default function ProblemStatement() {
  return (
    <section id="problema" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-amber">📋 Enunciado</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            O Problema Real do <span className="gradient-text">ENADE 2021</span>
          </h2>
          <p className="section-subtitle">
            Questão aplicada aos estudantes de Sistemas de Informação de todo o Brasil
          </p>
        </div>

        <div className={styles.grid}>
          {/* Enunciado */}
          <div className={`glass-card ${styles.statement}`}>
            <div className={styles.statementHeader}>
              <span className={styles.questionTag}>ENADE 2021 — Questão</span>
              <span className={styles.area}>Pesquisa Operacional</span>
            </div>
            <p className={styles.text}>
              Suponha que uma empresa de montagem de computadores fabrica três tipos básicos de
              dispositivos: <strong>desktops</strong>, <strong>notebooks</strong> e <strong>netbooks</strong>.
              A produção da empresa ocorre em suas duas fábricas, uma na{' '}
              <span className={styles.highlight}>Zona Franca de Manaus</span> e outra na{' '}
              <span className={styles.highlight}>região Sul do país</span>.
            </p>
            <p className={styles.text} style={{ marginTop: '1rem' }}>
              De acordo com a última venda realizada, a empresa precisa entregar{' '}
              <strong>16 mil desktops</strong>, <strong>6 mil notebooks</strong> e{' '}
              <strong>28 mil netbooks</strong>.
            </p>
            <div className={styles.factoryBlocks}>
              <div className={styles.factoryCard}>
                <div className={styles.factoryIcon}>🏭</div>
                <div className={styles.factoryName}>Fábrica de Manaus</div>
                <div className={styles.factoryDetail}>Zona Franca</div>
                <div className={styles.factoryMetrics}>
                  <span>8.000 desktops/dia</span>
                  <span>1.000 notebooks/dia</span>
                  <span>2.000 netbooks/dia</span>
                </div>
                <div className={styles.factoryCost}>
                  R$ 150.000<span>/dia</span>
                </div>
              </div>
              <div className={styles.factoryCard}>
                <div className={styles.factoryIcon}>🏭</div>
                <div className={styles.factoryName}>Fábrica do Sul</div>
                <div className={styles.factoryDetail}>Região Sul</div>
                <div className={styles.factoryMetrics}>
                  <span>2.000 desktops/dia</span>
                  <span>1.000 notebooks/dia</span>
                  <span>7.000 netbooks/dia</span>
                </div>
                <div className={styles.factoryCost}>
                  R$ 210.000<span>/dia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabela de dados */}
          <div className={`glass-card ${styles.tableCard}`}>
            <h3 className={styles.tableTitle}>Resumo dos Dados</h3>
            <div className={styles.tableWrapper}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Fábrica</th>
                    <th>Desktops</th>
                    <th>Notebooks</th>
                    <th>Netbooks</th>
                    <th>Custo/Dia</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>🏭 Manaus</td>
                    <td className="num">8.000</td>
                    <td className="num">1.000</td>
                    <td className="num">2.000</td>
                    <td className="num">R$ 150.000</td>
                  </tr>
                  <tr>
                    <td>🏭 Sul</td>
                    <td className="num">2.000</td>
                    <td className="num">1.000</td>
                    <td className="num">7.000</td>
                    <td className="num">R$ 210.000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className={styles.demandSection}>
              <h4>Demanda Mínima a Entregar</h4>
              <div className={styles.demandGrid}>
                <div className={styles.demandItem}>
                  <span className={styles.demandIcon}>🖥️</span>
                  <span className={styles.demandValue}>16.000</span>
                  <span className={styles.demandLabel}>Desktops</span>
                </div>
                <div className={styles.demandItem}>
                  <span className={styles.demandIcon}>💻</span>
                  <span className={styles.demandValue}>6.000</span>
                  <span className={styles.demandLabel}>Notebooks</span>
                </div>
                <div className={styles.demandItem}>
                  <span className={styles.demandIcon}>📱</span>
                  <span className={styles.demandValue}>28.000</span>
                  <span className={styles.demandLabel}>Netbooks</span>
                </div>
              </div>
            </div>

            <div className={styles.objective}>
              <span className={styles.objectiveIcon}>🎯</span>
              <div>
                <strong>Objetivo:</strong> Determinar o número de dias de operação de cada fábrica
                para <span className={styles.objectiveKey}>minimizar o custo total</span>, satisfazendo
                toda a demanda de entrega.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
