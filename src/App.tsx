import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import TargetCursor from './components/TargetCursor'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <TargetCursor targetSelector=".cursor-target" spinDuration={3} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </BrowserRouter>
      </LazyMotion>
    </MotionConfig>
  )
}

export default App
