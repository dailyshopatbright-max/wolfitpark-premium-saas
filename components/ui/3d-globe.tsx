"use client"

import { useRef, useMemo, useCallback, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

export type GlobeMarker = {
  lat: number
  lng: number
  src?: string
  label?: string
}

type GlobeConfig = {
  atmosphereColor?: string
  atmosphereIntensity?: number
  bumpScale?: number
  autoRotateSpeed?: number
}

type Globe3DProps = {
  markers?: GlobeMarker[]
  config?: GlobeConfig
  onMarkerClick?: (marker: GlobeMarker) => void
  onMarkerHover?: (marker: GlobeMarker | null) => void
  className?: string
}

function latLngToPosition(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function GlobeScene({
  markers = [],
  config = {},
}: {
  markers: GlobeMarker[]
  config: GlobeConfig
}) {
  const {
    atmosphereColor = "#4da6ff",
    atmosphereIntensity = 20,
    autoRotateSpeed = 0.3,
  } = config

  const groupRef = useRef<THREE.Group>(null)
  const globeRadius = 2

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * autoRotateSpeed
    }
  })

  const globePoints = useMemo(() => {
    const count = 3000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = Math.sin(phi) * Math.cos(theta) * globeRadius
      const y = Math.sin(phi) * Math.sin(theta) * globeRadius
      const z = Math.cos(phi) * globeRadius
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      const bright = 0.3 + Math.random() * 0.5
      colors[i * 3] = 0.2 + bright * 0.3
      colors[i * 3 + 1] = 0.3 + bright * 0.4
      colors[i * 3 + 2] = 0.6 + bright * 0.3
    }
    return { positions, colors }
  }, [])

  const markerPositions = useMemo(() => {
    return markers.map((m) => latLngToPosition(m.lat, m.lng, globeRadius))
  }, [markers])

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={globePoints.positions.length / 3}
            array={globePoints.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={globePoints.colors.length / 3}
            array={globePoints.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {markerPositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
      ))}

      <mesh>
        <sphereGeometry args={[globeRadius * 1.15, 32, 32]} />
        <meshPhongMaterial
          color={atmosphereColor}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      <directionalLight position={[5, 3, 5]} intensity={1} />
      <ambientLight intensity={0.3} />
    </group>
  )
}

function GlobeFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="size-16 animate-pulse rounded-full bg-primary/20" />
    </div>
  )
}

export function Globe3D({
  markers = [],
  config = {},
  className,
}: Globe3DProps) {
  return (
    <div className={cn("h-full w-full", className)}>
      <Suspense fallback={<GlobeFallback />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <GlobeScene markers={markers} config={config} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
