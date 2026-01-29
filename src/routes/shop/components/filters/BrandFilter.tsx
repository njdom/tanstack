import { useStore } from "@tanstack/react-store";
import { searchStore, searchActions } from "@/store/search.store";

export default function BrandFilter({ brands }: { brands: string[] }) {
  const searchState = useStore(searchStore);

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold uppercase text-slate-500 tracking-widest">Brand</h4>
      <div className="space-y-3">
        {brands.map((brand, index) => (
          <label key={`brand-${brand}-${index}`} className="flex items-center gap-3 cursor-pointer group">
            <input
              className="rounded border-white/10 bg-white/5 text-[#00a388] focus:ring-[#00a388] w-5 h-5"
              type="radio"
              name="brand"
              checked={searchState.selectedBrand === brand}
              onChange={() => searchActions.setBrand(brand)}
            />
            <span className="text-sm group-hover:text-[#00a388] transition-colors">{brand}</span>
          </label>
        ))}
        {searchState.selectedBrand && (
          <button
            onClick={() => searchActions.setBrand('')}
            className="text-xs text-slate-500 hover:text-[#00a388] underline"
          >
            Clear brand filter
          </button>
        )}
      </div>
    </div>
  );
}
