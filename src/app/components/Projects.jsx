"use client";

import React, { useRef, useEffect } from "react";
import { Red_Rose } from "next/font/google";
import Carousel from "./Carousel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    // Heading animation
    gsap.fromTo(
      el.querySelector("h2"),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 60%", // animation starts when section enters viewport
          toggleActions: "play none none reverse", 
        },
      }
    );

    // Carousel animation
    gsap.fromTo(
      el.querySelector(".carousel-track"),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        delay: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto mb-25 flex flex-col relative overflow-x-hidden"
    >
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:px-10 px-5 mb-10 gap-3">
        <h2
          className={`text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-500 text-2xl sm:text-3xl font-semibold tracking-wide ${redRose.className}`}
        >
          Projects
        </h2>
      </div>
      <Carousel />
    </section>
  );
};

export default Projects;
