import { useState, useMemo } from 'react'
import { findVertices, findOptimum } from '../utils/graphHelper'
import { simplexBigM } from '../utils/simplex'
import GraphRegion from './GraphRegion'
import styles from './Solver.module.css'

const DEFAULT_PARAMS = {
  demandDesktops: 16000,
  demandNotebooks: 6000,
  demandNetbooks: 28000,
  costManaus: 150000,
  costSul: 210000,
}

function fmt(n) {
  return parseFloat(n.toFixed(4)).toLocaleString('pt-BR', { maximumFractionDigits: 4 })
}

export default function Solver() {
  const [params, setParams] = useState(DEFAULT_PARAMS)
  const [solved, setSolved] = useState(false)

  const update = (key, val) => setParams(p => ({ ...p, [key]: parseFloat(val) || 0 }))

  // Build model (simplified by dividing desktops and netbooks coefficients)
  const constraints = useMemo(() => {
    const { demandDesktops, demandNotebooks, demandNetbooks } = params
    return [
      { a: 8, b: 2, rhs: demandDesktops / 1000, label: 'Desktops (÷1000)' },
      { a: 1, b: 1, rhs: demandNotebooks / 1000, label: 'Notebooks (÷1000)' },
      { a: 2, b: 7, rhs: demandNetbooks / 1000, label: 'Netbooks (÷1000)' },
    ]
  }, [params])

  const result = useMemo(() => {
    if (!solved) return null
    const vertices = findVertices(constraints)
    const { costManaus, costSul } = params
    const optimum = findOptimum(vertices, costManaus, costSul)
    // Also run Simplex for verification
    const A = constraints.map(c => [c.a, c.b])
    const b = constraints.map(c => c.rhs)
    const simplexResult = simplexBigM([costManaus, costSul], A, b)
    return { vertices, optimum, simplexResult }
  }, [solved, constraints, params])

  const handleSolve = () => setSolved(true)
  const handleReset = () => { setParams(DEFAULT_PARAMS); setSolved(false) }

  return (
    <section id="solver" className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="badge badge-green">⚡ Solver Interativo</span>
          <h2 className="section-title" style={{ marginTop: '1rem' }}>
            Encontrar a <span className="gradient-text">Solução Ótima</span>
          </h2>
          <p className="section-subtitle">
            Ajuste os parâmetros do problema e execute o solver para obter a solução ótima
          </p>
        </div>

        <div className={styles.layout}>
          {/* Controls */}
          <div className={styles.controls}>
            <div className={`glass-card ${styles.controlCard}`}>
              <h3 className={styles.controlTitle}>
                <span>📦</span> Demanda Mínima
              </h3>
              <div className={styles.inputGroup}>
                <div className="input-group">
                  <label className="input-label">🖥️ Desktops (unidades)</label>
                  <input
                    id="inp-desktops"
                    className="input-field"
                    type="number"
                    value={params.demandDesktops}
                    min={0}
                    onChange={e => { update('demandDesktops', e.target.value); setSolved(false) }}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">💻 Notebooks (unidades)</label>
                  <input
                    id="inp-notebooks"
                    className="input-field"
                    type="number"
                    value={params.demandNotebooks}
                    min={0}
                    onChange={e => { update('demandNotebooks', e.target.value); setSolved(false) }}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">📱 Netbooks (unidades)</label>
                  <input
                    id="inp-netbooks"
                    className="input-field"
                    type="number"
                    value={params.demandNetbooks}
                    min={0}
                    onChange={e => { update('demandNetbooks', e.target.value); setSolved(false) }}
                  />
                </div>
              </div>
            </div>

            <div className={`glass-card ${styles.controlCard}`}>
              <h3 className={styles.controlTitle}>
                <span>💰</span> Custos Diários
              </h3>
              <div className={styles.inputGroup}>
                <div className="input-group">
                  <label className="input-label">🏭 Custo Fábrica Manaus (R$/dia)</label>
                  <input
                    id="inp-cost-manaus"
                    className="input-field"
                    type="number"
                    value={params.costManaus}
                    min={0}
                    onChange={e => { update('costManaus', e.target.value); setSolved(false) }}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">🏭 Custo Fábrica Sul (R$/dia)</label>
                  <input
                    id="inp-cost-sul"
                    className="input-field"
                    type="number"
                    value={params.costSul}
                    min={0}
                    onChange={e => { update('costSul', e.target.value); setSolved(false) }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.btnRow}>
              <button
                id="btn-solve"
                className="btn btn-primary"
                style={{ flex: 1 }}
                onClick={handleSolve}
              >
                ⚡ Resolver
              </button>
              <button
                id="btn-reset"
                className="btn btn-outline"
                onClick={handleReset}
              >
                ↺ Reset
              </button>
            </div>

            {/* Restrições ao vivo */}
            <div className={`glass-card ${styles.liveModel}`}>
              <h4>Modelo Atual</h4>
              <pre className={styles.pre}>
                {`Min Z = ${params.costManaus.toLocaleString('pt-BR')}x\n       + ${params.costSul.toLocaleString('pt-BR')}y\n\nSujeito a:\n  ${constraints[0].a*1000}x + ${constraints[0].b*1000}y ≥ ${params.demandDesktops.toLocaleString('pt-BR')}\n  ${constraints[1].a*1000}x + ${constraints[1].b*1000}y ≥ ${params.demandNotebooks.toLocaleString('pt-BR')}\n  ${constraints[2].a*1000}x + ${constraints[2].b*1000}y ≥ ${params.demandNetbooks.toLocaleString('pt-BR')}\n  x ≥ 0, y ≥ 0`}
              </pre>
            </div>
          </div>

          {/* Graph + Results */}
          <div className={styles.rightPanel}>
            <div className={`glass-card ${styles.graphCard}`}>
              <div className={styles.graphHeader}>
                <h3>Representação Gráfica</h3>
                <span className="badge badge-purple">Região Viável</span>
              </div>
              <GraphRegion
                constraints={constraints}
                objectiveCoeffs={[params.costManaus, params.costSul]}
                optimum={result?.optimum || null}
              />
            </div>

            {result && (
              <ResultSummary result={result} params={params} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ResultSummary({ result, params }) {
  const { vertices, optimum, simplexResult } = result
  if (!optimum) return null

  const formatBRL = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className={styles.resultGrid}>
      <div className={`glass-card ${styles.resultCard} ${styles.optCard}`}>
        <div className={styles.resultHeader}>
          <span>🏆</span>
          <h4>Solução Ótima</h4>
          <span className="badge badge-green">MÍNIMO GLOBAL</span>
        </div>
        <div className={styles.optValues}>
          <div className={styles.optValue}>
            <span className={styles.optLabel}>Fábrica Manaus</span>
            <span className={styles.optNum}>{fmt(optimum.x)}</span>
            <span className={styles.optUnit}>dias</span>
          </div>
          <div className={styles.optDivider} />
          <div className={styles.optValue}>
            <span className={styles.optLabel}>Fábrica Sul</span>
            <span className={styles.optNum}>{fmt(optimum.y)}</span>
            <span className={styles.optUnit}>dias</span>
          </div>
          <div className={styles.optDivider} />
          <div className={`${styles.optValue} ${styles.totalCost}`}>
            <span className={styles.optLabel}>Custo Mínimo</span>
            <span className={styles.optNum}>{formatBRL(optimum.z)}</span>
          </div>
        </div>
      </div>

      <div className={`glass-card ${styles.resultCard}`}>
        <div className={styles.resultHeader}><span>📍</span><h4>Vértices da Região Viável</h4></div>
        <div className={styles.vertexList}>
          {vertices.map((v, i) => {
            const z = params.costManaus * v.x + params.costSul * v.y
            const isOpt = Math.abs(v.x - optimum.x) < 1e-4 && Math.abs(v.y - optimum.y) < 1e-4
            return (
              <div key={i} className={`${styles.vertexItem} ${isOpt ? styles.vertexOpt : ''}`}>
                <span className={styles.vertexCoord}>({fmt(v.x)}, {fmt(v.y)})</span>
                <span className={styles.vertexZ}>{formatBRL(z)}</span>
                {isOpt && <span className={styles.star}>★</span>}
              </div>
            )
          })}
        </div>
      </div>

      <div className={`glass-card ${styles.resultCard}`}>
        <div className={styles.resultHeader}><span>✅</span><h4>Verificação: Simplex Big-M</h4></div>
        {simplexResult.status === 'optimal' ? (
          <div>
            <div className={styles.simplexRow}>
              <span>Status</span>
              <span className={styles.greenText}>Ótimo Encontrado</span>
            </div>
            <div className={styles.simplexRow}>
              <span>x (Manaus)</span>
              <span className={styles.cyanText}>{fmt(simplexResult.x[0])} dias</span>
            </div>
            <div className={styles.simplexRow}>
              <span>y (Sul)</span>
              <span className={styles.cyanText}>{fmt(simplexResult.x[1])} dias</span>
            </div>
            <div className={styles.simplexRow}>
              <span>Z ótimo</span>
              <span className={styles.greenText}>{formatBRL(simplexResult.z)}</span>
            </div>
            <div className={styles.simplexRow}>
              <span>Iterações</span>
              <span>{simplexResult.iterations}</span>
            </div>
          </div>
        ) : (
          <div className={styles.simplexError}>Status: {simplexResult.status}</div>
        )}
      </div>
    </div>
  )
}
