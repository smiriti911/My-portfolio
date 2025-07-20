"use client";

import { useGLTF } from "@react-three/drei";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import useResponsive from "../hooks/useResponsive";

// Preload the model
useGLTF.preload("./node.glb");

const Nodejs = (props) => {
  const nodeRef = useRef();
  const { scene } = useGLTF("./node.glb");
  const { isMobile } = useResponsive();

  // Responsive values
  const scale = isMobile ? [1.0, 0.8, 1.0] : [1.5, 1.35, 1.4];
  const finalPosition = isMobile ? [-0.1, -1.5, 1.5] : [-1, -1.9, 2];
  const startPosition = isMobile ? [-9, -6, 4] : [-6, -6, 5];

  // Responsive elastic values
  const elasticAmplitude = isMobile ? 1 : 1.2; // lower = softer
  const elasticPeriod = isMobile ? 1.1 : 0.9;     // lower = quicker

  useEffect(() => {
    if (nodeRef.current) {
      // Set initial position and rotation
      nodeRef.current.position.set(...startPosition);
      nodeRef.current.rotation.set(0.2, -0.9, 0);

      // Animate to final position with responsive elastic
      gsap.to(nodeRef.current.position, {
        x: finalPosition[0],
        y: finalPosition[1],
        z: finalPosition[2],
        duration: 3,
        ease: `elastic.out(${elasticAmplitude}, ${elasticPeriod})`,
        delay: 3.8,
      });

      // Spin animation
      gsap.to(nodeRef.current.rotation, {
        z: "+=" + Math.PI * 2,
        duration: 4,
        repeat: -1,
        ease: "none",
      });
    }
  }, [isMobile]);

  return (
    <mesh {...props}>
      <primitive
        object={scene}
        ref={nodeRef}
        rotation={[0.25, -0.9, 0]} // base rotation
        scale={scale}
        position={finalPosition} // match GSAP target
      />
    </mesh>
  );
};

export default Nodejs;
