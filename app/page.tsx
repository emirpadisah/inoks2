import SmoothScrollProvider from "@/components/animation/SmoothScrollProvider";
import Configurator from "@/components/sections/Configurator";
import FooterCTA from "@/components/sections/FooterCTA";
import Hero from "@/components/sections/Hero";
import CatalogDownload from "@/components/sections/CatalogDownload";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import ProductGrid from "@/components/sections/ProductGrid";
import Projects from "@/components/sections/Projects";
import SiteHeader from "@/components/sections/SiteHeader";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <SiteHeader />
      <main>
        <Hero />
        <ProductGrid />
        <Configurator />
        <Projects />
        <ProcessTimeline />
        <CatalogDownload />
        <FooterCTA />
      </main>
    </SmoothScrollProvider>
  );
}
