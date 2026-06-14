import './App.css'
import Hero from './components/Hero'
import ProblemStatement from './components/ProblemStatement'
import MathModel from './components/MathModel'
import Solver from './components/Solver'
import StepByStep from './components/StepByStep'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <nav className="navbar">
        <div className="container navbar-inner">
          <a href="#" className="navbar-brand">
            <span>📐</span> ENADE 2021 · PL Solver
          </a>
          <div className="navbar-links">
            <a href="#problema">Problema</a>
            <a href="#modelo">Modelo</a>
            <a href="#solver">Solver</a>
            <a href="#passo-a-passo">Resolução</a>
            <a
              href="https://github.com/Raiff-85/desafio-enade-2021"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-github"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <ProblemStatement />
        <MathModel />
        <Solver />
        <StepByStep />
      </main>

      <Footer />
    </>
  )
}
