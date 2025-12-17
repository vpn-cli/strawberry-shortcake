import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FloatingBalloons() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const balloons = document.querySelectorAll('.balloon')
      
      balloons.forEach((balloon) => {

        const wobble = Math.random() * 20
        
        gsap.to(balloon, {
          y: '-=100vh',
          x: `+=${wobble}`,
          duration: 10 + Math.random() * 10,
          repeat: -1,
          ease: 'none',
          delay: Math.random() * 10
        })
        
        gsap.to(balloon, {
          rotation: Math.random() * 20 - 10,
          duration: 2 + Math.random(),
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
      {[...Array(10)].map((_, i) => (
        <div 
          key={i} 
          className="balloon absolute text-6xl"
          style={{ 
            left: `${Math.random() * 100}%`, 
            bottom: '-10%',
            filter: 'hue-rotate(' + Math.random() * 360 + 'deg)'
          }}
        >
          🎈
        </div>
      ))}
    </div>
  )
}
