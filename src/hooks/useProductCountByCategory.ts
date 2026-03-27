import { count, useLiveQuery } from '@tanstack/react-db';
import { productsCollection } from '../db/products.db';

export function useProductCountByCategory() {
  const { data: categoryCounts } = useLiveQuery((q) =>
    q
      .from({ product: productsCollection })
      .groupBy(({ product }) => product.category)
      .select(({ product }) => ({
        category: product.category,
        total: count(product._id),
      })),
  );

  return categoryCounts ?? [];
}
