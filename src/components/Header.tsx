import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="site-head">
      <nav className="nav">
        <div className="wordmark">
          <span className="mark">
            <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          </span>
          GRIDTYPE
        </div>
        <div className="nav-right">
          <span className="nav-index">STUDIO / 001</span>
          <a href="#studio">THE GENERATOR</a>
          <a href="#about">ABOUT</a>
        </div>
      </nav>
      <section className="hero" style={{ display: 'none' }}>
        <div>
          <div className="eyebrow">A study in pixel typography · 2026</div>
          <h1>Words into<br/><span>systems.</span></h1>
        </div>
        <div className="hero-ascii"><pre id="asciiOrb"></pre></div>
      </section>
      <section className="metrics" style={{ display: 'none' }}>
        <div className="metric"><div className="metric-value">5 × 7</div><div className="metric-label">Bitmap glyph architecture</div></div>
        <div className="metric"><div className="metric-value">1,200</div><div className="metric-label">Pixel-wide export canvas</div></div>
        <div className="metric"><div className="metric-value">06</div><div className="metric-label">Editable palette channels</div></div>
        <div className="metric"><div className="metric-value">100%</div><div className="metric-label">Local browser rendering</div></div>
      </section>
    </header>
  )
}

export default Header
