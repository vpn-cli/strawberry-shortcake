import React from 'react'

export default function CuteCat() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <img 
        src="https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?q=80&w=1000&auto=format&fit=crop" 
        alt="Cute Kitten" 
        className="w-full h-full object-cover rounded-3xl shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 border-8 border-white"
      />
    </div>
  )
}
