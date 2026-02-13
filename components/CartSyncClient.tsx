"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useProductStore } from "@/app/_zustand/store";

export default function CartSyncClient() {
  const { data: session, status } = useSession();
  const products = useProductStore((s) => s.products);
  const clearCart = useProductStore((s) => s.clearCart);
  const addToCart = useProductStore((s) => s.addToCart);
  const calculateTotals = useProductStore((s) => s.calculateTotals);
  const syncedRef = useRef(false);

  useEffect(() => {
    // Run once when session becomes authenticated
    if (status === "authenticated" && !syncedRef.current) {
      syncedRef.current = true;
      (async () => {
        try {
          // Step 1: If user has local guest items, sync them to DB first
          if (products?.length) {
            const items = products.map((p) => ({
              productId: p.id,
              title: p.title,
              image: p.image,
              unitPrice: p.price,
              quantity: p.amount,
            }));

            await fetch("/api/cart", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ items }),
            });
          }

          // Step 2: Fetch the user's cart from DB and restore to Zustand store
          const cartRes = await fetch("/api/cart", { method: "GET" });
          const { cart } = await cartRes.json();

          if (cart?.items && cart.items.length > 0) {
            // Clear local Zustand store and repopulate from DB
            clearCart();
            cart.items.forEach((item: any) => {
              addToCart({
                id: item.productId || item.id,
                title: item.title,
                price: item.unitPrice,
                image: item.image,
                amount: item.quantity,
              });
            });
            // Ensure totals are recalculated
            calculateTotals();
          } else {
            // No items in DB cart; just clear local guest cart
            clearCart();
          }
        } catch (err) {
          console.error("Cart sync failed:", err);
          // On error, just clear guest cart; user's DB cart is still safe
        }
      })();
    }
  }, [status, addToCart, calculateTotals, clearCart, products?.length]);

  return null;
}
