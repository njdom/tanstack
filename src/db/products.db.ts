import { createCollection } from '@tanstack/react-db'
import { queryCollectionOptions } from '@tanstack/query-db-collection'
import type { Product, ProductSchema } from '../types'
import { z } from 'zod'
import { QueryClient } from "@tanstack/query-core"
import { productsApi } from '@/lib/api/products.client'

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(),
  brand: z.string(),
  price: z.number(),
  originalPrice: z.number().optional(),
  image: z.string(),
  description: z.string().optional(),
  rating: z.number(),
  inStock: z.boolean(),
  badge: z.enum(['trending', 'new', 'sale', 'out-of-stock']).optional(),
})

const queryClient = new QueryClient()
export const productsCollection = createCollection(
  queryCollectionOptions({
    schema: productSchema,
    queryClient: queryClient,
    getKey: (product) => product.id,
    queryFn: async () => {
      const products = await productsApi.getAll()
      return products as ProductSchema[]
    },
    queryKey: ['products', 'all'],
    onInsert: async ({ transaction }) => {
      transaction.mutations.map((m) => {
        productsApi.create(m.modified)
      })
    }
  })
)

export const productFilters = {
  bySearchTerm: (searchTerm: string) => (product: Product) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      false
    )
  },

  byCategory: (category: string) => (product: Product) => {
    if (!category) return true
    return product.category === category
  },

  byBrand: (brand: string) => (product: Product) => {
    if (!brand) return true
    return product.brand === brand
  },

  byPriceRange: (min: number, max: number) => (product: Product) => {
    return product.price >= min && product.price <= max
  },

  inStock: (product: Product) => product.inStock,

  byBadge: (badge: Product['badge']) => (product: Product) => {
    if (!badge) return true
    return product.badge === badge
  },
}

export const productSorters = {
  byPriceAsc: (a: Product, b: Product) => a.price - b.price,
  byPriceDesc: (a: Product, b: Product) => b.price - a.price,
  byName: (a: Product, b: Product) => a.name.localeCompare(b.name),
  byRating: (a: Product, b: Product) => b.rating - a.rating,
}
