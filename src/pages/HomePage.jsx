import Hero from "../components/sections/Hero";
import Languages from "../components/sections/Languages";
import Services from "../components/sections/Services";
import MobileDevAd from "../components/sections/MobileDevAd";
import WebDevAd from "../components/sections/WebDevAd";
import ProjectsSection from "../components/sections/ProjectsSection";
import WorkflowSection from "../components/sections/WorkflowSection";
import SplashCursor from "../components/ui/SplashCursor";
import Newsletter from "../components/Newsletter";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/sections/Footer";
import { Faq } from "../components/sections/Faq";
import BentoGrid from "../components/kokonutui/bento-grid";
import { DottedMap } from "../components/ui/dotted-map";
import WhatsAppButton from "../components/WhatsAppButton";
const HomePage = () => {
  return (
    <div className="bg-black flex-1 w-full">
      <SplashCursor />
      <Hero />
      {/* <GetStarted /> */}
      <Languages />

      <Services />
      <WorkflowSection />
      <MobileDevAd />
      <WebDevAd />
      <ProjectsSection />
      {/* <MagicBento />
      <Testimonials /> */}
      {/* <Companies /> */}
      {/* <ScrollService texts={texts} /> */}

      <BentoGrid />
      <div className="relative h-[400px] w-full overflow-hidden">
        <DottedMap />
      </div>
      <Faq />

      <Newsletter />
      <ContactSection />
      {/* <CodeType /> */}
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default HomePage;
