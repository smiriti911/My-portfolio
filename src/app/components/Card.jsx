import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const Card = ({ cardText, icon, className = "", bounds }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      Draggable.create(cardRef.current, {
        type: "x,y",
        inertia: true,
        edgeResistance: 0.65,
        bounds: bounds?.current || window, // if bounds passed, use it
      });
    }
  }, [bounds]);

  return (
    <div
      ref={cardRef}
      className={`absolute flex items-center justify-center px-2 py-2 text-lg sm:text-xl text-center rounded-full ring ring-neutral-600 font-extralight bg-neutral-900/80 cursor-grab text-neutral-200 ${className}`}
    >
      {icon && <span className="text-4xl sm:text-5xl">{icon}</span>}
      {cardText && <span>{cardText}</span>}
    </div>
  );
};

export default Card;
