"use client";

import React, { useState } from "react";
import { Red_Rose } from "next/font/google";
import { FaHamburger } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";

const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const sections = ["home", "about", "projects", "contact"];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(true); // close mobile menu after click
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl bg-neutral-950/30 ${redRose.className}`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center py-2 sm:px-10 px-5">
        <div className="flex flex-row gap-2">
          <a
            href="#home"
            onClick={() => scrollToSection("home")}
            className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-2xl font-semibold tracking-wide hover:opacity-70 transition-colors"
          >
            Smiriti
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="sm:flex hidden gap-6 items-center mt-1">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => scrollToSection(section)}
              className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-lg font-semibold tracking-normal hover:opacity-70 transition-colors"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="text-2xl mb-1 text-neutral-400 hover:opacity-70 transition-colors cursor-pointer sm:hidden flex"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaHamburger /> : <VscChromeClose />}
        </button>
      </div>

      {/* Mobile Menu */}
      {!isOpen && (
        <div className="flex sm:hidden flex-col fixed right-0 z-50 min-w-full h-screen py-4 px-2 pr-10 items-end gap-4 bg-neutral-950">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => scrollToSection(section)}
              className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-lg font-semibold tracking-normal hover:opacity-70 transition-colors"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
