import { useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { Heart } from 'lucide-react'

export default function Letter() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  const qualities = [
    { text: "Dory", color: "bg-pink-100/80 text-pink-700 rotate-[-4deg]", emoji: "🐟" },
    { text: "5 ft", color: "bg-blue-100/80 text-blue-700 rotate-[3deg]", emoji: "📏" },
    { text: "Nep", color: "bg-yellow-100/80 text-yellow-700 rotate-[-2deg]", emoji: "🇳🇵" },
    { text: "Kiwii", color: "bg-green-100/80 text-green-700 rotate-[5deg]", emoji: "🥝" },
  ]

  return (
    <div className="max-w-5xl mx-auto my-24 perspective-1000 relative">
      <div 
        className={twMerge(
            "relative transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform-style-3d",
            isOpen ? "rotate-x-0" : "cursor-pointer hover:scale-105"
        )}
        onClick={() => !isOpen && setIsOpen(true)}
        data-hover="love"
      >
        
        {/* INDIE FOLDED NOTE COVER (Visible when !isOpen) */}
        <div 
            className={twMerge(
                "absolute inset-0 z-20 bg-white shadow-sm flex flex-col items-center justify-center transition-all duration-700 origin-bottom border-2 border-slate-200 rotate-1",
                isOpen ? "translate-y-full opacity-0 pointer-events-none rotate-12" : "opacity-100"
            )}
        >
             {/* Washi Tape */}
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-pink-200/50 transform -rotate-2 backdrop-blur-sm"></div>

             {/* Handwritten Text */}
             <h3 className="font-handwriting text-5xl text-slate-600 rotate-[-2deg] mb-2">
                To, my definition of love
             </h3>
             <p className="font-handwriting text-slate-400 text-xl rotate-[1deg]">
                (click to open)
             </p>
             
             {/* Doodle Heart */}
             <div className="mt-6 animate-bounce">
                <Heart className="w-12 h-12 text-pink-400 fill-pink-100" />
             </div>
        </div>

        {/* LETTER CONTENT */}
        <div className={twMerge(
            "relative bg-[#fffdf0] p-12 lg:p-24 rounded shadow-xl rotate-1 paper-texture max-w-4xl mx-auto transition-all duration-1000 delay-300",
            !isOpen ? "scale-95 opacity-50 blur-sm" : "scale-100 opacity-100 blur-0"
        )}>
            {/* Paper visual elements - Dotted Journal Style */}
            <div className="absolute inset-0 bg-[#fffdf0] rounded shadow-xl rotate-1 paper-texture overflow-hidden">
                {/* Dotted Grid Pattern */}
                <div className="absolute inset-0 opacity-20" style={{ 
                    backgroundImage: 'radial-gradient(#bba7b6 1.5px, transparent 1.5px)', 
                    backgroundSize: '24px 24px' 
                }}></div>
            </div>
            {/* Red Margin Line */}
            <div className="absolute top-0 left-12 w-[1px] h-full bg-rose-300/30 z-0"></div>
            
            {/* Stickers */}
            <div className="relative z-10 flex flex-wrap justify-center gap-4 mb-16 opacity-90">
            {qualities.map((q, i) => (
                <div 
                key={i} 
                className={`quality-sticker flex flex-col items-center justify-center p-4 rounded-lg shadow-sm ${q.color} w-32 h-32 transform hover:scale-110 transition-transform bg-opacity-80 backdrop-blur-sm`}
                >
                <span className="text-4xl mb-2 filter drop-shadow-sm">{q.emoji}</span>
                <span className="font-bold text-lg font-sans">{q.text}</span>
                </div>
            ))}
            </div>

            <div 
                className={twMerge(
                    "relative z-10 prose prose-lg mx-auto text-slate-700 transition-all duration-1000 ease-in-out px-8",
                    isExpanded ? "max-h-full" : "max-h-[60vh] overflow-hidden cursor-pointer"
                )}
                onClick={(e) => {
                    e.stopPropagation()
                    setIsExpanded(!isExpanded)
                }}
            >
                {/* MAIN LETTER CONTENT - Indie Flower Font */}
                <p className="text-2xl md:text-3xl leading-loose tracking-wide" style={{ fontFamily: '"Indie Flower", cursive', fontWeight: 600 }}>
                <strong className="text-2xl md:text-3xl block mb-4">Khushi,</strong>
<br/>
I told you once that I wanted to write you a letter next year as well. Maybe not in a physical form, but still a letter. So here it is. I do not really know when you will be reading this, but I genuinely hope that when you do, you are doing okay. You have to be. Meri to suni nhi tumne, at least listen to yourself now. Always remain mischievous and bubbly in the way that only you know how to be, but never at the cost of your comfort, your energy, or your sanity. You should never have to shrink yourself or exhaust yourself for people who do not deserve that version of you.
<br/><br/>
I sometimes think that your wife will be quite happy now that she will finally get to marry you without me standing in the way. 
<br/><br/>
We are all a little dumb, honestly. We are in our twenties and everything feels intense. Experiences come whether we ask for them or not, sometimes kind and sometimes devastating. We have both been through more than we expected, and you are no exception. Still, no matter how chaotic things felt inside you, you always managed to make me smile. You never failed at that, not even once.
<br/><br/>
Every time I see those “your month, your character” reels, I still end up thinking of both of us. I remember the Notion pages that somehow filled up with your presence, the Instagram collections and the reels I saved but never sent, the WhatsApp group that had your profile picture, the doodles I made on my iPad just for you, and the stickers on my phone that existed only because of you. You were everywhere without even trying to be.
<br/><br/>
I think about all the scrap hearts and origami I made but never gave you. The keychains we never matched. The movie nights and dates we planned and never got around to. The mystery treasure hunts, puzzles, and silly case studies I imagined us solving together. In my head, we were always doing something fun, curious, and a little nerdy side by side.
<br/><br/>
I still remember the flowers you gave me and the little smooch you left on that piece of paper. It was such a small thing, but it felt so soft and sincere. I have a folder on my phone called Nep K that has almost three hundred and fifty pictures of you. Some are screenshots, some are video call captures, and some are pictures you sent me. The good morning calls just so I could hear your sleepy voice were genuinely the cutest part of my day. Somewhere along the way, your vocabulary became part of mine too. Mr Bon, your scrunchie, the hair clips, the long call sessions, and the mature conversations we shared all slowly became normal to me.
<br/><br/>
There were also those exclusive little things that felt like they belonged only to us. For ex. Your pp, our matching pfps. SOO CUTE. My phone and iPad wallpapers, the random conversations about the most wack and nerdy topics, and the way we rooted for each other, especially during exams. I wanted to take Polaroid pictures with you. I wanted to do that snowman Sia trend with only you. All of that stayed in my head as a dream we never fully lived.
<br/><br/>
You were present in every part of my life. It did not matter where I looked, there was always a trace of you somewhere. And that presence will stay with me. I will always cherish it.
<br/><br/>
You have my respect. You are tough. You are strong. And I know you will be independent. We really did try our best, and I think that has to count for something. Sometimes trying is all we can do.
<br/><br/>
I don’t want to make you all emo by writing this. I just want you to know that I will always root for you, even if you are no longer my girl. I wanted to see you grow, and I wanted to grow with you. Even though we are not together now, I still want you to grow into everything you are meant to be.
<br/><br/>
The storm is over now. Take your time and collect yourself. Move at your own pace. Do things the way you want to do them. Suppress the noise around you because you are genuinely doing great. Eat well. Take care of your health. Be kind to yourself.
<br/><br/>
I am truly sorry for the times I hurt you unintentionally. I've failed you. I loved you truly but love only is not enough. I hope you can forgive me for that. Things will be okay, even if they do not feel like it right now. I will always be rooting for you from wherever I am.
<br/><br/>
And if you happen to read this on your 19th May again, or maybe on some random day in the future, I just want you to remember this. You, Khushi Pradhan, even though you are five feet short, are incredibly strong. You should never forget that. Enjoy your day. You own it completely.
<br/><br/>
It is okay to have messy, conflicting, and harsh thoughts. They are not everlasting. They fade away, like ice crystals melting when the sun finally arrives in spring. What comes after is a soft, warm, comforting light. Make sure you allow yourself to feel all of it. You deserve happiness in its fullest form.
<br/><br/>
That is all. could I probably have written this better? Yes. WELP. I am sleep deprived and hurting, and I do not even know if you will like this. But below (book) is my most honest attempt to make you smile, even for a moment. I hope I managed to do that.
<br/><br/>
Always,
<br/>
with love.
                </p>
                
                {/* Expand Overlay */}
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#fffdf0] via-[#fffdf0]/90 to-transparent flex items-end justify-center pb-8 z-10">
                        <span className="font-handwriting text-rose-400 text-xl animate-bounce">
                            (tap to read full letter)
                        </span>
                    </div>
                )}
            </div>
            
            <div className="mt-12 text-right relative z-10 flex flex-col items-end">
                {/* Pixelated Kiss Mark - Improved */}
                <div className="relative mb-4 mr-8 opacity-80 rotate-[-12deg] group hover:scale-110 transition-transform">
                     <div className="flex flex-col gap-[2px]">
                        {/* Row 1: Cupid's Bow peaks */}
                        <div className="flex gap-[2px] justify-center">
                            <div className="w-2 h-2 bg-transparent"></div>
                            <div className="w-2 h-2 bg-rose-400/80"></div>
                            <div className="w-2 h-2 bg-rose-400/80"></div>
                            <div className="w-2 h-2 bg-transparent"></div>
                            <div className="w-2 h-2 bg-rose-400/80"></div>
                            <div className="w-2 h-2 bg-rose-400/80"></div>
                            <div className="w-2 h-2 bg-transparent"></div>
                        </div>
                        {/* Row 2: Upper Lip Body */}
                        <div className="flex gap-[2px] justify-center">
                            <div className="w-2 h-2 bg-rose-400/80"></div>
                             <div className="w-2 h-2 bg-rose-400"></div>
                             <div className="w-2 h-2 bg-rose-400"></div>
                             <div className="w-2 h-2 bg-rose-300"></div> 
                             <div className="w-2 h-2 bg-rose-400"></div>
                             <div className="w-2 h-2 bg-rose-400"></div>
                             <div className="w-2 h-2 bg-rose-400/80"></div>
                        </div>
                        {/* Row 3: Mouth Gap/Line */}
                        <div className="flex gap-[2px] justify-center">
                             <div className="w-2 h-2 bg-rose-400/40"></div>
                             <div className="w-2 h-2 bg-transparent"></div>
                             <div className="w-2 h-2 bg-rose-400/60"></div>
                             <div className="w-2 h-2 bg-transparent"></div>
                             <div className="w-2 h-2 bg-rose-400/60"></div>
                             <div className="w-2 h-2 bg-transparent"></div>
                             <div className="w-2 h-2 bg-rose-400/40"></div>
                        </div>
                        {/* Row 4: Lower Lip Body */}
                        <div className="flex gap-[2px] justify-center">
                             <div className="w-2 h-2 bg-transparent"></div>
                             <div className="w-2 h-2 bg-rose-400"></div>
                             <div className="w-2 h-2 bg-rose-400"></div>
                             <div className="w-2 h-2 bg-rose-400"></div>
                             <div className="w-2 h-2 bg-rose-400"></div>
                             <div className="w-2 h-2 bg-rose-400"></div>
                             <div className="w-2 h-2 bg-transparent"></div>
                        </div>
                        {/* Row 5: Lower Lip Highlight */}
                        <div className="flex gap-[2px] justify-center">
                             <div className="w-2 h-2 bg-transparent"></div>
                             <div className="w-2 h-2 bg-transparent"></div>
                             <div className="w-2 h-2 bg-rose-300"></div>
                             <div className="w-2 h-2 bg-rose-300"></div>
                             <div className="w-2 h-2 bg-transparent"></div>
                             <div className="w-2 h-2 bg-transparent"></div>
                        </div>
                     </div>
                </div>

                <span className="text-3xl text-pink-500/80" style={{ fontFamily: '"Great Vibes", cursive' }}>
                    Snoopy
                </span>
            </div>
        </div>

      </div>
    </div>
  )
}
