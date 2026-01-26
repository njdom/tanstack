import { useCart } from '@/hooks/useCart';
import { Product } from '@/types';
import { Minus, Plus, Heart, Trash2, Sparkles } from 'lucide-react';

interface CartItemProps {
  item: Product & { quantity: number };
}

export function CartItem({ item }: CartItemProps) {
  const { incrementQuantity, decrementQuantity, removeItem } = useCart();

  return (
    <div className="bg-[#1C1E22]/40 backdrop-blur-sm border border-white/5 rounded-xl p-5 group hover:border-[#00a388]/30 transition-all duration-300">
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
                <button
                  onClick={() => decrementQuantity(item.id)}
                  className="size-8 flex items-center justify-center hover:bg-white/10 rounded-md transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center font-bold">{item.quantity.toString().padStart(2, '0')}</span>
                <button
                  onClick={() => incrementQuantity(item.id)}
                  className="size-8 flex items-center justify-center bg-[#00a388]/20 text-[#00a388] hover:bg-[#00a388]/30 rounded-md transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#00a388] transition-colors">
                  <Heart size={18} />
                  Save
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                  Remove
                </button>
              </div>
            </div>

            {item.badge === 'sale' && (
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#E6FF00] px-2 py-1 bg-[#E6FF00]/10 rounded border border-[#E6FF00]/20">
                <Sparkles size={12} />
                BEST VALUE
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
