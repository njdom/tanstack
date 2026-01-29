import { searchActions, searchStore } from "@/store/search.store";
import { useStore } from "@tanstack/react-store";

export default function PriceRangeFilter() {
  const searchState = useStore(searchStore);

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">Price Range</h4>
      <div className="px-2">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Min: ${searchState.priceRange.min}</label>
            <input
              type="range"
              min="0"
              max="3000"
              step="10"
              value={searchState.priceRange.min}
              onChange={(e) => searchActions.setPriceRange(Number(e.target.value), searchState.priceRange.max)}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#00a388] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#00a388] [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)]"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Max: ${searchState.priceRange.max}</label>
            <input
              type="range"
              min="0"
              max="3000"
              step="10"
              value={searchState.priceRange.max}
              onChange={(e) => searchActions.setPriceRange(searchState.priceRange.min, Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#00a388] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#00a388] [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
