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
            Future-proof your tech stack.
          </h1>
          <p className="text-neutral-500">
            Our engineers specialize in modern languages and frameworks — from React and Next.js to Python, Go, and AI/ML. We modernize legacy systems and build scalable architectures that grow with you.
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
