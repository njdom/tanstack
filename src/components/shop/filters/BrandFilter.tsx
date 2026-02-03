import { useStore } from "@tanstack/react-store";
import { searchStore, searchActions } from "@/store/search.store";

export default function BrandFilter({ brands }: { brands: string[] }) {
  const searchState = useStore(searchStore);

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold uppercase text-slate-400 tracking-widest">BRAND</h4>
      <div className="space-y-3">
        {brands.map((brand, index) => {
          const isChecked = searchState.selectedBrands.includes(brand);
          return (
            <label key={`brand-${brand}-${index}`} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => searchActions.toggleBrand(brand)}
                  className="appearance-none w-5 h-5 border-2 border-slate-600 rounded bg-transparent cursor-pointer checked:bg-[#00a388] checked:border-[#00a388] transition-all"
                />
                {isChecked && (
                  <svg 
                    className="absolute w-3 h-3 pointer-events-none left-1" 
                    viewBox="0 0 12 10" 
                    fill="none"
                  >
                    <path 
                      d="M1 5L4.5 8.5L11 1" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm text-white group-hover:text-[#00a388] transition-colors">
                {brand}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
