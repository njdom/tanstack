import { searchActions, searchStore } from "@/store/search.store";
import { useStore } from "@tanstack/react-store";
import { X } from "lucide-react";

export default function ActiveFilterBadges() {
  const searchState = useStore(searchStore);

  return (
    <div className="flex gap-2">
      {searchState.selectedBrands.map((brand) => (
        <div key={brand} className="flex items-center gap-2 px-3 py-1.5 bg-[#00a388]/10 border border-[#00a388]/20 rounded-full text-xs text-[#00a388] font-medium">
          Brand: {brand}
          <X
            size={12}
            className="cursor-pointer hover:text-white"
            onClick={() => searchActions.toggleBrand(brand)}
          />
        </div>
      ))}
      {(searchState.priceRange.min > 0 || searchState.priceRange.max < 10000) && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00a388]/10 border border-[#00a388]/20 rounded-full text-xs text-[#00a388] font-medium">
          ${searchState.priceRange.min} - ${searchState.priceRange.max}
          <X
            size={12}
            className="cursor-pointer hover:text-white"
            onClick={() => searchActions.setPriceRange(0, 10000)}
          />
        </div>
      )}
      {searchState.minRating > 0 && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00a388]/10 border border-[#00a388]/20 rounded-full text-xs text-[#00a388] font-medium">
          {searchState.minRating}★
          <X
            size={12}
            className="cursor-pointer hover:text-white"
            onClick={() => searchActions.setMinRating(0)}
          />
        </div>
      )}
      {!searchState.showOutOfStock && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#00a388]/10 border border-[#00a388]/20 rounded-full text-xs text-[#00a388] font-medium">
          In Stock Only
          <X
            size={12}
            className="cursor-pointer hover:text-white"
            onClick={() => searchActions.toggleShowOutOfStock()}
          />
        </div>
      )}
    </div>
  );
}