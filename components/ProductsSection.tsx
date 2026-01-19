// *********************
// Role of the component: products section intended to be on the home page
// Name of the component: ProductsSection.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductsSection slug={slug} />
// Input parameters: no input parameters
// Output: products grid
// *********************

import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";
import apiClient from "@/lib/api";

const ProductsSection = async () => {
  let products = [];
  
  try {
    // Fetch products for homepage - increase limit to show more products
    // Request multiple pages or use a higher limit parameter if supported
    // For now, fetch first 3 pages (36 products) to show more products on homepage
    const pagesToFetch = [1, 2, 3];
    const allProducts: any[] = [];
    
    for (const page of pagesToFetch) {
      const data = await apiClient.get(`/api/products?page=${page}`);
      
      if (data.ok) {
        const result = await data.json();
        if (Array.isArray(result) && result.length > 0) {
          allProducts.push(...result);
        } else {
          // If no products in this page, stop fetching more pages
          break;
        }
      }
    }
    
    // Remove duplicates (in case of any overlap) and limit to a reasonable number
    const uniqueProducts = Array.from(
      new Map(allProducts.map((p) => [p.id, p])).values()
    );
    products = uniqueProducts.slice(0, 48); // Show up to 48 products on homepage
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return (
    <div className="bg-blue-500 border-t-4 border-white">
      <div className="max-w-screen-2xl mx-auto pt-20">
        <Heading title="FEATURED PRODUCTS" />
        <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products.length > 0 ? (
            products.map((product: any) => (
              <ProductItem key={product.id} product={product} color="white" />
            ))
          ) : (
            <div className="col-span-full text-center text-white py-10">
              <p>No products available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsSection;
