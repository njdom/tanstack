import { createFileRoute } from '@tanstack/react-router';
import { ShopHeader } from '@/components/ShopHeader';
import { ShopFooter } from '@/components/ShopFooter';
import { RouterBreadcrumb } from '@/components/RouterBreadcrumb';
import { SlidersHorizontal } from 'lucide-react';
import { searchActions } from '@/store/search.store';
import { getAllProducts, getProductBrands as getProductBrandsServerFn } from '@/server/product.functions';
import { ProductGrid } from '@/components/shop/ProductGrid';
import PriceRangeFilter from '@/components/shop/filters/PriceRangeFilter';
import RatingFilter from '@/components/shop/filters/RatingFilter';
import AvailabilityFilter from '@/components/shop/filters/AvailabilityFilter';
import Toolbar from '@/components/shop/Toolbar';
import HeroHeading from '@/components/shop/HeroHeading';
import BrandFilter from '@/components/shop/filters/BrandFilter';
import FeaturedModel from '@/components/shop/FeaturedModel';
import { useProductSearch } from '@/hooks/useProductSearch';

export const Route = createFileRoute('/shop/')({
  component: ShopPage,
  staticData: {
    breadcrumb: [{ label: 'Home', path: '/' }, { label: 'Products' }],
  },
  ssr: 'data-only',
  loader: async () => {
    const [products, brands] = await Promise.all([
      getAllProducts({ data: {} }),
      getProductBrandsServerFn(),
    ]);

    return { products, brands };
  },
});

function ShopPage() {
  const { products: initialProducts, brands } = Route.useLoaderData();
  const { products: filteredProducts, isLoading, hasActiveFilters } = useProductSearch(initialProducts);

  const totalResults = filteredProducts.length;

  return (
    <div className="dark bg-[#0d1217] text-white min-h-screen font-['Space_Grotesk']">
      <ShopHeader />

      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
        <RouterBreadcrumb variant="shop" />

        <HeroHeading />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-72 shrink-0 space-y-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-3 text-white">
                <SlidersHorizontal className="text-[#00a388]" size={24} /> FILTERS
              </h3>
              <button
                onClick={() => searchActions.resetFilters()}
                disabled={!hasActiveFilters}
                className="text-xs text-slate-400 hover:text-white underline uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                RESET ALL
              </button>
            </div>

            <BrandFilter brands={brands} />
            <PriceRangeFilter />
            <RatingFilter />
            <AvailabilityFilter />

          </aside>

          {/* Main Listing Area */}
          <div className="flex-1">
            <Toolbar isLoading={isLoading} totalResults={totalResults} />

            <ProductGrid products={filteredProducts} />

            <FeaturedModel />

            {/* Infinite Scroll Loader */}
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <div className="flex gap-1.5">
                <div className="w-2 h-6 bg-[#00a388]/20 rounded-full"></div>
                <div className="w-2 h-10 bg-[#00a388]/50 rounded-full animate-pulse"></div>
                <div className="w-2 h-14 bg-[#00a388] rounded-full"></div>
                <div className="w-2 h-10 bg-[#00a388]/50 rounded-full animate-pulse"></div>
                <div className="w-2 h-6 bg-[#00a388]/20 rounded-full"></div>
              </div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Loading specialized gear...</p>
            </div>
          </div>
        </div>
      </main>

      <ShopFooter />
    </div>
  );
}
