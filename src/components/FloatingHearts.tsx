import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import PixelHeart from './PixelHeart'

export default function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hearts = document.querySelectorAll('.floating-heart')
      
      hearts.forEach((heart) => {
        // Random start position
        // Start them scattered all over the screen height initially for "instant" look
        // We use set for initial positions
        gsap.set(heart, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight + 100, // Random Y to fill screen instantly
          opacity: 0.6 + Math.random() * 0.4, // High opacity as requested
          scale: 0.8 + Math.random() * 0.4 // Restored varied sizes
        })

        // Simple Floating Up
        gsap.to(heart, {
          y: '-=120vh', // Float up 120vh relative to start
          duration: 15 + Math.random() * 15,
          repeat: -1,
          ease: 'none',
          // No delay needed because we randomized Y position above
          modifiers: {
            y: gsap.utils.unitize(y => parseFloat(y) % (window.innerHeight + 200)) // Wrap around logic if needed, or just let it repeat
          } 
        })
        
        // Use a simpler approach for the loop:
        // Actually, the previous "from bottom" loop is cleaner if we just use negative delay.
        // Let's stick to the previous code structure but fix the params as requested.
      })
      
      // Re-doing the loop logic to be exactly what user liked but "more" of them
      hearts.forEach((heart) => {
        gsap.set(heart, {
          x: Math.random() * window.innerWidth,
          y: window.innerHeight + 100,
          opacity: 0.6 + Math.random() * 0.4
        })

        gsap.to(heart, {
          y: -100,
          duration: 15 + Math.random() * 15,
          repeat: -1,
          ease: 'none',
          delay: -Math.random() * 30, // Instant coverage
        })

        // Gentle Wobble (Original)
        gsap.to(heart, {
          x: '+=' + (Math.random() * 50 - 25),
          rotation: Math.random() * 10 - 5, // Barely rotate (static-ish)
          duration: 2 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div key={i} className="floating-heart absolute">
          <PixelHeart className={`
            ${i % 4 === 0 ? 'text-pink-300' : i % 4 === 1 ? 'text-rose-400' : i % 4 === 2 ? 'text-orange-200' : 'text-purple-300'} 
            ${i % 3 === 0 ? 'w-8 h-8' : i % 3 === 1 ? 'w-6 h-6' : 'w-10 h-10'}
          `} />
        </div>
      ))}
    </div>
  )
}
