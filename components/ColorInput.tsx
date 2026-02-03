// *********************
// Role of the component: Color chooser on single product page component
// Name of the component: ColorInput.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (PostHog tracking added)
// *********************

"use client";

import React from "react";
import { FaCheck } from "react-icons/fa6";
import posthog from "posthog-js";

const ColorInput = () => {
  const handleColorClick = (color: string) => {
    posthog.capture("color_selected", {
      color,
      component: "ColorInput",
    });
  };

  return (
    <div className="flex flex-col gap-y-2 max-[500px]:items-center">
      <p className="text-xl">
        Color: <span className="text-lg font-normal">silver</span>
      </p>

      <div className="flex gap-x-1">
        <div
          className="bg-gray-400 w-10 h-10 rounded-full cursor-pointer flex justify-center items-center"
          onClick={() => handleColorClick("silver")}
        >
          <FaCheck className="text-black" />
        </div>

        <div
          className="bg-gray-500 w-10 h-10 rounded-full cursor-pointer"
          onClick={() => handleColorClick("dark_gray")}
        />

        <div
          className="bg-blue-500 w-10 h-10 rounded-full cursor-pointer"
          onClick={() => handleColorClick("blue")}
        />
      </div>
    </div>
  );
};

export default ColorInput;
