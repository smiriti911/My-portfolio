"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { MagicCard } from "../../components/magicui/magic-card";
import Image from "next/image";
import { Red_Rose } from "next/font/google";
import { FaMapMarkerAlt, FaGlobe, FaGraduationCap } from "react-icons/fa";
import { TypingAnimation } from "@/components/magicui/typing-animation";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechStackSweep from "./TechStack";

gsap.registerPlugin(ScrollTrigger);

const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const BentoGrid = () => {
  const sectionRef = useRef(null);

  const badges = useMemo(
    () => [
      { icon: <FaMapMarkerAlt />, label: "India" },
      { icon: <FaGlobe />, label: "English & Hindi" },
      {
        icon: <FaGraduationCap />,
        label: "Dr. A. P. J. Abdul Kalam Technical University",
      },
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      id="bento"
      className="px-4 md:px-6 lg:px-8 my-30 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        {/* Left Column */}
        <div className="flex flex-col gap-5 md:col-span-2 h-full">
          {/* About Me */}
          <MagicCard className="w-full p-4 flex flex-col rounded-2xl gap-4">
            <div className="flex justify-between items-start w-full">
              <div className="flex gap-4 items-center">
                <Image
                  src="/avatar.png"
                  width={72}
                  height={72}
                  alt="Smiriti"
                  className="rounded-xl border border-neutral-700"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex items-center bg-neutral-900 rounded-2xl relative pl-4">
                    <span className="absolute h-2.5 w-2.5 rounded-full bg-green-500 opacity-90 animate-ping"></span>
                    <span className="bg-green-500 h-2.5 w-2.5 text-xs z-10 animate-pulse rounded-full"></span>
                    <span className="text-xs text-neutral-200 px-2 py-1.5 rounded-full">
                      Available To Work
                    </span>
                  </div>
                  <p className="text-sm text-neutral-400">
                    I'm a{" "}
                    <span className="text-violet-300">
                      Full Stack Developer
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 my-4 justify-start w-full">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 text-sm px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-300"
                >
                  <span className="text-violet-400">{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>

            <h2
              className={`text-neutral-200 text-2xl font-semibold tracking-wide my-1 ${redRose.className}`}
            >
              About Me
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              I'm a creative developer passionate about building elegant,
              user-focused web experiences. I love blending design with
              functionality and often explore AI, 3D visuals, and interactive
              interfaces. Always learning, always building.
            </p>
          </MagicCard>

          <MagicCard className="w-full h-full p-0 rounded-2xl bg-black text-neutral-100 font-mono hidden md:block">
            <div className="bg-neutral-800/50 px-4 py-3 rounded-t-2xl flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>

            <div className="px-4 py-3 text-sm space-y-1 leading-relaxed">
              {[
                {
                  text: "➜ ~/projects/my-portfolio git status",
                  delay: 0,
                  color: "text-green-400",
                },
                { text: "➜ npm run dev", delay: 1700, color: "text-green-400" },
                {
                  text: "my-portfolio@1.0.0 dev",
                  delay: 2400,
                  color: "text-yellow-300",
                },
                {
                  text: "ready - started server on http://localhost:3000",
                  delay: 3000,
                  color: "text-blue-400",
                },
                {
                  text: "event - compiled client and server successfully",
                  delay: 4300,
                  color: "text-blue-400",
                },
              ].map(({ text, delay, color }, index) => (
                <div key={index} className="min-h-[1.5rem] whitespace-pre">
                  <TypingAnimation
                    delay={delay}
                    duration={20}
                    className={`${color} text-sm font-light`}
                    startOnView="true"
                  >
                    {text}
                  </TypingAnimation>
                </div>
              ))}
            </div>
          </MagicCard>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5 md:col-span-1 h-full">
          {/* Tech Stack */}
          <MagicCard className="w-full h-full p-4 flex flex-col justify-between rounded-2xl">
            <div className="w-full flex-1 rounded-xl flex items-center justify-center mt-6">
                <TechStackSweep/>
            </div>
            <div className="pt-6">
              <h2
                className={`text-neutral-200 text-2xl font-semibold tracking-wide mt-7 ${redRose.className}`}
              >
                Tech Stack
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                I build full-stack apps with Next.js, React, and Tailwind CSS,
                backed by Node.js, Express, and MongoDB. I craft 3D experiences
                using Three.js, integrate AI via Gemini/GPT, and deploy
                seamlessly with Vercel.
              </p>
            </div>
          </MagicCard>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
