"use client"

import React, { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-xl">
            <p className="text-sm text-muted-foreground">3D globe unavailable</p>
          </div>
        )
      )
    }
    return this.props.children
  }
}

const GlobeContent = React.memo(function GlobeContent() {
  const groupRef = useRef<THREE.Group>(null!)
  const atmosphereRef = useRef<THREE.Mesh>(null!)
  const { pointer } = useThree()

  const { positions, colors } = useMemo(() => {
    const count = 2000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const radius = 1.5
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = radius * Math.cos(phi)
      const t = Math.random()
      col[i * 3] = 0.1 + t * 0.3
      col[i * 3 + 1] = 0.3 + t * 0.4
      col[i * 3 + 2] = 0.6 + t * 0.4
    }
    return { positions: pos, colors: col }
  }, [])

  const wireframeGeo = useMemo(() => {
    return new THREE.EdgesGeometry(new THREE.SphereGeometry(1.5, 24, 24))
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.15
    const targetX = pointer.y * 0.4
    const targetY = pointer.x * 0.4
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments geometry={wireframeGeo}>
        <lineBasicMaterial color="#4fc3f7" opacity={0.25} transparent />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#2563EB"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.5, 48, 48]} />
        <meshPhongMaterial
          color="#1a73e8"
          emissive="#0d47a1"
          emissiveIntensity={0.15}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  )
})

export function GlobeScene({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full", className)}>
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <Suspense fallback={null}>
            <GlobeContent />
          </Suspense>
          <OrbitControls
            enableZoom
            enablePan={false}
            autoRotate={false}
            maxDistance={8}
            minDistance={2.5}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
