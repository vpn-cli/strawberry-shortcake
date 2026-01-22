import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Gift, Sparkles, Heart } from 'lucide-react'
import confetti from 'canvas-confetti'
import { Analytics } from '@vercel/analytics/react'
import SmoothScroll from './components/SmoothScroll'
// import SplineScene from './components/SplineScene'
// import FloatingBalloons from './components/FloatingBalloons'
import FloatingHearts from './components/FloatingHearts'
import PixelHeart from './components/PixelHeart'
import Letter from './components/Letter'
import { Button } from './components/ui/button'
import PixelCat from './components/PixelCat'
import Sticker from './components/Sticker'
import MusicPlayer from './components/MusicPlayer'
import PhotoGallery from './components/PhotoGallery'
import TimeTogether from './components/TimeTogether'
import CustomCursor from './components/CustomCursor'




import PartyOverlay from './components/PartyOverlay'
import CakeModal from './components/CakeModal'
import Loader from './components/Loader'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [showCake, setShowCake] = React.useState(false)
  const [showParty, setShowParty] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])
  
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  }

  useEffect(() => {
    // Reveal text
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      })
      
      gsap.from(".hero-btn", {
        scale: 0,
        rotation: -10,
        opacity: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
        delay: 1
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  if (isLoading) return <Loader />

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 overflow-hidden text-slate-800 font-sans selection:bg-pink-200">
        <Analytics />
        {/* Soft atmospheric glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-orange-50/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Replaced Balloons with visible Hearts */}
        <FloatingHearts />
        <MusicPlayer />
        <CustomCursor />
        {showParty && <PartyOverlay />}
        
        {/* Navigation - Floating Button Only */}
        <div className="fixed top-6 right-6 z-50">
          <Button 
            size="sm" 
            className="rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg shadow-pink-200/50 transition-all hover:scale-105 active:scale-95" 
            onClick={() => setShowCake(true)}
          >
            Make a Wish ✨
          </Button>
        </div>
        
        {/* Cake Modal */}
        <CakeModal 
            isOpen={showCake} 
            onClose={() => setShowCake(false)} 
            onStartParty={() => {
                setShowCake(false)
                setShowParty(true)
            }}
        />

        {/* Hero Section */}
        <main ref={heroRef} className="pt-32 pb-10 px-6 max-w-7xl mx-auto min-h-screen flex flex-col lg:flex-row items-center gap-8 relative z-10">
          
          {/* Stickers: Hero */}
          <Sticker rotation={-15} className="hidden lg:flex top-32 left-10 bg-rose-300 text-white px-4 py-1 rounded-full font-bold shadow-lg border-2 border-white font-handwriting text-xl">
             miss u
          </Sticker>
          <Sticker rotation={10} className="hidden lg:flex top-20 right-20 bg-pink-500 text-white px-6 py-2 rounded-full text-xl  font-handwriting shadow-lg border-2 border-white">
             HAPPY BDAY KIWII  !
          </Sticker>

          {/* Left Content */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="hero-text mb-4 inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-pink-500 shadow-sm border border-pink-100">
              <PixelHeart className="w-5 h-5 text-red-500" />
              <span>It's your special day!</span>
            </div>
            
            <div className="hero-text mb-2 -ml-4 lg:-ml-6 w-full max-w-2xl">
            {/* <Title3D /> */}
            <h1 className="hero-text text-6xl lg:text-8xl font-black font-handwriting leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 filter drop-shadow-sm">
              Happiest Birthday <br/> Kiwii !
            </h1>
            </div>
            
            <p className="hero-text text-xl lg:text-2xl text-slate-600 mb-10 max-w-lg font-bold font-handwriting">
              To the wackiest, funniest, and most wonderful woman. Here is a little 
              digital hug to celebrate YOU.
            </p>
            
            <div className="hero-btn relative">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 text-white shadow-xl shadow-pink-200 text-2xl px-12 py-8 rounded-full transition-transform hover:scale-105 active:scale-95 font-handwriting font-bold"
                onClick={triggerConfetti}
              >
                Press for Magic ✨
              </Button>
              {/* Sticker near button */}
              <Sticker rotation={20} className="hidden lg:flex -right-24 -top-10">
                 <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              </Sticker>
            </div>
          </div>

          {/* Right Content - Cute Cat Model */}
          <div className="lg:w-1/2 w-full h-[500px] lg:h-[700px] relative">
             <PixelCat />
          </div>
        </main>

        {/* Time Together Section */}
        <section className="py-12 px-6 relative z-10">
           {/* Sticker: Time Together */}
           <div className="max-w-7xl mx-auto relative">
                <Sticker rotation={-5} className="hidden lg:flex -left-10 top-0 bg-white p-2 rounded-lg shadow-xl border border-pink-100 rotate-6">
                    <span className="text-3xl">👉🏼👈🏼</span>
                </Sticker>
               <TimeTogether />
           </div>
        </section>

        {/* The Open Letter Section */}
        <section className="py-12 px-6 relative z-10">
           <div className="max-w-7xl mx-auto relative">
               <Sticker rotation={15} className="hidden lg:flex right-0 top-20">
                    <Heart className="w-16 h-16 text-red-500 fill-red-500 drop-shadow-xl" />
               </Sticker>
               <Letter />
           </div>
        </section>
        
        {/* Photo Gallery Section */}
        <section className="py-12 px-6 relative z-10">
           <div className="max-w-7xl mx-auto relative">
               <Sticker rotation={-10} className="hidden lg:flex -left-20 top-40 bg-white border-8 border-white shadow-xl transform rotate-3">
                   <div className="bg-slate-100 w-24 h-24 mb-2 flex items-center justify-center overflow-hidden">
                        <span className="text-4xl">❤️</span>
                   </div>
                   <p className="font-handwriting text-center text-slate-500 font-bold">us us</p>
                </Sticker>
               <PhotoGallery />
           </div>
        </section>

        {/* Message Section */}
        <section className="py-20 px-6 mb-20 relative">
          <div className="max-w-3xl mx-auto relative">
             {/* Stickers: Footer */}
             <Sticker rotation={-5} className="hidden lg:flex -left-32 bottom-20 bg-yellow-100 p-4 rounded-full shadow-lg border-2 border-yellow-200">
                <span className="text-4xl">🍌</span>
             </Sticker>
             
             {/* Slang Words */}
             <Sticker rotation={12} className="hidden lg:flex -right-20 top-0 bg-emerald-100 text-emerald-700 px-4 py-1 rounded-md font-bold font-handwriting shadow-md">
                lata
             </Sticker>
             <Sticker rotation={-8} className="hidden lg:flex -right-10 bottom-10 bg-purple-100 text-purple-700 px-4 py-1 rounded-md font-bold font-handwriting shadow-md">
                timi
             </Sticker>
             <Sticker rotation={5} className="hidden lg:flex -left-10 -bottom-10 bg-orange-100 text-orange-700 px-4 py-1 rounded-md font-bold font-handwriting shadow-md">
                malay
             </Sticker>

             <div className="bg-white/90 backdrop-blur-sm rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-xl border-4 border-pink-100">
                {/* Cute Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#f9a8d4 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
                
                {/* Cloud Decorations */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-pink-100 rounded-full blur-2xl opacity-60 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-100 rounded-full blur-2xl opacity-60 translate-x-1/3 translate-y-1/3"></div>

                <div className="relative z-10">
                <div className="inline-block p-4 rounded-full bg-rose-50 mb-6 animate-bounce shadow-sm">
                    <Gift className="w-12 h-12 text-rose-400" />
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-black mb-8 text-slate-800 tracking-tight">
                    My Wish For You
                </h2>
                
                <p className="text-slate-600 text-xl lg:text-2xl leading-relaxed mb-10 font-medium max-w-2xl mx-auto font-handwriting">
                    May this year bring you as much joy as you brought into my life every single day. 
                    Keep shining, keep being amazing, and remember you are loved beyond measure.
                </p>
                
                <div className="flex items-center justify-center gap-3 text-rose-400 font-bold text-lg bg-rose-50/50 inline-flex px-6 py-2 rounded-full border border-rose-100">
                    <PixelHeart className="w-5 h-5 text-rose-500" />
                    <PixelHeart className="w-5 h-5 text-rose-500" />
                    <PixelHeart className="w-5 h-5 text-rose-500" />
                    <PixelHeart className="w-5 h-5 text-rose-500" />
                    <PixelHeart className="w-5 h-5 text-rose-500" />
                    {/* <PixelHeart className="wtext-rose-500"/> */}
                    <PixelHeart className="w-5 h-5 text-rose-500" />
                </div>
                </div>
            </div>
          </div>
        </section>

      </div>
    </SmoothScroll>
  )
}

