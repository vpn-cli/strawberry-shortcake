import React from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const LenisComponent = ReactLenis as any;
  return (
    <LenisComponent root options={{ lerp: 0.1, duration: 1.5 }}>
      {children}
    </LenisComponent>
  )
}
