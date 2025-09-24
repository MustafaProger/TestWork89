import { Product } from "@/types/product";
import { api } from "./http";
import { LimitSelect } from "@/types/limitSelect";

type GetProductsResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};

export async function getProducts(params: LimitSelect) {
  const { limit, select } = params;

  const query = {
    ...(limit ? { limit } : {}),
    ...(select && select.length ? { select: select.join(",") } : {}),
  };

  const res = await api.get<GetProductsResponse>("/products", { params: query });

  return { products: res.data.products };
}
