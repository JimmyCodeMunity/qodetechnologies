import React from "react";
import LiquidEther from "../components/LiquidEther";
import { Button } from "../components/ui/button";
import CircularGallery from "../components/CircularGallery";
import InfiniteScroll from "../components/InfiniteScroll";
import Hero from "../components/sections/Hero";
import GetStarted from "../components/sections/GetStarted";
import Languages from "../components/sections/Languages";
import Companies from "../components/sections/Companies";
import Services from "../components/sections/Services";
import MagicBento from "../components/sections/Features";
import SplashCursor from "../components/ui/SplashCursor";
import ScrollService from "../components/ScrollService";
import Newsletter from "../components/Newsletter";
import Footer from "../components/sections/Footer";
import { Faq } from "../components/sections/Faq";
import Workflow from "../components/WorkFlow";
import Testimonials from "../components/Testimonials";
import BentoGrid from "../components/kokonutui/bento-grid";
import { CodeType } from "../components/CodeType";
import { OrbitingCircles } from "../components/orbiting-circles";
import Orb from "../components/Orb";
import { OrbitingCircle } from "../components/ui/orbit";
import { IconCloudDemo } from "../components/ui/iccloud";
import AboutUs from "../components/about";
import { DottedMap } from "../components/ui/dotted-map";
const HomePage = () => {
  const texts = [
    "Mobile Development",
    "Web Development",
    "AI",
    "Cloud Computing",
  ];
  return (
    <div className="bg-black flex-1 w-full">
      <SplashCursor />
      <Hero />
      {/* <GetStarted /> */}
      <Languages />

      <Services />
      {/* <MagicBento />
      <Testimonials /> */}
      {/* <Companies /> */}
      {/* <ScrollService texts={texts} /> */}
      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
      <BentoGrid />
      <AboutUs />
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
