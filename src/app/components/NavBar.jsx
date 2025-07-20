"use client";

import React from "react";
import Image from "next/image";
import { Red_Rose } from "next/font/google";
import Link from "next/link";
import { FaHamburger } from "react-icons/fa";
import { useState } from "react";

import { VscChromeClose } from "react-icons/vsc";

// Load Red Rose font
const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-3xl bg-neutral-950/70 ${redRose.className}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-2 mx-auto sm:px-10 px-5">
          <div className="flex flex-row gap-2">
            <Link
              href="/"
              className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-2xl font-semibold tracking-wide hover:opacity-70 transition-colors"
            >
              Smiriti
            </Link>
          </div>

          <button
            className="text-2xl mb-1  text-neutral-400 hover:opacity-70 transition-colors cursor-pointer sm:hidden flex"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaHamburger /> : <VscChromeClose />}
          </button>
          <nav className="sm:flex hidden gap-6 items-center mt-1">
            <Link
              href="/"
              className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-lg font-semibold tracking-normal hover:opacity-70 transition-colors "
            >
              Home
            </Link>
            <Link
              href="/About"
              className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-lg font-semibold tracking-normal hover:opacity-70 transition-colors "
            >
              About
            </Link>
            <Link
              href="/Projects"
              className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-lg font-semibold tracking-normal hover:opacity-70 transition-colors "
            >
              Projects
            </Link>
            <Link
              href="/Contact"
              className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-lg font-semibold tracking-normal hover:opacity-70 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
     {!isOpen && (
  
    <div className="flex sm:hidden flex-col fixed right-5 z-50 min-w-full h-screen py-4 px-2 items-end gap-4 bg-neutral-950">
      <Link
        href="/"
        className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-lg font-semibold tracking-normal hover:opacity-70 transition-colors"
      >
        Home
      </Link>
      <Link
        href="/About"
        className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-lg font-semibold tracking-normal hover:opacity-70 transition-colors"
      >
        About
      </Link>
      <Link
        href="/Projects"
        className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-lg font-semibold tracking-normal hover:opacity-70 transition-colors"
      >
        Projects
      </Link>
      <Link
        href="/Contact"
        className="text-transparent bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-700 text-lg font-semibold tracking-normal hover:opacity-70 transition-colors"
      >
        Contact
      </Link>
    </div>
)}

    </header>
  );
};

export default Navbar;
