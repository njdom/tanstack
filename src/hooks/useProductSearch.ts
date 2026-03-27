import { useLiveQuery } from '@tanstack/react-db';
import { useStore } from '@tanstack/react-store';
import { PRODUCTS_QUERY_KEY, queryClient as productsQueryClient } from '../db/products.db';
import { hasActiveFilters, searchStore } from '../store/search.store';
import { ProductQueryBuilder } from '../db/product.query.builder';
import { Product } from '@/types';
import { useEffect } from 'react';

export function useProductSearch(initialProducts: Product[]) {
  const searchState = useStore(searchStore);

  useEffect(() => {
    productsQueryClient.setQueryData(PRODUCTS_QUERY_KEY, initialProducts);
  }, []);

  const query = useLiveQuery(
    { query: new ProductQueryBuilder(searchState).build() },
    [
      searchState.searchTerm,
      searchState.selectedCategory,
      searchState.selectedBrands,
      searchState.priceRange,
      searchState.minRating,
      searchState.sortBy,
      searchState.showOutOfStock,
    ],
  );

  return {
    products: query.data ?? initialProducts ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    totalResults: query.data?.length ?? 0,
    hasResults: (query.data?.length ?? 0) > 0,

    searchTerm: searchState.searchTerm,
    hasActiveFilters: hasActiveFilters(),
  };
}
