"use client";

import { useState } from "react";
import { slides } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiArrowUpRight } from "react-icons/fi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Red_Rose, Red_Hat_Display } from "next/font/google";

const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const redHat = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  useGSAP(() => {
  const track = document.querySelector(".carousel-track");
  const slide = document.querySelector(".slider-item");
  const images = document.querySelectorAll(".slider-img");

  if (track && slide) {
    gsap.to(track, {
      x: -(currentSlide * slide.offsetWidth+10),
      duration: 1,
      ease: "power2.inOut",
    });
  }

  if (images.length) {
    // Reset all images
    gsap.to(images, { scale: 1.2, duration: 0.5, ease: "power2.out" });

    // Animate active slide "zoom-out"
    gsap.to(images[currentSlide], {
      scale: 1,
      duration: 1.2,
      ease: "power1.out",
    });
  }
}, [currentSlide]);


  return (
    <div className="relative w-full md:px-40 sm:px-10 px-5 overflow-hidden">
      <div className="flex items-center gap-4 carousel-track">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slider-item w-[80vw] sm:w-[50vw] md:w-[30vw] h-[42vh] sm:h-[62vh] flex-none relative border border-neutral-800 rounded-lg overflow-hidden"
          >
            {/* Image */}
            <img
              src={slide.img}
              alt="slide"
              className="slider-img w-full "
            />

            {/* Overlay (no border/rounding here) */}
            <div className="absolute w-full bottom-0 bg-neutral-950 px-2 py-2 h-25">
              <div className="flex justify-between items-center w-full gap-3">
                <div className="flex flex-col">
                  <p
                    className={`${redHat.className} text-xl sm:text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-500 font-semibold mb-1`}
                  >
                    {slide.title}
                  </p>
                  <p className="text-neutral-200/70 text-lg sm:text-base tracking-wide font-light">
                    {slide.description}
                  </p>
                </div>

                {/* Arrow Right */}
                <a
                  href={slide.link}
                  target="_blank"
                  className="flex-shrink-0 bg-neutral-900/50 p-3 rounded-full hover:bg-neutral-900/80 transition duration-300 border border-neutral-800"
                >
                  <FiArrowUpRight className="text-white text-2xl hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="mt-10 flex items-center justify-center gap-5">
        <button
          onClick={prevSlide}
          className="rounded-full cursor-pointer w-12 h-12 flex bg-neutral-900/50 border border-neutral-800 items-center justify-center"
        >
          <IoIosArrowBack className="text-white text-2xl hover:-translate-x-1 transition" />
        </button>
        <button
          onClick={nextSlide}
          className="rounded-full cursor-pointer w-12 h-12 flex bg-neutral-900/50 border border-neutral-800 items-center justify-center"
        >
          <IoIosArrowForward className="text-white text-2xl hover:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
