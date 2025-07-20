"use client";

import React, { useRef } from "react";
import { Red_Rose } from "next/font/google";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CanvasScene from "./canvas/CanvasScene";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);



const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Hero = () => {
  const textRef = useRef(null);
  const typingRef = useRef(null);
  const canvasRef = useRef(null); // 🎯 Add canvas wrapper ref


 useGSAP(() => {
  const introTimeline = gsap.timeline();
  const scrollTimeline = gsap.timeline({ paused: true }); // initially paused

  // 1. Set initial states
  gsap.set([textRef.current, typingRef.current, canvasRef.current], {
    opacity: 0,
  });

  // 2. Define intro animation
  introTimeline
    .to(textRef.current, {
      scale: 1,
      opacity: 1,
      delay: 1,
      ease: "power1.out",
    })
    .to(typingRef.current, {
      scale: 1,
      opacity: 1,
      delay: 0.5,
      ease: "power1.out",
    })
    .to(canvasRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power4.in",
    })
    .add(() => {
      // 3. Define scroll-based animation after intro finishes
      scrollTimeline.scrollTrigger = ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        endTrigger: "#bento",
        end: "top 85%",
        scrub: true,
        animation: scrollTimeline,
      });

      scrollTimeline.to(canvasRef.current, {
        opacity: 0,
        ease: "power4.in",
      });
    });
}, []);

  return (
    <section
      id="hero"
      className="w-full min-h-screen mx-auto flex flex-col relative"
    >
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-25 sm:px-10 px-5 gap-3">
        <p
          ref={textRef}
          className={`opacity-0 text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-500 text-3xl sm:text-4xl font-semibold tracking-wide text-center ${redRose.className}`}
        >
          Hi, I am Smiriti
        </p>

        <div ref={typingRef}>
          <TypingAnimation
            className={`text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-700 text-xl sm:text-2xl font-semibold tracking-wide text-center ${redRose.className}`}
          >
            Designing intuitive experiences
          </TypingAnimation>
        </div>
      </div>

      <div
        ref={canvasRef}
        className="w-full h-full absolute inset-0 opacity-0 transition-opacity duration-1000 sm:z-[0] z-[-1]"
      >
        <CanvasScene/>
      </div>
    </section>
  );
};

export default Hero;
