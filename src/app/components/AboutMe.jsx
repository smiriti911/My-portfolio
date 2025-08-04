'use client'

import React from 'react'
import { MagicCard } from '@/components/magicui/magic-card'
import { useMemo } from 'react'

import { FaMapMarkerAlt, FaGlobe, FaGraduationCap } from 'react-icons/fa'
import Image from 'next/image'
export default function AboutMePanel() {

  const badges = useMemo(() => [
    { icon: <FaMapMarkerAlt />, label: 'India' },
    { icon: <FaGlobe />, label: 'English & Hindi' },
    { icon: <FaGraduationCap />, label: 'Dr. A. P. J. Abdul Kalam Technical University' },
  ], [])


  return (
    <section className="px-4 md:px-6 lg:px-8 my-30 max-w-7xl mx-auto">
        <div className='grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full '>

             <MagicCard className="w-full p-4 flex flex-col rounded-2xl gap-4">
        <div className="flex justify-between items-start w-full">
          <div className="flex gap-4 items-center">
            <Image
              src="/avatar.png"
              width={140}
              height={148}
              alt="Smiriti"
              className="rounded-full"
            />
            <div className="flex flex-col gap-3">
              <div className="flex items-center bg-neutral-900 rounded-2xl relative pl-4">
                <span className="absolute h-2.5 w-2.5 rounded-full bg-green-500 opacity-90 animate-ping"></span>
                <span className="bg-green-500 h-2.5 w-2.5 text-xs z-10 animate-pulse rounded-full"></span>
                <span className="text-xs text-neutral-200 px-2 py-1.5 rounded-full font-sans font-light">
                  Available To Work
                </span>
              </div>
              <p className="text-sm text-neutral-400 font-sans font-light">
                I'm a{' '}
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

        <h2 className="text-neutral-200 text-2xl font-semibold tracking-wide my-1">
          About Me
        </h2>
        <ul className="list-inside text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl font-sans font-light space-y-2">
          <li>
            Passionate{' '}
            <span className="text-violet-300">Full Stack Developer</span> with a
            love for clean, scalable code and seamless user experiences.
          </li>
          <li>
            I blend <span className="text-violet-300">design and functionality</span> to
            craft interactive, user-centric web applications.
          </li>
          <li>
            Currently exploring the world of{' '}
            <span className="text-violet-300">AI</span>,{' '}
            <span className="text-violet-300">3D web</span> (React Three Fiber), and
            creative interfaces.
          </li>
          <li>
            Always learning, always building — with curiosity and attention to detail.
          </li>
          <li>
            Strong believer in thoughtful design systems, responsive architecture,
            and accessibility.
          </li>
        </ul>
      </MagicCard>
        </div>
       
    </section>
  
  )
}
