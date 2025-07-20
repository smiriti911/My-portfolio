"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const logos = [
  { src: "/logo/react.svg", alt: "React" },

  { src: "/logo/node.svg", alt: "Node.js" },
  { src: "/logo/express.svg", alt: "Express" },
  { src: "/logo/mongo.svg", alt: "MongoDB" },
];

export default function TechStackSweep() {
  const containerRef = useRef(null);
  const logoRefs = useRef([]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.set(logoRefs.current, {
      opacity: 0,
      y: -50,
      scale: 0.8,
    });

    gsap.to(logoRefs.current, {
      scrollTrigger: {
        trigger: container,
        start: "top 50%",
        toggleActions: "play reverse play reverse", // re-trigger on scroll in/out
        scrub: 1.5,
      },
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 3,
      ease: "elastic.out(1.2, 0.9)",
      stagger: 0.1,
    });

    ScrollTrigger.refresh(); // ensure dimensions are updated on resize
  }, []);

  return (
    <div className="col-span-2">
      <div
        ref={containerRef}
        className="relative w-full h-48 md:h-56 lg:h-64 rounded-xl overflow-hidden"
      >
        <div className="flex items-center justify-center h-full gap-4 px-4 flex-wrap">
          {logos.map((logo, i) => (
            <div
              key={i}
              ref={(el) => (logoRefs.current[i] = el)}
              className="w-20 h-20 flex items-center justify-center rounded-full"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-18 h-18 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
