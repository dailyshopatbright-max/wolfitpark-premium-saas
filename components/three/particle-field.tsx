"use client"

import React, { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
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
            <p className="text-sm text-muted-foreground">Particle field unavailable</p>
          </div>
        )
      )
    }
    return this.props.children
  }
}

const ParticleFieldContent = React.memo(function ParticleFieldContent({
  density = 2000,
}: {
  density?: number
}) {
  const pointsRef = useRef<THREE.Points>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const { pointer } = useThree()
  const count = Math.max(500, Math.min(5000, density))

  const { positions, colors, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const spread = 12
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      vel[i * 3] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005
      const t = pos[i * 3 + 1] / spread + 0.5
      col[i * 3] = 0.2 + t * 0.4
      col[i * 3 + 1] = 0.2 + t * 0.3
      col[i * 3 + 2] = 0.6 + t * 0.3
    }
    return { positions: pos, colors: col, velocities: vel }
  }, [count])

  useFrame((_, delta) => {
    if (!pointsRef.current || !groupRef.current) return
    const geo = pointsRef.current.geometry as THREE.BufferGeometry
    const pos = geo.attributes.position as THREE.BufferAttribute
    const array = pos.array as Float32Array
    for (let i = 0; i < count; i++) {
      array[i * 3] += velocities[i * 3] * delta * 30
      array[i * 3 + 1] += velocities[i * 3 + 1] * delta * 30
      array[i * 3 + 2] += velocities[i * 3 + 2] * delta * 30
      const spread = 6
      if (Math.abs(array[i * 3]) > spread) velocities[i * 3] *= -1
      if (Math.abs(array[i * 3 + 1]) > spread) velocities[i * 3 + 1] *= -1
      if (Math.abs(array[i * 3 + 2]) > spread) velocities[i * 3 + 2] *= -1
    }
    pos.needsUpdate = true

    const targetX = pointer.x * 0.5
    const targetY = pointer.y * 0.5
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.02
    groupRef.current.position.y += (-targetY - groupRef.current.position.y) * 0.02
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
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
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
})

export function ParticleField({
  className,
  density,
}: {
  className?: string
  density?: number
}) {
  return (
    <div className={cn("w-full h-full", className)}>
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ParticleFieldContent density={density} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
