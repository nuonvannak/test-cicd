import React, { useState } from 'react';

export default function App() {
  const [counter, setCounter] = useState(0);
  const [buildTime] = useState(new Date().toLocaleTimeString());

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div style={{ marginBottom: '1rem' }}>
          <span className="badge badge-live">
            <span className="pulse-dot"></span>
            Kubernetes Pod Live
          </span>
        </div>
        <h1>CI/CD Automated Deployment</h1>
        <p>Live React Application deployed automatically via GitHub ➔ Jenkins ➔ Kubernetes</p>
      </header>

      {/* Architecture Flow Box */}
      <section className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Active Pipeline Workflow</h2>
          <span style={{ fontSize: '0.85rem', color: '#38bdf8' }}>Automated via Webhook</span>
        </div>
        <div className="flow-container">
          <div className="flow-step">
            <div>🐙 GitHub</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Push to main</div>
          </div>
          <div className="flow-arrow">➔</div>
          <div className="flow-step">
            <div>☁️ Cloudflare</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Tunnel Proxy</div>
          </div>
          <div className="flow-arrow">➔</div>
          <div className="flow-step">
            <div>⚙️ Jenkins</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Docker Build</div>
          </div>
          <div className="flow-arrow">➔</div>
          <div className="flow-step">
            <div>☸️ Kubernetes</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>k3d dev Cluster</div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <div className="grid">
        <div className="stat-box">
          <span className="stat-label">Environment</span>
          <span className="stat-value" style={{ color: '#38bdf8' }}>k3d-dev (k3s)</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Pipeline Trigger</span>
          <span className="stat-value" style={{ color: '#a855f7' }}>GitHub Webhook</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Pod Status</span>
          <span className="stat-value" style={{ color: '#10b981' }}>Running (2/2)</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Served At</span>
          <span className="stat-value" style={{ fontSize: '1.1rem' }}>{buildTime}</span>
        </div>
      </div>

      {/* Interactive Verification Card */}
      <section className="glass-card interactive">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Interactive State Test</h3>
        <p style={{ color: '#94a3b8', maxWidth: '500px' }}>
          Test client-side React hydration and state persistence inside your container.
        </p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn" onClick={() => setCounter((c) => c + 1)}>
            Increment Test Counter: <span style={{ marginLeft: '0.5rem', fontWeight: 800 }}>{counter}</span>
          </button>
          {counter > 0 && (
            <button
              onClick={() => setCounter(0)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#94a3b8',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              Reset
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>Built with React & Vite • Packaged in Nginx Container • Managed by Jenkins</p>
      </footer>
    </div>
  );
}
