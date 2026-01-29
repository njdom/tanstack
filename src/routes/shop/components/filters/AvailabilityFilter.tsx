import { searchActions, searchStore } from "@/store/search.store";
import { useStore } from "@tanstack/react-store";

export default function AvailabilityFilter() {
  const searchState = useStore(searchStore);

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">Availability</h4>
      <label className="flex items-center justify-between cursor-pointer group">
        <span className="text-sm">In Stock Only</span>
        <button
          onClick={() => searchActions.toggleShowOutOfStock()}
          className={`w-10 h-5 rounded-full relative border transition-colors ${!searchState.showOutOfStock ? 'bg-[#00a388]/20 border-[#00a388]/30' : 'bg-white/10 border-white/20'
            }`}
        >
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-all ${!searchState.showOutOfStock ? 'right-1 bg-[#00a388]' : 'left-1 bg-slate-400'
              }`}
          ></div>
        </button>
      </label>
    </div>
  );
}