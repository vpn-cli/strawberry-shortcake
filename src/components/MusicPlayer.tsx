import React, { useState, useRef, useEffect } from 'react'
import { Music, Heart } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import song from '../assets/Apocalypse.mp3'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const attemptPlay = async () => {
        if (audioRef.current) {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Autoplay blocked (user interaction needed):", err);
                setIsPlaying(false);
                
                const enableAudio = () => {
                    if (audioRef.current) {
                        audioRef.current.play();
                        setIsPlaying(true);
                        document.removeEventListener('click', enableAudio);
                    }
                };
                document.addEventListener('click', enableAudio);
            }
        }
    }
    attemptPlay();
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-6">
        <audio 
            ref={audioRef} 
            src={song} 
            loop 
            autoPlay
            onError={(e) => console.error("Audio Load Error:", e)}
        />

        {/* Vinyl Record Control */}
        <button 
            onClick={togglePlay}
            className="group relative flex items-center justify-center transition-transform active:scale-95 duration-150 ease-out"
            title={isPlaying ? "Pause" : "Play Music"}
        >
            {/* Floating Hearts Particle - Only when playing */}
            {isPlaying && (
                <>
                    <Heart className="absolute -top-8 right-0 text-pink-400 w-4 h-4 animate-float" style={{ animationDelay: '0s' }} fill="currentColor" />
                    <Heart className="absolute -top-4 -right-6 text-purple-400 w-3 h-3 animate-float" style={{ animationDelay: '0.5s' }} fill="currentColor" />
                    <Heart className="absolute -top-10 -right-2 text-red-300 w-5 h-5 animate-float" style={{ animationDelay: '1s' }} fill="currentColor" />
                </>
            )}

            {/* Tone Arm (Decoration) - Pastel Blue */}
            <div className={twMerge(
                "absolute -top-6 right-2 w-2 h-16 bg-blue-200 rounded-full origin-top transition-transform duration-500 z-0 border border-blue-300 shadow-sm",
                isPlaying ? "rotate-[20deg]" : "rotate-0"
            )}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-300 rounded-full shadow-inner border border-blue-400"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-5 bg-pink-300 rounded-sm border border-pink-400"></div>
            </div>

            {/* Kawaii Vinyl Graphic */}
            <svg 
                viewBox="0 0 100 100" 
                className={twMerge(
                    "w-28 h-28 drop-shadow-2xl relative z-10",
                    isPlaying ? "animate-spin-slow" : ""
                )}
            >
                {/* Pastel Pink Record Body */}
                <circle cx="50" cy="50" r="48" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" /> {/* pink-200 fill, pink-400 stroke */}
                
                {/* Grooves - lighter pink */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f9a8d4" strokeWidth="1" strokeDasharray="4 2" />
                <circle cx="50" cy="50" r="32" fill="none" stroke="#f9a8d4" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="24" fill="none" stroke="#f9a8d4" strokeWidth="1" />

                {/* Sticker Label - White */}
                <circle cx="50" cy="50" r="18" fill="#fff" stroke="#fce7f3" strokeWidth="1" /> 
                
                {/* Kawaii Face on Label */}
                 {/* Eyes (Winking when playing) */}
                {isPlaying ? (
                    <>
                        <path d="M42 48 Q 44 46 46 48" fill="none" stroke="#52525b" strokeWidth="1.5" strokeLinecap="round" /> {/* Wink */}
                        <circle cx="56" cy="48" r="1.5" fill="#52525b" />
                    </>
                ) : (
                    <>
                        <circle cx="44" cy="48" r="1.5" fill="#52525b" />
                        <circle cx="56" cy="48" r="1.5" fill="#52525b" />
                    </>
                )}
                
                 {/* Mouth (Happy) */}
                <path d="M48 52 Q 50 54 52 52" fill="none" stroke="#52525b" strokeWidth="1.5" strokeLinecap="round" />
                 {/* Blush */}
                <ellipse cx="42" cy="52" rx="2" ry="1" fill="#f472b6" opacity="0.6" />
                <ellipse cx="58" cy="52" rx="2" ry="1" fill="#f472b6" opacity="0.6" />

                {/* Center Hole */}
                <circle cx="50" cy="50" r="2" fill="#e5e7eb" />
                
                {/* Shine/Reflection */}
                <path d="M50 2 A 48 48 0 0 1 98 50" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
            </svg>

            {/* Note when paused to indicate 'ready' */}
            {!isPlaying && (
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 rounded-full z-20 backdrop-blur-[1px]">
                     <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-pink-500 border-b-[10px] border-b-transparent drop-shadow-lg"></div>
                 </div>
            )}
        </button>

        {/* Track Info */}
        <div className={twMerge(
            "flex flex-col transition-all duration-500 overflow-hidden whitespace-nowrap bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-pink-200",
            isPlaying ? "w-40 opacity-100 translate-x-0 scale-100" : "w-0 opacity-0 -translate-x-10 scale-95"
        )}>
            <div className="flex items-center gap-2 mb-1">
                <Music className="w-3 h-3 text-pink-400 animate-bounce" />
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">Playing Forever</span>
            </div>
            <span className="text-sm font-black text-slate-700 truncate">Apocalypse</span>
            <span className="text-[10px] text-slate-500 font-medium truncate">Snoopy + Shortcake</span>
        </div>
    </div>
  )
}
