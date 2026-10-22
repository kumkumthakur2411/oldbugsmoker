import Navbar from "../_components/NavBar";
import Hero from "../_components/Hero";
import Content from "../_components/Content";
import Services from "../_components/Services";
import Project from "../_components/Project";
import Blog from "../_components/Blog";
import TestimonialsSection from "@/_components/TestimonialsSection";
import Footer from "../_components/Footer";
import Aboutus from "@/_components/Aboutus";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Content />
      <Services />
      <Aboutus />
      <TestimonialsSection />
      <Project />
      <Blog />
      <Footer />
    </>
  );
}
