"use client";

import React from "react";
import { Red_Rose } from "next/font/google";

const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 py-3 px-5 sm:px-10 border-t border-neutral-700">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-1">
        <p className={`text-sm sm:text-base ${redRose.className}`}>
          &copy; {new Date().getFullYear()} Smiriti Kapoor. All rights reserved.
        </p>
        <p className={`text-xs text-neutral-500 ${redRose.className}`}>
          Built with ❤️ using Next.js & TailwindCSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
