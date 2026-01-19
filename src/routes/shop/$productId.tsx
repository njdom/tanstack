import { createFileRoute } from '@tanstack/react-router'
import { ShopHeader } from '../../components/ShopHeader'
import { ShopFooter } from '../../components/ShopFooter'
import { allProducts } from '../../data/shop'

export const Route = createFileRoute('/shop/$productId')({
  component: ProductDetailPage,
  // Full SSR - Critical for SEO on product pages
  loader: async ({ params }) => {
    const product = allProducts.find((p) => p.id === params.productId)
    
    if (!product) throw new Error('Product not found')

    const similarProducts = allProducts
      .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
      .slice(0, 4)

    return { product, similarProducts }
  },
})

function ProductDetailPage() {
  const { product, similarProducts } = Route.useLoaderData()

  return (
    <div className="dark bg-[#0d1217] text-slate-100 min-h-screen font-['Space_Grotesk']">
      <ShopHeader />

      <main className="max-w-[1440px] mx-auto px-6 lg:px-20 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
          <a className="hover:text-[#00a388] transition-colors" href="/">
            Inventory
          </a>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <a className="hover:text-[#00a388] transition-colors" href="/shop">
            {product.category}
          </a>
          <span className="material-symbols-outlined text-[12px]">chevron_right</span>
          <span className="text-[#00a388]">{product.name}</span>
        </nav>

        {/* Product Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left: Image Gallery (Bento Style) */}
          <div className="lg:col-span-7 grid grid-cols-4 gap-4">
            <div className="col-span-4 aspect-4/3 rounded-2xl overflow-hidden bg-[#161c24] border border-white/5 relative group">
              <div className="absolute inset-0 bg-linear-to-t from-[#0d1217]/60 to-transparent"></div>
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={product.name}
                src={product.image}
              />
              <div className="absolute bottom-6 left-6 flex gap-2">
                {product.badge === 'new' && (
                  <span className="px-3 py-1 bg-[#00a388] text-white text-[10px] font-bold uppercase rounded-full">
                    New Arrival
                  </span>
                )}
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase rounded-full">
                  4K Quality
                </span>
              </div>
            </div>
            {/* Thumbnail images - repeat main image for demo */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl overflow-hidden border border-white/5 cursor-pointer hover:border-[#00a388]/50 transition-all ${i === 2 ? 'active-ring' : ''}`}
              >
                <img className="w-full h-full object-cover" alt={`${product.name} view ${i + 1}`} src={product.image} />
              </div>
            ))}
          </div>

          {/* Right: Product Information */}
          <div className="lg:col-span-5 flex flex-col gap-8 sticky top-28">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-[#e6ff00]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`material-symbols-outlined text-sm ${i < 4 ? 'fill-1' : ''}`}>
                      {i === 4 ? 'star_half' : 'star'}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  ({Math.floor(product.rating * 30)} Technical Audits)
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter mb-4 uppercase">
                {product.name.split(' ').slice(0, -1).join(' ')}
                <br />
                <span className="text-[#00a388]">{product.name.split(' ').slice(-1)}</span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                {product.description || 'The world\'s first decentralized processing unit designed for high-frequency data synthesis and creative automation.'}
              </p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-white tracking-tighter">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-slate-500 line-through text-lg">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-[#e6ff00] text-sm font-bold bg-[#e6ff00]/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% Early Bird
                  </span>
                </>
              )}
            </div>

            {/* Custom Selectors */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Core Configuration
                </span>
                <div className="flex flex-wrap gap-3">
                  <button className="px-6 py-3 rounded-lg border-2 border-[#00a388] bg-[#00a388]/10 text-white font-bold text-sm transition-all">
                    64GB VRAM
                  </button>
                  <button className="px-6 py-3 rounded-lg border-2 border-white/10 hover:border-white/20 text-slate-400 font-bold text-sm transition-all">
                    128GB VRAM
                  </button>
                  <button className="px-6 py-3 rounded-lg border-2 border-white/10 hover:border-white/20 text-slate-400 font-bold text-sm transition-all">
                    256GB VRAM
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Finish
                </span>
                <div className="flex gap-4">
                  <div className="size-10 rounded-full bg-[#0d1217] active-ring cursor-pointer border border-white/20"></div>
                  <div className="size-10 rounded-full bg-[#1e293b] cursor-pointer border border-white/20"></div>
                  <div className="size-10 rounded-full bg-[#334155] cursor-pointer border border-white/20"></div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <button className="flex-1 bg-[#00a388] hover:bg-[#008f77] text-white py-5 rounded-xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all active:scale-95 group">
                  <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
                    bolt
                  </span>
                  Initialize Order
                </button>
                <button className="p-5 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              {!product.inStock && (
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#e6ff00] uppercase tracking-widest bg-[#e6ff00]/5 p-3 rounded-lg border border-[#e6ff00]/20">
                  <span className="material-symbols-outlined text-sm">error</span>
                  Scarcity Alert: Only 2 units remaining in current batch.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <section className="border-t border-white/10 pt-16 mb-24">
          <div className="flex gap-12 border-b border-white/10 mb-12">
            <button className="pb-6 text-sm font-black uppercase tracking-widest border-b-2 border-[#00a388] text-white">
              Technical Specs
            </button>
            <button className="pb-6 text-sm font-black uppercase tracking-widest border-b-2 border-transparent text-slate-500 hover:text-white transition-colors">
              Integration Guide
            </button>
            <button className="pb-6 text-sm font-black uppercase tracking-widest border-b-2 border-transparent text-slate-500 hover:text-white transition-colors">
              User Experience ({product.rating})
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h3 className="text-3xl font-black uppercase tracking-tighter">System Architecture</h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Brand</p>
                  <p className="text-lg font-bold">{product.brand}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Category</p>
                  <p className="text-lg font-bold">{product.category}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Connectivity</p>
                  <p className="text-lg font-bold">WiFi 7 + 10Gb Ethernet</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Material</p>
                  <p className="text-lg font-bold">Aerospace Titanium</p>
                </div>
              </div>
            </div>

            <div className="bg-[#161c24] border border-white/5 rounded-2xl p-8 data-grid-bg">
              <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-black uppercase tracking-tighter">Verified Ratings</h4>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-500 font-bold">/ 5.0</span>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { stars: 5, percent: 85 },
                  { stars: 4, percent: 12 },
                  { stars: 3, percent: 3 },
                ].map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-4">
                    <span className="w-4 text-xs font-bold text-slate-500">{rating.stars}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#00a388]" style={{ width: `${rating.percent}%` }}></div>
                    </div>
                    <span className="w-8 text-xs font-bold text-slate-500 text-right">
                      {rating.percent}%
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
                Read Reviews
              </button>
            </div>
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-bold text-[#00a388] uppercase tracking-[0.3em] mb-2">
                Algorithm Selected
              </p>
              <h2 className="text-4xl font-black uppercase tracking-tighter">Similar Hardware</h2>
            </div>
            <div className="flex gap-2">
              <button className="size-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00a388] transition-all">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button className="size-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00a388] transition-all">
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((similarProduct) => (
              <a key={similarProduct.id} href={`/shop/${similarProduct.id}`} className="group cursor-pointer">
                <div className="aspect-4/5 rounded-2xl bg-[#161c24] border border-white/5 overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 bg-[#00a388]/0 group-hover:bg-[#00a388]/10 transition-colors z-10"></div>
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={similarProduct.name}
                    src={similarProduct.image}
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {similarProduct.brand}
                  </p>
                  <h4 className="font-bold text-lg uppercase tracking-tight group-hover:text-[#00a388] transition-colors">
                    {similarProduct.name}
                  </h4>
                  <p className="text-[#00a388] font-bold">${similarProduct.price.toFixed(2)}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <ShopFooter />
    </div>
  )
}
