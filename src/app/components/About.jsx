"use client"

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
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { useMemo, useState, useEffect } from "react";
import gsap from "gsap";

import ScrollTrigger from "gsap/ScrollTrigger";


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
    email: "smiritikapoor911@gmail.com"
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(Email.email);
    setCopied(true);
    setTimeout(() => setCopied(false),10000);
      };

useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".grids-container", // parent wrapper
        start: "top 70%", 
        toggleActions: "restart none none reset"           
      },
    });

    // grid-1: About Me from left
    tl.fromTo(
      ".grid-1",
      { autoAlpha: 0, x: -100 },
      { autoAlpha: 1, x: 0, duration: 1, ease: "power4.out", }
    );

    // grid-2: PNG from right
    tl.fromTo(
      ".grid-2",
      { autoAlpha: 0, x: 100 },
      { autoAlpha: 1, x: 0, duration: 1, ease: "power4.out",  },
      "-=0.7" // slight overlap
    );

    // grid-3: Get in Touch + CV from bottom
    tl.fromTo(
      ".grid-3",
      { autoAlpha: 0, y: 100 },
      { autoAlpha: 1, y: 0, duration: 1, ease: "power4.out" ,},
      "-=0.7"
    );
  }, []);


  return (
    <section className="max-w-7xl mx-auto min-h-screen  flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:my-36 my-25 sm:px-10 px-5 gap-3">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12 grids-container">
          <div
            className="flex items-end grid-1 rounded-2xl border-1 border-neutral-800 grid-fade"
    
          >
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

              <h2  className={`text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-500 text-2xl sm:text-3xl font-semibold tracking-wide ${redRose.className}`}>
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
            className="flex items-end grid-2 rounded-2xl 
border border-neutral-800 grid-fade"
            style={{
              backgroundImage: "url('/grid.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div
            className="flex items-end grid-3 rounded-2xl "
          >
             <div className="grid grid-cols-2 gap-6 text-white h-full w-full ">
{/* Get in Touch */}
      <div className=" p-4 rounded-2xl flex flex-col gap-6 bg-neutral-900/50 border-1 border-neutral-800">
        <h2   className={`text-transparent bg-clip-text bg-gradient-to-b mt-2 sm:mt-4 from-neutral-100 to-neutral-500 text-xl sm:text-2xl font-light tracking-wide ${redRose.className}`}>Get in Touch</h2>
        <ul className="flex flex-col gap-4 md:gap-6 text-lg mt-4 sm:mt-4 md:mt-10">
          <li>
            <a
              href="https://www.linkedin.com/in/smiriti-kapoor011/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl"
            >
              <div className="flex items-center gap-3">
                <FaLinkedin className="text-2xl text-indigo-300" />
                <span  className="text-neutral-200/80 text-lg sm:text-xl font-extralight tracking-wider">Smiriti</span>
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
                <span  className="text-neutral-200/80 text-lg sm:text-xl font-extralight tracking-wider">smiriti911</span>
              </div>
              <FiArrowUpRight className="text-xl opacity-70 group-hover:translate-x-1 transition " />
            </a>
          </li>

          <li>

              <div className="flex items-center justify-between w-full group cursor-pointer">
  {/* Email with icon */}
  <div className="flex items-center gap-3">
    <MdEmail className="text-2xl text-lime-200" />
    <span  className="text-neutral-200/80 text-lg sm:text-xl font-extralight tracking-wider">{Email.name}</span>
  </div>

  {/* Copy button */}
  <button onClick={handleCopy} className="rounded-lg group-hover:translate-x-1 transition cursor-pointer">
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
       <h2   className={`text-transparent bg-clip-text bg-gradient-to-b mt-2 sm:mt-4 from-neutral-100 to-neutral-500 text-xl sm:text-2xl font-light tracking-wide ${redRose.className}`}>CV</h2>
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
