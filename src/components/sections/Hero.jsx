import React from "react";
import { Compare } from "../ui/compare";
import Aurora from "../ui/Aurora";
import LiquidEther from "../LiquidEther";
import Hyperspeed from "../ui/Hyperspeed";
import Navbar from "../Navbar";
import TrueFocus from "../ui/TrueFocus";
import ServiceDialog from "../ui/ServiceDialog";
import { Button } from "../ui/button";

const Hero = () => {
  const CallServiceModal = () => {
    return <ServiceDialog />;
  };
  const items = [
    {
      label: "Company",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "About Us", href: "/about", ariaLabel: "About Qode" },
        { label: "Our Services", href: "/services", ariaLabel: "Our Services" },
        { label: "Blog", href: "/blog", ariaLabel: "Qode Blog" },
        { label: "Projects", href: "/projects", ariaLabel: "Our Projects" },
      ],
    },
    {
      label: "Services",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Web Development", href: "/services", ariaLabel: "Web Development" },
        { label: "Mobile Development", href: "/services", ariaLabel: "Mobile Development" },
        { label: "AI & Automation", href: "/services", ariaLabel: "AI Automation" },
      ],
    },
    {
      label: "Connect",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Contact Us", href: "/about", ariaLabel: "Contact Qode" },
        { label: "Twitter / X", href: "https://twitter.com", ariaLabel: "Twitter" },
        { label: "LinkedIn", href: "https://linkedin.com", ariaLabel: "LinkedIn" },
      ],
    },
  ];
  return (
    <div className="relative flex w-full flex-col items-center justify-center min-h-svh overflow-y-hidden overflow-x-hidden">
      <div className="absolute inset-0 w-full h-screen z-[0] ">
        <LiquidEther
          colors={["#5227FF", "#84CC16", "#84CC16"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
        {/* <Hyperspeed
          effectOptions={{
            onSpeedUp: () => {},
            onSlowDown: () => {},
            distortion: "turbulentDistortion",
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xffffff,
              brokenLines: 0xffffff,
              leftCars: [0x84cc16, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3,
            },
          }}
        /> */}
      </div>
      <section className="pt-8 w-full lg:pt-32 bg-transparent">
        <div className="w-full py-6">
          <Navbar
            logoAlt="Company Logo"
            items={items}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
          />
        </div>
        <div className="mx-auto md:mt-0 mt-8 max-w-7xl px-4 sm:px-6 lg:px-8 relative text-center z-10">
          <div className="border border-lime-500 p-1 w-auto max-w-60 mx-auto rounded-full flex items-center justify-between mb-4">
            <span className="font-inter text-xs font-medium text-white ml-3">
              Request For a Service
            </span>
            <a
              href="/login"
              className="w-8 h-8 rounded-full flex justify-center items-center bg-lime-600"
            >
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.83398 8.00019L12.9081 8.00019M9.75991 11.778L13.0925 8.44541C13.3023 8.23553 13.4073 8.13059 13.4073 8.00019C13.4073 7.86979 13.3023 7.76485 13.0925 7.55497L9.75991 4.22241"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
          <h1 className="max-w-3xl mx-auto text-center font-manrope font-bold text-4xl text-lime-500 mb-5 md:text-5xl lg:text-6xl leading-[50px]">
            <span className="text-orange-500">Engineer</span> the Future
            with{"  "}
            <span className="bg-gradient-to-r from-blue-600 via-lime-500 to-orange-500 bg-clip-text text-transparent">
              Qode{" "}
            </span>
          </h1>
          <p className="max-w-xl mx-auto text-center text-base md:text-lg font-normal leading-7 md:leading-8 text-gray-400 mb-9">
            End-to-end software engineering partner building scalable web apps, mobile platforms, AI systems, and cloud infrastructure for startups and enterprises.
          </p>
          <div className="text-center text-white mb-5">
            <TrueFocus
              sentence="Get Started"
              manualMode={false}
              blurAmount={5}
              borderColor="white"
              animationDuration={1}
              pauseBetweenAnimations={1}
              className="flex flex-row items-center"
            />
          </div>
          <div className="md:flex-row md:space-x-4 w-full mx-auto md:inline-flex flex-col items-center justify-center">
            {/* <Button
              href="javascript:;"
              className="w-full md:w-auto md:mb-14 mb-5 inline-flex items-center justify-center py-6 px-7 text-base font-semibold text-center text-white rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500"
            >
              Request A Service
              <svg
                className="ml-2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button> */}
            <ServiceDialog
              title="Request for a service"
              className="w-full md:w-auto md:mb-14 mb-5 inline-flex items-center justify-center py-6 px-7 text-base font-semibold text-center text-white rounded-full bg-lime-500 shadow-xs hover:bg-lime-600 transition-all duration-500"
            />
            <a
              href="/services"
              className="w-full md:w-auto mb-14 inline-flex items-center justify-center py-3 px-7 text-base font-semibold text-center text-white rounded-full border border-lime-500 bg-black text-white shadow-xs hover:bg-orange-500 transition-all duration-500"
            >
              View Services
              <svg
                className="ml-2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 15L11.0858 11.4142C11.7525 10.7475 12.0858 10.4142 12.0858 10C12.0858 9.58579 11.7525 9.25245 11.0858 8.58579L7.5 5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
          <div className="flex justify-center">
            <Compare className="rounded-t-3xl h-auto w-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
