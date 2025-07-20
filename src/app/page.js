import Image from "next/image";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import BentoGrid from "./components/BentoGrid";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <BentoGrid/>
    <Skills/>
    </>
  );
}
