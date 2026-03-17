import React from "react";

interface PriceRendererProps {
  price: number;
  discountedPrice?: number;
  hasDiscount?: boolean;
  discountType?: string;
  discountValue?: number;
  color?: string; // e.g. "black" or "white" depending on standard usage
  fontSize?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"; // simple scale to allow reuse in larger headings
}

const PriceRenderer = ({ price, discountedPrice, hasDiscount, discountType, discountValue, color = "black", fontSize = "lg" }: PriceRendererProps) => {
  // Determine standard coloring based on background passed
  const mainColorClass = color === "black" ? "text-black" : "text-white";
  
  // Dynamic font sizing
  const mainFontClass = `text-${fontSize}`;
  
  // Strike-through font is always one size smaller if possible, maxing out at 'lg' for aesthetics
  const smFontScale: Record<string, string> = {
    "sm": "text-xs",
    "base": "text-sm",
    "lg": "text-sm",
    "xl": "text-base",
    "2xl": "text-lg",
    "3xl": "text-xl",
  };
  const strikeFontClass = smFontScale[fontSize] || "text-sm";

  if (hasDiscount && discountedPrice !== undefined) {
    return (
      <div className="flex items-center gap-x-2 flex-wrap">
        <p className={`line-through text-gray-500 ${strikeFontClass}`}>
          ${price}
        </p>
        <div className="flex items-center gap-x-1.5">
          <p className={`${mainColorClass} ${mainFontClass} font-semibold`}>
            ${discountedPrice}
          </p>
          {discountType && discountValue !== undefined && (
            <span className="text-blue-600 text-sm font-semibold">
              {discountType === "PERCENTAGE" ? `-${discountValue}%` : `$${discountValue} OFF`}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Normal rendering if no discount
  return (
    <p className={`${mainColorClass} ${mainFontClass} font-semibold`}>
      ${price}
    </p>
  );
};

export default PriceRenderer;
