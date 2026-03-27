import { z } from "zod";

export const productSchema = z.object({
  _id: z.string(),
  name: z.string(),
  category: z.string(),
  brand: z.string(),
  price: z.number(),
  originalPrice: z.number().nullish(),
  image: z.string(),
  description: z.string().nullish(),
  rating: z.number(),
  inStock: z.boolean(),
  badge: z.enum(['trending', 'new', 'sale', 'out-of-stock']).nullish(),
  /** Client-only: demo flag for simulated server failure (not stored in Mongo). */
  priceUpdateShouldFail: z.boolean().optional(),
});

export const productFiltersSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  inStock: z.boolean().optional(),
});

export const productIdSchema = z.object({ id: z.string().min(1) });
export const createProductSchema = productSchema.omit({ _id: true });
export const updateProductSchema = z.object({
  _id: z.string().min(1),
  updates: productSchema.partial().omit({ _id: true }),
  priceUpdateShouldFail: z.boolean().optional(),
});