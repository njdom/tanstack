import { searchActions, searchStore } from "@/store/search.store";
import { useStore } from "@tanstack/react-store";
import { Search } from "lucide-react";
import { Product } from "@/types";
import { ShopProductCard } from "@/components/ShopProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  const searchState = useStore(searchStore);
  const isLoading = false;
  
  return (
    <div key={searchState.sortBy} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
      {isLoading ? (
        Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-[#161b22] border border-white/5 rounded-2xl p-4 animate-pulse">
            <div className="aspect-square bg-white/5 rounded-lg mb-4"></div>
            <div className="h-4 bg-white/5 rounded mb-2"></div>
            <div className="h-3 bg-white/5 rounded w-2/3"></div>
          </div>
        ))
      ) : products.length === 0 ? (
        <div className="col-span-full text-center py-20">
          <div className="size-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-slate-600" size={40} />
          </div>
          <h3 className="text-2xl font-bold mb-2">No products found</h3>
          <p className="text-slate-500 mb-6">
            Try adjusting your search or filters to find what you're looking for
          </p>
          <button
            onClick={() => searchActions.resetFilters()}
            className="px-6 py-3 bg-[#00a388] hover:bg-[#008f77] text-white font-bold rounded-xl transition-all"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        products.map((product) => (
          <ShopProductCard key={`${searchState.sortBy}-${product._id}`} product={product as Product} />
        ))
      )}

    </div>
  );
}