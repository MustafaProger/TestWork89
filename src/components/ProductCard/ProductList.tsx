"use client";

import ProductCard from "./ProductCard";
import Loading from "../Loading/Loading";
import ErrorMessage from "../Error/Error";
import { getProducts } from "@/services/product";
import { useProductListStore } from "@/store/productList.store";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export default function ProductList() {
  const limit = useProductListStore((s) => s.limit);
  const select = useProductListStore((s) => s.select);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", { limit, select }],
    queryFn: () => getProducts({ limit, select }),
    staleTime: 30 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <Loading />;

  if (isError) return <ErrorMessage />;

  if (!data?.products?.length) {
    return (
      <div
        style={{
          fontSize: 34,
          height: "calc(100vh - 110px)",
          fontWeight: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        No products found
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "24px",
        width: "100%",
        padding: "20px 0",
        maxWidth: "var(--max-width)",
        margin: "0 auto",
      }}
    >
      {data?.products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
