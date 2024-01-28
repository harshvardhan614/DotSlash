/** @format */

import Navbar from "@/components/homeComponents/Navbar";
import Hero from "@/components/homeComponents/Hero";
import CardContainer from "@/components/homeComponents/CardContainer";
import Testimonials from "@/components/homeComponents/Testimonials";
import Features from "@/components/homeComponents/Features";
import Footer from "@/components/homeComponents/Footer";

export default function Home() {
  

  return (
    <>
      <Navbar />
      <Hero/>
      <Features/>
      <CardContainer/>
      <Testimonials/>
      <Footer/>
    </>
  );
}