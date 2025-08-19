import Image from "next/image";
import Navbar from "./components/NavBar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";



export default function Home() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
   
    </>
  );
}
