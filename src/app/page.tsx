import ProductList from "@/components/ProductCard/ProductList";
import QueryProvider from "./providers/QueryProvider";

export default function Home() {
  return (
    <QueryProvider>
      <ProductList />
    </QueryProvider>
  );
}
