import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text3D, Center, Float } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating rotation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group>
        <ambientLight intensity={1} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Center>
                <Text3D 
                    ref={meshRef}
                    font="/font.json"
                    size={0.8}
                    height={0.2}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                >
                    Happy 21 st Birthday!
                    <meshStandardMaterial 
                        color="#ec4899" 
                        emissive="#be185d"
                        emissiveIntensity={0.2}
                        roughness={0.3}
                        metalness={0.1}
                    />
                </Text3D>
            </Center>
        </Float>
    </group>
  )
}

export default function Title3D() {
  return (
    <div className="w-full h-40 lg:h-64 cursor-pointer">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <React.Suspense fallback={<mesh><boxGeometry /><meshStandardMaterial color="pink" /></mesh>}>
            <Scene />
        </React.Suspense>
      </Canvas>
    </div>
  )
}
