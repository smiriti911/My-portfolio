"use client"
import React from 'react'

import { useEffect, useState } from 'react'
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards'
import { FaAws, FaGitAlt, FaGithub, FaNodeJs, FaReact } from 'react-icons/fa'
import { SiExpress, SiMongodb, SiTailwindcss } from 'react-icons/si'
import { VscAzure } from 'react-icons/vsc'

const Skills = () => {
  return (
    <div className="rounded-md flex bg-white dark:bg-neutral-950 items-center justify-center relative overflow-hidden text-neutral-200/50 sm:mt-20 ">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  )
}
const testimonials = [
  {
    
    name: <SiMongodb/>,
   id:"3",
  },
  
  {
    
    name: <SiExpress/>,
    id:"4",
  },
  {
    name:<FaReact/>,
    id:"1",
  },
  {
    
    name: <FaNodeJs/>,
    id:"2",
  },
  
  {
    
    name: <SiTailwindcss/>,
    id:"5",
    
  },

  {
    
    name: <FaAws/>,
    id:"6",
    
  },

  {
    
    name: <VscAzure/>,
    id:"7",
    
  },

  {
    
    name: <FaGitAlt/>,
    id:"8",
    
  },

  {
    
    name: <FaGithub/>,
    id:"9",
    
  },
];
export default Skills