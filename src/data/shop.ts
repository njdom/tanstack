import type { Product, Deal, Category, TrendingProduct } from '../types'

export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Quantum Pro Headphones',
    category: 'Audio',
    price: 299,
    image: '/public/headphones.png',
    description: 'Premium audio experience with neural sound processing',
  },
  {
    id: '2',
    name: 'Apex Smartwatch V2',
    category: 'Wearables',
    price: 199,
    image: '/public/clock.png',
    description: 'Advanced health tracking with AI insights',
  },
  {
    id: '3',
    name: 'Neural Link Glasses',
    category: 'Vision',
    price: 450,
    image: '/public/glasses.png',
    description: 'Augmented reality meets everyday eyewear',
  },
  {
    id: '4',
    name: 'Titan Gaming Mouse',
    category: 'Gaming',
    price: 120,
    image: '/public/mouse.png',
    description: 'Precision gaming with customizable RGB',
  },
]

export const categories: Category[] = [
  {
    id: '1',
    name: 'Neural Tech',
    description: 'Cutting edge hardware for deep work.',
    slug: 'neural-tech',
    image: '/public/chip.png',
  },
  {
    id: '2',
    name: 'Cyber-Chic',
    description: 'Style evolved for the digital age.',
    slug: 'cyber-chic',
    image: '/public/hooded1.png',
  },
  {
    id: '3',
    name: 'Home Core',
    description: 'Smart living, refined environments.',
    slug: 'home-core',
    image: '/public/shelf.png',
  },
]

export const trendingProducts: TrendingProduct[] = [
  {
    id: '1',
    name: 'Holo-Pad Pro',
    category: 'Tech Wearables',
    matchPercentage: 98,
    trendReason: 'Trending in Tech Wearables this week.',
    image: '/public/holo.png',
  },
  {
    id: '2',
    name: 'Ghost Keys K1',
    category: 'Mechanical Keyboards',
    matchPercentage: 95,
    trendReason: 'High demand in Mechanical Keyboards.',
    image: '/public/keyboard.png',
  },
  {
    id: '3',
    name: 'Neon Parka V3',
    category: 'Techwear Fashion',
    matchPercentage: 92,
    trendReason: 'Rising popularity in Techwear Fashion.',
    image: '/public/hooded2.png',
  },
  {
    id: '4',
    name: 'Studio Stream M1',
    category: 'Content Creation',
    matchPercentage: 89,
    trendReason: 'Essentials for Content Creators.',
    image: '/public/micro.png',
  },
]

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
