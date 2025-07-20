"use client";

import React, { useRef, useEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useResponsive from "../hooks/useResponsive";

gsap.registerPlugin(useGSAP);

useGLTF.preload("./arrow.glb");
useTexture.preload("/images.jpeg");

const Arrow = () => {
  const arrowRef = useRef();
  const { scene } = useGLTF("./arrow.glb");
  const texture = useTexture("/images.jpeg");

  const { isMobile } = useResponsive();

  // Dynamic values based on screen size
  const scale = isMobile ? [5.0, 5.0, 5.0] : [7, 7, 7];
  const position = isMobile ? [-2, 1.2, 0] : [-3.7, 2.5, 0];
  const flyInFrom = isMobile ? { x: -7, y: 4, z: 0 } : { x: -5, y: 5, z: 0 };

  // Apply texture to model
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
    if (!arrowRef.current) return;

    // Fly-in from side
    gsap.fromTo(
      arrowRef.current.position,
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

    // Rocking/spinning effect
    gsap.to(arrowRef.current.rotation, {
      y: "+=6.283", // full spin
      duration: 3,
      ease: "none",
      repeat: -1,
    });
  }, [isMobile]);

  return (
    <mesh>
      <primitive
        object={scene}
        ref={arrowRef}
        scale={scale}
        position={position}
        rotation={[0.9, 0.7, 0]} // consistent base rotation
      />
    </mesh>
  );
};

export default Arrow;
