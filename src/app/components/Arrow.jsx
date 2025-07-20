"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useResponsive from "../hooks/useResponsive";

gsap.registerPlugin(useGSAP);

// Preload assets
useGLTF.preload("./arrow.glb");
useTexture.preload("/images.jpeg");

const Arrow = () => {
  const arrowRef = useRef();
  const { scene } = useGLTF("./arrow.glb");
  const texture = useTexture("/images.jpeg");
  const { isMobile } = useResponsive();

  // Memoized responsive config
  const { scale, position, flyInFrom } = useMemo(() => {
    return {
      scale: isMobile ? [5, 5, 5] : [7, 7, 7],
      position: isMobile ? [-2, 1.2, 0] : [-3.7, 2.5, 0],
      flyInFrom: isMobile ? { x: -7, y: 4, z: 0 } : { x: -5, y: 5, z: 0 },
    };
  }, [isMobile]);

  // Apply texture to all mesh materials once
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [scene, texture]);

  // GSAP animations
  useGSAP(() => {
    const mesh = arrowRef.current;
    if (!mesh) return;

    gsap.fromTo(
      mesh.position,
      flyInFrom,
      {
        x: position[0],
        y: position[1],
        z: position[2],
        ease: "power4.out",
        duration: 0.5,
        delay: 3.5,
      }
    );

    gsap.to(mesh.rotation, {
      y: "+=6.283", // 360 deg
      duration: 3,
      ease: "none",
      repeat: -1,
    });
  }, [flyInFrom, position]);

  return (
    <mesh>
      <primitive
        object={scene}
        ref={arrowRef}
        scale={scale}
        position={position}
        rotation={[0.9, 0.7, 0]}
      />
    </mesh>
  );
};

export default Arrow;
