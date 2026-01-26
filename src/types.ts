import { z } from 'zod'
import { productSchema } from './db/products.db'

export interface PunkSong {
  id: number
  name: string
  artist: string
}

export interface Todo {
  id: number
  name: string
}

export interface Product {
  _id: any // MongoDB ObjectId
  id: number  // Todo: Remove this field
  name: string
  category: string
  brand: string
  price: number
  originalPrice?: number
  image: string
  description?: string
  rating: number
  inStock: boolean
  badge?: 'trending' | 'new' | 'sale' | 'out-of-stock'
}
export type ProductSchema = z.infer<typeof productSchema>


export interface Deal {
  id: string
  productName: string
  description: string
  originalPrice: number
  salePrice: number
  discount: number
  endsIn: string
}

export interface Category {
  id: string
  name: string
  description: string
  image: string
  slug: string
}

export interface TrendingProduct extends Omit<Product, 'brand' | 'inStock' | 'rating'> {
  matchPercentage: number
  trendReason: string
}

export interface CartItem {
  productId: Product['id']
  quantity: number
}