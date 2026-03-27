import { createLiveQueryCollection } from '@tanstack/react-db';
import { productsCollection } from '../db/products.db';

export function useProductCategories() {
  const categories = createLiveQueryCollection((q) => {
    return q
      .from({ product: productsCollection })
      .select(({ product }) => product.category)
      .distinct();
  });
  return categories;
}
