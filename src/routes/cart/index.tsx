import { createFileRoute } from '@tanstack/react-router'
import { ShopHeader } from '../../components/ShopHeader'
import { ShopFooter } from '../../components/ShopFooter'
import { cartItems, recommendedProducts } from '../../data/shop'

export const Route = createFileRoute('/cart/')({
  component: CartPage,
  // SPA Mode - Cart is interactive, authenticated, no SEO needed
  ssr: false,
})

function CartPage() {
  // Calculate cart totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax
  
  // Free shipping progress (need $200 for free shipping)
  const freeShippingThreshold = 200
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal)
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100)

  return (
    <div className="dark bg-[#0d1217] text-slate-100 min-h-screen font-['Space_Grotesk'] grid-overlay">
      <ShopHeader />

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        {/* Progress Bar */}
        <div className="mb-10 max-w-2xl">
          <div className="flex justify-between items-end mb-2">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">
              Free Express Shipping
            </p>
            {amountToFreeShipping > 0 ? (
              <p className="text-sm font-bold text-[#00a388]">
                ${amountToFreeShipping.toFixed(2)} more to go
              </p>
            ) : (
              <p className="text-sm font-bold text-[#E6FF00]">Unlocked!</p>
            )}
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00a388] transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Cart Items List */}
          <div className="grow">
            <div className="mb-8">
              <h1 className="text-5xl font-black mb-2 tracking-tighter uppercase">Your Items</h1>
              <p className="text-slate-500 font-medium">
                {cartItems.length} premium items ready for processing
              </p>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1C1E22]/40 backdrop-blur-sm border border-white/5 rounded-xl p-5 group hover:border-[#00a388]/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-48 h-48 bg-black rounded-lg overflow-hidden shrink-0">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={item.name}
                        src={item.image}
                      />
                    </div>

                    <div className="grow flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                          <p className="text-sm text-slate-500">{item.description}</p>
                        </div>
                        <p className="text-xl font-bold">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center bg-white/5 rounded-lg p-1 border border-white/10">
                            <button className="size-8 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors">
                              <span className="material-symbols-outlined text-sm">remove</span>
                            </button>
                            <span className="w-10 text-center font-bold">
                              {item.quantity.toString().padStart(2, '0')}
                            </span>
                            <button className="size-8 flex items-center justify-center bg-[#00a388]/20 text-[#00a388] hover:bg-[#00a388]/30 rounded-md transition-colors">
                              <span className="material-symbols-outlined text-sm">add</span>
                            </button>
                          </div>

                          <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#00a388] transition-colors">
                              <span className="material-symbols-outlined text-lg">favorite</span>
                              Save
                            </button>
                            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-red-400 transition-colors">
                              <span className="material-symbols-outlined text-lg">delete</span>
                              Remove
                            </button>
                          </div>
                        </div>

                        {item.badge === 'best-value' && (
                          <div className="flex items-center gap-2 text-[10px] font-bold text-[#E6FF00] px-2 py-1 bg-[#E6FF00]/10 rounded border border-[#E6FF00]/20">
                            <span className="material-symbols-outlined text-xs">auto_awesome</span>
                            BEST VALUE
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Order Summary Sticky */}
          <aside className="w-full lg:w-[400px] shrink-0">
            <div className="sticky top-28 bg-[#1C1E22] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
              {/* Subtle Glow Decoration */}
              <div className="absolute -top-24 -right-24 size-48 bg-[#00a388]/20 blur-[80px] rounded-full pointer-events-none"></div>

              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                Summary
                <span className="material-symbols-outlined text-[#00a388] text-sm">analytics</span>
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Shipping</span>
                  <span className="text-[#00a388]">FREE</span>
                </div>

                <div className="flex justify-between text-slate-400 font-medium">
                  <span>Estimated Tax</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-lg font-bold uppercase tracking-wider">Total</span>
                    <span className="text-4xl font-black text-white">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Input */}
                <div className="relative group">
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:ring-1 focus:ring-[#00a388] focus:border-[#00a388] text-sm transition-all outline-none"
                    placeholder="Promo code"
                    type="text"
                  />
                  <button className="absolute right-2 top-1.5 bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">
                    Apply
                  </button>
                </div>

                <button className="w-full bg-[#00a388] hover:bg-[#00a388]/90 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 group transition-all transform active:scale-[0.98]">
                  PROCEED TO CHECKOUT
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <div className="flex items-center justify-center gap-4 py-2 opacity-50">
                  <span className="material-symbols-outlined">payments</span>
                  <span className="material-symbols-outlined">account_balance_wallet</span>
                  <span className="material-symbols-outlined">currency_bitcoin</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* AI Powered Recommendations Section */}
        <section className="mt-24 mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px grow bg-linear-to-r from-transparent to-white/10"></div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[#E6FF00] animate-pulse">
                  auto_awesome
                </span>
                <h2 className="text-xl font-bold uppercase tracking-widest text-[#E6FF00]">
                  Recommended for You
                </h2>
              </div>
              <p className="text-sm text-slate-500">Based on your neural hardware preferences</p>
            </div>
            <div className="h-px grow bg-linear-to-l from-transparent to-white/10"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-[#1C1E22]/40 border border-white/5 rounded-xl p-4 group hover:border-[#E6FF00]/40 transition-all cursor-pointer ai-glow relative overflow-hidden"
              >
                {index === 0 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-[#E6FF00] text-[#0d1217] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      98% Match
                    </span>
                  </div>
                )}
                {index === 1 && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-[#E6FF00] text-[#0d1217] text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      AI Pick
                    </span>
                  </div>
                )}

                <div className="aspect-square bg-black rounded-lg mb-4 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={product.name}
                    src={product.image}
                  />
                </div>

                <h4 className="font-bold text-lg mb-1 group-hover:text-[#E6FF00] transition-colors">
                  {product.name}
                </h4>
                <p className="text-sm text-slate-500 mb-4">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="font-black text-xl">${product.price.toFixed(2)}</span>
                  <button className="size-10 bg-white/5 hover:bg-[#E6FF00] hover:text-[#0d1217] rounded-full flex items-center justify-center transition-all">
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <ShopFooter />
    </div>
  )
}
