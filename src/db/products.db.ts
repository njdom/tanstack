import { createCollection } from '@tanstack/react-db';
import { queryCollectionOptions } from '@tanstack/query-db-collection';
import { type Product } from '../types';
import { productSchema } from '@/schemas';
import { QueryClient } from '@tanstack/query-core';
import { getAllProducts, createProduct, updateProduct } from '@/server/product.functions';

export const queryClient = new QueryClient();

export const PRODUCTS_QUERY_KEY = ['products', 'all'];

const collectionOptions = (enabled: boolean = false) =>
  queryCollectionOptions({
    schema: productSchema,
    queryClient: queryClient,
    getKey: (product: Product) => product._id,
    queryKey: PRODUCTS_QUERY_KEY,
    // Disable auto-fetch since we hydrate from SSR data
    enabled,
    staleTime: Infinity,
    
    queryFn: () => getAllProducts({ data: {} }),
    onInsert: async ({ transaction }) => {
      transaction.mutations.map((m) => {
        createProduct({ data: m.modified });
      });
    },
    onUpdate: async ({ transaction }) => {
      for (const mutation of transaction.mutations) {
        const { original, modified } = mutation;
        await updateProduct({ data: { _id: original._id, updates: modified, priceUpdateShouldFail: modified.priceUpdateShouldFail } });
      }
    },
    //onDelete: async ({ transaction }) => {
  });

export const productsCollection = createCollection(collectionOptions());
export const productsCollectionNoSSR = createCollection(collectionOptions(true));

export const productFilters = {
  bySearchTerm: (searchTerm: string) => (product: Product) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      false
    );
  },

  byCategory: (category: string) => (product: Product) => {
    if (!category) return true;
    return product.category === category;
  },

  byBrand: (brand: string) => (product: Product) => {
    if (!brand) return true;
    return product.brand === brand;
  },

  byPriceRange: (min: number, max: number) => (product: Product) => {
    return product.price >= min && product.price <= max;
  },

  inStock: (product: Product) => product.inStock,

  byBadge: (badge: Product['badge']) => (product: Product) => {
    if (!badge) return true;
    return product.badge === badge;
  },
};

export const productSorters = {
  byPriceAsc: (a: Product, b: Product) => a.price - b.price,
  byPriceDesc: (a: Product, b: Product) => b.price - a.price,
  byName: (a: Product, b: Product) => a.name.localeCompare(b.name),
  byRating: (a: Product, b: Product) => b.rating - a.rating,
};
