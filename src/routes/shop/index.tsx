import { createFileRoute } from '@tanstack/react-router'
import { ShopProductCard } from '../../components/ShopProductCard'
import { allProducts } from '../../data/shop'

export const Route = createFileRoute('/shop/')({
  component: ShopPage,
  // Data-Only SSR - server fetches data, client renders
  ssr: 'data-only',
  loader: async () => {
    // Simulate server-side data fetching
    // In a real app, this would fetch from database with filters/sorting
    return {
      products: allProducts,
      totalCount: allProducts.length,
    }
  },
})

function ShopPage() {
  const { products, totalCount } = Route.useLoaderData()

  return (
    <div className="dark bg-[#0d1217] text-white min-h-screen font-['Space_Grotesk']">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 lg:px-12 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="bg-[#00a388] p-1.5 rounded-lg shadow-[0_0_15px_rgba(0,163,136,0.4)]">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold tracking-tighter uppercase italic">TechStore</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
              <a className="hover:text-[#00a388] transition-colors" href="/">
                HOME
              </a>
              <a className="hover:text-[#00a388] transition-colors text-[#00a388]/80" href="#">
                SHOP
              </a>
              <a className="hover:text-[#00a388] transition-colors" href="#">
                CATEGORIES
              </a>
              <a className="hover:text-[#00a388] transition-colors" href="#">
                DEALS
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#00a388] text-xl">
                search
              </span>
              <input
                className="bg-[#161b22]/50 border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-[#00a388] focus:border-[#00a388] w-64 transition-all"
                placeholder="Search components..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-white/5 rounded-xl transition-colors relative">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#E6FF00] rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-white/5 rounded-xl transition-colors">
                <span className="material-symbols-outlined">person</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400">
          <a className="hover:text-[#00a388]" href="/">
            Home
          </a>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-white font-medium">Shop All Products</span>
        </div>

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
                <span className="material-symbols-outlined text-[#00a388]">tune</span> Filters
              </h3>
              <button className="text-xs text-slate-400 hover:text-[#00a388] underline uppercase tracking-tighter">
                Reset All
              </button>
            </div>

            {/* Brand Filter */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">Brand</h4>
              <div className="space-y-3">
                {['Quantum Gear', 'Nova Labs', 'Apex Peripherals', 'Ironclad'].map((brand) => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      className="rounded border-white/10 bg-white/5 text-[#00a388] focus:ring-[#00a388] w-5 h-5"
                      type="checkbox"
                      defaultChecked={brand === 'Quantum Gear' || brand === 'Apex Peripherals'}
                    />
                    <span className="text-sm group-hover:text-[#00a388] transition-colors">
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-6">
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">
                Price Range
              </h4>
              <div className="px-2">
                <div className="h-1 bg-white/10 rounded-full relative">
                  <div className="absolute left-1/4 right-1/4 h-full bg-[#00a388] rounded-full"></div>
                  <div className="absolute left-1/4 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#00a388] rounded-full shadow-[0_0_10px_rgba(0,163,136,0.5)] cursor-pointer"></div>
                  <div className="absolute right-1/4 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-2 border-[#00a388] rounded-full shadow-[0_0_10px_rgba(0,163,136,0.5)] cursor-pointer"></div>
                </div>
                <div className="flex justify-between mt-4 text-xs font-medium text-slate-400">
                  <span>$100</span>
                  <span>$2,500</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">
                Customer Rating
              </h4>
              <div className="space-y-2">
                {[4, 3].map((rating) => (
                  <div key={rating} className="flex items-center gap-2 cursor-pointer text-[#E6FF00] group">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-sm ${i < rating ? '' : 'opacity-30'}`}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400 group-hover:text-white">& up</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">
                Availability
              </h4>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm">In Stock Only</span>
                <div className="w-10 h-5 bg-[#00a388]/20 rounded-full relative border border-[#00a388]/30">
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#00a388] rounded-full"></div>
                </div>
              </label>
            </div>
          </aside>

          {/* Main Listing Area */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#161b22]/40 border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-6">
                <p className="text-sm font-medium">
                  <span className="text-[#00a388] font-bold">{totalCount}</span> results found
                </p>
                <div className="h-4 w-px bg-white/10"></div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 bg-[#00a388] rounded-lg text-white">
                    <span className="material-symbols-outlined text-[20px]">grid_view</span>
                  </button>
                  <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">view_list</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00a388]/10 border border-[#00a388]/20 rounded-full text-xs text-[#00a388] font-medium">
                    Brand: Apex{' '}
                    <span className="material-symbols-outlined text-xs cursor-pointer">close</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00a388]/10 border border-[#00a388]/20 rounded-full text-xs text-[#00a388] font-medium">
                    $200 - $800{' '}
                    <span className="material-symbols-outlined text-xs cursor-pointer">close</span>
                  </div>
                </div>
                <div className="relative group">
                  <button className="flex items-center gap-2 bg-[#161b22] border border-white/10 px-4 py-2 rounded-xl text-sm font-medium hover:border-[#00a388]/50 transition-colors">
                    Sort by: Newest{' '}
                    <span className="material-symbols-outlined text-xs">keyboard_arrow_down</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}

              {/* Featured Module */}
              <div className="col-span-1 sm:col-span-2 xl:col-span-4 bg-linear-to-r from-[#00a388]/10 to-[#E6FF00]/5 border border-[#00a388]/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 my-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a388]/20 blur-[100px] rounded-full -mr-20 -mt-20"></div>
                <div className="relative z-10 space-y-4 max-w-lg">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#00a388] fill-1">bolt</span>
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

      {/* Simple Footer */}
      <footer className="border-t border-white/5 py-12 mt-12 bg-[#161b22]/20">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#00a388]/20 p-1 rounded-lg">
              <svg
                className="w-5 h-5 text-[#00a388]"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold tracking-tighter uppercase italic">TechStore</h2>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a className="hover:text-[#00a388]" href="#">
              Privacy
            </a>
            <a className="hover:text-[#00a388]" href="#">
              Terms
            </a>
            <a className="hover:text-[#00a388]" href="#">
              Shipping
            </a>
            <a className="hover:text-[#00a388]" href="#">
              API
            </a>
          </div>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
            © 2024 TechStore Dynamics. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
