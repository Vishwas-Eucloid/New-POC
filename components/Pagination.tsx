// *********************
// Role of the component: Pagination for navigating the shop page
// Name of the component: Pagination.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (PostHog tracking added)
// *********************

"use client";

import { usePaginationStore } from "@/app/_zustand/paginationStore";
import React from "react";
import posthog from "posthog-js";

const Pagination = () => {
  const { page, incrementPage, decrementPage } = usePaginationStore();

  const handleNext = () => {
    posthog.capture("pagination_clicked", {
      direction: "next",
      from_page: page,
      to_page: page + 1,
      component: "Pagination",
    });

    incrementPage();
  };

  const handlePrevious = () => {
    posthog.capture("pagination_clicked", {
      direction: "previous",
      from_page: page,
      to_page: page - 1,
      component: "Pagination",
    });

    decrementPage();
  };

  return (
    <div className="join flex justify-center py-16">
      <button
        className="join-item btn btn-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500"
        onClick={handlePrevious}
      >
        «
      </button>

      <button className="join-item btn btn-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500">
        Page {page}
      </button>

      <button
        className="join-item btn btn-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500"
        onClick={handleNext}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
