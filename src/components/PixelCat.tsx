import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function PixelCat() {
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isBlinking, setIsBlinking] = useState(false)

  // Blink logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 200)
    }, 4000) // Blink every 4s
    return () => clearInterval(blinkInterval)
  }, [])

  // Eye tracking logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const maxRange = 6 
      const rawDist = Math.hypot(e.clientX - centerX, e.clientY - centerY) / 15
      const distance = Math.min(maxRange, rawDist)
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX)
      
      setEyePos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center p-4">
       <motion.div 
         className="relative w-72 h-72 cursor-grab active:cursor-grabbing"
         data-hover="love"
         animate={{ y: [0, -8, 0] }}
         transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
         whileHover={{ scale: 1.05 }}
       >
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
              {/* TAIL (Behind) */}
              <motion.path 
                d="M160 140 Q 190 110 170 80 T 150 140" 
                fill="none" 
                stroke="#fff" 
                strokeWidth="12"
                strokeLinecap="round"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                style={{ originX: 0, originY: 1 }}
              />

              {/* BODY */}
              <ellipse cx="100" cy="140" rx="60" ry="50" fill="#fff" />
              
              {/* EARS */}
              <path d="M70 70 L 60 40 L 95 60 Z" fill="#fff" />
              <path d="M130 70 L 140 40 L 105 60 Z" fill="#fff" />
              {/* Pink Inner Ears */}
              <path d="M72 68 L 65 48 L 90 62 Z" fill="#ffb7d5" />
              <path d="M128 68 L 135 48 L 110 62 Z" fill="#ffb7d5" />

              {/* HEAD */}
              <ellipse cx="100" cy="100" rx="55" ry="45" fill="#fff" />

              {/* EYES CONTAINER */}
              <g fill="#334155">
                  {/* Left Eye */}
                  <circle cx="80" cy="95" r="8" />
                  {/* Right Eye */}
                  <circle cx="120" cy="95" r="8" />
              </g>

              {/* PUPILS (Tracking) */}
              { !isBlinking && (
                  <g fill="#fff">
                    <circle cx={82 + eyePos.x} cy={93 + eyePos.y} r="3" />
                    <circle cx={122 + eyePos.x} cy={93 + eyePos.y} r="3" />
                  </g>
              )}

              {/* BLINK (Cover eyes) */}
              { isBlinking && (
                  <g stroke="#334155" strokeWidth="3" strokeLinecap="round">
                      <line x1="72" y1="95" x2="88" y2="95" />
                      <line x1="112" y1="95" x2="128" y2="95" />
                  </g>
              )}

              {/* BLUSH */}
              <ellipse cx="70" cy="110" rx="8" ry="4" fill="#ffb7d5" opacity="0.6" />
              <ellipse cx="130" cy="110" rx="8" ry="4" fill="#ffb7d5" opacity="0.6" />

              {/* NOSE & MOUTH */}
              <path d="M96 105 L 104 105 L 100 110 Z" fill="#ff8fab" />
              <path d="M100 110 Q 90 120 85 115" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
              <path d="M100 110 Q 110 120 115 115" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

              {/* PAWS (Holding edge) */}
              <ellipse cx="80" cy="160" rx="10" ry="8" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
              <ellipse cx="120" cy="160" rx="10" ry="8" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
          </svg>
       </motion.div>
    </div>
  )
}
