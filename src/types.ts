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
  id: string
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