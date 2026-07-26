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
            <p className="text-sm text-muted-foreground">Network visualization unavailable</p>
          </div>
        )
      )
    }
    return this.props.children
  }
}

const MAX_DIST = 2.8
const NODE_COUNT = 80

const NeuralNetworkContent = React.memo(function NeuralNetworkContent() {
  const groupRef = useRef<THREE.Group>(null!)
  const nodesRef = useRef<THREE.Points>(null!)
  const linesRef = useRef<THREE.LineSegments>(null!)

  const nodePositions = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    return positions
  }, [])

  const nodeColors = useMemo(() => {
    const colors = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      const t = (nodePositions[i * 3 + 1] + 3) / 6
      colors[i * 3] = 0.2 + t * 0.3
      colors[i * 3 + 1] = 0.3 + t * 0.3
      colors[i * 3 + 2] = 0.8 - t * 0.2
    }
    return colors
  }, [nodePositions])

  const lineData = useMemo(() => {
    const pairs: Array<[number, number, number]> = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodePositions[i * 3] - nodePositions[j * 3]
        const dy = nodePositions[i * 3 + 1] - nodePositions[j * 3 + 1]
        const dz = nodePositions[i * 3 + 2] - nodePositions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < MAX_DIST) {
          pairs.push([i, j, dist])
        }
      }
    }
    return pairs
  }, [nodePositions])

  const { linePositions, lineColors } = useMemo(() => {
    const pos = new Float32Array(lineData.length * 6)
    const col = new Float32Array(lineData.length * 6)
    for (let k = 0; k < lineData.length; k++) {
      const [i, j, dist] = lineData[k]
      const alpha = Math.max(0, 1 - dist / MAX_DIST)
      for (let v = 0; v < 2; v++) {
        const idx = v === 0 ? i : j
        const offset = k * 6 + v * 3
        pos[offset] = nodePositions[idx * 3]
        pos[offset + 1] = nodePositions[idx * 3 + 1]
        pos[offset + 2] = nodePositions[idx * 3 + 2]
        const bc = v === 0 ? nodeColors : nodeColors
        col[offset] = bc[idx * 3] * alpha
        col[offset + 1] = bc[idx * 3 + 1] * alpha
        col[offset + 2] = bc[idx * 3 + 2] * alpha
      }
    }
    return { linePositions: pos, lineColors: col }
  }, [lineData, nodePositions, nodeColors])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.08
    groupRef.current.rotation.x += delta * 0.02
    if (nodesRef.current) {
      const sizes = nodesRef.current.geometry.attributes.size as THREE.BufferAttribute | undefined
      if (sizes) {
        const arr = sizes.array as Float32Array
        for (let i = 0; i < NODE_COUNT; i++) {
          arr[i] = 0.08 + Math.sin(Date.now() * 0.002 + i) * 0.04
        }
        sizes.needsUpdate = true
      }
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nodeColors, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[new Float32Array(NODE_COUNT).fill(0.1), 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.5} depthWrite={false} />
      </lineSegments>
    </group>
  )
})

export function NeuralNetwork({ className }: { className?: string }) {
  return (
    <div className={cn("w-full h-full", className)}>
      <ErrorBoundary>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.4} />
          <Suspense fallback={null}>
            <NeuralNetworkContent />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  )
}
