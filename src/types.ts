import { z } from 'zod';

export interface PunkSong {
  id: number;
  name: string;
  artist: string;
}

export interface Todo {
  id: number;
  name: string;
}

export const productSchema = z.object({
  _id: z.string(),
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
});

export type Product = z.infer<typeof productSchema>;

export interface Deal {
  id: string;
  productName: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  endsIn: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
}

export interface TrendingProduct extends Omit<Product, 'brand' | 'inStock' | 'rating'> {
  matchPercentage: number;
  trendReason: string;
}

export interface CartItem {
  productId: Product['_id'];
  quantity: number;
}
