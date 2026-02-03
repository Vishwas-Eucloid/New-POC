// *********************
// Role of the component: SortBy
// Name of the component: SortBy.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (PostHog tracking added)
// *********************

"use client";

import React from "react";
import { useSortStore } from "@/app/_zustand/sortStore";
import posthog from "posthog-js";

const SortBy = () => {
  // getting values from Zustand sort store
  const { sortBy, changeSortBy } = useSortStore();

  const handleSortChange = (newSort: string) => {
    if (newSort !== sortBy) {
      posthog.capture("sort_changed", {
        from_sort: sortBy,
        to_sort: newSort,
        component: "SortBy",
      });
    }

    changeSortBy(newSort);
  };

  return (
    <div className="flex items-center gap-x-5 max-lg:flex-col max-lg:w-full max-lg:items-start">
      <h3 className="text-xl">Sort by:</h3>
      <select
        defaultValue={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
        className="select border-gray-400 py-2 px-2 text-base border-2 select-bordered w-40 focus:outline-none outline-none max-lg:w-full bg-white"
        name="sort"
      >
        <option value="defaultSort">Default</option>
        <option value="titleAsc">Sort A-Z</option>
        <option value="titleDesc">Sort Z-A</option>
        <option value="lowPrice">Lowest Price</option>
        <option value="highPrice">Highest Price</option>
      </select>
    </div>
  );
};

export default SortBy;
