import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function PartyOverlay() {
  const [balloons, setBalloons] = useState<number[]>([])

  useEffect(() => {
    // Spawn balloons
    const balloonCount = 30
    const newBalloons = Array.from({ length: balloonCount }, (_, i) => i)
    setBalloons(newBalloons)

    // Intense Confetti & Glitter
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // Reduced intensity for performance
      const particleCount = 20 * (timeLeft / duration);
      
      // Confetti - reduced count
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff0000', '#00ff00', '#0000ff'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ffb7d5', '#ff9cee', '#bde0fe'] });
      
      // Glitter (small gold/silver particles) - reduced count & spread
      if (Math.random() > 0.5) { // Only spawn glitter half the time
        confetti({
            particleCount: 10,
            spread: 80,
            startVelocity: 35,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
            colors: ['#FFD700', '#C0C0C0', '#ffffff'],
            shapes: ['circle'],
            scalar: 0.4,
            drift: 0.2
        })
      }

    }, 500); // Increased interval from 250ms to 500ms

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      <AnimatePresence>
        {balloons.map((i) => (
          <Balloon key={i} index={i} />
        ))}
      </AnimatePresence>
      
      {/* Floating Glimmers - Reduced Count */}
       {[...Array(8)].map((_, i) => (
            <motion.div
                key={`glimmer-${i}`}
                className="absolute text-yellow-300 text-4xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "easeInOut"
                }}
            >
                ✨
            </motion.div>
       ))}
    </div>
  )
}

function Balloon({ index }: { index: number }) {
  const randomX = Math.random() * 100 // 0-100%
  const randomDelay = Math.random() * 2
  const colors = ['text-red-400', 'text-blue-400', 'text-green-400', 'text-yellow-400', 'text-purple-400', 'text-pink-500']
  const color = colors[index % colors.length]

  return (
    <motion.div
        initial={{ y: '110vh', x: `${randomX}vw`, rotate: 0 }}
        animate={{ 
            y: '-100vh',
            rotate: useMemo(() => Math.random() * 20 - 10, [])
        }}
        transition={{ 
            duration: 10 + Math.random() * 10, 
            ease: "easeOut", 
            delay: randomDelay 
        }}
        className={`absolute text-8xl ${color} drop-shadow-md`}
    >
        🎈
    </motion.div>
  )
}
