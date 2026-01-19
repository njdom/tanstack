import { createFileRoute } from '@tanstack/react-router'
import { ProductCard } from '../components/ProductCard'
import { DealCard } from '../components/DealCard'
import { TrendingCard } from '../components/TrendingCard'
import { CategoryCard } from '../components/CategoryCard'
import { ShopHeader } from '../components/ShopHeader'
import { ShopFooter } from '../components/ShopFooter'
import {
  featuredProducts,
  categories,
  trendingProducts,
  deals,
} from '../data/shop'

export const Route = createFileRoute('/')({
  component: Homepage,
  // Full SSR - loader runs on server and data is included in HTML
  loader: async () => {
    // Simulating server-side data fetching
    // In a real app, this would fetch from a database or API
    return {
      featuredProducts,
      categories,
      trendingProducts,
      deals,
    }
  },
})

function Homepage() {
  const { featuredProducts, categories, trendingProducts, deals } = Route.useLoaderData()

  return (
    <div className="dark bg-[#0d1217] text-white min-h-screen overflow-x-hidden font-['Space_Grotesk']">
      <ShopHeader />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="relative mb-16">
          <div className="relative h-[600px] w-full rounded-xl overflow-hidden group">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(13, 18, 23, 0.9) 20%, transparent 80%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPyFVxHoVyiIX1GUYnoB1ig5-86TmqCWg3FbY6nVA1gXmwMQMsg9hq4jFmLv0pp3qdn7WD4zLcIr6C3QswX0Cw8U_XByXyaI-kyfzKFuQ5YUnoNUipUQP7BVNYKTRZ8TSKeaP_95RJpHNnBmSKIyzd-n7HjniEQYLZDJ4ofjMg3ckUO4X_uodDIsFN0e9JiU_sZvxrsDOCuYjcw98euNVkaCQinerJawyMaQd1jeS1q290eC9mbd2x2AuUony78E-zCk7ROkhHE90')",
              }}
            />
            <div className="relative h-full flex flex-col justify-center px-16 max-w-2xl gap-6">
              <div className="inline-flex items-center gap-2 bg-[#00a388]/20 text-[#00a388] border border-[#00a388]/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest w-fit">
                <span className="material-symbols-outlined text-sm">bolt</span> New Arrival
              </div>
              <h1 className="text-6xl font-bold leading-tight tracking-tighter">
                ELEVATE YOUR <br />
                <span className="text-[#00a388] italic">REALITY.</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Experience high-performance gear engineered for the next generation. AI-driven
                personalization meets premium industrial design.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <button className="bg-[#00a388] hover:bg-[#00a388]/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg shadow-[#00a388]/25">
                  Explore Collection
                </button>
                <button className="bg-white/10 hover:bg-white/20 border border-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-8 px-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
              <p className="text-slate-400 mt-1">Curated selections from our expert lab</p>
            </div>
            <a
              className="text-[#00a388] font-semibold flex items-center gap-1 hover:underline"
              href="#"
            >
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Category Highlights (Bento Grid) */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold tracking-tight mb-8 px-2">Category Highlights</h2>
          <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[600px]">
            {/* Electronics - Large */}
            <CategoryCard
              category={categories[0]}
              size="large"
              className="col-span-12 md:col-span-7 row-span-2"
            />
            {/* Fashion - Small */}
            <CategoryCard
              category={categories[1]}
              size="small"
              className="col-span-12 md:col-span-5 row-span-1"
            />
            {/* Home - Small */}
            <CategoryCard
              category={categories[2]}
              size="small"
              className="col-span-12 md:col-span-5 row-span-1"
            />
          </div>
        </section>

        {/* AI Trending Section */}
        <section className="mb-20 grid-bg p-12 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <span className="material-symbols-outlined text-9xl">auto_awesome</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-[#E6FF00] text-black font-black px-3 py-1 rounded-full text-xs uppercase italic tracking-tighter">
                AI Powered
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar">
              {trendingProducts.map((product) => (
                <TrendingCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Recent Deals */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Recent Deals</h2>
            <div className="h-px flex-1 bg-white/10"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>
      </main>

      <ShopFooter />
    </div>
  )
}
