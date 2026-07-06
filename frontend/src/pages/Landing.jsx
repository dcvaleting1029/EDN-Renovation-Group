import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { CinematicScene } from "@/components/sections/CinematicScene";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Statistics } from "@/components/sections/Statistics";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { Showcase } from "@/components/sections/Showcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { IMAGES } from "@/data/site";

export default function Landing({ revealed }) {
  return (
    <main className="overflow-x-clip bg-edn-warm">
      <Navigation />
      <Hero revealed={revealed} />
      <Services />
      <CinematicScene
        image={IMAGES.scene1}
        eyebrow="The Living Spaces"
        title="Designed to be lived in. Built to endure."
      />
      <BeforeAfter />
      <Statistics />
      <Process />
      <Pricing />
      <Showcase />
      <Testimonials />
      <Gallery />
      <CinematicScene
        image={IMAGES.scene2}
        eyebrow="The Sanctuary"
        title="Where craftsmanship becomes calm."
      />
      <Contact />
      <Footer />
    </main>
  );
}
