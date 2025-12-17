import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { X } from 'lucide-react'

interface CakeModalProps {
  isOpen: boolean
  onClose: () => void
  onStartParty: () => void
}

export default function CakeModal({ isOpen, onClose, onStartParty }: CakeModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Small burst of confetti when cake appears
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFB7D5', '#FF9CEE', '#BDE0FE']
      })
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className="relative bg-white rounded-[2rem] p-10 shadow-2xl max-w-sm w-full text-center"
            onClick={e => e.stopPropagation()} // Prevent close on modal click
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Cute Cake SVG */}
            <div className="w-48 h-48 mx-auto -mt-4 mb-2">
                 <motion.svg 
                    viewBox="0 0 200 200" 
                    className="w-full h-full drop-shadow-lg"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 >
                    {/* Plate */}
                    <ellipse cx="100" cy="170" rx="80" ry="15" fill="#f1f5f9" />
                    <ellipse cx="100" cy="165" rx="60" ry="10" fill="#e2e8f0" />

                    {/* Cake Base */}
                    <path d="M40 120 L 40 150 Q 100 170 160 150 L 160 120 Z" fill="#ffb7d5" />
                    <ellipse cx="100" cy="120" rx="60" ry="20" fill="#ffcce3" />
                    
                    {/* Layer Shadow */}
                    <path d="M40 120 Q 100 140 160 120" fill="none" stroke="#ff8fab" strokeWidth="2" strokeDasharray="5 5" opacity="0.5"/>

                    {/* Top Tier */}
                    <path d="M55 80 L 55 110 Q 100 130 145 110 L 145 80 Z" fill="#fff" />
                    <ellipse cx="100" cy="80" rx="45" ry="15" fill="#f8fafc" />

                    {/* Frosting Drips */}
                    <path d="M55 80 Q 65 95 75 80 Q 85 95 95 80 Q 105 95 115 80 Q 125 95 135 80 Q 145 95 145 80" fill="#ffb7d5" strokeWidth="0" />

                    {/* Candles */}
                    <g>
                        <rect x="85" y="50" width="6" height="30" fill="#a5b4fc" rx="2" />
                        <rect x="109" y="55" width="6" height="25" fill="#fca5a5" rx="2" />
                        
                        {/* Flames */}
                        <motion.path 
                            d="M88 50 Q 83 35 88 20 Q 93 35 88 50" 
                            fill="#fcd34d"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                        />
                        <motion.path 
                            d="M112 55 Q 107 40 112 25 Q 117 40 112 55" 
                            fill="#fcd34d"
                            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.9, 0.7, 0.9] }}
                            transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                        />
                    </g>
                    
                    {/* Decor */}
                    <circle cx="70" cy="120" r="5" fill="#fcd34d" />
                    <circle cx="100" cy="125" r="5" fill="#fca5a5" />
                    <circle cx="130" cy="120" r="5" fill="#a5b4fc" />

                 </motion.svg>
            </div>

            <h3 className="text-2xl font-bold text-pink-500 mb-2">Make a Wish! ✨</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-[200px] mx-auto">
                Blow out the candles (virtually) make a wish. Wink Wonk!!
            </p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-pink-200"
                onClick={onStartParty}
            >
                You're 21 Woohoo!
            </motion.button>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
