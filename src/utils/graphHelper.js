/**
 * Resolve sistema linear 2x2: a1x + b1y = c1 e a2x + b2y = c2
 * Retorna { x, y } ou null se sem solução única
 */
export function solve2x2(a1, b1, c1, a2, b2, c2) {
  const det = a1 * b2 - a2 * b1;
  if (Math.abs(det) < 1e-10) return null;
  const x = (c1 * b2 - c2 * b1) / det;
  const y = (a1 * c2 - a2 * c1) / det;
  return { x, y };
}

/**
 * Verifica se um ponto (x,y) satisfaz todas as restrições
 * Restrições da forma: coeff[0]*x + coeff[1]*y >= rhs
 */
export function isFeasible(x, y, constraints) {
  const EPS = 1e-6;
  return constraints.every(c => c.a * x + c.b * y >= c.rhs - EPS);
}

/**
 * Encontra todos os vértices da região viável
 * constraints = [{ a, b, rhs, label }]
 * Inclui interseções com eixos (x=0 e y=0)
 */
export function findVertices(constraints) {
  const candidates = [];
  const n = constraints.length;

  // Interseções par a par entre restrições
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const p = solve2x2(
        constraints[i].a, constraints[i].b, constraints[i].rhs,
        constraints[j].a, constraints[j].b, constraints[j].rhs
      );
      if (p) candidates.push(p);
    }
  }

  // Interseções com eixos
  for (let i = 0; i < n; i++) {
    const c = constraints[i];
    if (Math.abs(c.a) > 1e-10) candidates.push({ x: c.rhs / c.a, y: 0 });
    if (Math.abs(c.b) > 1e-10) candidates.push({ x: 0, y: c.rhs / c.b });
  }

  // Origem
  candidates.push({ x: 0, y: 0 });

  // Filtra apenas os que satisfazem todas as restrições e são não-negativos
  const feasible = candidates.filter(p =>
    p.x >= -1e-6 && p.y >= -1e-6 && isFeasible(p.x, p.y, constraints)
  );

  // Remove duplicatas
  const unique = [];
  feasible.forEach(p => {
    const dup = unique.find(q => Math.abs(q.x - p.x) < 1e-6 && Math.abs(q.y - p.y) < 1e-6);
    if (!dup) unique.push({ x: Math.max(0, p.x), y: Math.max(0, p.y) });
  });

  // Ordena em sentido horário para desenho do polígono
  return sortConvexHull(unique);
}

/**
 * Ordena pontos em sentido anti-horário (convex hull order)
 */
function sortConvexHull(points) {
  if (points.length === 0) return points;
  const cx = points.reduce((s, p) => s + p.x, 0) / points.length;
  const cy = points.reduce((s, p) => s + p.y, 0) / points.length;
  return [...points].sort((a, b) => {
    const angleA = Math.atan2(a.y - cy, a.x - cx);
    const angleB = Math.atan2(b.y - cy, b.x - cx);
    return angleA - angleB;
  });
}

/**
 * Avalia a função objetivo em cada vértice e retorna o mínimo
 */
export function findOptimum(vertices, cx, cy) {
  if (vertices.length === 0) return null;
  let best = null;
  vertices.forEach(p => {
    const z = cx * p.x + cy * p.y;
    if (best === null || z < best.z) {
      best = { ...p, z };
    }
  });
  return best;
}

/**
 * Gera pontos de uma linha de restrição para plotagem
 * ax + by = rhs → plotar no intervalo [0, maxX]
 */
export function constraintLinePoints(a, b, rhs, maxX, maxY) {
  const points = [];
  if (Math.abs(b) > 1e-10) {
    // y = (rhs - a*x) / b
    const y0 = rhs / b;
    const xAtMaxY = Math.abs(a) > 1e-10 ? (rhs - b * maxY) / a : maxX;
    points.push({ x: 0, y: y0 });
    points.push({ x: xAtMaxY, y: maxY });
    if (Math.abs(a) > 1e-10) {
      const xIntercept = rhs / a;
      points.push({ x: xIntercept, y: 0 });
    }
  } else if (Math.abs(a) > 1e-10) {
    const xVal = rhs / a;
    points.push({ x: xVal, y: 0 });
    points.push({ x: xVal, y: maxY });
  }
  return points;
}
