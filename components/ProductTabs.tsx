// *********************
// Role of the component: Single product tabs on the single product page containing product description, main product info and reviews
// Name of the component: ProductTabs.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductTabs product={product} />
// Input parameters: { product: Product }
// Output: Single product tabs containing product description, main product info and reviews
// *********************

"use client";

import React, { useState } from "react";
// import RatingPercentElement from "./RatingPercentElement";
// import SingleReview from "./SingleReview";
import { formatCategoryName } from "@/utils/categoryFormating";
import { sanitize, sanitizeHtml } from "@/lib/sanitize";
import PriceRenderer from "./PriceRenderer";

const ProductTabs = ({ product }: { product: Product }) => {
  const [currentProductTab, setCurrentProductTab] = useState<number>(0);

  return (
    <div className="px-5 text-black">
      <div role="tablist" className="tabs tabs-bordered">
        <a
          role="tab"
          className={`tab text-lg text-black pb-8 max-[500px]:text-base max-[400px]:text-sm max-[370px]:text-xs ${currentProductTab === 0 && "tab-active"
            }`}
          onClick={() => setCurrentProductTab(0)}
        >
          Description
        </a>
        <a
          role="tab"
          className={`tab text-black text-lg pb-8 max-[500px]:text-base max-[400px]:text-sm max-[370px]:text-xs ${currentProductTab === 1 && "tab-active"
            }`}
          onClick={() => setCurrentProductTab(1)}
        >
          Additional info
        </a>
      </div>
      <div className="pt-5">
        {currentProductTab === 0 && (
          <div
            className="text-lg max-sm:text-base max-sm:text-sm"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(product?.description)
            }}
          />
        )}

        {currentProductTab === 1 && (
          <div className="overflow-x-auto">
            <table className="table text-xl text-center max-[500px]:text-base">
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>Manufacturer:</th>
                  <td>{sanitize(product?.manufacturer)}</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>Category:</th>
                  <td>
                    {product?.category?.name
                      ? sanitize(formatCategoryName(product?.category?.name))
                      : "No category"}
                  </td>
                </tr>
                {/* row 2.5 - Price */}
                <tr>
                  <th>Price:</th>
                  <td className="flex justify-center">
                    <PriceRenderer 
                      price={product?.price} 
                      discountedPrice={product?.discountedPrice} 
                      hasDiscount={product?.hasDiscount} 
                      fontSize="xl" 
                      color="black" 
                    />
                  </td>
                </tr>
                {(() => {
                  let attributes: { name: string; value: string }[] = [];
                  try {
                    const raw = (product as any)?.variant_attributes;
                    if (raw) {
                      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
                      if (Array.isArray(parsed)) {
                        attributes = parsed.map(attr => ({
                          name: String(attr.name || attr.key || ""),
                          value: String(attr.value || attr)
                        }));
                      } else if (typeof parsed === "object" && parsed !== null) {
                        attributes = Object.entries(parsed).map(([key, value]) => ({
                          name: key.charAt(0).toUpperCase() + key.slice(1),
                          value: String(value)
                        }));
                      }
                    }
                  } catch (e) {
                    console.error("Failed to parse variant_attributes", e);
                  }

                  return attributes.slice(0, 5).map((attr, index) => (
                    <tr key={`variant-attr-${index}`}>
                      <th>{sanitize(attr.name)}:</th>
                      <td>{sanitize(attr.value)}</td>
                    </tr>
                  ));
                })()}
                <tr>
                  <th>Rating:</th>
                  <td>
                    <div className="rating rating-sm">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <input
                          key={star}
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          checked={Math.round(product?.rating || 0) === star}
                          readOnly
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;