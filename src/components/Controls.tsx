import React, { useCallback } from 'react'
import { DesignState } from '../constants'

interface ControlsProps {
  state: DesignState
  updateState: <K extends keyof DesignState>(key: K, value: DesignState[K]) => void
  setPreset: (preset: string) => void
  resetSettings: () => void
  shufflePattern: () => void
}

const Controls: React.FC<ControlsProps> = ({
  state,
  updateState,
  setPreset,
  resetSettings,
  shufflePattern,
}) => {
  const handleInputChange = useCallback((id: string, value: any) => {
    updateState(id as keyof DesignState, value)
  }, [updateState])

  return (
    <aside className="controls">
      <div className="control-section">
        <div className="control-title">
          <span>Typography</span>
          <span>01 / TYPE</span>
        </div>

        <div className="field">
          <div className="label-row">
            <label htmlFor="line1">First line</label>
            <output>LINE 01</output>
          </div>
          <input
            className="text-input"
            id="line1"
            maxLength={24}
            value={state.line1}
            onChange={e => handleInputChange('line1', e.target.value)}
          />
        </div>

        <div className="field">
          <div className="label-row">
            <label htmlFor="line2">Second line</label>
            <output>LINE 02</output>
          </div>
          <input
            className="text-input"
            id="line2"
            maxLength={24}
            value={state.line2}
            onChange={e => handleInputChange('line2', e.target.value)}
          />
        </div>

        <div className="field">
          <div className="label-row">
            <label htmlFor="fontScale">Letter scale</label>
            <output id="fontScaleOut">{state.fontScale}×</output>
          </div>
          <input
            className="range"
            id="fontScale"
            type="range"
            min="1"
            max="3"
            value={state.fontScale}
            onChange={e => handleInputChange('fontScale', parseInt(e.target.value))}
          />
        </div>

        <div className="field">
          <div className="label-row">
            <label htmlFor="lineGap">Line spacing</label>
            <output id="lineGapOut">{state.lineGap} cells</output>
          </div>
          <input
            className="range"
            id="lineGap"
            type="range"
            min="1"
            max="10"
            value={state.lineGap}
            onChange={e => handleInputChange('lineGap', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="control-section">
        <div className="control-title">
          <span>Grid geometry</span>
          <span>02 / GRID</span>
        </div>

        <div className="field">
          <div className="label-row">
            <label htmlFor="cell">Cell size</label>
            <output id="cellOut">{state.cell} px</output>
          </div>
          <input
            className="range"
            id="cell"
            type="range"
            min="5"
            max="18"
            value={state.cell}
            onChange={e => handleInputChange('cell', parseInt(e.target.value))}
          />
        </div>

        <div className="field">
          <div className="label-row">
            <label htmlFor="gap">Cell spacing</label>
            <output id="gapOut">{state.gap} px</output>
          </div>
          <input
            className="range"
            id="gap"
            type="range"
            min="1"
            max="9"
            value={state.gap}
            onChange={e => handleInputChange('gap', parseInt(e.target.value))}
          />
        </div>

        <div className="field">
          <div className="label-row">
            <label htmlFor="noise">Ambient cells</label>
            <output id="noiseOut">{state.noise}%</output>
          </div>
          <input
            className="range"
            id="noise"
            type="range"
            min="0"
            max="25"
            value={state.noise}
            onChange={e => handleInputChange('noise', parseInt(e.target.value))}
          />
        </div>

        <div className="field">
          <div className="label-row">
            <label htmlFor="round">Corner radius</label>
            <output id="roundOut">{state.round} px</output>
          </div>
          <input
            className="range"
            id="round"
            type="range"
            min="0"
            max="5"
            value={state.round}
            onChange={e => handleInputChange('round', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="control-section">
        <div className="control-title">
          <span>Color system</span>
          <span>03 / COLOR</span>
        </div>

        <div className="presets">
          <button
            className={`preset ${state.bg === '#f7f9f7' ? 'active' : ''}`}
            data-preset="moss"
            onClick={() => setPreset('moss')}
          >
            Moss
          </button>
          <button
            className={`preset ${state.bg !== '#f7f9f7' && state.bg !== '#101713' ? 'active' : ''}`}
            data-preset="mono"
            onClick={() => setPreset('mono')}
          >
            Monochrome
          </button>
          <button
            className={`preset ${state.bg === '#101713' ? 'active' : ''}`}
            data-preset="night"
            onClick={() => setPreset('night')}
          >
            Night
          </button>
        </div>

        <div className="palette">
          <div className="color-item">
            <span>Background</span>
            <input
              id="bg"
              type="color"
              value={state.bg}
              onChange={e => handleInputChange('bg', e.target.value)}
            />
          </div>
          <div className="color-item">
            <span>Grid</span>
            <input
              id="grid"
              type="color"
              value={state.grid}
              onChange={e => handleInputChange('grid', e.target.value)}
            />
          </div>
          <div className="color-item">
            <span>Lettering</span>
            <input
              id="ink"
              type="color"
              value={state.ink}
              onChange={e => handleInputChange('ink', e.target.value)}
            />
          </div>
          <div className="color-item">
            <span>Soft green</span>
            <input
              id="soft"
              type="color"
              value={state.soft}
              onChange={e => handleInputChange('soft', e.target.value)}
            />
          </div>
          <div className="color-item">
            <span>Mid green</span>
            <input
              id="mid"
              type="color"
              value={state.mid}
              onChange={e => handleInputChange('mid', e.target.value)}
            />
          </div>
          <div className="color-item">
            <span>Accent</span>
            <input
              id="accent"
              type="color"
              value={state.accent}
              onChange={e => handleInputChange('accent', e.target.value)}
            />
          </div>
        </div>

        <div className="switches">
          <label className="toggle">
            Ambient cells
            <input
              id="noiseOn"
              type="checkbox"
              checked={state.noiseOn}
              onChange={e => handleInputChange('noiseOn', e.target.checked)}
            />
          </label>
          <label className="toggle">
            Accent pixel
            <input
              id="showAccent"
              type="checkbox"
              checked={state.showAccent}
              onChange={e => handleInputChange('showAccent', e.target.checked)}
            />
          </label>
          <label className="toggle">
            Transparent background
            <input
              id="transparent"
              type="checkbox"
              checked={state.transparent}
              onChange={e => handleInputChange('transparent', e.target.checked)}
            />
          </label>
        </div>

        <div className="button-row">
          <button className="action secondary" id="reset" onClick={resetSettings}>Reset settings</button>
          <button className="action" id="shuffle" onClick={shufflePattern}>Regenerate pattern ↻</button>
        </div>
      </div>
    </aside>
  )
}

export default Controls
