import { useState, useEffect, useCallback } from 'react'
import Header from './components/Header'
import Controls from './components/Controls'
import Canvas from './components/Canvas'
import { DEFAULTS, DesignState, glyphs, PRESETS } from './constants'
import './App.css'

function App() {
  const [state, setState] = useState<DesignState>(DEFAULTS)
  const [seed, setSeed] = useState<number>(42)

  const updateState = useCallback(<K extends keyof DesignState>(key: K, value: DesignState[K]) => {
    setState(prev => ({ ...prev, [key]: value }))
  }, [])

  const draw = useCallback(() => {
    const canvas = document.getElementById('art') as HTMLCanvasElement
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const {
      line1,
      line2,
      fontScale,
      lineGap,
      cell,
      gap,
      bg,
      grid,
      ink,
      soft,
      mid,
      accent,
      noiseOn,
      showAccent,
      transparent,
    } = state

    const W = canvas.width
    const H = canvas.height
    const pitch = cell + gap
    const cols = Math.floor((W - 36 + gap) / pitch)
    const rows = Math.floor((H - 32 + gap) / pitch)
    const x0 = Math.floor((W - (cols * pitch - gap)) / 2)
    const y0 = Math.floor((H - (rows * pitch - gap)) / 2)

    ctx.clearRect(0, 0, W, H)
    if (!transparent) {
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)
    }

    const lines = [line1.toUpperCase(), line2.toUpperCase()].filter(s => s.trim())
    const requested = fontScale
    const layouts = []

    for (const line of lines) {
      const chars = [...line]
      const units = chars.reduce((n, ch) => n + (ch === ' ' ? 4 : 6), -1)
      const scale = Math.max(1, Math.min(requested, Math.floor((cols - 4) / Math.max(1, units))))
      layouts.push({
        chars,
        scale,
        width: chars.reduce((n, ch) => n + (ch === ' ' ? 4 : 6) * scale, 0),
        height: 7 * scale,
      })
    }

    const totalH = layouts.reduce((n, l) => n + l.height, 0) + Math.max(0, layouts.length - 1) * lineGap

    let y = Math.max(0, Math.floor((rows - totalH) / 2))
    const active = new Set<number>()

    for (const layout of layouts) {
      let x = Math.max(0, Math.floor((cols - layout.width) / 2))
      const s = layout.scale

      for (const ch of layout.chars) {
        if (ch === ' ') {
          x += 4 * s
          continue
        }

        const pattern = glyphs[ch] || glyphs[' ']
        for (let gy = 0; gy < 7; gy++) {
          for (let gx = 0; gx < 5; gx++) {
            if (pattern[gy][gx] === '1') {
              for (let sy = 0; sy < s; sy++) {
                for (let sx = 0; sx < s; sx++) {
                  const px = x + gx * s + sx
                  const py = y + gy * s + sy
                  if (px >= 0 && px < cols && py >= 0 && py < rows) {
                    active.add(py * cols + px)
                  }
                }
              }
            }
          }
        }
        x += 6 * s
      }

      y += layout.height + lineGap
    }

    const noise = noiseOn ? state.noise / 100 : 0
    const rad = state.round

    const rand = (index: number) => {
      const x = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453
      return x - Math.floor(x)
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c
        const n = rand(index)
        let color = grid

        if (active.has(index)) {
          color = ink
        } else if (n < noise * 0.72) {
          color = soft
        } else if (n < noise) {
          color = mid
        }

        if (showAccent && r === Math.floor(rows * 0.79) && c === Math.floor(cols * 0.945)) {
          color = accent
        }

        const x = x0 + c * pitch
        const yy = y0 + r * pitch

        ctx.fillStyle = color
        if (rad === 0) {
          ctx.fillRect(x, yy, cell, cell)
        } else {
          ctx.beginPath()
          ctx.roundRect(x, yy, cell, cell, Math.min(rad, cell / 2))
          ctx.fill()
        }
      }
    }

    const dimensionsEl = document.getElementById('dimensions')
    if (dimensionsEl) {
      dimensionsEl.textContent = `${W} × ${H} PX`
    }
  }, [state, seed])

  useEffect(() => {
    draw()
  }, [draw, state, seed])

  const shufflePattern = () => {
    setSeed(Math.floor(Math.random() * 1e6))
  }

  const resetSettings = () => {
    setState(DEFAULTS)
    setSeed(42)
  }

  const setPreset = (presetName: string) => {
    if (presetName === 'moss' || presetName === 'mono' || presetName === 'night') {
      const preset = (PRESETS as any)[presetName]
      if (preset) {
        setState(prev => ({ ...prev, ...preset }))
      }
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <section className="studio" id="studio">
          <div className="studio-head">
            <div>
              <div className="section-index">GRIDTYPE / STUDIO</div>
              <h3>Pixel typography.</h3>
            </div>
            <p>1200 × 675 PX</p>
          </div>

          <div className="studio-layout">
            <Controls
              state={state}
              updateState={updateState}
              setPreset={setPreset}
              resetSettings={resetSettings}
              shufflePattern={shufflePattern}
            />
            <Canvas seed={seed} state={state} draw={draw} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App