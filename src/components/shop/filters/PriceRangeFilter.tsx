import { searchActions, searchStore } from "@/store/search.store";
import { useStore } from "@tanstack/react-store";
import { useThrottler } from "@tanstack/react-pacer";
import { useState } from "react";

export default function PriceRangeFilter() {
  const searchState = useStore(searchStore);
  const [localMin, setLocalMin] = useState(searchState.priceRange.min);
  const [localMax, setLocalMax] = useState(searchState.priceRange.max);

  const minThrottler = useThrottler(
    (value: number) => searchActions.setPriceRange(value, searchState.priceRange.max),
    { wait: 500, leading: true, trailing: true }
  );

  const maxThrottler = useThrottler(
    (value: number) => searchActions.setPriceRange(searchState.priceRange.min, value),
    { wait: 500, leading: true, trailing: true }
  );

  const handleMinChange = (value: number) => {
    setLocalMin(value); // Update UI immediately
    minThrottler.maybeExecute(value); // Throttle the store update
  };

  const handleMaxChange = (value: number) => {
    setLocalMax(value); // Update UI immediately
    maxThrottler.maybeExecute(value); // Throttle the store update
  };

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">Price Range</h4>
      <div className="px-2">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Min: ${localMin}</label>
            <input
              type="range"
              min="0"
              max="3000"
              step="10"
              value={localMin}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#00a388] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#00a388] [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)]"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Max: ${localMax}</label>
            <input
              type="range"
              min="0"
              max="3000"
              step="10"
              value={localMax}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#00a388] [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)] [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#00a388] [&::-moz-range-thumb]:shadow-[0_0_10px_rgba(0,163,136,0.5)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
