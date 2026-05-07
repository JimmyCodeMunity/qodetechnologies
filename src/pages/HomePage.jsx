import Hero from "../components/sections/Hero";
import Languages from "../components/sections/Languages";
import Services from "../components/sections/Services";
import MobileDevAd from "../components/sections/MobileDevAd";
import WebDevAd from "../components/sections/WebDevAd";
import WorkflowSection from "../components/sections/WorkflowSection";
import SplashCursor from "../components/ui/SplashCursor";
import Newsletter from "../components/Newsletter";
import Footer from "../components/sections/Footer";
import { Faq } from "../components/sections/Faq";
import BentoGrid from "../components/kokonutui/bento-grid";
import { DottedMap } from "../components/ui/dotted-map";
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
      {/* <CodeType /> */}
      <Footer />
    </div>
  );
};

export default HomePage;
