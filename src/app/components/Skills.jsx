'use client'

import React, { useState } from 'react'
import { useSpring } from '@react-spring/core'
import { a as web } from '@react-spring/web'
import { CanvasScene } from './canvas/SkillCanvas'
import { Red_Rose } from 'next/font/google'
import useResponsive from '../hooks/useResponsive'


const redRose = Red_Rose({ subsets: ['latin'], weight: ['400', '700'] })

export default function Skills() {
  const [open, setOpen] = useState(false)
  const [scrollAmount, setScrollAmount] = useState(0)
  const {isMobile}=useResponsive();
  
  const spring = useSpring({
    open: Number(open),
    scroll: scrollAmount,
  })
   
  const skillSlideSpring = useSpring({
  x: Math.max(10 - scrollAmount, 0) * -25,
  opacity: open ? 1 : 0,
  config: { tension: 200, friction: 25 },
})

  return (
    <web.main
      style={{
        height: '70vh',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="my-25"
    >
      <div
        className="px-4 md:px-6 lg:px-8 max-w-7xl mx-auto"
        style={{
          position: 'relative',
          top: '30%',
          width: '100%',
          zIndex: 10,
        }}
      >
        <web.h1
          style={{
            position: 'absolute',
            left: '50%',
            transform: spring.open.to((o) => `translate3d(-50%, ${o * 50 - 100}px, 0)`),
            opacity: spring.open.to([0, 1], [1, 0]),
            fontSize: '3.5rem',
            textAlign: 'center',
          }}
          className={`opacity-0 text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-700 font-semibold tracking-wide text-center ${redRose.className}`}
        >
          click
        </web.h1>

        {open && (
         <web.h2
  style={{
    position: 'absolute',
    top: '80px',
    left: 0,
    paddingLeft: '2rem',
    transform: skillSlideSpring.x.to((x) => `translateX(${x}%)`),
    opacity: skillSlideSpring.opacity,
  }}
  className={`text-transparent bg-clip-text bg-gradient-to-b text-3xl sm:text-4xl from-neutral-100 to-neutral-700 font-semibold tracking-wide text-center ${redRose.className}`}
>
  My Skills
</web.h2>

        )}
      </div>

      <div className="absolute inset-0 overflow-visible z-0">
        <CanvasScene
          open={open}
          setOpen={setOpen}
          hinge={spring.open.to([0, 1], [1.575, -0.425])}
          color={spring.open.to([0, 1], ['#f0f0f0', '#d25578'])}
          scrollAmount={scrollAmount}
          setScrollAmount={setScrollAmount}
        />
      </div>
    </web.main>
  )
}
