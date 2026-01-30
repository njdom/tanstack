import { createLiveQueryCollection, eq, gte, ilike, inArray, lte, useLiveQuery } from '@tanstack/react-db';
import { useStore } from '@tanstack/react-store';
import { PRODUCTS_QUERY_KEY, productsCollection, queryClient } from '../db/products.db';
import { hasActiveFilters, searchStore } from '../store/search.store';
import { Product } from '@/types';
import { useEffect } from 'react';

export function useProductSearch(initialProducts: Product[]) {
  const searchState = useStore(searchStore);

  useEffect(() => {
    queryClient.setQueryData(PRODUCTS_QUERY_KEY, initialProducts);
  }, []);

  const query = useLiveQuery(
    (q) => {
      let query = q.from({ product: productsCollection });
      if (searchState.searchTerm)
        query = query.where(({ product }) => ilike(product.name, `%${searchState.searchTerm}%`));
      if (searchState.selectedCategory)
        query = query.where(({ product }) => eq(product.category, searchState.selectedCategory));
      if (searchState.selectedBrands.length > 0)
        query = query.where(({ product }) => inArray(product.brand, searchState.selectedBrands));
      if (searchState.priceRange.min)
        query = query.where(({ product }) => gte(product.price, searchState.priceRange.min));
      if (searchState.priceRange.max)
        query = query.where(({ product }) => lte(product.price, searchState.priceRange.max));
      if (!searchState.showOutOfStock) query = query.where(({ product }) => eq(product.inStock, true));
      if (searchState.minRating) query = query.where(({ product }) => gte(product.rating, searchState.minRating));
      if (searchState.sortBy) {
        if (searchState.sortBy === 'priceAsc') query = query.orderBy(({ product }) => product.price, 'asc');
        else if (searchState.sortBy === 'priceDesc') query = query.orderBy(({ product }) => product.price, 'desc');
        else if (searchState.sortBy === 'rating') query = query.orderBy(({ product }) => product.rating, 'desc');
        else if (searchState.sortBy === 'name') query = query.orderBy(({ product }) => product.name);
      }
      return query;
    },
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

export function useProductCategories() {
  const categories = createLiveQueryCollection((q) => {
    return q
      .from({ product: productsCollection })
      .select(({ product }) => product.category)
      .distinct();
  });
  return categories;
}

export function useProductBrands() {
  const brands = createLiveQueryCollection((q) => {
    return q
      .from({ product: productsCollection })
      .select(({ product }) => ({ brand: product.brand }))
      .distinct();
  });
  return brands;
}

export function useProducts(ids: Product['_id'][]) {
  const { data: products, isLoading } = useLiveQuery(
    (q) => q.from({ products: productsCollection }).where(({ products }) => inArray(products._id, ids)),
    [ids],
  );

  return {
    products,
    isLoading,
  };
}
