import Image from "next/image";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import Projects from "./components/Projects";
import AboutMePanel from "./components/AboutMe";
import About from "./components/About";


export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
    <AboutMePanel/>
    <Projects/>
    </>
  );
}
