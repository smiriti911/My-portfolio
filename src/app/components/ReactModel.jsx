"use client";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useResponsive from "../hooks/useResponsive";

gsap.registerPlugin(useGSAP);

useGLTF.preload("./react.glb");

const ReactModel = () => {
  const reactRef = useRef();
  const { scene } = useGLTF("./react.glb");
  const { isMobile } = useResponsive();

  // Responsive values
  const scale = isMobile ? [0.25, 0.25, 0.25] : [0.35, 0.35, 0.35];
  const entryPosition = isMobile ? { x: 3, y: 5, z: -2.5 } : { x: 5, y: 5, z: -3 };
  const finalPosition = isMobile ? { x: -0.7, y: 0.8, z: -2.5 } : { x: 1, y: 0.8, z: -3 };
  const elastic = isMobile ? [0.9, 0.6] : [1.2, 0.9];

  useGSAP(() => {
    if (!reactRef.current) return;

    // Fly-in from top-right
    gsap.fromTo(
      reactRef.current.position,
      entryPosition,
      {
        ...finalPosition,
        ease: `elastic.out(${elastic[0]}, ${elastic[1]})`,
        duration: 3,
        delay: 3,
      }
    );

    // Infinite Y rotation
    gsap.to(reactRef.current.rotation, {
      y: "+=6.283", // full spin
      duration: 4,
      ease: "none",
      repeat: -1,
    });
  }, [isMobile]);

  return (
    <mesh>
      <primitive
        object={scene}
        ref={reactRef}
        rotation={[0.3, 0.5, 0.1]}
        scale={scale}
        position={[finalPosition.x, finalPosition.y, finalPosition.z]} // sync with GSAP
      />
    </mesh>
  );
};

export default ReactModel;
