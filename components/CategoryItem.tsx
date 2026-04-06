// *********************
// Role of the component: Category Item that will display category icon, category name and link to the category
// Name of the component: CategoryItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.2 (GTM dataLayer added)
// *********************

"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import posthog from "posthog-js";
import { useIsLoggedInValue, withIsLoggedIn } from "@/lib/posthog-auth";

interface CategoryItemProps {
  children: ReactNode;
  title: string;
  href: string;
}

const CategoryItem = ({ title, children, href }: CategoryItemProps) => {
  const isLoggedIn = useIsLoggedInValue();

  const handleCategoryClick = () => {
    const categoryPayload = withIsLoggedIn({
      category_name: title,
      destination: href,
      component: "CategoryItem",
    }, isLoggedIn);

    posthog.capture("category_clicked", categoryPayload);

    // 🔹 GTM dataLayer push (NEW)
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "category_clicked",
        ...categoryPayload,
      });
    }
  };

  const slug = href.split("/").filter(Boolean).pop() || "";

  return (
    <Link
      href={{
        pathname: href,
        query: { category: slug },
      }}
      onClick={handleCategoryClick}
    >
      <div className="flex flex-col items-center gap-y-2 cursor-pointer bg-white py-5 text-black hover:bg-gray-100">
        {children}
        <h3 className="font-semibold text-xl">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryItem;