import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, Lightformer, PresentationControls } from '@react-three/drei'
import BagModel from './BagModel'

/** Interactive PDP viewer — drag to rotate, live colour/material swap. */
export default function ProductViewer({ color = '#7A4B26' }: { color?: string }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.3, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#C9A86A" />

      <PresentationControls
        global
        snap
        rotation={[0.05, -0.4, 0]}
        polar={[-0.3, 0.3]}
        azimuth={[-0.8, 0.8]}
        config={{ mass: 1, tension: 160, friction: 22 }}
      >
        <BagModel color={color} />
      </PresentationControls>

      <ContactShadows position={[0, -1.3, 0]} opacity={0.45} scale={9} blur={2.6} far={4} resolution={512} color="#1a120a" />

      <Environment resolution={256}>
        <Lightformer intensity={2.2} position={[0, 3, 2]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.1} position={[-4, 1, -2]} scale={[4, 4, 1]} color="#d8b988" />
        <Lightformer intensity={0.8} position={[4, 0, 2]} scale={[3, 3, 1]} />
      </Environment>
    </Canvas>
  )
}
