import React from "react";
import Orb from "./Orb";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Threads from "./ui/Threads";
import Galaxy from "./ui/Galaxy";
import Particles from "./ui/Particless";

const Newsletter = () => {
  return (
    <div className="max-w-7xl mx-auto w-full min-h-[40vh] relative justify-center text-white space-y-5 items-center flex flex-col p-4">
      <div className="absolute inset-0 w-full h-full z-[0] ">
        {/* <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        /> */}
      </div>
      <div className="z-[10] flex flex-col justify-center items-center space-y-4">
        <h1 className="text-white text-xl font-semibold">Stay Ahead</h1>

        <p className="text-3xl font-semibold text-center">
          Get the latest insights on tech, AI, and digital transformation.
        </p>
        <div className="w-full max-w-sm md:max-w-[600px] flex md:flex-row flex-col items-center justify-center md:space-x-4 space-y-3 px-4">
          <Input
            type="email"
            className="md:py-8 py-4 w-full rounded-full"
            placeholder="Enter your email address"
          />
          <Button className="md:p-8 py-4 rounded-full bg-white text-black">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
