import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import useResponsive from '../hooks/useResponsive';

const Cube = (props) => {
  const { nodes } = useGLTF('/cube.glb');
  const texture = useTexture('/cube.png');

  const groupRef = useRef();
  const cubeRef = useRef();
  const { isMobile } = useResponsive();

  // Final target position
  const targetPos = isMobile ? [-2.5, 1.3, 0] : [-5, 2.7, 0];

  useGSAP(() => {
    // Slide in from above (Y-axis)
    gsap.fromTo(
      groupRef.current.position,
      { y: targetPos[1] + 5 }, // start higher
      { y: targetPos[1], duration: 1, ease: 'power4.out', delay: 3 }
    );

    // Continuous rotation
    gsap.timeline({ repeat: -1, repeatDelay: 0.5 })
      .to(cubeRef.current.rotation, {
        y: `+=${Math.PI * 2}`,
        x: `-=${Math.PI * 2}`,
        duration: 3,
        stagger: { each: 0.15 }
      });
  }, [isMobile]);

  return (
    <group
      ref={groupRef}
      position={targetPos} // initial position (GSAP animates from offset)
      rotation={[2.6, 0.8, -1.8]}
      scale={isMobile ? [0.35, 0.35, 0.35] : [0.49, 0.49, 0.49]}
      dispose={null}
      {...props}
    >
      <mesh
        ref={cubeRef}
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
      >
        <meshMatcapMaterial matcap={texture} toneMapped={false} />
      </mesh>
    </group>
  );
};

useGLTF.preload('/cube.glb');
useTexture.preload('/cube.png');

export default Cube;
