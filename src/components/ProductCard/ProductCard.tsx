import Image from "next/image";
import styles from "./ProductCard.module.scss";
import { Product } from "@/types/product";
import { useAuthStore } from "@/store/auth.store";

type Props = { product: Product };

export default function ProductCard({ product }: Props) {
  const img = product.thumbnail ?? "/globe.svg";

  const status = useAuthStore((s) => s.status);

  return (
    <div className={styles.product__wrapper}>
      <div className={styles.product__thumbnail}>
        <Image width={300} height={300} src={img} alt={product.title} />
      </div>
      <div className={styles.product__info}>
        <h3 className={styles.product__title}>{product.title}</h3>
        <p className={styles.product__category}>{product.category}</p>
        <p className={styles.product__price}>${product.price.toFixed(2)}</p>
        {status === 'authenticated' ? <button className={styles.product__btn}>Add to cart</button> : null}
      </div>
    </div>
  );
}
