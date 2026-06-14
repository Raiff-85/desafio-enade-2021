# 📐 Desafio ENADE 2021 — Programação Linear & Otimização de Produção

Este projeto consiste em uma solução computacional interativa desenvolvida em **React** + **Vite** para modelar, visualizar e resolver o problema de Programação Linear proposto no **ENADE 2021** para o curso de **Sistemas de Informação**.

O aplicativo calcula a solução ótima pelo método gráfico (análise de vértices da região viável) e valida o resultado utilizando o algoritmo **Simplex (Big-M)**, permitindo também a simulação em tempo real com parâmetros customizáveis (demandas de entrega e custos operacionais das fábricas).

---

## 📋 O Problema Real (ENADE 2021)

Uma empresa de montagem de computadores fabrica três tipos básicos de dispositivos: **desktops**, **notebooks** e **netbooks**. A produção ocorre em duas fábricas: uma na **Zona Franca de Manaus** e outra na **região Sul**.

A empresa precisa entregar:
- **16.000** desktops
- **6.000** notebooks
- **28.000** netbooks

### Capacidade de Produção Diária e Custos

| Fábrica | Desktops/dia | Notebooks/dia | Netbooks/dia | Custo Diário |
| :--- | :---: | :---: | :---: | :--- |
| **Manaus** ($x$) | 8.000 | 1.000 | 2.000 | R$ 150.000,00 |
| **Sul** ($y$) | 2.000 | 1.000 | 7.000 | R$ 210.000,00 |

---

## 📐 Modelagem Matemática

### 1. Variáveis de Decisão
* $x$: Número de dias de operação da fábrica de **Manaus**.
* $y$: Número de dias de operação da fábrica do **Sul**.

### 2. Função Objetivo
Minimizar o custo total de produção diária ($Z$):
$$\text{Minimizar } Z = 150.000x + 210.000y$$

### 3. Restrições de Demanda Mínima
* **Desktops:** $8.000x + 2.000y \ge 16.000 \implies 4x + y \ge 8$
* **Notebooks:** $1.000x + 1.000y \ge 6.000 \implies x + y \ge 6$
* **Netbooks:** $2.000x + 7.000y \ge 28.000 \implies 2x + 7y \ge 28$
* **Não-negatividade:** $x \ge 0, \quad y \ge 0$

---

## 🎯 Solução Ótima Encontrada

A região viável é delimitada pelas interseções das inequações. Ao analisarmos os vértices viáveis da região:

1. **Vértice A (Notebooks ∩ Netbooks) - VIÁVEL**
   * $x = 2,8$ dias e $y = 3,2$ dias
   * $Z = 150.000(2,8) + 210.000(3,2) =$ **R$ 1.092.000,00** (Custo Mínimo)
   
2. **Vértice B (Desktops ∩ Notebooks) - VIÁVEL**
   * $x = 0,67$ dias e $y = 5,33$ dias
   * $Z \approx$ **R$ 1.220.013,00**

3. **Vértice C (Desktops ∩ Netbooks) - INVIÁVEL**
   * $x \approx 1,08$ dias e $y \approx 3,69$ dias
   * *Inviável pois viola a restrição de Notebooks ($1,08 + 3,69 = 4,77 < 6$)*

**Resultado Ótimo:** A fábrica de Manaus deve rodar por **2,8 dias** e a fábrica do Sul por **3,2 dias**, totalizando o custo mínimo de **R$ 1.092.000,00**.

---

## 🛠️ Tecnologias Utilizadas

* **React 18** & **Vite** para um ecossistema SPA moderno, rápido e reativo.
* **Canvas API** para renderizar a região viável, os eixos coordenados, as retas de restrição e o ponto ótimo de forma dinâmica e interativa.
* **CSS Modules (Vanilla CSS)** para estilização encapsulada, com estética *Dark Mode*, *glassmorphism* e micro-animações fluidas.
* **Algoritmo Simplex (Big-M)** nativo implementado em JavaScript para dupla verificação e validação dos resultados calculados graficamente.
* **KaTeX** para formatação científica elegante de expressões matemáticas.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/Raiff-85/desafio-enade-2021.git
   cd desafio-enade-2021
   ```

2. **Instalar as Dependências:**
   ```bash
   npm install
   ```

3. **Executar o Servidor de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a URL indicada no terminal (geralmente `http://localhost:5173`).

4. **Gerar a Build de Produção:**
   ```bash
   npm run build
   ```

---

## 🌐 Deploy na Vercel

O projeto está configurado para deploy instantâneo na Vercel (`vercel.json` incluso). Basta conectar o repositório GitHub à sua conta Vercel e o deploy será configurado e atualizado de forma 100% automática a cada push na branch principal.
