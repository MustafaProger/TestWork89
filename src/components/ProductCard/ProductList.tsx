"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types/product";
import { getProducts } from "@/services/product";
import Loading from "../Loading/Loading";
import ErrorMessage from "../Error/Error";

export default function ProductList() {
  const [limit] = useState<number>(12);
  const [select] = useState<string[]>(["id", "title", "category", "price", "thumbnail"]);

  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(false);

        const { products } = await getProducts({ limit, select });
        setProducts(products);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [limit, select]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!products?.length) {
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
        padding: "20px",
        width: "100%",
        maxWidth: "var(--max-width)",
        margin: "0 auto",
      }}
    >
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
