import { ShoppingCart, Sparkles } from 'lucide-react';
import { getProductsByIds, recommendedProducts } from '@/data/shop';
import { useCart } from '@/hooks/useCart';

export function Recomendations() {
  const recommendedProductsList = getProductsByIds(recommendedProducts);
  const { addItem } = useCart();

  return (
    <section className="mt-24 mb-20">
      <div className="flex items-center gap-4 mb-10">
        <div className="h-px grow bg-linear-to-r from-transparent to-white/10"></div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-[#E6FF00] animate-pulse" size={20} />
            <h2 className="text-xl font-bold uppercase tracking-widest text-[#E6FF00]">Recommended for You</h2>
          </div>
          <p className="text-sm text-slate-500">Based on your neural hardware preferences</p>
        </div>
        <div className="h-px grow bg-linear-to-l from-transparent to-white/10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProductsList.map((product, index) => (
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

            <h4 className="font-bold text-lg mb-1 group-hover:text-[#E6FF00] transition-colors">{product.name}</h4>
            <p className="text-sm text-slate-500 mb-4">{product.description}</p>

            <div className="flex items-center justify-between">
              <span className="font-black text-xl">${product.price.toFixed(2)}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItem(product);
                }}
                className="size-10 bg-white/5 hover:bg-[#E6FF00] hover:text-[#0d1217] rounded-full flex items-center justify-center transition-all"
              >
                <ShoppingCart size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
