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
              <h3>Encontrar os Vértices da Região Viável</h3>
              <p>
                O ponto ótimo em problemas de minimização está em um vértice da região viável.
                Resolvemos os sistemas lineares formados pelos pares de restrições e verificamos
                quais pontos satisfazem <strong>todas</strong> as três restrições (viabilidade):
              </p>
              <div className={styles.systemGrid}>
                <SystemSolver
                  title="Notebooks ∩ Netbooks → Vértice A ✓ VIÁVEL"
                  feasible
                  equations={[
                    { eq: 'x + y = 6', color: '#3ECFCF' },
                    { eq: '2x + 7y = 28', color: '#F472B6' },
                  ]}
                  solution="x = 2,8 dias | y = 3,2 dias"
                  z="Z = 150.000(2,8) + 210.000(3,2) = R$ 1.092.000,00"
                />
                <SystemSolver
                  title="Desktops ∩ Notebooks → Vértice B ✓ VIÁVEL"
                  feasible={false}
                  equations={[
                    { eq: '4x + y = 8', color: '#6C63FF' },
                    { eq: 'x + y = 6', color: '#3ECFCF' },
                  ]}
                  solution="x = 2/3 ≈ 0,6667 | y = 16/3 ≈ 5,3333"
                  z="Z = 150.000(0,6667) + 210.000(5,3333) ≈ R$ 1.220.013,00"
                />
                <SystemSolver
                  title="Desktops ∩ Netbooks → Vértice C ✗ INVIÁVEL"
                  feasible={false}
                  infeasible
                  equations={[
                    { eq: '4x + y = 8', color: '#6C63FF' },
                    { eq: '2x + 7y = 28', color: '#F472B6' },
                  ]}
                  solution="x = 14/13 ≈ 1,077 | y = 48/13 ≈ 3,692"
                  z="Viola notebooks: 1,077 + 3,692 = 4,769 < 6 ✗"
                />
              </div>
              <div className={styles.feasibilityNote}>
                <span>⚠️</span>
                <div>
                  A interseção de Desktops ∩ Netbooks gera o ponto (1,077; 3,692),
                  porém <strong>esse ponto viola a restrição de Notebooks</strong>{' '}
                  (1,077 + 3,692 = 4,769 &lt; 6). Por isso, ele <strong>não pertence à região viável</strong>{' '}
                  e não pode ser candidato à solução ótima.
                </div>
              </div>
            </div>
          </div>

          {/* Passo 2 */}
          <div className={`glass-card ${styles.step}`}>
            <div className={styles.stepNumber}>02</div>
            <div className={styles.stepContent}>
              <h3>Avaliar a Função Objetivo nos Vértices Viáveis</h3>
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
                      <th>Viável?</th>
                      <th>Z = 150.000x + 210.000y</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="highlight">
                      <td>A (Nb ∩ Nt)</td>
                      <td className="num">2,8</td>
                      <td className="num">3,2</td>
                      <td><span className="badge badge-green">✓ Sim</span></td>
                      <td className="num">R$ 1.092.000,00</td>
                      <td><span className="badge badge-green">★ Mínimo</span></td>
                    </tr>
                    <tr>
                      <td>B (Dk ∩ Nb)</td>
                      <td className="num">0,6667</td>
                      <td className="num">5,3333</td>
                      <td><span className="badge badge-green">✓ Sim</span></td>
                      <td className="num">≈ R$ 1.220.013,00</td>
                      <td><span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Viável</span></td>
                    </tr>
                    <tr style={{ opacity: 0.5 }}>
                      <td>C (Dk ∩ Nt)</td>
                      <td className="num">1,0769</td>
                      <td className="num">3,6923</td>
                      <td><span className="badge badge-amber">✗ Inviável</span></td>
                      <td className="num" style={{ color: 'var(--text-muted)' }}>—</td>
                      <td><span style={{ color: 'var(--accent-rose)', fontSize: '0.8rem' }}>Descartado</span></td>
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
              <h3>Solução Ótima Identificada</h3>
              <p>
                O menor valor de Z entre os vértices viáveis ocorre no <strong>Vértice A</strong>,
                interseção das restrições de <strong>Notebooks</strong> e <strong>Netbooks</strong>.
              </p>
              <div className={styles.optimalBox}>
                <div className={styles.optimalRow}>
                  <span className={styles.optLabel}>Variável x*</span>
                  <span className={styles.optVal}><strong>2,8 dias</strong> na Fábrica Manaus</span>
                </div>
                <div className={styles.optimalRow}>
                  <span className={styles.optLabel}>Variável y*</span>
                  <span className={styles.optVal}><strong>3,2 dias</strong> na Fábrica Sul</span>
                </div>
                <div className={`${styles.optimalRow} ${styles.optimalRowHighlight}`}>
                  <span className={styles.optLabel}>Custo Mínimo Z*</span>
                  <span className={styles.optValBig}>R$ 1.092.000,00</span>
                </div>
              </div>

              <div className={styles.verifyBox}>
                <h4>✅ Verificação das Restrições no Ponto Ótimo (2,8 ; 3,2)</h4>
                <div className={styles.verifyGrid}>
                  <div className={styles.verifyItem}>
                    <span className={styles.verifyIcon}>🖥️</span>
                    <div>
                      <div className={styles.verifyEq}>8.000(2,8) + 2.000(3,2) = 22.400 + 6.400 = 28.800</div>
                      <div className={styles.verifyResult}>28.800 ≥ 16.000 ✓</div>
                    </div>
                  </div>
                  <div className={styles.verifyItem}>
                    <span className={styles.verifyIcon}>💻</span>
                    <div>
                      <div className={styles.verifyEq}>1.000(2,8) + 1.000(3,2) = 2.800 + 3.200 = 6.000</div>
                      <div className={styles.verifyResult}>6.000 ≥ 6.000 ✓ (ativo)</div>
                    </div>
                  </div>
                  <div className={styles.verifyItem}>
                    <span className={styles.verifyIcon}>📱</span>
                    <div>
                      <div className={styles.verifyEq}>2.000(2,8) + 7.000(3,2) = 5.600 + 22.400 = 28.000</div>
                      <div className={styles.verifyResult}>28.000 ≥ 28.000 ✓ (ativo)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.interpretation}>
                <span className={styles.intIcon}>💡</span>
                <div>
                  <strong>Interpretação Prática:</strong> Para atender toda a demanda com custo mínimo,
                  a empresa deve operar a Fábrica de Manaus por <strong>2 dias e 19 horas</strong> e
                  a Fábrica do Sul por <strong>3 dias e 5 horas</strong>.
                  Em dias inteiros (arredondamento conservador): <strong>x = 3, y = 4</strong>,
                  com custo de R$ 1.290.000,00 — garantindo folga em todas as demandas.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SystemSolver({ title, equations, solution, z, feasible, infeasible }) {
  return (
    <div className={`${styles.system} ${infeasible ? styles.systemInfeasible : feasible ? styles.systemFeasible : ''}`}>
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
      <div className={`${styles.systemZ} ${infeasible ? styles.systemZInfeasible : ''}`}>
        <code>{z}</code>
      </div>
    </div>
  )
}
