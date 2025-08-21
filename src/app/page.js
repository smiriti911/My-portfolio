import Image from "next/image";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About";

import Projects from "./components/Projects";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
   <Projects/>
    </>
  );
}
