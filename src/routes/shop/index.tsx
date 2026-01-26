import { createFileRoute } from '@tanstack/react-router'
import { ShopProductCard } from '../../components/ShopProductCard'
import { ShopHeader } from '../../components/ShopHeader'
import { ShopFooter } from '../../components/ShopFooter'
import { RouterBreadcrumb } from '../../components/RouterBreadcrumb'
import { SlidersHorizontal, LayoutGrid, List, X, ChevronDown, Zap, Star, Loader2, Search } from 'lucide-react'
import { useProductSearch, useProductBrands } from '../../hooks/useProductSearch'
import { useStore } from '@tanstack/react-store'
import { searchStore, searchActions } from '../../store/search.store'
import type { Product } from '../../types'
// import { mongodb } from '@/server/mongodb'

export const Route = createFileRoute('/shop/')({
  component: ShopPage,
  staticData: {
    breadcrumb: [{ label: 'Home', path: '/' }, { label: 'Products' }],
  },
  // ssr: 'data-only',
  // loader: async () => {
  //   const products = await mongodb.getAllProducts()
  //   console.log("🚀 ~ products:", products)
  //   return { products }
  // },
})

function ShopPage() {
  // const loaderData = Route.useLoaderData()
  const { products, isLoading, totalResults, hasActiveFilters, searchTerm } = useProductSearch()
  const brands = useProductBrands()
  const searchState = useStore(searchStore)

  return (
    <div className="dark bg-[#0d1217] text-white min-h-screen font-['Space_Grotesk']">
      <ShopHeader />

      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
        <RouterBreadcrumb variant="shop" />

        {/* Hero Heading Area */}
        <div className="relative mb-12 p-8 rounded-3xl overflow-hidden bg-linear-to-br from-[#161b22] to-[#0d1217] border border-white/5">
          <div
            className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 70% 30%, #00a388 0%, transparent 70%)',
            }}
          ></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">
              Shop <span className="text-[#00a388]">All</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
              Uncompromising performance for the digital vanguard. Explore our curated selection
              of high-end hardware and peripherals.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal className="text-[#00a388]" size={20} /> Filters
              </h3>
              <button 
                onClick={() => searchActions.resetFilters()}
                disabled={!hasActiveFilters}
                className="text-xs text-slate-400 hover:text-[#00a388] underline uppercase tracking-tighter disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset All
              </button>
            </div>

            {/* Brand Filter */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">Brand</h4>
              <div className="space-y-3">
                {brands.map(({brand}) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="rounded border-white/10 bg-white/5 text-[#00a388] focus:ring-[#00a388] w-5 h-5"
                      type="radio"
                      name="brand"
                      checked={searchState.selectedBrand === brand}
                      onChange={() => searchActions.setBrand(brand)}
                    />
                    <span className="text-sm group-hover:text-[#00a388] transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
                {searchState.selectedBrand && (
                  <button
                    onClick={() => searchActions.setBrand('')}
                    className="text-xs text-slate-500 hover:text-[#00a388] underline"
                  >
                    Clear brand filter
                  </button>
                )}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">
                Price Range
              </h4>
              <div className="px-2">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Min: ${searchState.priceRange.min}</label>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="10"
                      value={searchState.priceRange.min}
                      onChange={(e) => searchActions.setPriceRange(Number(e.target.value), searchState.priceRange.max)}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#00a388] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#00a388] [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Max: ${searchState.priceRange.max}</label>
                    <input
                      type="range"
                      min="0"
                      max="3000"
                      step="10"
                      value={searchState.priceRange.max}
                      onChange={(e) => searchActions.setPriceRange(searchState.priceRange.min, Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#00a388] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#00a388] [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">
                Customer Rating
              </h4>
              <div className="space-y-2">
                {[4, 3, 2].map((rating) => (
                  <label key={rating} className="cursor-pointer group block">
                    <input
                      className="sr-only"
                      type="radio"
                      name="rating"
                      checked={searchState.minRating === rating}
                      onChange={() => searchActions.setMinRating(rating)}
                    />
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      searchState.minRating === rating 
                        ? 'bg-[#00a388]/20 border border-[#00a388]/50 shadow-[0_0_15px_rgba(0,163,136,0.2)]' 
                        : 'bg-transparent border border-transparent hover:bg-white/5'
                    }`}>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`transition-all ${
                              i < rating 
                                ? searchState.minRating === rating
                                  ? 'fill-[#E6FF00] text-[#E6FF00]'
                                  : 'fill-[#E6FF00]/70 text-[#E6FF00]/70'
                                : 'opacity-30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className={`text-xs transition-colors ${
                        searchState.minRating === rating
                          ? 'text-white font-medium'
                          : 'text-slate-400 group-hover:text-white'
                      }`}>
                      </span>
                    </div>
                  </label>
                ))}
                {searchState.minRating > 0 && (
                  <button
                    onClick={() => searchActions.setMinRating(0)}
                    className="text-xs text-slate-500 hover:text-[#00a388] underline mt-2"
                  >
                    Clear rating filter
                  </button>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">
                Availability
              </h4>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm">In Stock Only</span>
                <button
                  onClick={() => searchActions.toggleShowOutOfStock()}
                  className={`w-10 h-5 rounded-full relative border transition-colors ${
                    !searchState.showOutOfStock
                      ? 'bg-[#00a388]/20 border-[#00a388]/30'
                      : 'bg-white/10 border-white/20'
                  }`}
                >
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all ${
                      !searchState.showOutOfStock
                        ? 'right-1 bg-[#00a388]'
                        : 'left-1 bg-slate-400'
                    }`}
                  ></div>
                </button>
              </label>
            </div>
          </aside>

          {/* Main Listing Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#161b22]/40 border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-6">
                <p className="text-sm font-medium">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={16} />
                      Searching...
                    </span>
                  ) : (
                    <>
                      <span className="text-[#00a388] font-bold">{totalResults}</span> results
                      {searchTerm && (
                        <span className="text-slate-500"> for "{searchTerm}"</span>
                      )}
                    </>
                  )}
                </p>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 bg-[#00a388] rounded-lg text-white">
                    <LayoutGrid size={20} />
                  </button>
                  <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 transition-colors">
                    <List size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Active Filters */}
                <div className="flex gap-2">
                  {searchState.selectedBrand && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00a388]/10 border border-[#00a388]/20 rounded-full text-xs text-[#00a388] font-medium">
                      Brand: {searchState.selectedBrand}
                      <X 
                        size={12} 
                        className="cursor-pointer hover:text-white" 
                        onClick={() => searchActions.setBrand('')}
                      />
                    </div>
                  )}
                  {(searchState.priceRange.min > 0 || searchState.priceRange.max < 10000) && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00a388]/10 border border-[#00a388]/20 rounded-full text-xs text-[#00a388] font-medium">
                      ${searchState.priceRange.min} - ${searchState.priceRange.max}
                      <X 
                        size={12} 
                        className="cursor-pointer hover:text-white" 
                        onClick={() => searchActions.setPriceRange(0, 10000)}
                      />
                    </div>
                  )}
                  {searchState.minRating > 0 && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00a388]/10 border border-[#00a388]/20 rounded-full text-xs text-[#00a388] font-medium">
                      {searchState.minRating}★
                      <X 
                        size={12} 
                        className="cursor-pointer hover:text-white" 
                        onClick={() => searchActions.setMinRating(0)}
                      />
                    </div>
                  )}
                  {!searchState.showOutOfStock && (
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00a388]/10 border border-[#00a388]/20 rounded-full text-xs text-[#00a388] font-medium">
                      In Stock Only
                      <X 
                        size={12} 
                        className="cursor-pointer hover:text-white" 
                        onClick={() => searchActions.toggleShowOutOfStock()}
                      />
                    </div>
                  )}
                </div>
                <div className="relative group">
                  <select
                    value={searchState.sortBy}
                    onChange={(e) => searchActions.setSortBy(e.target.value as any)}
                    className="flex items-center gap-2 bg-[#161b22] border border-white/10 px-4 py-2 rounded-xl text-sm font-medium hover:border-[#00a388]/50 transition-colors cursor-pointer appearance-none pr-8"
                  >
                    <option value="name">Sort by: Name</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="rating">Rating</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div key={searchState.sortBy} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-[#161b22] border border-white/5 rounded-2xl p-4 animate-pulse">
                    <div className="aspect-square bg-white/5 rounded-lg mb-4"></div>
                    <div className="h-4 bg-white/5 rounded mb-2"></div>
                    <div className="h-3 bg-white/5 rounded w-2/3"></div>
                  </div>
                ))
              ) : products.length === 0 ? (
                // No results
                <div className="col-span-full text-center py-20">
                  <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="text-slate-600" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No products found</h3>
                  <p className="text-slate-500 mb-6">
                    Try adjusting your search or filters to find what you're looking for
                  </p>
                  <button
                    onClick={() => searchActions.resetFilters()}
                    className="px-6 py-3 bg-[#00a388] hover:bg-[#008f77] text-white font-bold rounded-xl transition-all"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                products.map((product) => (
                  <ShopProductCard key={`${searchState.sortBy}-${product.id}`} product={product as Product} />
                ))
              )}

              {/* Featured Module */}
              <div className="col-span-1 sm:col-span-2 xl:col-span-4 bg-linear-to-r from-[#00a388]/10 to-[#E6FF00]/5 border border-[#00a388]/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 my-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a388]/20 blur-[100px] rounded-full -mr-20 -mt-20"></div>
                <div className="relative z-10 space-y-4 max-w-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="text-[#00a388] fill-[#00a388]" size={16} />
                    <span className="text-xs font-bold text-[#00a388] uppercase tracking-[0.2em]">
                      AI Intelligence Best Value
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight">System Performance Bundle</h2>
                  <p className="text-slate-400">
                    Save 25% when you combine the AeroShift Pro Keyboard with the GlidePoint Z
                    Mouse. Limited time offer for the digital elite.
                  </p>
                  <button className="px-8 py-3 bg-[#00a388] text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,163,136,0.4)] transition-all">
                    Claim Bundle Deal
                  </button>
                </div>
                <div className="relative w-full md:w-1/2 aspect-video bg-[#161b22] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    className="w-full h-full object-cover"
                    alt="High-end PC setup with dual monitors"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlsLuRgSXMMbdtQpp3uX_dlGOxBdj-p8bYuiRsnxtmJ3iYmyJ4zHGWh-HWnHY6OUacYUfQ4ojlK9oSrszQgq_Tutfd0UvHGd3mNPuxlS9v4VdCSlkLU3hsF2vv4JivD9t0EaPt9LmSXPmA3tMpy1tgYp_QfMuXqwGAQQE1vSMVlJu51AYGkJ1kq6KrvJj4uk-Oe3EeLT2cmfzFgfbRxJMKdMwHH78NkX7h98CWRq6y-rPp3Gtlmitm1JdB2rrvgFXeK5VxInKzJKs"
                  />
                </div>
              </div>
            </div>

            {/* Infinite Scroll Loader */}
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="flex gap-1.5">
                <div className="w-2 h-6 bg-[#00a388]/20 rounded-full"></div>
                <div className="w-2 h-10 bg-[#00a388]/50 rounded-full animate-pulse"></div>
                <div className="w-2 h-14 bg-[#00a388] rounded-full"></div>
                <div className="w-2 h-10 bg-[#00a388]/50 rounded-full animate-pulse"></div>
                <div className="w-2 h-6 bg-[#00a388]/20 rounded-full"></div>
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Loading specialized gear...
              </p>
            </div>
          </div>
        </div>
      </main>

      <ShopFooter />
    </div>
  )
}
