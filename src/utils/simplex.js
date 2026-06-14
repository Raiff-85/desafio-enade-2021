/**
 * Simplex Method — Fase de duas fases para minimização com restrições >=
 * 
 * Converte: Minimizar cx^T x
 *           Sujeito a: Ax >= b, x >= 0
 * 
 * Para problemas pequenos (2 variáveis), usamos o método gráfico
 * implementado em graphHelper.js. Este módulo implementa o Simplex
 * padrão para problemas maiores e serve como engine de verificação.
 */

/**
 * Resolve problema de PL com método Simplex revisado (Big-M)
 * 
 * @param {number[]} c - Coeficientes da função objetivo (minimização)
 * @param {number[][]} A - Matriz de coeficientes das restrições (>= form)
 * @param {number[]} b - Vetor do lado direito (valores devem ser >= 0)
 * @returns {{ status, x, z, iterations }}
 */
export function simplexBigM(c, A, b) {
  const M = 1e7; // Penalidade Big-M
  const numVars = c.length;
  const numConstraints = A.length;

  // Para restrições >= : subtrai variável de folga (surplus) e adiciona artificial
  // Forma padrão: Ax - s + a = b, s >= 0, a >= 0
  const totalVars = numVars + numConstraints + numConstraints; // original + surplus + artificial

  // Monta tableau
  // Colunas: [x1..xn, s1..sm, a1..am, rhs]
  const tableau = [];

  for (let i = 0; i < numConstraints; i++) {
    const row = new Array(totalVars + 1).fill(0);
    // Coeficientes originais
    for (let j = 0; j < numVars; j++) row[j] = A[i][j];
    // Variável surplus (coef -1)
    row[numVars + i] = -1;
    // Variável artificial (coef +1)
    row[numVars + numConstraints + i] = 1;
    // RHS
    row[totalVars] = b[i];
    tableau.push(row);
  }

  // Função objetivo: minimizar c (com Big-M para artificiais)
  const objRow = new Array(totalVars + 1).fill(0);
  for (let j = 0; j < numVars; j++) objRow[j] = c[j];
  for (let i = 0; i < numConstraints; i++) objRow[numVars + numConstraints + i] = M;

  // Base inicial: artificiais
  const basis = Array.from({ length: numConstraints }, (_, i) => numVars + numConstraints + i);

  // Ajuste do objetivo para base artificial (eliminação)
  for (let i = 0; i < numConstraints; i++) {
    for (let j = 0; j <= totalVars; j++) {
      objRow[j] -= M * tableau[i][j];
    }
  }

  let iterations = 0;
  const maxIter = 1000;

  while (iterations < maxIter) {
    iterations++;

    // Encontra coluna pivô (mais negativa na função objetivo)
    let pivotCol = -1;
    let minVal = -1e-9;
    for (let j = 0; j < totalVars; j++) {
      if (objRow[j] < minVal) {
        minVal = objRow[j];
        pivotCol = j;
      }
    }
    if (pivotCol === -1) break; // Ótimo encontrado

    // Encontra linha pivô (razão mínima positiva)
    let pivotRow = -1;
    let minRatio = Infinity;
    for (let i = 0; i < numConstraints; i++) {
      if (tableau[i][pivotCol] > 1e-9) {
        const ratio = tableau[i][totalVars] / tableau[i][pivotCol];
        if (ratio < minRatio) {
          minRatio = ratio;
          pivotRow = i;
        }
      }
    }

    if (pivotRow === -1) return { status: 'unbounded', x: null, z: null, iterations };

    // Pivotamento
    basis[pivotRow] = pivotCol;
    const pivotVal = tableau[pivotRow][pivotCol];
    for (let j = 0; j <= totalVars; j++) tableau[pivotRow][j] /= pivotVal;

    for (let i = 0; i < numConstraints; i++) {
      if (i !== pivotRow) {
        const factor = tableau[i][pivotCol];
        for (let j = 0; j <= totalVars; j++) {
          tableau[i][j] -= factor * tableau[pivotRow][j];
        }
      }
    }
    const objFactor = objRow[pivotCol];
    for (let j = 0; j <= totalVars; j++) objRow[j] -= objFactor * tableau[pivotRow][j];
  }

  // Extrai solução
  const x = new Array(numVars).fill(0);
  for (let i = 0; i < numConstraints; i++) {
    if (basis[i] < numVars) x[basis[i]] = tableau[i][totalVars];
  }

  // Verifica se artificiais ainda estão na base com valor > 0 (infeasível)
  for (let i = 0; i < numConstraints; i++) {
    if (basis[i] >= numVars + numConstraints && tableau[i][totalVars] > 1e-6) {
      return { status: 'infeasible', x: null, z: null, iterations };
    }
  }

  const z = c.reduce((s, ci, i) => s + ci * x[i], 0);

  return { status: 'optimal', x, z, iterations };
}

/**
 * Formata número para exibição
 */
export function formatNumber(n, decimals = 4) {
  if (Math.abs(n) < 1e-10) return '0';
  return parseFloat(n.toFixed(decimals)).toString();
}
