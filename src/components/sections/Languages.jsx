import React, { useState } from "react";
import LanguageScroll from "../LanguageScroll";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import ServiceDialog from "../ui/ServiceDialog";
import { AnimatedTooltipPreview } from "../ui/TeamTooltip";

const Languages = () => {
  return (
    <div className="w-full md:grid flex flex-col grid-cols-2 gap-4">
      <div className="w-full">
        <LanguageScroll />
      </div>
      <div className="w-full flex flex-col justify-center items-start p-4 space-y-6">
        <div className="max-w-[80%] space-y-6">
          <h1 className="text-white text-3xl font-semibold">
            Still using the old methods?
          </h1>
          <p className="text-neutral-500">
            We are a team of experts who are always ready to help you with your
            transition from analogue ways of doing things to a Digital
            Organization.
          </p>
          <AnimatedTooltipPreview />
          <ServiceDialog
            title="Request for a service"
            className="bg-lime-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Languages;
