import { useEffect, useRef, useState, useCallback } from 'react'
import { findVertices, findOptimum } from '../utils/graphHelper'
import styles from './GraphRegion.module.css'

const COLORS = {
  grid: 'rgba(255,255,255,0.05)',
  axis: 'rgba(255,255,255,0.2)',
  feasibleFill: 'rgba(108,99,255,0.12)',
  feasibleStroke: 'rgba(108,99,255,0.5)',
  constraint: ['#6C63FF', '#3ECFCF', '#F472B6'],
  vertex: 'rgba(255,255,255,0.8)',
  optimum: '#4ADE80',
  isoLabel: 'rgba(251,191,36,0.8)',
  text: 'rgba(255,255,255,0.7)',
}

export default function GraphRegion({ constraints, objectiveCoeffs, optimum }) {
  const canvasRef = useRef(null)
  const [hovered, setHovered] = useState(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width
    const H = canvas.height
    const pad = { top: 40, right: 40, bottom: 60, left: 70 }
    const plotW = W - pad.left - pad.right
    const plotH = H - pad.top - pad.bottom

    // Determine axis limits
    const maxX = 12
    const maxY = 12

    const toCanvas = (x, y) => ({
      cx: pad.left + (x / maxX) * plotW,
      cy: pad.top + plotH - (y / maxY) * plotH,
    })

    ctx.clearRect(0, 0, W, H)

    // Grid
    ctx.strokeStyle = COLORS.grid
    ctx.lineWidth = 1
    for (let i = 0; i <= 12; i++) {
      const { cx } = toCanvas(i, 0)
      ctx.beginPath(); ctx.moveTo(cx, pad.top); ctx.lineTo(cx, H - pad.bottom); ctx.stroke()
      const { cy } = toCanvas(0, i)
      ctx.beginPath(); ctx.moveTo(pad.left, cy); ctx.lineTo(W - pad.right, cy); ctx.stroke()
    }

    // Axes
    ctx.strokeStyle = COLORS.axis
    ctx.lineWidth = 2
    const origin = toCanvas(0, 0)
    ctx.beginPath(); ctx.moveTo(pad.left, origin.cy); ctx.lineTo(W - pad.right, origin.cy); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(origin.cx, pad.top); ctx.lineTo(origin.cx, H - pad.bottom); ctx.stroke()

    // Axis labels
    ctx.fillStyle = COLORS.text
    ctx.font = '12px Inter, sans-serif'
    ctx.textAlign = 'center'
    for (let i = 0; i <= maxX; i += 2) {
      const { cx, cy } = toCanvas(i, 0)
      ctx.fillText(i, cx, cy + 18)
    }
    ctx.textAlign = 'right'
    for (let i = 0; i <= maxY; i += 2) {
      const { cx, cy } = toCanvas(0, i)
      ctx.fillText(i, cx - 8, cy + 4)
    }

    // Axis names
    ctx.fillStyle = 'rgba(255,255,255,0.5)'
    ctx.font = 'bold 13px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('x (dias Manaus)', pad.left + plotW / 2, H - 8)
    ctx.save()
    ctx.translate(14, pad.top + plotH / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText('y (dias Sul)', 0, 0)
    ctx.restore()

    // Feasible region
    const vertices = findVertices(constraints)
    if (vertices.length >= 3) {
      ctx.beginPath()
      vertices.forEach((v, i) => {
        const { cx, cy } = toCanvas(v.x, v.y)
        i === 0 ? ctx.moveTo(cx, cy) : ctx.lineTo(cx, cy)
      })
      ctx.closePath()
      ctx.fillStyle = COLORS.feasibleFill
      ctx.fill()
      ctx.strokeStyle = COLORS.feasibleStroke
      ctx.lineWidth = 2
      ctx.setLineDash([6, 3])
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Constraint lines
    constraints.forEach((c, idx) => {
      ctx.strokeStyle = COLORS.constraint[idx % COLORS.constraint.length]
      ctx.lineWidth = 2
      ctx.setLineDash([8, 4])
      ctx.beginPath()
      let started = false
      for (let xi = 0; xi <= maxX; xi += 0.05) {
        const yi = (c.rhs - c.a * xi) / c.b
        if (yi >= -0.2 && yi <= maxY + 0.2) {
          const { cx, cy } = toCanvas(xi, yi)
          if (!started) { ctx.moveTo(cx, cy); started = true }
          else ctx.lineTo(cx, cy)
        }
      }
      ctx.stroke()
      ctx.setLineDash([])

      // Label
      const midXi = c.rhs / (2 * c.a)
      const midYi = (c.rhs - c.a * midXi) / c.b
      if (midXi >= 0 && midXi <= maxX && midYi >= 0 && midYi <= maxY) {
        const { cx, cy } = toCanvas(midXi, midYi)
        ctx.fillStyle = COLORS.constraint[idx % COLORS.constraint.length]
        ctx.font = 'bold 10px Inter, sans-serif'
        ctx.textAlign = 'left'
        ctx.fillText(c.label, cx + 4, cy - 6)
      }
    })

    // Vertices
    vertices.forEach(v => {
      const { cx, cy } = toCanvas(v.x, v.y)
      ctx.beginPath()
      ctx.arc(cx, cy, 5, 0, Math.PI * 2)
      ctx.fillStyle = COLORS.vertex
      ctx.fill()
      ctx.strokeStyle = 'rgba(0,0,0,0.5)'
      ctx.lineWidth = 1
      ctx.stroke()
      // Label
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.font = '10px JetBrains Mono, monospace'
      ctx.textAlign = 'left'
      ctx.fillText(`(${v.x.toFixed(2)}, ${v.y.toFixed(2)})`, cx + 8, cy - 6)
    })

    // Optimum point
    if (optimum) {
      const { cx, cy } = toCanvas(optimum.x, optimum.y)
      // Glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20)
      grd.addColorStop(0, 'rgba(74,222,128,0.5)')
      grd.addColorStop(1, 'rgba(74,222,128,0)')
      ctx.beginPath()
      ctx.arc(cx, cy, 20, 0, Math.PI * 2)
      ctx.fillStyle = grd
      ctx.fill()
      // Point
      ctx.beginPath()
      ctx.arc(cx, cy, 7, 0, Math.PI * 2)
      ctx.fillStyle = COLORS.optimum
      ctx.fill()
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.stroke()
      // Star marker
      ctx.fillStyle = COLORS.optimum
      ctx.font = 'bold 11px Inter, sans-serif'
      ctx.textAlign = 'left'
      ctx.fillText(`★ Ótimo (${optimum.x.toFixed(3)}, ${optimum.y.toFixed(3)})`, cx + 10, cy - 10)
      ctx.fillStyle = 'rgba(74,222,128,0.8)'
      ctx.font = '10px JetBrains Mono'
      ctx.fillText(`Z* = R$ ${(optimum.z).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}`, cx + 10, cy + 4)
    }

  }, [constraints, objectiveCoeffs, optimum])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resizeObserver = new ResizeObserver(() => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      canvas.style.width = canvas.offsetWidth + 'px'
      canvas.style.height = canvas.offsetHeight + 'px'
      const ctx = canvas.getContext('2d')
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      draw()
    })
    resizeObserver.observe(canvas)
    return () => resizeObserver.disconnect()
  }, [draw])

  useEffect(() => { draw() }, [draw])

  return (
    <div className={styles.wrapper}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ width: '100%', height: '100%' }}
      />
      <div className={styles.legend}>
        {constraints.map((c, i) => (
          <div key={i} className={styles.legendItem}>
            <span className={styles.legendLine} style={{ background: COLORS.constraint[i % COLORS.constraint.length] }} />
            <span>{c.label}</span>
          </div>
        ))}
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ background: '#4ADE80' }} />
          <span>Ponto Ótimo</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendArea} />
          <span>Região Viável</span>
        </div>
      </div>
    </div>
  )
}
