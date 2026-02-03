// *********************
// Role of the component: Range input for price intended to be on the shop page
// Name of the component: Range.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (PostHog tracking added)
// *********************

"use client";

import React, { useState } from "react";
import posthog from "posthog-js";

interface RangeProps {
  min: number;
  max: number;
  priceValue: number;
  setInputCategory: any;
}

const Range = ({ min, max, priceValue, setInputCategory }: RangeProps) => {
  const [currentRangeValue, setCurrentRangeValue] =
    useState<number>(priceValue);

  const handleRange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseInt(e.target.value);

    posthog.capture("price_range_changed", {
      from_price: currentRangeValue,
      to_price: newValue,
      min,
      max,
      component: "Range",
    });

    setCurrentRangeValue(newValue);
  };

  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={priceValue}
        onChange={handleRange}
        className="range range-warning"
      />
      <span>{`Max price: $${currentRangeValue}`}</span>
    </div>
  );
};

export default Range;
