"use client";

import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useResponsive from "../hooks/useResponsive";

useGLTF.preload("/model.gltf");

const Target = (props) => {
  const targetRef = useRef();
  const { scene } = useGLTF("/model.gltf");
  const { isMobile } = useResponsive();

  // Responsive values
  const scale = isMobile ? [0.4, 0.4, 0.4] : [0.55, 0.55, 0.55];

  const entryPosition = isMobile
    ? { x: 4, y: -5, z: -1.8 }
    : { x: 7, y: -9, z: -1.8 };

  const finalPosition = isMobile
    ? { x: 0.5, y: -2.0, z: -1.4 }
    : { x: 1.9, y: -3, z: -1.8 };

  const yoyoDistance = isMobile ? 0.15 : 0.2;

  useGSAP(() => {
    const mesh = targetRef.current;
    if (!mesh) return;

    // Set initial off-screen position
    gsap.set(mesh.position, entryPosition);

    // Animate to final resting position
    gsap.to(mesh.position, {
      ...finalPosition,
      duration: 0.5,
      delay: 3,
      ease: "power4.out",
      onComplete: () => {
        // Yoyo up-down motion
        gsap.to(mesh.position, {
          y: `-=${yoyoDistance}`,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });
  }, [isMobile]);

  return (
    <mesh {...props} ref={targetRef}>
      <primitive
        object={scene}
        scale={scale}
        position={[0, 0, 0]} // overridden by GSAP
      />
    </mesh>
  );
};

export default Target;
