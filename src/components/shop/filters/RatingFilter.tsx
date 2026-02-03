import { searchActions, searchStore } from "@/store/search.store";
import { useStore } from "@tanstack/react-store";
import { Star } from "lucide-react";

export default function RatingFilter() {
  const searchState = useStore(searchStore);

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">Customer Rating</h4>
      <div className="space-y-2">
        {[4, 3, 2].map((rating) => (
          <label key={`rating-${rating}`} className="cursor-pointer group block">
            <input
              className="sr-only"
              type="radio"
              name="rating"
              checked={searchState.minRating === rating}
              onChange={() => searchActions.setMinRating(rating)}
            />
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${searchState.minRating === rating
                ? 'bg-[#00a388]/20 border border-[#00a388]/50 shadow-[0_0_15px_rgba(0,163,136,0.2)]'
                : 'bg-transparent border border-transparent hover:bg-white/5 dark:hover:bg-wwsaaasadsawdasdawsssawdsahite/5'
                }`}
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`star-${rating}-${i}`}
                    size={14}
                    className={`transition-all ${i < rating
                      ? searchState.minRating === rating
                        ? 'fill-[#E6FF00] text-[#E6FF00]'
                        : 'fill-[#E6FF00]/70 text-[#E6FF00]/70'
                      : 'opacity-30'
                      }`}
                  />
                ))}
              </div>
              <span
                className={`text-xs transition-colors ${searchState.minRating === rating
                  ? 'text-white font-medium'
                  : 'text-slate-400 group-hover:text-white'
                  }`}
              ></span>
            </div>
          </label>
        ))}
        {searchState.minRating > 0 && (
          <button
            onClick={() => searchActions.setMinRating(0)}
            className="text-xs text-slate-500 hover:text-[#00a388] underline mt-2"
          >
            Clear rating filter
          </button>
        )}
      </div>
    </div>
  );
}