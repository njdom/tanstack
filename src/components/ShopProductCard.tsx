import { Link } from '@tanstack/react-router'
import type { Product } from '../types'

interface ShopProductCardProps {
  product: Product
}

export function ShopProductCard({ product }: ShopProductCardProps) {
  const isOutOfStock = !product.inStock

  return (
    <Link
      to="/shop/$productId"
      params={{ productId: product.id }}
      className="product-card group relative bg-[#161b22] border border-white/5 rounded-2xl overflow-hidden hover:border-[#00a388]/40 hover:shadow-[0_0_30px_rgba(0,163,136,0.15)] transition-all duration-300 block"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
          {product.badge === 'trending' && (
            <span className="px-2 py-0.5 bg-[#E6FF00] text-slate-900 text-[10px] font-black uppercase tracking-tighter rounded">
              Trending
            </span>
          )}
          {product.badge === 'new' && (
            <span className="px-2 py-0.5 bg-[#00a388] text-white text-[10px] font-black uppercase tracking-tighter rounded">
              New Arrival
            </span>
          )}
          {product.badge === 'sale' && (
            <span className="px-2 py-0.5 bg-[#FF008C] text-white text-[10px] font-black uppercase tracking-tighter rounded">
              Sale
            </span>
          )}
          {product.badge === 'out-of-stock' && (
            <span className="px-2 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-tighter rounded">
              Out of Stock
            </span>
          )}
        </div>
      )}

      {/* Image */}
      <div
        className={`relative aspect-square overflow-hidden bg-white/5 ${isOutOfStock ? 'grayscale' : ''}`}
      >
        <img
          className={`w-full h-full object-cover ${!isOutOfStock ? 'transition-transform duration-700 group-hover:scale-110' : ''}`}
          alt={product.name}
          src={product.image}
        />

        {/* Quick View Overlay */}
        {!isOutOfStock && (
          <div className="quick-view absolute inset-0 bg-[#0d1217]/60 backdrop-blur-sm opacity-0 flex flex-col items-center justify-center translate-y-4 transition-all duration-300">
            <button className="px-6 py-2 bg-[#00a388] text-white text-sm font-bold rounded-xl mb-3 shadow-lg hover:bg-[#00a388]/90">
              Quick View
            </button>
            <button className="px-6 py-2 bg-white/10 text-white text-sm font-bold rounded-xl hover:bg-white/20">
              Compare
            </button>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-[#0d1217]/40 flex items-center justify-center">
            <span className="text-sm font-bold uppercase tracking-widest bg-[#0d1217]/80 px-4 py-2 border border-white/10">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
          {product.brand}
        </p>
        <h3
          className={`font-bold text-base mb-3 leading-tight transition-colors ${
            isOutOfStock
              ? 'text-slate-400'
              : 'text-white group-hover:text-[#00a388]'
          }`}
        >
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-4">
          {product.originalPrice ? (
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 line-through tracking-tighter">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span
                className={`text-xl font-bold tracking-tighter ${
                  isOutOfStock ? 'text-slate-500' : 'text-[#00a388]'
                }`}
              >
                ${product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span
              className={`text-xl font-bold tracking-tighter ${
                isOutOfStock ? 'text-slate-500' : 'text-[#00a388]'
              }`}
            >
              ${product.price.toFixed(2)}
            </span>
          )}

          <div className={`flex items-center gap-1 ${isOutOfStock ? 'text-slate-500' : ''}`}>
            <span
              className={`material-symbols-outlined text-sm ${
                !isOutOfStock ? 'text-[#E6FF00] fill-1' : ''
              }`}
            >
              star
            </span>
            <span className="text-xs font-bold">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <button
          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            isOutOfStock
              ? 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
              : 'bg-white/5 border border-white/10 hover:bg-[#00a388] hover:border-[#00a388]'
          }`}
          disabled={isOutOfStock}
        >
          <span className="material-symbols-outlined text-lg">
            {isOutOfStock ? 'notifications' : 'add_shopping_cart'}
          </span>
          {isOutOfStock ? 'Notify Me' : 'Add to Cart'}
        </button>
      </div>
    </Link>
  )
}
