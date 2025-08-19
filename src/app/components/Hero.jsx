"use client";

import React, { useRef } from "react";
import { Red_Rose } from 'next/font/google';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ComputerCanvas from "./canvas/CanvasScene";
import useResponsive from "../hooks/useResponsive";

const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Hero = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const canvasRef = useRef(null);
  const { isMobile } = useResponsive();

useGSAP(() => {
  const tl = gsap.timeline();

  tl.fromTo(
    line1Ref.current,
    { opacity: 0, y: 0 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power4.out",  // ultra buttery
    }
  )
    .fromTo(
      line2Ref.current,
      { opacity: 0, y: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power4.out",  // matches buttery feel
      },
      "+=0.25"
    )
    .fromTo(
      canvasRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        ease: "power4.in",  // soft and calm
      },
      "+=0.25"
    );
}, []);


  return (
    <section
      id="hero"
      className="w-full min-h-screen mx-auto flex flex-col relative"
    >
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-25 sm:px-10 px-5 gap-3">
        <p
          ref={line1Ref}
          className={`opacity-0 text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-500 text-3xl sm:text-4xl font-semibold tracking-wide text-center ${redRose.className}`}
        >
          Hi, I am Smiriti
        </p>

        <div ref={line2Ref} className="opacity-0">
          <p
            className={`text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-600 text-xl sm:text-2xl font-semibold tracking-wide text-center ${redRose.className}`}
          >
            Designing intuitive experiences
          </p>
        </div>
      </div>

      <div
        ref={canvasRef}
        className="w-full h-full absolute inset-0 opacity-0 transition-opacity duration-1000 sm:z-[0] z-[-1]"
      >
        <ComputerCanvas />
      </div>
    </section>
  );
};

export default Hero;
