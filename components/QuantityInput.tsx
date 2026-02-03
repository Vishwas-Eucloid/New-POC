// *********************
// Role of the component: Quantity input for incrementing and decrementing product quantity on the single product page
// Name of the component: QuantityInput.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (PostHog tracking added)
// *********************

"use client";

import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import posthog from "posthog-js";

interface QuantityInputProps {
  quantityCount: number;
  setQuantityCount: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityInput = ({
  quantityCount,
  setQuantityCount,
}: QuantityInputProps) => {
  const handleQuantityChange = (actionName: "plus" | "minus"): void => {
    if (actionName === "plus") {
      const newValue = quantityCount + 1;

      posthog.capture("quantity_changed", {
        action: "increment",
        from_quantity: quantityCount,
        to_quantity: newValue,
        component: "QuantityInput",
      });

      setQuantityCount(newValue);
    } else if (actionName === "minus" && quantityCount !== 1) {
      const newValue = quantityCount - 1;

      posthog.capture("quantity_changed", {
        action: "decrement",
        from_quantity: quantityCount,
        to_quantity: newValue,
        component: "QuantityInput",
      });

      setQuantityCount(newValue);
    }
  };

  return (
    <div className="flex items-center gap-x-4 max-[500px]:justify-center">
      <p className="text-xl">Quantity: </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex justify-center items-center border"
          onClick={() => handleQuantityChange("minus")}
        >
          <FaMinus />
        </button>

        <input
          type="number"
          id="Quantity"
          disabled={true}
          value={quantityCount}
          className="h-10 w-24 rounded border-gray-200 sm:text-sm"
        />

        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex justify-center items-center border"
          onClick={() => handleQuantityChange("plus")}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
