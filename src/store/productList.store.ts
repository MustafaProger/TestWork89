import { LimitSelect } from "@/types/limitSelect";
import { create } from "zustand";

export const useProductListStore = create<LimitSelect>(() => ({
  limit: 12,
  select: ["id", "title", "category", "price", "thumbnail"],
}));
