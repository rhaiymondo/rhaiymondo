import Nav from "@/components/nav/Nav";
import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Approach from "@/components/sections/Approach";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="bg-[#0a0a0a]">
        <Hero />
        <Work />
        <About />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
