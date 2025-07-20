"use client"
import React from 'react';
import { Html, useProgress } from '@react-three/drei';

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex flex-col items-center mt-30 space-y-4">
        {/* Bouncing Dots */}
        <div className="flex space-x-2">
          <span className="w-4 h-4 rounded-full bg-gradient-to-b from-neutral-300 to-neutral-700 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-4 h-4 rounded-full bg-gradient-to-b from-neutral-300 to-neutral-700 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-4 h-4 rounded-full bg-gradient-to-b from-neutral-300 to-neutral-700 animate-bounce"></span>
        </div>

        {/* Loading text */}
        <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700">
          {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
};

export default CanvasLoader;
