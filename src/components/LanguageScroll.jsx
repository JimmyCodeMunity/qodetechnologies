import React from "react";
import InfiniteScroll from "./InfiniteScroll";
import { BrainCircuitIcon, CloudLightning, DatabaseBackupIcon, HomeIcon, Phone, RabbitIcon, ShieldCheckIcon } from "lucide-react";
import { SiCoggle, SiHomeassistant, SiHuggingface } from "react-icons/si";
import { GoDeviceMobile } from "react-icons/go";

const LanguageScroll = () => {
  const items = [
    {
      border: 'border-orange-500',
      content: (
        <div className="flex flex-row items-center space-x-3">
          <GoDeviceMobile color="orange" size={25} />
          <p className="text-orange-500">Responsive</p>
        </div>
      ),
    },
    {
      border: 'border-white',
      content: (
        <div className="flex flex-row items-center space-x-3">
          <SiHuggingface color="white" size={25} />
          <p className="text-white">Friendly</p>
        </div>
      ),
    },
    {
      border: 'border-orange-500',
      content: (
        <div className="flex flex-row items-center space-x-3">
          <CloudLightning color="#84CC16" size={25} />
          <p className="text-lime-500">Fast & Efficient</p>
        </div>
      ),
    },
    {
      border: 'border-lime-500',
      content: (
        <div className="flex flex-row items-center space-x-3">
          <DatabaseBackupIcon color="orange" size={25} />
          <p className="text-orange-500">Scalable</p>
        </div>
      ),
    },
    {
      border: 'border-orange-500',
      content: (
        <div className="flex flex-row items-center space-x-3">
          <ShieldCheckIcon color="white" size={25} />
          <p className="text-white">Secure</p>
        </div>
      ),
    },
    {
      border: 'border-lime-500',
      content: (
        <div className="flex flex-row items-center space-x-3">
          <BrainCircuitIcon color="#84CC16" size={25} />
          <p className="text-lime-500">Innovative</p>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="h-full relative">
        <InfiniteScroll
          items={items}
          isTilted={true}
          tiltDirection="left"
          autoplay={true}
          autoplaySpeed={2}
          autoplayDirection="up"
          pauseOnHover={true}
        />
      </div>
      ;
    </div>
  );
};

export default LanguageScroll;
