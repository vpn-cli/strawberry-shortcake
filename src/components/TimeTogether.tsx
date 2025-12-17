import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Clock } from 'lucide-react'

export default function TimeTogether() {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  // Start Date: June 5th, 2025 (Adjust year as needed)
  const START_DATE = new Date('2025-06-05T00:00:00')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = now.getTime() - START_DATE.getTime()

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeElapsed({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center py-12 px-4"
    >
        <div className="bg-white/40 backdrop-blur-sm border-2 border-dashed border-pink-200 rounded-3xl p-8 shadow-lg max-w-2xl w-full relative overflow-hidden group hover:border-pink-300 transition-colors">
            
            {/* Floating Icons Background */}
            <div className="absolute top-2 left-2 animate-bounce opacity-50">
                <Clock className="w-6 h-6 text-pink-300" />
            </div>
            <div className="absolute bottom-2 right-2 animate-pulse opacity-50">
                <Heart className="w-6 h-6 text-rose-300 fill-rose-200" />
            </div>

            <h3 className="text-center text-slate-600 font-handwriting text-3xl mb-8 flex items-center justify-center gap-3">
                <span className="text-rose-400">✨</span> 
                Since we met 
                <span className="text-rose-400">✨</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <TimeUnit value={timeElapsed.days} label="Days" color="bg-rose-100/80 text-rose-600" delay={0} />
                <TimeUnit value={timeElapsed.hours} label="Hours" color="bg-sky-100/80 text-sky-600" delay={0.1} />
                <TimeUnit value={timeElapsed.minutes} label="Mins" color="bg-amber-100/80 text-amber-600" delay={0.2} />
                <TimeUnit value={timeElapsed.seconds} label="Secs" color="bg-emerald-100/80 text-emerald-600" delay={0.3} />
            </div>
            
            <p className="text-center font-handwriting text-slate-400 mt-6 text-sm">
                (June 5th)
            </p>
        </div>
    </motion.div>
  )
}

function TimeUnit({ value, label, color, delay }: { value: number, label: string, color: string, delay: number }) {
    return (
        <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay, type: "spring", stiffness: 200 }}
            className={`flex flex-col items-center p-4 rounded-2xl ${color} shadow-sm backdrop-blur-md relative overflow-hidden group`}
            data-hover="love"
        >
            <span className="text-3xl md:text-4xl font-bold font-mono tracking-tighter z-10">
                {String(value).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold opacity-70 mt-1 z-10">
                {label}
            </span>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </motion.div>
    )
}
