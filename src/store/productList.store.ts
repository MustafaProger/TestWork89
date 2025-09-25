"use client";

import { LimitSelect } from "@/types/limitSelect";
import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export const useProductListStore = create<LimitSelect>()(
  devtools(
    () => ({
      limit: 12,
      select: ["id", "title", "category", "price", "thumbnail"],
    }),
    { name: "product-list-store" },
  ),
);
