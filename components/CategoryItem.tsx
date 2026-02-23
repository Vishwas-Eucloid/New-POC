// *********************
// Role of the component: Category Item that will display category icon, category name and link to the category
// Name of the component: CategoryItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (PostHog tracking added)
// *********************

"use client";

import Link from "next/link";
import React, { type ReactNode } from "react";
import posthog from "posthog-js";

interface CategoryItemProps {
  children: ReactNode;
  title: string;
  href: string;
}

const CategoryItem = ({ title, children, href }: CategoryItemProps) => {
  const handleCategoryClick = () => {
    posthog.capture("category_clicked", {
      category_name: title,
      destination: href,
      component: "CategoryItem",
    });
  };

  // derive slug from the href path so we can also include it as a query
  // parameter; this gives us a second source for the category when the
  // catch‑all param is ever dropped during navigation.
  const slug = href.split("/").filter(Boolean).pop() || "";

  return (
    <Link
      // object-form href lets us provide both pathname and query
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
