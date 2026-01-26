import type { Deal } from '../types';
import { Timer, Clock } from 'lucide-react';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <div className="relative bg-[#1C1E22] rounded-2xl p-6 border-l-4 border-[#FF008C] flex flex-col justify-between group overflow-hidden">
      <div className="absolute -right-8 -top-8 text-[#FF008C]/10 rotate-12 transition-transform group-hover:rotate-0">
        <Timer size={160} />
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-[#FF008C] font-bold mb-4">
          <Clock size={14} />
          ENDS IN: {deal.endsIn}
        </div>
        <h3 className="text-2xl font-bold mb-2">{deal.productName}</h3>
        <p className="text-slate-400 text-sm mb-6">{deal.description}</p>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-3xl font-bold text-white">${deal.salePrice}</span>
          <span className="text-lg text-slate-500 line-through">${deal.originalPrice}</span>
          <span className="bg-[#FF008C]/20 text-[#FF008C] text-xs font-bold px-2 py-1 rounded">
            -{deal.discount}% OFF
          </span>
        </div>
      </div>
      <button className="relative z-10 w-full bg-[#FF008C] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">
        Claim Deal
      </button>
    </div>
  );
}
