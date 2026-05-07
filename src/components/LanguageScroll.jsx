import React from "react";
import InfiniteScroll from "./InfiniteScroll";
import { HomeIcon, Phone } from "lucide-react";
import { SiCoggle, SiHomeassistant } from "react-icons/si";

const LanguageScroll = () => {
  const items = [
    {
      content: (
        <div className="flex flex-row items-center space-x-3">
          <SiHomeassistant color="orange" size={25} />
          <p className="text-orange-500">Scalable</p>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-row items-center space-x-3">
          <SiHomeassistant color="white" size={25} />
          <p className="text-white">Secure</p>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-row items-center space-x-3">
          <SiCoggle color="#84CC16" size={25} />
          <p className="text-lime-500">Efficient</p>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-row items-center space-x-3">
          <SiHomeassistant color="orange" size={25} />
          <p className="text-orange-500">Scalable</p>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-row items-center space-x-3">
          <SiHomeassistant color="white" size={25} />
          <p className="text-white">Secure</p>
        </div>
      ),
    },
    {
      content: (
        <div className="flex flex-row items-center space-x-3">
          <SiHomeassistant color="#84CC16" size={25} />
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
