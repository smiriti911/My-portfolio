import Image from "next/image";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";

import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    
    <Hero/>
    <Skills />
    <About/>
   <Projects/>
   <Skills />
   <Contact/>
   <Footer/>
    </>
  );
}
