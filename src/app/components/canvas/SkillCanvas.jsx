'use client'

import React, { useRef, useEffect, Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, useGLTF, ContactShadows } from '@react-three/drei'
import { a as three, useSpring } from '@react-spring/three'

// Logos
function Logos({ open }) {
  const reactGltf = useGLTF('/react.glb')
  const nodeGltf = useGLTF('/node.glb')

  const spring = useSpring({
    scale: open ? 1 : 0,
    positionY: open ? 3.4 : 2.7,
    config: { tension: 200, friction: 18 },
  })

  return (
    <three.group scale={spring.scale}>
      <three.primitive
        object={reactGltf.scene}
        scale={[0.9, 0.9, 0.9]}
        rotation={[4.5, 0, 2]}
        position={spring.positionY.to((y) => [-6.5, y, 2.5])}
      />
      <three.primitive
        object={nodeGltf.scene}
        scale={[3.5, 3.5, 4]}
        rotation={[-1.5, 5, 0]}
        position={spring.positionY.to((y) => [6, y, 0.2])}
      />
    </three.group>
  )
}

function Model({ open, hinge }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/mac-draco.glb')
  const [hovered, setHovered] = React.useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => (document.body.style.cursor = 'auto')
  }, [hovered])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, open ? Math.cos(t / 10) / 10 + 0.25 : 0, 0.1)
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, open ? Math.sin(t / 10) / 4 : 0, 0.1)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, open ? Math.sin(t / 10) / 10 : 0, 0.2)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, open ? (-4 + Math.sin(t)) / 3 : -3, 0.5)
  })

  return (
    <group ref={group} onPointerOver={(e) => (e.stopPropagation(), setHovered(true))} onPointerOut={() => setHovered(false)} dispose={null}>
      <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry} />
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry} />
          <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry} />
          <Logos open={open} />
        </group>
      </three.group>
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]} />
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry} />
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry} />
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]} />
    </group>
  )
}

export function CanvasScene({ open, setOpen, hinge, color, scrollAmount, setScrollAmount }) {
  const groupKey = open ? 'open' : 'closed' // Will force remount group when toggled

 useEffect(() => {
  const handleWheel = (e) => {
    if (!open) return;

    if (e.deltaY > 0 && scrollAmount < 10) {
      // Scrolling down, move model left
      e.preventDefault();
      setScrollAmount((prev) => Math.min(prev + e.deltaY / 30, 10));
    } else if (e.deltaY < 0) {
      if (scrollAmount > 0) {
        // Scrolling up while model is left — bring it back
        e.preventDefault();
        setScrollAmount((prev) => Math.max(prev - Math.abs(e.deltaY / 30), 0));
      } else {
        // Fully back — now close model
        e.preventDefault();
        setOpen(false);
        setScrollAmount(0);
      }
    }
    // When scrollAmount === 10, we don't preventDefault — page scroll works
  };

  window.addEventListener('wheel', handleWheel, { passive: false });
  return () => window.removeEventListener('wheel', handleWheel);
}, [open, scrollAmount, setOpen, setScrollAmount]);


  const spring = useSpring({
    x: open ? -scrollAmount : 0,
    config: { tension: 120, friction: 20 },
  })

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, -30], fov: 25 }}>
      <three.pointLight position={[10, 10, 10]} intensity={1.5} color={color} />
      <Suspense fallback={null}>
        <three.group
          key={groupKey} // key forces remount and spring reset
          position-x={spring.x}
          rotation={[0, Math.PI, 0]}
          onClick={(e) => {
            e.stopPropagation()
            if (open) {
              // closing, reset scroll
              setOpen(false)
              setScrollAmount(0)
            } else {
              // opening from closed
              setOpen(true)
              setScrollAmount(0)
            }
          }}
        >
          <Model open={open} hinge={hinge} />
        </three.group>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={1.75} far={4.5} />
    </Canvas>
  )
}
