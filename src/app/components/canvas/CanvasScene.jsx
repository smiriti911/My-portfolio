"use client"
import { Suspense, useRef, useEffect } from "react"; 
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from 'three'; 
import ReactModel from "../ReactModel";
import Nodejs from "../Node";
import Target from "../Target";
import Arrow from "../Arrow";
import CanvasLoader from "../CanvasLoader";

import useResponsive from "@/app/hooks/useResponsive";

// Cursor-controlled light for dynamic illumination
const CursorLight = () => {
  const { camera, mouse } = useThree();
  const light = useRef();

  useFrame(() => {
    if (light.current) {
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Prevent light from getting too close to the model
      const minDistance = 2;
      const maxDistance = 8;
      pos.clampLength(minDistance, maxDistance); // ✅ Clamps distance to avoid extreme noise

      // Adjust position for smooth lighting
      light.current.position.copy(pos);
      light.current.position.z += 2; // Slightly forward for better depth

      // Dynamically adjust intensity based on distance
      const distFactor = (pos.length() - minDistance) / (maxDistance - minDistance);
      light.current.intensity = 3 + distFactor * 2; // ✅ Keeps brightness stable
    }
  });

  return (
    <pointLight
      ref={light}
      color="#ffb354" 
      intensity={10} // ✅ Lowered to prevent overexposure
      distance={8} // ✅ Increased range for better spread
      decay={1} // ✅ Softer fall-off
      castShadow
      shadow-mapSize-width={1024} // ✅ Lower resolution to reduce noise
      shadow-mapSize-height={1024}
      shadow-bias={-0.0005} // ✅ Prevents shadow flickering
        shadow-camera-far={10}
        shadow-camera-left={10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={10}
    />
  );
};

const Computer = () => {
  const group = useRef();
  const { scene, animations } = useGLTF("/robot.glb"); // Load the model and its animations
  const { actions } = useAnimations(animations, group);

  const { isMobile, isTablet } = useResponsive();


  const scale = isMobile ? [1.5, 1.5, 1.5]: [1.92, 1.92, 1.92];
  const position = isMobile ? [-0.5, -2.5, -0.5]: [-0.8, -3.2, -0.9];

  useEffect(() => {
  if (actions) {
    const action = actions["Idle Animation"];
    if (action) {
      action.reset().setLoop(THREE.LoopRepeat).play();
    }
  }

  return () => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (action && typeof action.stop === 'function') {
          action.stop();
        }
      });
    }
  };
}, [actions]);


  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;  // ✅ Enable shadow casting
        child.receiveShadow = true; // ✅ Enable shadow receiving
        if (child.material) {
          child.material.shadowSide = THREE.DoubleSide; // Ensure shadows work properly
        }
      }
    });
  }, [scene]);

  return (
    <group ref={group}>
      {/* Lighting */}
      <ambientLight intensity={0.5} color="white"/>
      <hemisphereLight intensity={0.5} groundColor="white" />
      <directionalLight
        intensity={5}
        position={[4, 10, 10]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#fcb153"
      />
       <spotLight position={[5, 10, 5]} angle={0.3} intensity={5} castShadow />

       <mesh position={isMobile?[-1.2, -2.5, -1]:[-1.75, -3.2, -1.55]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={isMobile?[2,64]:[2.5, 64]} />
        <meshStandardMaterial 
          color="#2b2529" // ✅ Set the color of the circle
          transparent={true}  // ✅ Enable transparency
          opacity={0.2}       // ✅ Set opacity (0 = invisible, 1 = solid)
          depthWrite={true}   // ✅ Ensure proper rendering of shadows
        />
      </mesh>

        <pointLight
        intensity={0.5}
        position={[5, 2.3, 0]}  // Adjust the position to face the model from the front
        castShadow
      />
      {/* Render the model */}
      <primitive 
        object={scene} 
        scale={scale} 
        position={position} 
        rotation={[0, 0.85, 0]}
      />
    </group>
  );
};

const ComputerCanvas = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [10, 3, 8], fov: 30 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader/>}>
        {/* Camera controls */}
        <OrbitControls
          enableZoom={false} // Enable zoom for better inspection
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        {/* Render the Computer model */}
        <Computer />
        <ReactModel/>
        <Nodejs/>
        <Target/>
        <Arrow/>
        <CursorLight />
      </Suspense>
      {/* Preload assets */}
      <Preload all />
    </Canvas>
  );
};

export default ComputerCanvas;
