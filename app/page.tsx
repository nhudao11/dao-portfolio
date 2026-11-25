import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { AIWorkflow } from "@/components/sections/AIWorkflow";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { HowIWork } from "@/components/sections/HowIWork";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <AIWorkflow />
        <Experience />
        <Projects />
        <HowIWork />
        <Contact />
      </main>
    </>
  );
}
