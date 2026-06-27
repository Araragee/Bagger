import { useRef, type ReactNode } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, Float } from '@react-three/drei'
import BagModel from './BagModel'

/** Rotates its children from page scroll (scrubbed) plus a gentle idle spin. */
function ScrollSpin({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  const target = useRef(0)

  useFrame((_, delta) => {
    if (!ref.current) return
    const progress = window.scrollY / Math.max(1, window.innerHeight)
    target.current = progress * Math.PI * 1.4 // ~250° over the first viewport
    // idle drift + eased follow
    const idle = performance.now() * 0.00012
    const desired = target.current + idle
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, desired, 4, delta)
    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      -0.12 + Math.sin(idle * 2) * 0.04,
      4,
      delta,
    )
  })

  return <group ref={ref}>{children}</group>
}

export default function HeroScene({ color = '#7A4B26' }: { color?: string }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.4, 6], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#C9A86A" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <ScrollSpin>
          <BagModel color={color} />
        </ScrollSpin>
      </Float>

      <ContactShadows position={[0, -1.25, 0]} opacity={0.45} scale={9} blur={2.6} far={4} resolution={512} color="#1a120a" />

      {/* In-scene environment (no HDRI fetch) for soft leather/brass reflections */}
      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 3, 2]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.1} position={[-4, 1, -2]} scale={[4, 4, 1]} color="#d8b988" />
        <Lightformer intensity={0.8} position={[4, 0, 2]} scale={[3, 3, 1]} />
      </Environment>
    </Canvas>
  )
}
