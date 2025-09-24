import Image from "next/image";
import styles from "./ProductCard.module.scss";
import { Product } from "@/types/product";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const img = product.thumbnail ?? "/placeholder.png";

  return (
    <div className={styles.card}>
      <div className={styles.thumbnail}>
        <Image width={300} height={300} src={img} alt={product.title} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
