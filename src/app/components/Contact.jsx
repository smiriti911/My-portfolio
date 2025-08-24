"use client";

import React, { useRef, useState, useEffect } from "react";
import { Red_Rose } from "next/font/google";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: formRef.current, // trigger when form enters view
        start: "top 80%",
        toggleActions: "play none none reverse", 
      },
    });

    tl.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
    })
      .from(subRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
      }, "-=0.5") // overlap for smoother effect
      .from(formRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      }, "-=0.4");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    setSuccess(false);

    emailjs
      .sendForm(
        "service_0uuctnk",
        "template_xtxoc3m",
        formRef.current,
        "6Af6qneRkYaxiIDaj"
      )
      .then(
        (result) => {
          setLoading(false);
          setSuccess(true);
          formRef.current?.reset();
        },
        (error) => {
          setLoading(false);
          setSuccess(false);
        }
      );
  };

  return (
    <section className="my-15 sm:my-25 flex flex-col items-center justify-start px-5 sm:px-10" id="contact">
      <div className="max-w-2xl w-full flex flex-col gap-3">
        <h2
          ref={headingRef}
          className={`text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-500 text-3xl sm:text-4xl font-semibold tracking-wide mb-5 ${redRose.className}`}
        >
         Let's Talk
        </h2>
        <p
          ref={subRef}
          className="text-neutral-400 text-base sm:text-lg font-extralight mb-5"
        >
          I’d love to hear from you! Whether you have a question, a project idea,
          or just want to say hello, feel free to reach out.
        </p>

        {/* Contact Card */}
        <div
          className="w-full border border-neutral-800/50 rounded-2xl shadow-xl backdrop-blur-md p-8 sm:p-10"
          ref={formRef}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-900/40 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring focus:ring-neutral-800"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-900/40 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring focus:ring-neutral-800"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              required
              className="w-full px-4 py-3 rounded-xl bg-neutral-900/40 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:ring focus:ring-neutral-800"
            />
            <button
              type="submit"
              className={`w-full py-4 rounded-xl bg-gradient-to-r from-neutral-800 to-neutral-900 text-neutral-200 tracking-wider ${redRose.className} hover:opacity-70 transition`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
            {success && <p className="text-green-400 mt-2">Message sent successfully!</p>}
          </form>
        </div>

        {/* Social Links */}
        <div className="flex  gap-6 mt-5 text-2xl text-neutral-400">
          <a href="https://github.com/smiriti911" target="_blank" className="hover:text-pink-200">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/smiriti-kapoor011" target="_blank" className="hover:text-blue-300">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
