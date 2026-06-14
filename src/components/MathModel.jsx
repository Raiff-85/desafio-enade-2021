import styles from './MathModel.module.css'

export default function MathModel() {
  return (
    <section id="modelo" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-purple">📐 Modelagem</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            Modelo Matemático de <span className="gradient-text">Programação Linear</span>
          </h2>
          <p className="section-subtitle">
            Formalização do problema como um modelo de PL com função objetivo e restrições
          </p>
        </div>

        <div className={styles.grid}>
          {/* Variáveis de decisão */}
          <div className={`glass-card ${styles.card}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>🔢</span>
              <h3>Variáveis de Decisão</h3>
            </div>
            <p className={styles.cardDesc}>
              Definimos as incógnitas que o modelo irá otimizar:
            </p>
            <div className={styles.varBlock}>
              <div className={styles.varItem}>
                <span className={styles.varName}>x</span>
                <span className={styles.varEq}>=</span>
                <span className={styles.varDesc}>número de dias de operação da <strong>Fábrica de Manaus</strong></span>
              </div>
              <div className={styles.varItem}>
                <span className={styles.varName}>y</span>
                <span className={styles.varEq}>=</span>
                <span className={styles.varDesc}>número de dias de operação da <strong>Fábrica do Sul</strong></span>
              </div>
            </div>
            <p className={styles.note}>
              Ambas as variáveis devem ser não-negativas: x ≥ 0, y ≥ 0
            </p>
          </div>

          {/* Função Objetivo */}
          <div className={`glass-card ${styles.card} ${styles.objCard}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>🎯</span>
              <h3>Função Objetivo</h3>
            </div>
            <p className={styles.cardDesc}>
              Minimizar o custo total de produção (em reais):
            </p>
            <div className={styles.formulaMain}>
              <div className={styles.formulaLabel}>Minimizar</div>
              <div className={styles.formula}>
                Z = 150.000<span className={styles.var}>x</span> + 210.000<span className={styles.var}>y</span>
              </div>
              <div className={styles.formulaNote}>
                ≡ Minimizar 15x + 21y &nbsp;(÷ 10.000)
              </div>
            </div>
            <div className={styles.costBreakdown}>
              <div className={styles.costItem}>
                <span>Custo de Manaus</span>
                <span className={styles.costVal}>R$ 150.000 × x dias</span>
              </div>
              <div className={styles.costItem}>
                <span>Custo do Sul</span>
                <span className={styles.costVal}>R$ 210.000 × y dias</span>
              </div>
            </div>
          </div>

          {/* Restrições */}
          <div className={`glass-card ${styles.card} ${styles.fullWidth}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>⚖️</span>
              <h3>Restrições do Problema</h3>
            </div>
            <p className={styles.cardDesc}>
              A produção acumulada de ambas as fábricas deve atender a demanda mínima de cada produto:
            </p>
            <div className={styles.constraintsGrid}>
              <div className={styles.constraint}>
                <div className={styles.constraintHeader}>
                  <span className={styles.constraintIcon}>🖥️</span>
                  <span>Desktops (≥ 16.000 unidades)</span>
                </div>
                <div className={styles.constraintFormula}>
                  8.000<span className={styles.var}>x</span> + 2.000<span className={styles.var}>y</span> ≥ 16.000
                </div>
                <div className={styles.constraintSimplified}>
                  Simplificado: 4x + y ≥ 8
                </div>
                <div className={styles.constraintExp}>
                  Manaus produz 8.000 desktops/dia e o Sul produz 2.000/dia
                </div>
              </div>

              <div className={styles.constraint}>
                <div className={styles.constraintHeader}>
                  <span className={styles.constraintIcon}>💻</span>
                  <span>Notebooks (≥ 6.000 unidades)</span>
                </div>
                <div className={styles.constraintFormula}>
                  1.000<span className={styles.var}>x</span> + 1.000<span className={styles.var}>y</span> ≥ 6.000
                </div>
                <div className={styles.constraintSimplified}>
                  Simplificado: x + y ≥ 6
                </div>
                <div className={styles.constraintExp}>
                  Ambas as fábricas produzem 1.000 notebooks/dia cada
                </div>
              </div>

              <div className={styles.constraint}>
                <div className={styles.constraintHeader}>
                  <span className={styles.constraintIcon}>📱</span>
                  <span>Netbooks (≥ 28.000 unidades)</span>
                </div>
                <div className={styles.constraintFormula}>
                  2.000<span className={styles.var}>x</span> + 7.000<span className={styles.var}>y</span> ≥ 28.000
                </div>
                <div className={styles.constraintSimplified}>
                  Simplificado: 2x + 7y ≥ 28
                </div>
                <div className={styles.constraintExp}>
                  Manaus produz 2.000 netbooks/dia e o Sul produz 7.000/dia
                </div>
              </div>
            </div>
          </div>

          {/* Modelo Completo */}
          <div className={`glass-card ${styles.card} ${styles.fullWidth} ${styles.completeModel}`}>
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>📄</span>
              <h3>Modelo Completo</h3>
              <span className="badge badge-green" style={{ marginLeft: 'auto' }}>Forma Canônica</span>
            </div>
            <div className={styles.modelBox}>
              <div className={styles.modelSection}>
                <span className={styles.modelLabel}>Minimizar:</span>
                <code className={styles.modelCode}>Z = 150.000x + 210.000y</code>
              </div>
              <div className={styles.modelDivider} />
              <div className={styles.modelSection}>
                <span className={styles.modelLabel}>Sujeito a:</span>
                <div className={styles.modelConstraints}>
                  <code>8.000x + 2.000y ≥ 16.000 &nbsp; (Desktops)</code>
                  <code>1.000x + 1.000y ≥  6.000 &nbsp; (Notebooks)</code>
                  <code>2.000x + 7.000y ≥ 28.000 &nbsp; (Netbooks)</code>
                  <code className={styles.nonNeg}>x ≥ 0, y ≥ 0</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
