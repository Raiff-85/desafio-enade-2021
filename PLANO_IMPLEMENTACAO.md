# 📋 Plano de Implementação — Desafio ENADE 2021: Programação Linear

> **Disciplina:** Sistemas de Informação — ENADE 2021  
> **Tema:** Otimização de Produção via Programação Linear  
> **Stack:** React + Vite (SPA, deploy via Vercel)  
> **Repositório:** https://github.com/Raiff-85/desafio-enade-2021.git

---

## 1. Modelagem Matemática do Problema

### 1.1 Contexto

Uma empresa de montagem de computadores possui duas fábricas:
- **Fábrica de Manaus** (Zona Franca)
- **Fábrica do Sul**

A empresa precisa entregar:
| Produto  | Quantidade Mínima |
|----------|------------------|
| Desktops | 16.000 unidades  |
| Notebooks | 6.000 unidades  |
| Netbooks | 28.000 unidades  |

### 1.2 Dados de Produção Diária

| Fábrica | Desktops/dia | Notebooks/dia | Netbooks/dia | Custo diário       |
|---------|-------------|---------------|--------------|-------------------|
| Manaus  | 8.000       | 1.000         | 2.000        | R$ 150.000,00     |
| Sul     | 2.000       | 1.000         | 7.000        | R$ 210.000,00     |

### 1.3 Variáveis de Decisão

- **x** = número de dias de operação da Fábrica de **Manaus**
- **y** = número de dias de operação da Fábrica do **Sul**

### 1.4 Função Objetivo

**Minimizar** o custo total de produção:

```
Z = 150.000x + 210.000y
```

*(equivalente a minimizar 15x + 21y, dividindo por 10.000)*

### 1.5 Restrições

**Restrição de Desktops** (mínimo 16.000):
```
8.000x + 2.000y ≥ 16.000
→ 4x + y ≥ 8
```

**Restrição de Notebooks** (mínimo 6.000):
```
1.000x + 1.000y ≥ 6.000
→ x + y ≥ 6
```

**Restrição de Netbooks** (mínimo 28.000):
```
2.000x + 7.000y ≥ 28.000
→ 2x + 7y ≥ 28
```

**Restrições de Não-Negatividade:**
```
x ≥ 0
y ≥ 0
```

### 1.6 Modelo Completo

```
Minimizar:   Z = 150.000x + 210.000y

Sujeito a:
  8.000x + 2.000y ≥ 16.000   (Desktops)
  1.000x + 1.000y ≥  6.000   (Notebooks)
  2.000x + 7.000y ≥ 28.000   (Netbooks)
  x ≥ 0
  y ≥ 0
```

### 1.7 Solução Ótima (Método Gráfico / Vértices Viáveis)

Os candidatos a ponto ótimo são as **interseções viáveis** das restrições:

**Ponto A — Interseção: Notebooks ∩ Netbooks (VIÁVEL ✓)**
```
x + y = 6
2x + 7y = 28

→ x = 6 - y → 2(6-y) + 7y = 28
→ 12 + 5y = 28 → y = 3,2
→ x = 6 - 3,2 = 2,8

Verificação: 4(2,8) + 3,2 = 14,4 ≥ 8 ✓ (Desktops OK)
```

**Ponto B — Interseção: Desktops ∩ Notebooks (VIÁVEL ✓)**
```
4x + y = 8
x + y = 6

→ 3x = 2 → x = 2/3 ≈ 0,6667
→ y = 6 - 2/3 = 16/3 ≈ 5,3333

Verificação: 2(0,6667) + 7(5,3333) = 1,333 + 37,333 = 38,67 ≥ 28 ✓ (Netbooks OK)
```

**Ponto C — Interseção: Desktops ∩ Netbooks (INVIÁVEL ✗)**
```
4x + y = 8
2x + 7y = 28

→ x = 14/13 ≈ 1,077, y = 48/13 ≈ 3,692

Verificação Notebooks: 1,077 + 3,692 = 4,769 < 6 ✗
→ PONTO FORA DA REGIÃO VIÁVEL — Descartado!
```

**Avaliação da Função Objetivo nos Vértices VIÁVEIS:**

| Ponto | x     | y     | Z = 150.000x + 210.000y  | Viável? |
|-------|-------|-------|--------------------------|---------|
| **A** | **2,8** | **3,2** | **R$ 1.092.000,00** | ✓ Sim |
| B     | 0,6667| 5,3333| ≈ R$ 1.220.013,00        | ✓ Sim   |
| C     | 1,077 | 3,692 | — (inviável)             | ✗ Não   |

> **Solução Ótima:** Ponto **A** — x = 2,8 dias (Manaus), y = 3,2 dias (Sul)  
> **Custo Mínimo Z* = R$ 1.092.000,00**
>
> As restrições ativas no ótimo são: **Notebooks** (x+y = 6 exato) e **Netbooks** (2x+7y = 28 exato).

---

## 2. Arquitetura da Solução Computacional

### 2.1 Decisão de Stack

| Critério | Escolha | Justificativa |
|----------|---------|---------------|
| Framework | **React + Vite** | SPA leve, zero backend necessário |
| Deploy | **Vercel** | Deploy direto do GitHub, gratuito |
| Solver LP | **Implementação própria (Simplex)** | Sem dependência de servidor |
| Visualização | **Chart.js / Canvas API** | Gráfico do espaço viável |
| Math Rendering | **KaTeX** | Fórmulas matemáticas bonitas |

### 2.2 Estrutura de Pastas

```
desafio-enade/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Hero.jsx             # Seção de apresentação
│   │   ├── ProblemStatement.jsx # Enunciado formatado
│   │   ├── MathModel.jsx        # Modelo matemático (KaTeX)
│   │   ├── Solver.jsx           # Motor Simplex + controles
│   │   ├── GraphRegion.jsx      # Visualização gráfica
│   │   ├── ResultCard.jsx       # Exibição da solução ótima
│   │   └── StepByStep.jsx       # Solução passo a passo
│   ├── utils/
│   │   ├── simplex.js           # Algoritmo Simplex
│   │   └── graphHelper.js       # Cálculo de vértices/region
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── PLANO_IMPLEMENTACAO.md
├── index.html
├── vite.config.js
├── package.json
└── vercel.json
```

### 2.3 Funcionalidades do App

1. **Apresentação do Problema** — Enunciado completo formatado
2. **Modelo Matemático** — Função objetivo + restrições em LaTeX
3. **Solver Interativo** — Sliders/inputs para alterar demandas e custos
4. **Visualização Gráfica** — Região viável e ponto ótimo plotados
5. **Solução Passo a Passo** — Vértices e avaliação da função objetivo
6. **Resultado Final** — Destaque do custo mínimo e dias de operação

---

## 3. Plano de Desenvolvimento

### Fase 1 — Setup (Dia 1)
- [x] Criar plano de implementação (`PLANO_IMPLEMENTACAO.md`)
- [ ] Inicializar projeto com Vite + React
- [ ] Configurar `vercel.json`
- [ ] Estruturar pastas e componentes base

### Fase 2 — Modelagem e Solver (Dia 1)
- [ ] Implementar algoritmo Simplex em `simplex.js`
- [ ] Implementar cálculo de vértices em `graphHelper.js`
- [ ] Criar componente `MathModel.jsx` com KaTeX

### Fase 3 — Interface (Dia 1)
- [ ] Criar layout com design moderno (dark mode, glassmorphism)
- [ ] Componente `GraphRegion.jsx` com Canvas
- [ ] Componente `Solver.jsx` interativo
- [ ] Componente `ResultCard.jsx`
- [ ] Componente `StepByStep.jsx`

### Fase 4 — Polimento e Deploy (Dia 1)
- [ ] Responsividade mobile
- [ ] Animações e transições
- [ ] Git push para o repositório
- [ ] Deploy na Vercel

---

## 4. Decisões de Design

- **Dark mode** como padrão — mais adequado para app técnico/acadêmico
- **Glassmorphism** nos cards — visual premium e moderno
- **Cores:** Gradiente roxo/azul (`#6C63FF` → `#3ECFCF`)
- **Fonte:** Inter (Google Fonts) para textos, JetBrains Mono para código
- **Animações:** Entrada suave dos elementos (fade + slide)

---

## 5. Referências

- ENADE 2021 — Questão de Programação Linear (Sistemas de Informação)
- Bazaraa, M. S.; Jarvis, J. J.; Sherali, H. D. *Linear Programming and Network Flows*, 4ª ed.
- Hillier, F. S.; Lieberman, G. J. *Introduction to Operations Research*, 10ª ed.
- React Documentation: https://react.dev
- Vite Documentation: https://vitejs.dev
- Vercel Documentation: https://vercel.com/docs
