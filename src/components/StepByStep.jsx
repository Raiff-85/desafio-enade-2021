import styles from './StepByStep.module.css'

export default function StepByStep() {
  return (
    <section id="passo-a-passo" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-cyan">📖 Resolução</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            Solução <span className="gradient-text">Passo a Passo</span>
          </h2>
          <p className="section-subtitle">
            Método gráfico aplicado ao modelo simplificado (÷ 1.000)
          </p>
        </div>

        <div className={styles.steps}>
          {/* Passo 1 */}
          <div className={`glass-card ${styles.step}`}>
            <div className={styles.stepNumber}>01</div>
            <div className={styles.stepContent}>
              <h3>Identificar as Restrições Ativas</h3>
              <p>
                O ponto ótimo em problemas de minimização está em um vértice da região viável,
                na interseção de ao menos duas restrições. Para encontrar os vértices, resolvemos
                os sistemas lineares formados pelos pares de restrições:
              </p>
              <div className={styles.systemGrid}>
                <SystemSolver
                  title="Interseção: Desktops ∩ Netbooks"
                  equations={[
                    { eq: '4x + y = 8', color: '#6C63FF' },
                    { eq: '2x + 7y = 28', color: '#F472B6' },
                  ]}
                  solution="x = 14/13 ≈ 1,0769 | y = 48/13 ≈ 3,6923"
                  z="Z = 150.000(1,0769) + 210.000(3,6923) ≈ R$ 937.023,08"
                />
                <SystemSolver
                  title="Interseção: Desktops ∩ Notebooks"
                  equations={[
                    { eq: '4x + y = 8', color: '#6C63FF' },
                    { eq: 'x + y = 6', color: '#3ECFCF' },
                  ]}
                  solution="x = 2/3 ≈ 0,6667 | y = 16/3 ≈ 5,3333"
                  z="Z = 150.000(0,6667) + 210.000(5,3333) ≈ R$ 1.220.013,00"
                />
                <SystemSolver
                  title="Interseção: Notebooks ∩ Netbooks"
                  equations={[
                    { eq: 'x + y = 6', color: '#3ECFCF' },
                    { eq: '2x + 7y = 28', color: '#F472B6' },
                  ]}
                  solution="x = 2,8 | y = 3,2"
                  z="Z = 150.000(2,8) + 210.000(3,2) = R$ 1.092.000,00"
                />
              </div>
            </div>
          </div>

          {/* Passo 2 */}
          <div className={`glass-card ${styles.step}`}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h3>Avaliar a Função Objetivo em cada Vértice</h3>
              <p>
                Calculamos Z = 150.000x + 210.000y em cada vértice da região viável
                e identificamos o menor valor:
              </p>
              <div className={styles.tableWrapper}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Vértice</th>
                      <th>x (Manaus)</th>
                      <th>y (Sul)</th>
                      <th>Z = 150.000x + 210.000y</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>A</td>
                      <td className="num">14/13 ≈ 1,0769</td>
                      <td className="num">48/13 ≈ 3,6923</td>
                      <td className="num">≈ R$ 937.023,08</td>
                      <td><span className="badge badge-green">★ Mínimo</span></td>
                    </tr>
                    <tr>
                      <td>C</td>
                      <td className="num">2,8</td>
                      <td className="num">3,2</td>
                      <td className="num">R$ 1.092.000,00</td>
                      <td><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Viável</span></td>
                    </tr>
                    <tr>
                      <td>B</td>
                      <td className="num">2/3 ≈ 0,6667</td>
                      <td className="num">16/3 ≈ 5,3333</td>
                      <td className="num">≈ R$ 1.220.013,00</td>
                      <td><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Viável</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Passo 3 */}
          <div className={`glass-card ${styles.step}`}>
            <div className={styles.stepNumber}>03</div>
            <div className={styles.stepContent}>
              <h3>Identificar a Solução Ótima</h3>
              <p>
                O menor valor de Z ocorre no <strong>Vértice A</strong>, que é a interseção das 
                restrições de Desktops e Netbooks.
              </p>
              <div className={styles.optimalBox}>
                <div className={styles.optimalRow}>
                  <span className={styles.optLabel}>Variável x</span>
                  <span className={styles.optVal}>x* = 14/13 ≈ <strong>1,0769 dias</strong> (Fábrica Manaus)</span>
                </div>
                <div className={styles.optimalRow}>
                  <span className={styles.optLabel}>Variável y</span>
                  <span className={styles.optVal}>y* = 48/13 ≈ <strong>3,6923 dias</strong> (Fábrica Sul)</span>
                </div>
                <div className={`${styles.optimalRow} ${styles.optimalRowHighlight}`}>
                  <span className={styles.optLabel}>Custo Mínimo Z*</span>
                  <span className={styles.optValBig}>≈ R$ 937.023,08</span>
                </div>
              </div>
              <div className={styles.interpretation}>
                <span className={styles.intIcon}>💡</span>
                <div>
                  <strong>Interpretação Prática:</strong> Para atender toda a demanda com custo mínimo,
                  a empresa deve operar a Fábrica de Manaus por aproximadamente <strong>1 dia e 2 horas</strong> e
                  a Fábrica do Sul por aproximadamente <strong>3 dias e 16 horas</strong>.
                  Em dias inteiros (arredondamento conservador): <strong>x = 2, y = 4</strong>,
                  com custo de R$ 1.140.000,00 — mas garantindo todas as demandas.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SystemSolver({ title, equations, solution, z }) {
  return (
    <div className={styles.system}>
      <div className={styles.systemTitle}>{title}</div>
      <div className={styles.systemEqs}>
        {equations.map((e, i) => (
          <div key={i} className={styles.systemEq} style={{ borderLeftColor: e.color }}>
            {e.eq}
          </div>
        ))}
      </div>
      <div className={styles.systemSolution}>
        <span className={styles.solutionLabel}>Solução:</span>
        <code>{solution}</code>
      </div>
      <div className={styles.systemZ}>
        <code>{z}</code>
      </div>
    </div>
  )
}
