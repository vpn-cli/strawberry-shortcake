import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import { Heart, ChevronRight, ChevronLeft } from 'lucide-react'

import img1 from '../assets/111.jpg'
import img2 from '../assets/222.jpg'
import img3 from '../assets/333.jpg'
import img4 from '../assets/444.jpg'
import img5 from '../assets/555.jpg'
import img6 from '../assets/666.jpg'
import img7 from '../assets/777.jpg'
import img8 from '../assets/888.jpg'
import img9 from '../assets/1010.jpg'
import img10 from '../assets/1111.jpg'
import img11 from '../assets/1212.jpg'
import img12 from '../assets/1313.jpg'
import img13 from '../assets/1414.jpg' // Cover
import img14 from '../assets/1555.jpg'
import img15 from '../assets/1666.jpg'
import img16 from '../assets/144.jpg'
import img17 from '../assets/snoop.jpg'

const assetPhotos = [
  img1, img2, img3, img4, 
  img5, img6, img7, img8, 
  img9, img10, img11, img12,
  img14, img15, img16, img17
]

// Palette of dusty/pastel colors
const pastelColors = [
    'bg-[#fce7f3]', // Pink-50/100ish
    'bg-[#e0f2fe]', // Sky-100
    'bg-[#dcfce7]', // Green-100
    'bg-[#fef3c7]', // Amber-100
    'bg-[#f3e8ff]', // Purple-100
    'bg-[#ffedd5]', // Orange-100
    'bg-[#f5f5f4]', // Stone-100
    'bg-[#fae8ff]', // Fuchsia-100
]

// Generate photos from assets
const allPhotos = assetPhotos.map((url, i) => ({
  id: i,
  url,
  caption: '', // No caption as requested
  rotation: '', // Centered/Straight
  color: pastelColors[i % pastelColors.length]
}))


// Types
type Photo = {
    id: number;
    url: string;
    caption: string;
    rotation: string;
    color: string;
}

const photosPerPage = 4
const pages: Photo[][] = []
for (let i = 0; i < allPhotos.length; i += photosPerPage) {
  pages.push(allPhotos.slice(i, i + photosPerPage))
}

export default function PhotoGallery() {
  const [isBookOpen, setIsBookOpen] = useState(false)
  const [pageIndex, setPageIndex] = useState(0) 
  const [showEndHeart, setShowEndHeart] = useState(false)
  const [isRibbonUntied, setIsRibbonUntied] = useState(false)

  const totalSpreads = Math.ceil(pages.length / 2)

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (pageIndex < totalSpreads - 1) {
        setPageIndex(prev => prev + 1)
    } else {
        // Close book seamlessly
        setIsBookOpen(false)
        setPageIndex(0)
        
        // Trigger Flying Heart
        setShowEndHeart(true)
        setTimeout(() => setShowEndHeart(false), 2500)
        
        // Retie ribbon after close
        setTimeout(() => setIsRibbonUntied(false), 1000)
    }
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (pageIndex > 0) setPageIndex(prev => prev - 1)
  }

  const toggleBook = () => {
    if (!isBookOpen) {
        // Opening Sequence: Untie Ribbon -> Open Book
        setIsRibbonUntied(true)
        setTimeout(() => setIsBookOpen(true), 600)
    } else {
        // Closing Manual: Close Book -> Retie Ribbon
        setIsBookOpen(false)
        setPageIndex(0)
        setTimeout(() => setIsRibbonUntied(false), 800)
    }
  }

  // Dimensions: Taller to fit photos comfortably
  // Width: Single Page Width
  const SINGLE_PAGE_W_DESKTOP = 420
  const SINGLE_PAGE_H_DESKTOP = 580 // Taller
  
  const SINGLE_PAGE_W_MOBILE = 300
  const SINGLE_PAGE_H_MOBILE = 480

  return (
    <section className="py-24 min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent perspective-1500 relative">
      
      {/* End of Book Heart Animation */}
      <AnimatePresence>
        {showEndHeart && (
            <motion.div
                initial={{ x: "120vw", y: "50%", rotate: 0, opacity: 1 }}
                animate={{ x: "-20vw", y: "45%", rotate: -20, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="fixed inset-0 pointer-events-none z-[100] flex items-center"
            >
                <Heart className="w-48 h-48 text-pink-500 fill-pink-300 drop-shadow-2xl" />
            </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-12 text-center z-10">
        <h2 className="text-5xl font-handwriting text-slate-800 rotate-[-2deg] mb-2 drop-shadow-sm">Seen, remembered.</h2>
        <p className="text-slate-500 animate-pulse text-sm font-medium tracking-wide">
          {isBookOpen ? "(Tap outside to close)" : "(Tap to untie & open)"}
        </p>
      </div>
      
      {/* 3D Scene Container */}
      <div className="relative flex items-center justify-center perspective-2000">
        <motion.div
            layout
            className="relative transform-style-3d transition-all duration-700 ease-in-out"
            initial={false}
            animate={{
                width: isBookOpen ? (window.innerWidth < 768 ? SINGLE_PAGE_W_MOBILE * 2 : SINGLE_PAGE_W_DESKTOP * 2) 
                                  : (window.innerWidth < 768 ? SINGLE_PAGE_W_MOBILE : SINGLE_PAGE_W_DESKTOP),
                height: window.innerWidth < 768 ? SINGLE_PAGE_H_MOBILE : SINGLE_PAGE_H_DESKTOP,
            }}
            onClick={!isBookOpen ? toggleBook : undefined}
        >   
            {/* BOOK WRAPPER */}
            <div className={twMerge(
                "w-full h-full relative cursor-pointer transform-style-3d transition-transform duration-700",
                !isBookOpen && "hover:-translate-y-2 hover:rotate-y-[-5deg]"
            )}>

                {/* --- FRONT COVER (Left Half in structure, flips open) --- */}
                {/* 
                   Strategy: 
                   When CLOSED: This element covers the ENTIRE container width.
                   When OPEN: This element rotates -180deg to become the "Left Page".
                */}
                <motion.div
                    className="absolute inset-y-0 right-0 w-full md:w-1/2 z-20 origin-left backface-hidden"
                    style={{ 
                        // When closed, it needs to be full width of the CONTAINER (which matches single page).
                        // When open, it needs to be half width of the CONTAINER (which matches single page).
                        width: isBookOpen ? '50%' : '100%',
                        left: 0
                    }}
                    initial={false}
                    animate={{ 
                        rotateY: isBookOpen ? -180 : 0,
                        zIndex: isBookOpen ? 0 : 20
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* Cover Content (Visible when Closed) */}
                    <div className="border-l-8 border-l-pink-300 w-full h-full rounded-r-xl rounded-l-md bg-pink-100 flex flex-col items-center justify-center relative shadow-2xl p-8 overflow-hidden">
                        
                        {/* === RIBBON IMPLEMENTATION === */}
                        <AnimatePresence>
                            {!isRibbonUntied && (
                                <motion.div
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 1.5 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 z-50 pointer-events-none"
                                >
                                    {/* Vertical Ribbon Strip - Dusky Pink & Stitched */}
                                    <div className="absolute right-6 top-0 bottom-0 w-12 bg-[#d68a98] shadow-lg flex justify-center">
                                        <div className="border-l border-r border-dashed border-[#eebbc6] h-full w-8 opacity-70"></div>
                                    </div>
                                    
                                    {/* The Bow - Cuter, Dusky & With Charm */}
                                    <div className="absolute right-6 top-1/2 -translate-y-1/2 translate-x-1/2 w-32 h-32 flex items-center justify-center filter drop-shadow-md z-50">
                                         <motion.div 
                                            className="relative"
                                            animate={{ rotate: [0, 2, 0, -2, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                         >
                                            {/* Bow Left Loop */}
                                            <div className="absolute top-1/2 right-1/2 -translate-y-1/2 w-14 h-14 bg-[#d68a98] rounded-full rounded-r-none border-2 border-[#b56e7c] origin-right skew-y-12 shadow-sm">
                                                <div className="absolute inset-2 border-2 border-dashed border-[#eebbc6] rounded-full rounded-r-none opacity-60"></div>
                                            </div>
                                            {/* Bow Right Loop */}
                                            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-14 h-14 bg-[#d68a98] rounded-full rounded-l-none border-2 border-[#b56e7c] origin-left -skew-y-12 shadow-sm">
                                                 <div className="absolute inset-2 border-2 border-dashed border-[#eebbc6] rounded-full rounded-l-none opacity-60"></div>
                                            </div>
                                            {/* Bow Center Knot */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#b56e7c] rounded-lg z-20 rotate-45 border border-[#eebbc6] shadow-md"></div>
                                            
                                            {/* Hanging Charm */}
                                            <motion.div 
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-2 flex flex-col items-center origin-top z-10"
                                                animate={{ rotate: [0, 5, 0, -5, 0] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                            >
                                                {/* Chain */}
                                                <div className="w-[2px] h-8 bg-gradient-to-b from-[#eebbc6] to-[#b56e7c] shadow-sm"></div>
                                                {/* Heart Charm */}
                                                <div className="relative">
                                                     <Heart className="w-6 h-6 text-[#b56e7c] fill-[#eebbc6] drop-shadow-md" strokeWidth={1.5} />
                                                     <div className="absolute inset-0 flex items-center justify-center">
                                                         <div className="w-2 h-0.5 bg-white/60 rotate-[-45deg] rounded-full"></div>
                                                     </div>
                                                </div>
                                            </motion.div>
                                         </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Washi Tape */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-200/50 rotate-[-1deg] backdrop-blur-sm z-10"></div>
                        
                        {/* Cover Photo (1414.jpg) */}
                        <div className="w-64 h-64 bg-white p-3 shadow-xl rotate-2 transform transition-transform hover:scale-105 duration-500 mb-8 border border-pink-200">
                             <img src={img13} alt="Cover" className="w-full h-full object-cover" />
                        </div>

                        <h1 className="text-5xl md:text-6xl font-handwriting text-slate-800 text-center leading-tight drop-shadow-sm rotate-[-1deg]">
                            Sweetest <br/> Shortcake
                        </h1>
                    </div>
                </motion.div>

                {/* --- INSIDE PAGES (Visible when Open) --- */}
                
                {/* BACKBOARD / RIGHT PAGE BASE */}
                <div className={twMerge(
                    "absolute inset-y-0 right-0 h-full bg-[#fffdf0] shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-r-xl transition-all duration-500",
                    isBookOpen ? "w-1/2 rounded-l-none" : "w-full rounded-l-xl" 
                )}>
                    {isBookOpen && (
                         <div className="w-full h-full p-6 md:p-10 relative overflow-hidden paper-texture">
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={pageIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full grid grid-cols-2 gap-4 place-items-center content-center"
                                >
                                    {/* RIGHT PAGE CONTENT */}
                                    {pages[pageIndex * 2 + 1]?.map((photo) => (
                                        <div key={photo.id} className={twMerge("p-2 pb-6 shadow-sm transition-transform hover:scale-105 border border-slate-100 w-full max-w-[140px]", photo.rotation, photo.color)} data-hover="love">
                                            <div className="aspect-[3/4] bg-slate-100 overflow-hidden mb-2">
                                                <img src={photo.url} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {/* Controls */}
                             <div className="absolute bottom-4 right-6 z-20">
                                <button 
                                    onClick={handleNext} 
                                    className="px-4 py-2 bg-rose-300 hover:bg-rose-400 text-white font-handwriting rounded-full shadow-sm transition-colors text-sm"
                                >
                                    {pageIndex >= totalSpreads - 1 ? "Finish ❤️" : "Next →"}
                                </button>
                            </div>
                            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-300 font-serif text-sm">
                                {pageIndex * 2 + 2}
                            </span>
                         </div>
                    )}
                </div>

                {/* LEFT PAGE BASE (Revealed when cover flips) */}
                <div className={twMerge(
                     "absolute inset-y-0 left-0 w-1/2 h-full bg-[#fffdf0] rounded-l-xl shadow-inner border-r border-slate-200",
                     !isBookOpen && "hidden"
                )}>
                    {isBookOpen && (
                        <div className="w-full h-full p-6 md:p-10 relative overflow-hidden paper-texture">
                             <AnimatePresence mode="wait">
                                <motion.div 
                                    key={pageIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full grid grid-cols-2 gap-4 place-items-center content-center"
                                >
                                    {/* LEFT PAGE CONTENT */}
                                    {pages[pageIndex * 2]?.map((photo) => (
                                        <div key={photo.id} className={twMerge("p-2 pb-6 shadow-sm transition-transform hover:scale-105 border border-slate-100 w-full max-w-[140px]", photo.rotation, photo.color)} data-hover="love">
                                            <div className="aspect-[3/4] bg-slate-100 overflow-hidden mb-2">
                                                <img src={photo.url} className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                             {/* Controls */}
                             <div className="absolute bottom-4 left-6 z-20">
                                <button 
                                    onClick={pageIndex === 0 ? toggleBook : handlePrev} 
                                    className="px-4 py-2 bg-rose-300 hover:bg-rose-400 text-white font-handwriting rounded-full shadow-sm transition-colors text-sm"
                                >
                                    {pageIndex === 0 ? "← Close Book" : "← Previous"}
                                </button>
                            </div>
                            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-300 font-serif text-sm">
                                {pageIndex * 2 + 1}
                            </span>
                        </div>
                    )}
                </div>

            </div>
        </motion.div>
      </div>
    </section>
  )
}
