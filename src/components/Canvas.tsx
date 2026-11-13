import React, { useCallback, useEffect, useRef } from 'react'
import { DesignState } from '../constants'

interface CanvasProps {
  seed: number
  state: DesignState
  draw: () => void
}

const Canvas: React.FC<CanvasProps> = ({ seed, state, draw }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawRef = useRef(draw)
  drawRef.current = draw

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const render = () => drawRef.current()

    render()

    const observer = new ResizeObserver(() => {
      render()
    })

    observer.observe(canvas)

    return () => {
      observer.disconnect()
    }
  }, [seed, state])

  const exportPng = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = 'gridtype-composition.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }, [])

  return (
    <div className="preview-area">
      <div className="preview-top">
        <span>Live output</span>
        <span id="dimensions">1200 × 675 PX</span>
      </div>
      <div className="canvas-shell">
        <canvas id="art" ref={canvasRef} width={1200} height={675} />
      </div>
      <div className="preview-caption">
        <span>Bitmap typography · Cell-aligned</span>
        <span>PNG / Full resolution</span>
      </div>
      <div className="button-row">
        <button className="action" onClick={exportPng}>Export composition ↗</button>
        <span className="studio-note">
          Your work stays in this browser.<br />No account. No upload. No server.
        </span>
      </div>
    </div>
  )
}

export default Canvas
