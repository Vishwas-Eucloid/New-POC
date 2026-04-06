// *********************
// Role of the component: Pagination for navigating the shop page
// Name of the component: Pagination.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.2 (GTM dataLayer added)
// *********************

"use client";

import { usePaginationStore } from "@/app/_zustand/paginationStore";
import React from "react";
import posthog from "posthog-js";
import { useIsLoggedInValue, withIsLoggedIn } from "@/lib/posthog-auth";

const Pagination = () => {
  const { page, incrementPage, decrementPage, hasMore } = usePaginationStore();
  const isLoggedIn = useIsLoggedInValue();

  const handleNext = () => {
    const nextPayload = withIsLoggedIn({
      direction: "next",
      from_page: page,
      to_page: page + 1,
      component: "Pagination",
    }, isLoggedIn);

    posthog.capture("pagination_clicked", nextPayload);

    // 🔹 GTM dataLayer push (NEW)
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "pagination_clicked",
        ...nextPayload,
      });
    }

    incrementPage();
  };

  const handlePrevious = () => {
    const prevPayload = withIsLoggedIn({
      direction: "previous",
      from_page: page,
      to_page: page - 1,
      component: "Pagination",
    }, isLoggedIn);

    posthog.capture("pagination_clicked", prevPayload);

    // 🔹 GTM dataLayer push (NEW)
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "pagination_clicked",
        ...prevPayload,
      });
    }

    decrementPage();
  };

  return (
    <div className="join flex justify-center py-16">
      <button
        className="join-item btn btn-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500"
        onClick={handlePrevious}
        disabled={page === 1}
      >
        «
      </button>

      <button className="join-item btn btn-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500">
        Page {page}
      </button>

      {hasMore && (
        <button
          className="join-item btn btn-lg bg-blue-500 text-white hover:bg-white hover:text-blue-500"
          onClick={handleNext}
        >
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;