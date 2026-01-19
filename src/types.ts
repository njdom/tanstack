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
  price: number
  image: string
  description?: string
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

export interface TrendingProduct {
  id: string
  name: string
  category: string
  matchPercentage: number
  trendReason: string
  image: string
}