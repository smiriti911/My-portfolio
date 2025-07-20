"use client";

import { useRef, useMemo } from "react";
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

  // Memoized responsive values
  const { scale, entryPosition, finalPosition, elastic } = useMemo(() => {
    return {
      scale: isMobile ? [0.3, 0.3, 0.3] : [0.35, 0.35, 0.35],
      entryPosition: isMobile ? { x: 3, y: 5, z: -2.5 } : { x: 5, y: 5, z: -3 },
      finalPosition: isMobile ? { x: -0.7, y: 1, z: -2.5 } : { x: 1, y: 0.8, z: -3 },
      elastic: isMobile ? [0.9, 0.6] : [1.2, 0.9],
    };
  }, [isMobile]);

  useGSAP(() => {
    if (!reactRef.current) return;

    const mesh = reactRef.current;

    gsap.fromTo(
      mesh.position,
      entryPosition,
      {
        ...finalPosition,
        ease: `elastic.out(${elastic[0]}, ${elastic[1]})`,
        duration: 3,
        delay: 3.5,
      }
    );

    gsap.to(mesh.rotation, {
      y: "+=6.283", // 2π rad = 360°
      duration: 4,
      ease: "none",
      repeat: -1,
    });
  }, [entryPosition, finalPosition, elastic]);

  return (
    <mesh>
      <primitive
        object={scene}
        ref={reactRef}
        rotation={[0.3, 0.5, 0.1]}
        scale={scale}
        position={[finalPosition.x, finalPosition.y, finalPosition.z]}
      />
    </mesh>
  );
};

export default ReactModel;
