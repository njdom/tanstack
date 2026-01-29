import { searchActions, searchStore } from "@/store/search.store";
import { useStore } from "@tanstack/react-store";
import { ChevronDown, LayoutGrid, List, Loader2 } from "lucide-react";
import ActiveFilterBadges from "./ActiveFilterBadges";

export default function Toolbar({ isLoading, totalResults }: { isLoading: boolean, totalResults: number }) {
  const searchState = useStore(searchStore);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#161b22]/40 border border-white/5 p-4 rounded-2xl">
      <div className="flex items-center gap-6">
        <p className="text-sm font-medium">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} />
              Searching...
            </span>
          ) : (
            <>
              <span className="text-[#00a388] font-bold">{totalResults}</span> results
              {searchState.searchTerm && <span className="text-slate-500"> for "{searchState.searchTerm}"</span>}
            </>
          )}
        </p>
        <div className="h-4 w-px bg-white/10"></div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 bg-[#00a388] rounded-lg text-white">
            <LayoutGrid size={20} />
          </button>
          <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 transition-colors">
            <List size={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ActiveFilterBadges />
        <div className="relative group">
          <select
            value={searchState.sortBy}
            onChange={(e) => searchActions.setSortBy(e.target.value as any)}
            className="flex items-center gap-2 bg-[#161b22] border border-white/10 px-4 py-2 rounded-xl text-sm font-medium hover:border-[#00a388]/50 transition-colors cursor-pointer appearance-none pr-8"
          >
            <option value="name">Sort by: Name</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
          <ChevronDown size={12} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}