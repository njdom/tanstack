import type { Product, Deal, Category, TrendingProduct } from '../types'

export const allProducts: Product[] = [
  {
    id: 1,
    name: 'AeroShift Pro Mechanical Keyboard',
    category: 'Peripherals',
    brand: 'Apex Peripherals',
    price: 189,
    image: '/keyboard2.png',
    rating: 4.9,
    inStock: true,
    badge: 'trending',
  },
  {
    id: 2,
    name: 'Sonic-X Zero Latency Headset',
    category: 'Audio',
    brand: 'Nova Labs',
    price: 349,
    image: '/headphones2.png',
    rating: 4.8,
    inStock: true,
    badge: 'new',
  },
  {
    id: 3,
    name: 'GlidePoint Z Lightweight Mouse',
    category: 'Peripherals',
    brand: 'Quantum Gear',
    price: 99,
    originalPrice: 129,
    image: '/mouse2.png',
    rating: 5.0,
    inStock: true,
    badge: 'sale',
  },
  {
    id: 4,
    name: 'X-Core Portable Workstation',
    category: 'Computing',
    brand: 'Nova Labs',
    price: 2199,
    image: '/laptop.png',
    rating: 4.7,
    inStock: false,
    badge: 'out-of-stock',
  },
  {
    id: 5,
    name: 'Horizon Ultra-Wide 34"',
    category: 'Displays',
    brand: 'Ironclad',
    price: 849,
    image: '/screen.png',
    rating: 3.9,
    inStock: true,
  },
  {
    id: 6,
    name: 'Lux Glow Workspace Ambient',
    category: 'Accessories',
    brand: 'Nova Labs',
    price: 79,
    image: '/lamp.png',
    rating: 4.6,
    inStock: true,
  },
  {
    id: 7,
    name: 'CryoNode Liquid Cooler 360',
    category: 'Components',
    brand: 'Ironclad',
    price: 159,
    image: '/cooler.png',
    rating: 2.8,
    inStock: true,
  },
  {
    id: 8,
    name: 'Forge RTX High-Power GPU',
    category: 'Components',
    brand: 'Quantum Gear',
    price: 899,
    image: '/graphics.png',
    rating: 5.0,
    inStock: true,
  },
  // Featured products
  {
    id: 101,
    name: 'Quantum Pro Headphones',
    category: 'Audio',
    brand: 'Apex Peripherals',
    price: 299,
    image: '/headphones.png',
    description: 'Premium audio experience with neural sound processing',
    rating: 4.9,
    inStock: true,
  },
  {
    id: 102,
    name: 'Apex Smartwatch V2',
    category: 'Wearables',
    brand: 'Nova Labs',
    price: 199,
    image: '/clock.png',
    description: 'Advanced health tracking with AI insights',
    rating: 3.8,
    inStock: true,
  },
  {
    id: 103,
    name: 'Neural Link Glasses',
    category: 'Vision',
    brand: 'Quantum Gear',
    price: 450,
    image: '/glasses.png',
    description: 'Augmented reality meets everyday eyewear',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 104,
    name: 'Titan Gaming Mouse',
    category: 'Gaming',
    brand: 'Ironclad',
    price: 120,
    image: '/mouse.png',
    description: 'Precision gaming with customizable RGB',
    rating: 5.0,
    inStock: true,
  },
  // Trending products
  {
    id: 201,
    name: 'Holo-Pad Pro',
    category: 'Tech Wearables',
    brand: 'Quantum Gear',
    price: 199,
    image: '/holo.png',
    rating: 2.9,
    inStock: true,
  },
  {
    id: 202,
    name: 'Ghost Keys K1',
    category: 'Mechanical Keyboards',
    brand: 'Apex Peripherals',
    price: 199,
    image: '/keyboard.png',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 203,
    name: 'Neon Parka V3',
    category: 'Techwear Fashion',
    brand: 'Nova Labs',
    price: 199,
    image: '/hooded2.png',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 204,
    name: 'Studio Stream M1',
    category: 'Content Creation',
    brand: 'Ironclad',
    price: 199,
    image: '/micro.png',
    rating: 4.8,
    inStock: true,
  },
  // Cart products
  {
    id: 301,
    name: 'Quantum-X 34" Curved Monitor',
    category: 'Displays',
    brand: 'Quantum Gear',
    description: 'SKU: QX-34-DARKG | Neural-Sync Compatible',
    price: 899,
    image: '/screen2.png',
    rating: 4.9,
    inStock: true,
    badge: 'sale',
  },
  {
    id: 302,
    name: 'Haptic-Pro Mechanical Deck',
    category: 'Peripherals',
    brand: 'Apex Peripherals',
    description: 'Switches: Linear Neural | Aura RGB',
    price: 249,
    image: '/keyboard2.png',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 303,
    name: 'Sonic-Neural Studio Hub',
    category: 'Audio',
    brand: 'Nova Labs',
    description: 'ANC 3.0 | 48-bit High Fidelity',
    price: 399,
    image: '/headphones2.png',
    rating: 4.9,
    inStock: true,
  },
  // Recommended products
  {
    id: 401,
    name: 'Neural-Point X1',
    category: 'Peripherals',
    brand: 'Quantum Gear',
    price: 129,
    image: '/mouse3.png',
    description: 'Precision interface peripheral',
    rating: 4.9,
    inStock: true,
    badge: 'new',
  },
  {
    id: 402,
    name: 'Orbital Stand',
    category: 'Accessories',
    brand: 'Nova Labs',
    price: 75,
    image: '/headphones3.png',
    description: 'Magnetic headphone holster',
    rating: 4.8,
    inStock: true,
  },
  {
    id: 403,
    name: 'Hyper-Hub 12-in-1',
    category: 'Accessories',
    brand: 'Ironclad',
    price: 189,
    image: '/hub.png',
    description: 'Neural connectivity expansion',
    rating: 4.7,
    inStock: true,
  },
  {
    id: 404,
    name: 'Lumina Pro Lightbar',
    category: 'Accessories',
    brand: 'Nova Labs',
    price: 59,
    image: '/holo2.png',
    description: 'Eye-care neural lighting',
    rating: 4.6,
    inStock: true,
  },
]

// Featured products for homepage
export const featuredProducts: number[] = [101, 102, 103, 104]

export const categories: Category[] = [
  {
    id: '1',
    name: 'Neural Tech',
    description: 'Cutting edge hardware for deep work.',
    slug: 'neural-tech',
    image: '/chip.png',
  },
  {
    id: '2',
    name: 'Cyber-Chic',
    description: 'Style evolved for the digital age.',
    slug: 'cyber-chic',
    image: '/hooded1.png',
  },
  {
    id: '3',
    name: 'Home Core',
    description: 'Smart living, refined environments.',
    slug: 'home-core',
    image: '/shelf.png',
  },
]

// Trending products metadata
export const trendingProductsMetadata: Record<number, { matchPercentage: number; trendReason: string }> = {
  201: {
    matchPercentage: 98,
    trendReason: 'Trending in Tech Wearables this week.',
  },
  202: {
    matchPercentage: 95,
    trendReason: 'High demand in Mechanical Keyboards.',
  },
  203: {
    matchPercentage: 92,
    trendReason: 'Rising popularity in Techwear Fashion.',
  },
  204: {
    matchPercentage: 89,
    trendReason: 'Essentials for Content Creators.',
  },
}

export const trendingProducts: number[] = [201, 202, 203, 204]

export const deals: Deal[] = [
  {
    id: '1',
    productName: 'Cloud Core Server',
    description: 'Enterprise-grade storage for power users. Limited units remaining.',
    originalPrice: 799,
    salePrice: 499,
    discount: 35,
    endsIn: '04:22:10',
  },
  {
    id: '2',
    productName: 'Vertex 4K Monitor',
    description: 'OLED performance for professional creators. Pure color accuracy.',
    originalPrice: 1299,
    salePrice: 899,
    discount: 30,
    endsIn: '02:45:15',
  },
  {
    id: '3',
    productName: 'Sonic Pods Pro',
    description: 'Immersive spatial audio with adaptive noise cancellation.',
    originalPrice: 249,
    salePrice: 149,
    discount: 40,
    endsIn: '12:05:59',
  },
]

export const cartItemsData: Array<{ productId: number; quantity: number }> = [
  { productId: 301, quantity: 1 },
  { productId: 302, quantity: 1 },
  { productId: 303, quantity: 1 },
]

export const cartItems: number[] = [301, 302, 303]

export const recommendedProducts: number[] = [401, 402, 403, 404]

export const getProductById = (id: number): Product | undefined => {
  return allProducts.find(p => p.id === id)
}

export const getProductsByIds = (ids: number[]): Product[] => {
  return ids.map(id => getProductById(id)).filter((p): p is Product => p !== undefined)
}

export const getTrendingProducts = (): TrendingProduct[] => {
  return trendingProducts.map(id => {
    const product = getProductById(id)
    const metadata = trendingProductsMetadata[id]
    if (!product || !metadata) return null
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image,
      matchPercentage: metadata.matchPercentage,
      trendReason: metadata.trendReason,
    }
  }).filter((p): p is TrendingProduct => p !== null)
}
