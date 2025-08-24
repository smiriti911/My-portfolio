"use client";

import React from "react";
import { Red_Rose } from "next/font/google";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { FiArrowDown, FiCopy } from "react-icons/fi";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaGraduationCap,
  FaGithub,
  FaLinkedin,
  FaCheckCircle,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaAws,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { useMemo, useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Card from "./Card";
import { SiExpress, SiMongodb, SiTailwindcss } from "react-icons/si";

import { DiJavascript1 } from "react-icons/di";

import ScrollTrigger from "gsap/ScrollTrigger";
import { VscAzure } from "react-icons/vsc";

gsap.registerPlugin(ScrollTrigger);

const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const About = () => {
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

  const [copied, setCopied] = useState(false);
  const Email = {
    name: "Smiriti",
    email: "smiritikapoor911@gmail.com",
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(Email.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 10000);
  };

  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".grids-container", // parent wrapper
        start: "top 70%",
        toggleActions: "restart none none reset",
      },
    });

    // grid-1: About Me from left
    tl.fromTo(
      ".grid-1",
      { autoAlpha: 0, x: -100 },
      { autoAlpha: 1, x: 0, duration: 0.5, ease: "power4.out" }
    );

    // grid-2: PNG from right
    tl.fromTo(
      ".grid-2",
      { autoAlpha: 0, x: 100 },
      { autoAlpha: 1, x: 0, duration: 0.5, ease: "power4.out", delay: 0.5 }
    );

    // grid-3: Get in Touch + CV from bottom
    tl.fromTo(
      ".grid-3",
      { autoAlpha: 0, y: 100 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power4.out", delay: 0.5 }
    );
  }, []);

  const boundsRef = useRef(null);

  return (
    <section className="max-w-7xl mx-auto min-h-screen  flex flex-col relative overflow-x-hidden overflow-y-hidden" id="about">
      <div className="w-full mx-auto flex flex-col sm:my-20 my-15 sm:px-10 px-5 gap-3">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12 grids-container">
          <div className="flex items-end grid-1 rounded-2xl border-1 border-neutral-800 grid-fade">
            <img
              src="/assets/spotlight3.png"
              alt="o"
              className="absolute z-[-1] h-full w-full"
            />

            <div className=" p-4 flex flex-col w-full  min-h-full justify-end">
              <div className="flex justify-between items-start w-full">
                <div className="flex gap-4 items-center mb-4">
                  <Image
                    src="/avatar.png"
                    width={140}
                    height={148}
                    alt="Smiriti"
                    className="rounded-full bg-neutral-800/50"
                  />
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center bg-neutral-700/70 rounded-2xl relative pl-4">
                      <span className="absolute h-2.5 w-2.5 rounded-full bg-green-500 opacity-90 animate-ping"></span>
                      <span className="bg-green-500 h-2.5 w-2.5 text-xs z-10 animate-pulse rounded-full"></span>
                      <span className="text-xs text-neutral-200 px-2 py-1.5 rounded-full font-sans font-light">
                        Available To Work
                      </span>
                    </div>
                    <p className="text-sm text-neutral-400 font-sans font-light">
                      I'm a{" "}
                      <span className="text-violet-300 font-sans font-light">
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
                    className="flex items-center gap-1 text-sm px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full text-neutral-300 font-sans font-light"
                  >
                    <span className="text-violet-400">{badge.icon}</span>
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>

              <h2
                className={`text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-500 text-2xl sm:text-3xl font-semibold tracking-wide ${redRose.className}`}
              >
                About Me
              </h2>
              <ul className="list-inside text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-sans font-light space-y-2">
                <li>
                  Passionate{" "}
                  <span className="text-violet-300">Full Stack Developer</span>{" "}
                  with a love for clean, scalable code and seamless user
                  experiences.
                </li>
                <li>
                  I blend{" "}
                  <span className="text-violet-300">
                    design and functionality
                  </span>{" "}
                  to craft interactive, user-centric web applications.
                </li>
                <li>
                  Currently exploring the world of{" "}
                  <span className="text-violet-300">AI</span>,{" "}
                  <span className="text-violet-300">3D web</span> (React Three
                  Fiber), and creative interfaces.
                </li>
              </ul>
            </div>
          </div>

          <div
            className="flex items-start grid-2 rounded-2xl 
border border-neutral-800 grid-fade"
            style={{
              backgroundImage: "url('/grid.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div
              className="flex flex-col items-start p-4 w-full h-full "
              ref={boundsRef}
            >
              <h2
                className={`text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-500 text-2xl sm:text-3xl font-semibold tracking-wide mt-4 ${redRose.className}`}
              >
                My Tool Box
              </h2>

              {/* Text cards */}
              <Card
                className="absolute rotate-[10deg] top-[80%] left-[80%] sm:top-[79%] sm:left-[86%] md:top-[83%] md:left-[83%]"
                cardText="Frontend"
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[355deg] top-[80%] left-[63%] sm:top-[80%] sm:left-[73%] md:top-[83%] md:left-[68%]"
                cardText="Backend"
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[0deg] top-[81%] left-[43%] sm:top-[81%] sm:left-[59%] md:top-[84%] md:left-[52%]"
                cardText="Database"
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[350deg] top-[60%] left-[70%] sm:top-[60%] sm:left-[79%] md:top-[65%] md:left-[76%]"
                cardText="Design"
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[340deg] top-[60%] left-[86%] sm:top-[58%] sm:left-[90%] md:top-[65%] md:left-[89%]"
                cardText="UI/UX"
                bounds={boundsRef}
              />

              {/* Icon cards */}
              <Card
                className="absolute rotate-[0deg] top-[35%] left-[90%] sm:top-[33%] sm:left-[85%] md:top-[45%] md:left-[85%]"
                icon={
                  <FaReact className="text-blue-300 text-4xl sm:text-5xl" />
                }
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[0deg] top-[48%] left-[60%] sm:top-[53%] sm:left-[69%] md:top-[60%] md:left-[65%]"
                icon={
                  <FaNodeJs className="text-lime-400 text-4xl sm:text-5xl" />
                }
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[15deg] top-[58%] left-[38%] sm:top-[45%] sm:left-[51%] md:top-[55%] md:left-[44%]"
                icon={
                  <SiMongodb className="text-green-500 text-4xl sm:text-5xl" />
                }
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[345deg] top-[78%] left-[32%] sm:top-[72%] sm:left-[49%] md:top-[77%] md:left-[41%]"
                icon={<FaGithub className="text-white text-4xl sm:text-5xl" />}
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[340deg] top-[58%] left-[50%] sm:top-[54%] sm:left-[60%] md:top-[60%] md:left-[55%]"
                icon={<SiExpress className="text-white text-4xl sm:text-5xl" />}
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[20deg] top-[78%] left-[20%] sm:top-[72%] sm:left-[39%] md:top-[77%] md:left-[30%]"
                icon={
                  <FaGitAlt className="text-red-500 text-4xl sm:text-5xl" />
                }
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[15deg] top-[78%] left-[8%] sm:top-[72%] sm:left-[29%] md:top-[77%] md:left-[19%]"
                icon={
                  <FaAws className="text-yellow-500 text-4xl sm:text-5xl" />
                }
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[25deg] top-[58%] left-[26%] sm:top-[49%] sm:left-[34%] md:top-[57%] md:left-[24%]"
                icon={
                  <VscAzure className="text-blue-500 text-4xl sm:text-5xl" />
                }
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[15deg] top-[38%] left-[44%] sm:top-[29%] sm:left-[64%] md:top-[39%] md:left-[60%]"
                icon={
                  <DiJavascript1 className="text-yellow-400 text-4xl sm:text-5xl rounded-full" />
                }
                bounds={boundsRef}
              />

              <Card
                className="absolute rotate-[340deg] top-[38%] left-[78%] sm:top-[30%] sm:left-[75%] md:top-[43%] md:left-[74%]"
                icon={
                  <SiTailwindcss className="text-blue-400 text-4xl sm:text-5xl rounded-full" />
                }
                bounds={boundsRef}
              />
            </div>
          </div>

          <div className="flex items-end grid-3 rounded-2xl ">
            <div className="grid grid-cols-2 gap-4 text-white h-full w-full ">
              {/* Get in Touch */}
              <div className=" p-4 rounded-2xl flex flex-col gap-6 bg-neutral-900/50 border-1 border-neutral-800">
                <h2
                  className={`text-transparent bg-clip-text bg-gradient-to-b mt-2 sm:mt-4 from-neutral-100 to-neutral-500 text-xl sm:text-2xl font-light tracking-wide ${redRose.className}`}
                >
                  Get in Touch
                </h2>
                <ul className="flex flex-col gap-4 md:gap-6 text-lg mt-4 sm:mt-4 md:mt-10">
                  <li>
                    <a
                      href="https://www.linkedin.com/in/smiriti-kapoor011/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <FaLinkedin className="text-2xl text-blue-300" />
                        <span className="text-neutral-200/80 text-lg sm:text-xl font-extralight tracking-wider">
                          Smiriti
                        </span>
                      </div>
                      <FiArrowUpRight className="text-xl opacity-70 group-hover:translate-x-1 transition" />
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://github.com/smiriti911"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <FaGithub className="text-2xl text-pink-200" />
                        <span className="text-neutral-200/80 text-lg sm:text-xl font-extralight tracking-wider">
                          smiriti911
                        </span>
                      </div>
                      <FiArrowUpRight className="text-xl opacity-70 group-hover:translate-x-1 transition " />
                    </a>
                  </li>

                  <li>
                    <div className="flex items-center justify-between w-full group cursor-pointer">
                      {/* Email with icon */}
                      <div className="flex items-center gap-3">
                        <MdEmail className="text-2xl text-lime-200" />
                        <span className="text-neutral-200/80 text-lg sm:text-xl font-extralight tracking-wider">
                          {Email.name}
                        </span>
                      </div>

                      {/* Copy button */}
                      <button
                        onClick={handleCopy}
                        className="rounded-lg group-hover:translate-x-1 transition cursor-pointer"
                      >
                        {copied ? (
                          <FaCheckCircle className="text-green-400 text-xl animate-pulse drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
                        ) : (
                          <FiCopy className="text-xl text-neutral-300" />
                        )}
                      </button>
                    </div>
                  </li>
                </ul>
              </div>

              {/* CV */}
              <div className="bg-neutral-900/50 p-4 rounded-2xl flex flex-col gap-6 border-1 border-neutral-800">
                <h2
                  className={`text-transparent bg-clip-text bg-gradient-to-b mt-2 sm:mt-4 from-neutral-100 to-neutral-500 text-xl sm:text-2xl font-light tracking-wide ${redRose.className}`}
                >
                  Resume
                </h2>
                <div className="flex flex-col gap-4 md:gap-6 text-lg mt-15 md:mt-22 group">
                  <a
                    href="/SmiritiResume.pdf"
                    target="_blank"
                    className=" rounded-xl flex items-center justify-between transition font-extralight tracking-wider text-neutral-200/80 text-xl"
                  >
                    View
                    <FiArrowUpRight className="text-xl group-hover:translate-x-1 transition" />
                  </a>
                  <a
                    href="/SmiritiResume.pdf"
                    download
                    className="rounded-xl flex items-center justify-between transition font-extralight tracking-wider text-neutral-200/80 text-xl"
                  >
                    Download
                    <FiArrowDown className="text-xl group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
