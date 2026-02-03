// *********************
// Role of the component: Filters on shop page
// Name of the component: Filters.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (PostHog tracking added)
// *********************

"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSortStore } from "@/app/_zustand/sortStore";
import { usePaginationStore } from "@/app/_zustand/paginationStore";
import posthog from "posthog-js";

interface InputCategory {
  inStock: { text: string; isChecked: boolean };
  outOfStock: { text: string; isChecked: boolean };
  priceFilter: { text: string; value: number };
  ratingFilter: { text: string; value: number };
}

const Filters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();

  const { page } = usePaginationStore();
  const { sortBy } = useSortStore();

  const [inputCategory, setInputCategory] = useState<InputCategory>({
    inStock: { text: "instock", isChecked: true },
    outOfStock: { text: "outofstock", isChecked: true },
    priceFilter: { text: "price", value: 3000 },
    ratingFilter: { text: "rating", value: 0 },
  });

  // Sync filters to URL (unchanged)
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("outOfStock", inputCategory.outOfStock.isChecked.toString());
    params.set("inStock", inputCategory.inStock.isChecked.toString());
    params.set("rating", inputCategory.ratingFilter.value.toString());
    params.set("price", inputCategory.priceFilter.value.toString());
    params.set("sort", sortBy);
    params.set("page", page.toString());
    replace(`${pathname}?${params}`);
  }, [inputCategory, sortBy, page]);

  return (
    <div>
      <h3 className="text-2xl mb-2">Filters</h3>
      <div className="divider"></div>

      {/* Availability */}
      <div className="flex flex-col gap-y-1">
        <h3 className="text-xl mb-2">Availability</h3>

        <div className="form-control">
          <label className="cursor-pointer flex items-center">
            <input
              type="checkbox"
              checked={inputCategory.inStock.isChecked}
              onChange={() => {
                const newValue = !inputCategory.inStock.isChecked;

                setInputCategory({
                  ...inputCategory,
                  inStock: { text: "instock", isChecked: newValue },
                });

                posthog.capture("filter_changed", {
                  filter_type: "in_stock",
                  value: newValue,
                  component: "Filters",
                });
              }}
              className="checkbox"
            />
            <span className="label-text text-lg ml-2 text-black">
              In stock
            </span>
          </label>
        </div>

        <div className="form-control">
          <label className="cursor-pointer flex items-center">
            <input
              type="checkbox"
              checked={inputCategory.outOfStock.isChecked}
              onChange={() => {
                const newValue = !inputCategory.outOfStock.isChecked;

                setInputCategory({
                  ...inputCategory,
                  outOfStock: { text: "outofstock", isChecked: newValue },
                });

                posthog.capture("filter_changed", {
                  filter_type: "out_of_stock",
                  value: newValue,
                  component: "Filters",
                });
              }}
              className="checkbox"
            />
            <span className="label-text text-lg ml-2 text-black">
              Out of stock
            </span>
          </label>
        </div>
      </div>

      <div className="divider"></div>

      {/* Price */}
      <div className="flex flex-col gap-y-1">
        <h3 className="text-xl mb-2">Price</h3>
        <input
          type="range"
          min={0}
          max={3000}
          step={10}
          value={inputCategory.priceFilter.value}
          className="range"
          onChange={(e) => {
            const value = Number(e.target.value);

            setInputCategory({
              ...inputCategory,
              priceFilter: { text: "price", value },
            });

            posthog.capture("filter_changed", {
              filter_type: "price",
              value,
              component: "Filters",
            });
          }}
        />
        <span>{`Max price: $${inputCategory.priceFilter.value}`}</span>
      </div>

      <div className="divider"></div>

      {/* Rating */}
      <div>
        <h3 className="text-xl mb-2">Minimum Rating:</h3>
        <input
          type="range"
          min={0}
          max={5}
          step={1}
          value={inputCategory.ratingFilter.value}
          onChange={(e) => {
            const value = Number(e.target.value);

            setInputCategory({
              ...inputCategory,
              ratingFilter: { text: "rating", value },
            });

            posthog.capture("filter_changed", {
              filter_type: "rating",
              value,
              component: "Filters",
            });
          }}
          className="range range-info"
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>0</span><span>1</span><span>2</span>
          <span>3</span><span>4</span><span>5</span>
        </div>
      </div>
    </div>
  );
};

export default Filters;
