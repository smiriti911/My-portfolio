"use client";

import { useGLTF } from "@react-three/drei";
import React, { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import useResponsive from "../hooks/useResponsive";

// Preload once globally
useGLTF.preload("./node.glb");

const Nodejs = () => {
  const nodeRef = useRef();
  const { scene } = useGLTF("./node.glb");
  const { isMobile } = useResponsive();

  // Memoize responsive values
  const { scale, startPosition, finalPosition, elastic } = useMemo(() => {
    return {
      scale: isMobile ? [0.9, 0.8, 0.9] : [1.5, 1.35, 1.4],
      startPosition: isMobile ? [-4, -5, 4] : [-6, -6, 5],
      finalPosition: isMobile ? [-0.2, -1.5, 1.5] : [-1, -1.9, 2],
      elastic: isMobile ? [1, 1.1] : [1.2, 0.9],
    };
  }, [isMobile]);

  useEffect(() => {
    if (!nodeRef.current) return;

    const mesh = nodeRef.current;
    mesh.position.set(...startPosition);
    mesh.rotation.set(0.2, -0.9, 0);

    // Animate position
    gsap.to(mesh.position, {
      x: finalPosition[0],
      y: finalPosition[1],
      z: finalPosition[2],
      duration: 3,
      ease: `elastic.out(${elastic[0]}, ${elastic[1]})`,
      delay: 4.2,
    });

    // Infinite rotation around Z axis
    gsap.to(mesh.rotation, {
      z: "+=" + Math.PI * 2,
      duration: 4,
      repeat: -1,
      ease: "none",
    });
  }, [finalPosition, startPosition, elastic]);

  return (
    <mesh>
      <primitive
        object={scene}
        ref={nodeRef}
        scale={scale}
        position={finalPosition} // match GSAP target for initial render
        rotation={[0.25, -0.9, 0]} // matches the GSAP target
      />
    </mesh>
  );
};

export default Nodejs;
