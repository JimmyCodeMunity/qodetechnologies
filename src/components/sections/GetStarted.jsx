import React from "react";
import Threads from "../ui/Threads";
import Orb from "../Orb";

const GetStarted = () => {
  return (
    <div>
      <div className="w-full">
        <Orb
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
    </div>
  );
};

export default GetStarted;
