"use client";

import { useGLTF } from "@react-three/drei";
import React, { useRef, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useResponsive from "../hooks/useResponsive";

const MODEL_PATH = "/model.gltf";
useGLTF.preload(MODEL_PATH);

const Target = (props) => {
  const targetRef = useRef();
  const { scene } = useGLTF(MODEL_PATH);
  const { isMobile } = useResponsive();

  // Memoized responsive values
  const { scale, entryPosition, finalPosition, yoyoDistance } = useMemo(() => {
    return {
      scale: isMobile ? [0.4, 0.4, 0.4] : [0.55, 0.55, 0.55],
      entryPosition: isMobile
        ? { x: 4, y: -5, z: -1.8 }
        : { x: 7, y: -9, z: -1.8 },
      finalPosition: isMobile
        ? { x: 0.5, y: -2.2, z: -1.4 }
        : { x: 1.9, y: -3, z: -1.8 },
      yoyoDistance: isMobile ? 0.15 : 0.2,
    };
  }, [isMobile]);

  useGSAP(() => {
    const mesh = targetRef.current;
    if (!mesh) return;

    // Entry animation
    gsap.fromTo(
      mesh.position,
      entryPosition,
      {
        ...finalPosition,
        duration: 0.7,
        delay: 2.5,
        ease: "power4.out",
        onComplete: () => {
          // Continuous yoyo float
          gsap.to(mesh.position, {
            y: `-=${yoyoDistance}`,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        },
      }
    );
  }, [entryPosition, finalPosition, yoyoDistance]);

  return (
    <mesh ref={targetRef} {...props}>
      <primitive object={scene} scale={scale} />
    </mesh>
  );
};

export default Target;
