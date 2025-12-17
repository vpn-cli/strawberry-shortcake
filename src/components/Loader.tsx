import { Heart } from 'lucide-react'

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-pink-50">
      <div className="relative">
        {/* Pulsing heart animation using Tailwind and Lucide */}
        <Heart className="w-24 h-24 text-pink-500 animate-bounce" fill="currentColor" />
        <div className="absolute top-0 left-0 w-full h-full animate-ping opacity-75">
            <Heart className="w-24 h-24 text-pink-400" fill="currentColor" />
        </div>
      </div>
      <p className="mt-8 text-pink-500 font-bold text-xl animate-pulse font-handwriting tracking-widest">
        just keep swimming 🐠...
      </p>
    </div>
  )
}
