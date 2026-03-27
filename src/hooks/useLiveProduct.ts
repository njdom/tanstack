import { PRODUCTS_QUERY_KEY, productsCollection, queryClient } from '@/db/products.db';
import { Product } from '@/types';
import { Query, useLiveQuery, eq } from '@tanstack/react-db';
import { useEffect } from 'react';

export function useLiveProduct(product: Product) {
  useEffect(() => {
    const existing = queryClient.getQueryData<Product[]>(PRODUCTS_QUERY_KEY) ?? [];
    const hasProduct = existing.some((p) => p._id === product._id);
    if (!hasProduct) {
      queryClient.setQueryData(PRODUCTS_QUERY_KEY, [product, ...existing]);
    }
  }, [product]);

  const liveQuery = useLiveQuery(
    {
      query: new Query()
        .from({ product: productsCollection })
        .where(({ product: row }) => eq(row._id, product._id)),
    },
    [product._id],
  );

  return (liveQuery.data?.[0] ?? product) as Product;
}
