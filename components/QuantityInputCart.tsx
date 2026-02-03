// *********************
// Role of the component: Quantity input for incrementing and decrementing product quantity on the cart page
// Name of the component: QuantityInputCart.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (PostHog tracking added)
// *********************

"use client";

import { ProductInCart, useProductStore } from "@/app/_zustand/store";
import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import posthog from "posthog-js";

const QuantityInputCart = ({ product }: { product: ProductInCart }) => {
  const [quantityCount, setQuantityCount] = useState<number>(product.amount);
  const { updateCartAmount, calculateTotals } = useProductStore();

  const handleQuantityChange = (actionName: "plus" | "minus"): void => {
    if (actionName === "plus") {
      const newValue = quantityCount + 1;

      posthog.capture("cart_quantity_changed", {
        action: "increment",
        from_quantity: quantityCount,
        to_quantity: newValue,
        product_id: product.id,
        product_name: product.title,
        price: product.price,
        component: "QuantityInputCart",
      });

      setQuantityCount(newValue);
      updateCartAmount(product.id, newValue);
      calculateTotals();
    } else if (actionName === "minus" && quantityCount !== 1) {
      const newValue = quantityCount - 1;

      posthog.capture("cart_quantity_changed", {
        action: "decrement",
        from_quantity: quantityCount,
        to_quantity: newValue,
        product_id: product.id,
        product_name: product.title,
        price: product.price,
        component: "QuantityInputCart",
      });

      setQuantityCount(newValue);
      updateCartAmount(product.id, newValue);
      calculateTotals();
    }
  };

  return (
    <div>
      <label htmlFor="Quantity" className="sr-only">
        Quantity
      </label>

      <div className="flex items-center justify-center rounded border border-gray-200 w-32">
        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex items-center justify-center"
          onClick={() => handleQuantityChange("minus")}
        >
          <FaMinus />
        </button>

        <input
          type="number"
          id="Quantity"
          disabled={true}
          value={quantityCount}
          className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex items-center justify-center"
          onClick={() => handleQuantityChange("plus")}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantityInputCart;
