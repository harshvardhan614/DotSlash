/** @format */

import Navbar from "@/components/homeComponents/Navbar";
import Hero from "./homeComponents/Hero";
import CardContainer from "./homeComponents/CardContainer";
import Testimonials from "./homeComponents/Testimonials";
import Features from "./homeComponents/Features";
import Footer from "./homeComponents/Footer";

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