import type { TrendingProduct } from '../types'

interface TrendingCardProps {
  product: TrendingProduct
}

export function TrendingCard({ product }: TrendingCardProps) {
  return (
    <div className="min-w-[280px] bg-[#0d1217]/80 rounded-2xl p-4 border border-white/5">
      <div
        className="aspect-video rounded-lg overflow-hidden mb-4"
        style={{ backgroundImage: `url('${product.image}')`, backgroundSize: 'cover' }}
      />
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold">{product.name}</h4>
        <span className="text-[#E6FF00] text-xs font-bold bg-[#E6FF00]/10 px-2 py-0.5 rounded border border-[#E6FF00]/30">
          {product.matchPercentage}% Match
        </span>
      </div>
      <p className="text-sm text-slate-400 mb-3">{product.trendReason}</p>
      <button className="w-full py-2 bg-white/10 hover:bg-[#00a388] transition-colors rounded-lg font-bold text-sm">
        Analyze Product
      </button>
    </div>
  )
}
