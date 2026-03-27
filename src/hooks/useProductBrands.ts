import { createLiveQueryCollection } from '@tanstack/react-db';
import { productsCollection } from '../db/products.db';

export function useProductBrands() {
  const brands = createLiveQueryCollection((q) => {
    return q
      .from({ product: productsCollection })
      .select(({ product }) => ({ brand: product.brand }))
      .distinct();
  });
  return brands;
}
