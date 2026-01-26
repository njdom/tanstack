import { Link } from '@tanstack/react-router';
import type { Product } from '../types';
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to="/shop/$productId"
      params={{ productId: product._id }}
      className="bg-[#1C1E22] border border-white/5 rounded-xl p-4 group hover:border-[#00a388]/50 transition-all duration-300 shadow-xl block"
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-white/5 mb-4">
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={product.image}
          alt={product.name}
        />
        <button className="absolute top-3 right-3 size-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="text-white" size={20} />
        </button>
      </div>
      <div className="space-y-1">
        <p className="text-xs uppercase text-slate-500 font-bold tracking-widest">{product.category}</p>
        <h3 className="text-lg font-bold group-hover:text-[#00a388] transition-colors">{product.name}</h3>
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          <button className="bg-white/10 hover:bg-[#00a388] rounded-lg size-10 flex items-center justify-center transition-colors">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </Link>
  );
}
