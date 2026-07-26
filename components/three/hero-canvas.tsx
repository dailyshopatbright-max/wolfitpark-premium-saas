"use client"

import React, { useRef, useMemo, useEffect, useState, Suspense } from "react"
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
        this.props.fallback ?? <WebGLFallback />
      )
    }
    return this.props.children
  }
}

export function WebGLFallback() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-muted/20 rounded-xl">
      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
        <svg
          className="size-6 text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
      <p className="text-sm text-muted-foreground">Interactive 3D content not available</p>
      <p className="text-xs text-muted-foreground/60 mt-1">
        Your browser may not support WebGL
      </p>
    </div>
  )
}

const PARTICLE_COUNT = 1200
const NODE_COUNT = 16
const RING_RADIUS = 2.0

function HeroSceneContent({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)
  const particleRef = useRef<THREE.Points>(null!)
  const { pointer } = useThree()

  const scale = isMobile ? 0.7 : 1

  const particlePositions = useMemo(() => {
    const count = PARTICLE_COUNT
    const pos = new Float32Array(count * 3)
    const spread = isMobile ? 8 : 12
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.8
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.6
    }
    return pos
  }, [isMobile])

  const particleColors = useMemo(() => {
    const col = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const t = Math.random()
      col[i * 3] = 0.2 + t * 0.3
      col[i * 3 + 1] = 0.3 + t * 0.3
      col[i * 3 + 2] = 0.6 + t * 0.4
    }
    return col
  }, [])

  const nodePositions = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2
      const r = RING_RADIUS * scale
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 1.5 * scale
      pos[i * 3 + 2] = Math.sin(angle) * r
    }
    return pos
  }, [scale])

  const nodeColors = useMemo(() => {
    const col = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      col[i * 3] = 0.4
      col[i * 3 + 1] = 0.2
      col[i * 3 + 2] = 0.9
    }
    return col
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.08

    const targetX = pointer.y * 0.2
    const targetY = pointer.x * 0.2
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03

    if (coreRef.current) {
      const pulse = 1 + Math.sin(Date.now() * 0.002) * 0.04
      coreRef.current.scale.setScalar(pulse)
    }

    if (particleRef.current) {
      const geo = particleRef.current.geometry as THREE.BufferGeometry
      const pos = geo.attributes.position as THREE.BufferAttribute
      const arr = pos.array as Float32Array
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        arr[i * 3 + 1] += Math.sin(Date.now() * 0.001 + i) * 0.0003
      }
      pos.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef} scale={scale}>
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.5 * scale, 1]} />
        <meshPhongMaterial
          color="#2563EB"
          emissive="#1D4ED8"
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.8 * scale, 1]} />
        <meshBasicMaterial
          color="#2563EB"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nodeColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export function HeroCanvas({ className }: { className?: string }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)")
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  return (
    <div className={cn("w-full h-full", className)}>
      <ErrorBoundary>
        <Canvas
          camera={{
            position: [0, 0, isMobile ? 6 : 5],
            fov: isMobile ? 55 : 50,
          }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.6} color="#2563EB" />
          <pointLight position={[-5, -3, -5]} intensity={0.3} color="#7C3AED" />
          <Suspense fallback={null}>
            <HeroSceneContent isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
