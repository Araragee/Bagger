import { useMemo } from 'react'
import * as THREE from 'three'
import { RoundedBox } from '@react-three/drei'

type Props = {
  color?: string
  accent?: string
}

/**
 * A procedural leather tote built from primitives — no external .glb needed,
 * so the demo stays self-contained. When real models land (see docs/ASSETS.md)
 * this component is the single swap point: replace the meshes with a <Gltf/>.
 */
export default function BagModel({ color = '#7A4B26', accent = '#B08D57' }: Props) {
  // Two arched handles as swept tubes
  const handleGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.55, 1.05, 0),
      new THREE.Vector3(-0.4, 1.7, 0),
      new THREE.Vector3(0.4, 1.7, 0),
      new THREE.Vector3(0.55, 1.05, 0),
    ])
    return new THREE.TubeGeometry(curve, 48, 0.06, 12, false)
  }, [])

  const leather = (c: string, rough = 0.62): THREE.MeshPhysicalMaterialParameters => ({
    color: c,
    roughness: rough,
    clearcoat: 0.25,
    clearcoatRoughness: 0.5,
    sheen: 0.4,
    sheenColor: new THREE.Color(c).offsetHSL(0, 0, 0.1),
  })

  return (
    <group position={[0, -0.7, 0]} rotation={[0, 0, 0]}>
      {/* Body */}
      <RoundedBox args={[2, 2.1, 0.95]} radius={0.16} smoothness={6} position={[0, 0.55, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial {...leather(color)} />
      </RoundedBox>

      {/* Front pocket */}
      <RoundedBox args={[1.3, 1.0, 0.08]} radius={0.08} smoothness={4} position={[0, 0.35, 0.5]} castShadow>
        <meshPhysicalMaterial {...leather(color, 0.7)} />
      </RoundedBox>

      {/* Top binding */}
      <RoundedBox args={[2.04, 0.18, 0.99]} radius={0.08} smoothness={4} position={[0, 1.55, 0]} castShadow>
        <meshPhysicalMaterial {...leather(new THREE.Color(color).offsetHSL(0, 0, -0.06).getStyle(), 0.5)} />
      </RoundedBox>

      {/* Handles (front + back) */}
      {[0.32, -0.32].map((z) => (
        <mesh key={z} geometry={handleGeo} position={[0, 0, z]} castShadow>
          <meshPhysicalMaterial {...leather(new THREE.Color(color).offsetHSL(0, 0, -0.08).getStyle(), 0.45)} />
        </mesh>
      ))}

      {/* Brass clasp */}
      <mesh position={[0, 1.4, 0.52]} castShadow>
        <boxGeometry args={[0.34, 0.16, 0.06]} />
        <meshStandardMaterial color={accent} metalness={1} roughness={0.28} />
      </mesh>

      {/* Brass feet */}
      {[[-0.7, -0.36], [0.7, -0.36], [-0.7, 0.36], [0.7, 0.36]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.48, z]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 0.06, 16]} />
          <meshStandardMaterial color={accent} metalness={1} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}
