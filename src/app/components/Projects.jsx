"use client"
import React from 'react'
import { Red_Rose } from 'next/font/google'
import Image from 'next/image';
import { myProjects } from '@/constants';
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from 'react';
const redRose = Red_Rose({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const projectCount= myProjects.length;
const Projects = () => {


  const [selectedIndex, setSectectedIndex]= useState(0);
  const currentProject= myProjects[selectedIndex];

  const handleNavigation= (direction)=>{
    setSectectedIndex((prevIndex)=>{
      if(direction==='previous'){
          return prevIndex===0? projectCount-1: prevIndex-1;
      }else{
        return prevIndex===projectCount-1?0:prevIndex+1;
      }
    })
  }
  return (
    <section className='px-4 md:px-6 lg:px-8 my-30 max-w-7xl mx-auto'>
      <p className={`text-transparent bg-clip-text bg-gradient-to-b from-neutral-100 to-neutral-500 text-3xl sm:text-4xl font-semibold tracking-wide ${redRose.className}`}>
           My Work
      </p>

      <div className='grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full '>

        <div className='flex flex-col gap-5 relative sm:p-10 py-10 shadow-2xl shadow-black-200 bg-black rounded-xl px-6'>
          <div className='absolute top-0 right-0 '>
               <img src={currentProject.spotlight} alt='spotlight' className='w-full h-96 object-cover rounded-xl'></img>
          </div>
          <div className='p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg bg-stone-900/80 border border-stone-700'>
                  <img src={currentProject.logo} alt='logo' className='w-8 h-8 shadow-sm '></img>
          </div>
          <div className='flex flex-col gap-5 my-1'>
              <p className={`text-white text-lg sm:text-xl font-light tracking-wide ${redRose.className}`}>{currentProject.title}</p>
              <p className='text-white'>
                {currentProject.desc}
              </p>
               <p className='text-white'>
                {currentProject.subdesc}
              </p>
          </div>

          <div className='flex item-center justify-between flex-wrap gap-5'>
              <div className='flex items-center gap-3'>
                  {currentProject.tags.map((tag, index)=>(
                    <div key={index} className='tech-logo'>
                     <img src={tag.path} alt={tag.name} className='w-8 h-8'>
                     </img>
                    </div>
                  ))}
              </div>
              <a className='flex items-center gap-2 cursor-pointer text-white z-10 ' href={currentProject.href} target='_blank'rel='noreferrer'>
                <p>Check out live site</p>
                <FaExternalLinkAlt />
              </a>
          </div>
          <div className='flex justify-between items-center mt-7'>
             <button className='text-white bg-neutral-900 rounded-full p-2 cursor-pointer' onClick={()=> handleNavigation('previous')}>
                 <FaArrowLeft />
             </button>

              <button className='text-white bg-neutral-900 rounded-full p-2 cursor-pointer' onClick={()=> handleNavigation('next')} >
                 <FaArrowRight />
             </button>
          </div>
        </div>
    
      </div>
      </section>
  )
}

export default Projects