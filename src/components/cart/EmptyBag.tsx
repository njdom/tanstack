import { ShoppingBag } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export function EmptyBag() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="size-32 bg-white/5 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag size={64} className="text-slate-600" />
      </div>
      <h2 className="text-3xl font-black mb-3 uppercase tracking-tight">Your cart is empty</h2>
      <p className="text-slate-500 mb-8 max-w-md">
        Discover cutting-edge hardware and add items to your cart to get started
      </p>
      <Link
        to="/shop"
        className="px-8 py-4 bg-[#00a388] hover:bg-[#008f77] text-white font-bold rounded-xl uppercase tracking-widest text-sm transition-all flex items-center gap-2"
      >
        Browse Products
        <ArrowRight size={18} />
      </Link>
    </div>
  );
}
