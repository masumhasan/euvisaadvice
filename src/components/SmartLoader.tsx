'use client'

import { useState, useEffect } from 'react'

export default function SmartLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 5 : 100))
    }, 50)

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={`modern-loader-wrap ${!loading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="brand-symbol">
          <div className="symbol-inner"></div>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="loader-brand-name">MS ADVOCATE</div>
      </div>

      <style jsx>{`
        .modern-loader-wrap {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #0f0f1a;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10000;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .modern-loader-wrap.fade-out {
          opacity: 0;
          visibility: hidden;
          transform: scale(1.05);
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .brand-symbol {
          width: 40px;
          height: 40px;
          border: 2px solid rgba(201, 168, 76, 0.2);
          transform: rotate(45deg);
          display: flex;
          justify-content: center;
          align-items: center;
          animation: pulse-rotate 2s infinite ease-in-out;
        }

        .symbol-inner {
          width: 15px;
          height: 15px;
          background: #c9a84c;
        }

        @keyframes pulse-rotate {
          0% { transform: rotate(45deg) scale(1); opacity: 0.5; }
          50% { transform: rotate(225deg) scale(1.2); opacity: 1; }
          100% { transform: rotate(405deg) scale(1); opacity: 0.5; }
        }

        .progress-container {
          width: 180px;
          height: 2px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #c9a84c, #e5c97f);
          box-shadow: 0 0 15px rgba(201, 168, 76, 0.5);
          transition: width 0.3s ease-out;
        }

        .loader-brand-name {
          color: #fff;
          font-size: 10px;
          letter-spacing: 5px;
          font-weight: 800;
          opacity: 0.7;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  )
}
