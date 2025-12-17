import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, AnimatePresence } from 'framer-motion'

export default function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // No spring physics - 1:1 instant movement as requested

  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'text' | 'clicking' | 'love'>('default')

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const computedStyle = window.getComputedStyle(target)
      
      if (cursorState === 'clicking') return 

      const loveTarget = target.closest('[data-hover="love"]')
      
      if (loveTarget) {
          setCursorState('love')
          return
      }

      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || computedStyle.cursor === 'text') {
        setCursorState('text')
      } else if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        computedStyle.cursor === 'pointer'
      ) {
        setCursorState('hover')
      } else {
        setCursorState('default')
      }
    }

    const mouseDown = () => setCursorState('clicking')
    const mouseUp = () => setCursorState('default')

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', checkHover)
    window.addEventListener('mousedown', mouseDown)
    window.addEventListener('mouseup', mouseUp)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', checkHover)
      window.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mouseup', mouseUp)
    }
  }, [cursorX, cursorY, cursorState])

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorX, // Direct binding
        y: cursorY, // Direct binding
        translateX: '-50%',
        translateY: '-50%'
      }}
    >
        {/* Animated Pixel Cat SVG - Larger Size */}
        <motion.div 
            className="relative w-12 h-12"
            animate={{
               scale: (cursorState === 'hover' || cursorState === 'love') ? 1.2 : cursorState === 'clicking' ? 0.9 : 1,
               rotate: cursorState === 'text' ? 0 : cursorState === 'hover' ? -10 : cursorState === 'love' ? 10 : 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-xl filter">
                {/* Sakamoto Pixel Art 2.0 - Cleaner 16x16 Scaling */}
                
                {/* Body/Head (Black) */}
                <path d="
                  M6 10 h20 v12 h-4 v4 h-12 v-4 h-4 Z
                  M8 4 h6 v6 h-6 Z
                  M18 4 h6 v6 h-6 Z
                " fill="#18181b" />

                {/* Ears Inner (Dark Grey accent) */}
                <rect x="9" y="5" width="4" height="4" fill="#27272a" />
                <rect x="19" y="5" width="4" height="4" fill="#27272a" />

                {/* Eyes - Large & Expressive (Sakamoto Style) */}
                <g className={cursorState === 'default' ? "animate-blink" : ""}>
                    {cursorState === 'clicking' || cursorState === 'love' ? (
                       // Happy Closed Eyes ^ ^
                       <>
                         <path d="M9 16 l2 -2 l2 2" stroke="#fff" strokeWidth="2" fill="none" />
                         <path d="M19 16 l2 -2 l2 2" stroke="#fff" strokeWidth="2" fill="none" />
                       </>
                    ) : (
                       // Open Yellow Eyes
                       <>
                         <rect x="9" y="14" width="6" height="5" fill="#facc15" />
                         <rect x="19" y="14" width="6" height="5" fill="#facc15" />
                         {/* Pupils */}
                         <rect x={cursorState === 'text' ? 12 : 11} y="15" width="2" height="3" fill="#000" />
                         <rect x={cursorState === 'text' ? 22 : 21} y="15" width="2" height="3" fill="#000" />
                       </>
                    )}
                </g>

                {/* Red Scarf - Distinct Bandana Shape */}
                <path d="M8 22 h16 v2 h-16 Z" fill="#ef4444" /> {/* Collar */}
                <path d="M13 24 h6 v2 h-2 v2 h-2 v-2 h-2 Z" fill="#ef4444" /> {/* Knot Hanging Down */}

                {/* Nose */}
                <rect x="15" y="19" width="2" height="1" fill="#f472b6" />

                {/* Mouth */}
                 {(cursorState === 'hover' || cursorState === 'love') && (
                    <path d="M14 20 h4 v1 h-4 Z" fill="#f472b6" opacity="0.5" /> 
                )}
            </svg>
            
            {/* Interaction Badges */}
            <AnimatePresence>
                {cursorState === 'hover' && (
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-4 -right-4 bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm border border-black"
                    >
                        !
                    </motion.div>
                )}
                {cursorState === 'love' && (
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-5 -right-5 text-xl drop-shadow-sm"
                    >
                        ❤️
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    </motion.div>
  )
}
