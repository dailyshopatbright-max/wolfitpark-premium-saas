"use client"

import React, { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
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
            <p className="text-sm text-muted-foreground">AI visualization unavailable</p>
          </div>
        )
      )
    }
    return this.props.children
  }
}

const FLOW_PARTICLE_COUNT = 400
const OUTER_NODE_COUNT = 24
const RING_RADIUS = 2.2

const AIBrainContent = React.memo(function AIBrainContent() {
  const groupRef = useRef<THREE.Group>(null!)
  const coreRef = useRef<THREE.Mesh>(null!)
  const flowPointsRef = useRef<THREE.Points>(null!)


  const outerPositions = useMemo(() => {
    const positions = new Float32Array(OUTER_NODE_COUNT * 3)
    for (let i = 0; i < OUTER_NODE_COUNT; i++) {
      const angle = (i / OUTER_NODE_COUNT) * Math.PI * 2
      const yOff = (Math.random() - 0.5) * 1.2
      positions[i * 3] = Math.cos(angle) * RING_RADIUS
      positions[i * 3 + 1] = yOff
      positions[i * 3 + 2] = Math.sin(angle) * RING_RADIUS
    }
    return positions
  }, [])

  const flowPositions = useMemo(() => {
    const positions = new Float32Array(FLOW_PARTICLE_COUNT * 3)
    for (let i = 0; i < FLOW_PARTICLE_COUNT; i++) {
      const t = Math.random()
      const angle = Math.random() * Math.PI * 2
      const radius = t * RING_RADIUS
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2
      positions[i * 3 + 2] = Math.sin(angle) * radius
    }
    return positions
  }, [])

  const flowColors = useMemo(() => {
    const colors = new Float32Array(FLOW_PARTICLE_COUNT * 3)
    for (let i = 0; i < FLOW_PARTICLE_COUNT; i++) {
      const t = Math.random()
      colors[i * 3] = 0.3 + t * 0.4
      colors[i * 3 + 1] = 0.1 + t * 0.2
      colors[i * 3 + 2] = 0.7 + t * 0.3
    }
    return colors
  }, [])

  const outerColors = useMemo(() => {
    const colors = new Float32Array(OUTER_NODE_COUNT * 3)
    for (let i = 0; i < OUTER_NODE_COUNT; i++) {
      colors[i * 3] = 0.4
      colors[i * 3 + 1] = 0.2
      colors[i * 3 + 2] = 0.9
    }
    return colors
  }, [])

  const linePairs = useMemo(() => {
    const pairs: Array<[number, number]> = []
    for (let i = 0; i < OUTER_NODE_COUNT; i++) {
      const next = (i + 1) % OUTER_NODE_COUNT
      pairs.push([i, next])
      if (i % 3 === 0) {
        const far = (i + 12) % OUTER_NODE_COUNT
        pairs.push([i, far])
      }
    }
    return pairs
  }, [])

  const { linePositions } = useMemo(() => {
    const pos = new Float32Array(linePairs.length * 6)
    for (let k = 0; k < linePairs.length; k++) {
      const [a, b] = linePairs[k]
      for (let v = 0; v < 2; v++) {
        const idx = v === 0 ? a : b
        const offset = k * 6 + v * 3
        pos[offset] = outerPositions[idx * 3]
        pos[offset + 1] = outerPositions[idx * 3 + 1]
        pos[offset + 2] = outerPositions[idx * 3 + 2]
      }
    }
    return { linePositions: pos }
  }, [linePairs, outerPositions])

  const flowData = useMemo(() => {
    const angles = new Float32Array(FLOW_PARTICLE_COUNT)
    const radii = new Float32Array(FLOW_PARTICLE_COUNT)
    const speeds = new Float32Array(FLOW_PARTICLE_COUNT)
    for (let i = 0; i < FLOW_PARTICLE_COUNT; i++) {
      angles[i] = Math.random() * Math.PI * 2
      radii[i] = Math.random() * RING_RADIUS
      speeds[i] = 0.2 + Math.random() * 0.5
    }
    return { angles, radii, speeds }
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.12
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1

    if (coreRef.current) {
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.03
      coreRef.current.scale.setScalar(scale)
    }

    if (flowPointsRef.current) {
      const geo = flowPointsRef.current.geometry as THREE.BufferGeometry
      const pos = geo.attributes.position as THREE.BufferAttribute
      const arr = pos.array as Float32Array
      for (let i = 0; i < FLOW_PARTICLE_COUNT; i++) {
        flowData.angles[i] += delta * flowData.speeds[i] * 0.5
        flowData.radii[i] += delta * (Math.random() - 0.5) * 0.1
        if (flowData.radii[i] < 0.1) flowData.radii[i] = 0.1
        if (flowData.radii[i] > RING_RADIUS) flowData.radii[i] = RING_RADIUS
        arr[i * 3] = Math.cos(flowData.angles[i]) * flowData.radii[i]
        arr[i * 3 + 1] = Math.sin(flowData.angles[i] * 0.5) * 0.8
        arr[i * 3 + 2] = Math.sin(flowData.angles[i]) * flowData.radii[i]
      }
      pos.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshPhongMaterial
          color="#7C3AED"
          emissive="#4C1D95"
          emissiveIntensity={0.6}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[outerPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[outerColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>

      <points ref={flowPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[flowPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[flowColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  )
})

export function AIBrain({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full", className)}>
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#7C3AED" />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#2563EB" />
          <Suspense fallback={null}>
            <AIBrainContent />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
