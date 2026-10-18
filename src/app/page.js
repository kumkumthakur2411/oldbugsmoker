import Navbar from "../_components/NavBar";
import Hero from "../_components/Hero";
import Content from "../_components/Content";
import Services from "../_components/Services";
import Project from "../_components/Project";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Content />
      <Services />
      <Project />
    </>
  );
}
