import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Statistics } from "@/components/sections/Statistics";
import { Process } from "@/components/sections/Process";
import { Showcase } from "@/components/sections/Showcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Landing({ revealed }) {
  return (
    <main className="overflow-x-clip bg-edn-warm">
      <Navigation />
      <Hero revealed={revealed} />
      <Services />
      <BeforeAfter />
      <Statistics />
      <Process />
      <Showcase />
      <Testimonials />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
