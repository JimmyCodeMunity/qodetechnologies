import React from "react";
import SpotlightCard from "../ui/SpotlightCard";
import { PlusIcon, SparkleIcon } from "lucide-react";
import {
  SiAdobeillustrator,
  SiAndroid,
  SiAppstore,
  SiCodechef,
  SiGoogleclassroom,
  SiGoogleplay,
  SiHtml5,
  SiIos,
} from "react-icons/si";

const Services = () => {
  return (
    <div className="w-full h-full sm:px-16 px-6 py-6 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SpotlightCard
          className="custom-spotlight- h-[300px] w-full space-y-5 p-4 border-1 border-neutral-600"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <SiCodechef size={40} color="white" />
          <h1 className="text-white text-2xl font-semibold">
            Software Development
          </h1>
          <p className="text-white text-sm">
            We build custom software solutions for businesses of all sizes.
          </p>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight- h-[300px] w-full space-y-5 p-4 border-1 border-neutral-600"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <SiHtml5 size={40} color="white" />
          <h1 className="text-white text-2xl font-semibold">Web Development</h1>
          <p className="text-white text-sm">
            {/* web development context */}
            We build custom software solutions for businesses of all sizes.
          </p>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight- h-[300px] w-full space-y-5 p-4 border-1 border-neutral-600"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <div className="flex flex-row items-center">
            <SiIos size={40} color="white" />
            <PlusIcon size={40} color="white" />
            <SiAndroid size={40} color="white" />
          </div>
          <h1 className="text-white text-2xl font-semibold">
            Mobile Development
          </h1>
          <p className="text-white text-sm">
            We build custom mobile applications (ios || Android).
          </p>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight- h-[300px] w-full space-y-5 p-4 border-1 border-neutral-600"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <SiAdobeillustrator size={40} color="white" />
          <h1 className="text-white text-2xl font-semibold">Ai & Automation</h1>
          <p className="text-white text-sm">
            We build custom mobile applications (ios || Android).
          </p>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight- h-[300px] w-full space-y-5 p-4 border-1 border-neutral-600"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <div className="flex flex-row items-center space-x-2">
            <SiAppstore size={40} color="white" />
            <PlusIcon size={40} color="white" />
            <SiGoogleplay size={40} color="white" />
          </div>
          <h1 className="text-white text-2xl font-semibold">App Deployment</h1>
          <p className="text-white text-sm">
            We build custom mobile applications (ios || Android).
          </p>
        </SpotlightCard>
        <SpotlightCard
          className="custom-spotlight- h-[300px] w-full space-y-5 p-4 border-1 border-neutral-600"
          spotlightColor="rgba(0, 229, 255, 0.2)"
        >
          <SiGoogleclassroom size={40} color="white" />
          <h1 className="text-white text-2xl font-semibold">
            Learn Programming
          </h1>
          <p className="text-white text-sm">
            We build custom mobile applications (ios || Android).
          </p>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Services;
