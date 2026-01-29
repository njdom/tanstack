import { Product } from "@/types";
import { useStore } from "@tanstack/react-store";
import { hasActiveFilters, searchStore } from "@/store/search.store";

export function filterProducts(products: Product[]) {
  const searchState = useStore(searchStore);

  const filteredProducts = products.filter((product) => {
    if (searchState.searchTerm && !product.name.toLowerCase().includes(searchState.searchTerm.toLowerCase())) 
      return false;
    if (searchState.selectedCategory && product.category !== searchState.selectedCategory) 
      return false;
    if (searchState.selectedBrands.length > 0 && !searchState.selectedBrands.includes(product.brand)) 
      return false;
    if (searchState.priceRange.min && product.price < searchState.priceRange.min) 
      return false;
    if (searchState.priceRange.max && product.price > searchState.priceRange.max)
      return false;
    if (!searchState.showOutOfStock && !product.inStock) 
      return false;
    if (searchState.minRating && product.rating < searchState.minRating) 
      return false;
    return true;
  });

  return { filteredProducts, hasActiveFilters: hasActiveFilters() };
}

export function sortProducts(products: Product[]) {
  const searchState = useStore(searchStore);

  const sortedProducts = products.sort((a, b) => {
    if (searchState.sortBy === 'priceAsc') return a.price - b.price;
    if (searchState.sortBy === 'priceDesc') return b.price - a.price;
    if (searchState.sortBy === 'rating') return b.rating - a.rating;
    if (searchState.sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });
  return sortedProducts;
}