import { inArray, useLiveQuery } from '@tanstack/react-db';
import { productsCollection, productsCollectionNoSSR } from '../db/products.db';
import { Product } from '@/types';

export function useProducts(ids: Product['_id'][], withSSR: boolean = true) {
  const { data: products, isLoading } = useLiveQuery(
    (q) => q.from({ products: withSSR ? productsCollection : productsCollectionNoSSR }).where(({ products }) => inArray(products._id, ids)),
    [ids],
  );

  return {
    products,
    isLoading,
  };
}
