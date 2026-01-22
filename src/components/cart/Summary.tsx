import { ArrowRight, CreditCard, Wallet, Bitcoin, TrendingUp } from "lucide-react"

interface SummaryProps {
  subtotal: number
  tax: number
  total: number
}

export function Summary({ subtotal, tax, total }: SummaryProps) {
  return (
    <aside className="w-full lg:w-[400px] shrink-0">
    <div className="sticky top-28 bg-[#1C1E22] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
      {/* Subtle Glow Decoration */}
      <div className="absolute -top-24 -right-24 size-48 bg-[#00a388]/20 blur-[80px] rounded-full pointer-events-none"></div>

      <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
        Summary
        <TrendingUp className="text-[#00a388]" size={14} />
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
          <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
        </button>

        <div className="flex items-center justify-center gap-4 py-2 opacity-50">
          <CreditCard size={20} />
          <Wallet size={20} />
          <Bitcoin size={20} />
        </div>
      </div>
    </div>
  </aside>
  )
}