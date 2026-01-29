import { Store } from '@tanstack/react-store';

export interface SearchState {
  searchTerm: string;
  selectedCategory: string;
  selectedBrands: string[];
  priceRange: {
    min: number;
    max: number;
  };
  minRating: number;
  sortBy: 'name' | 'priceAsc' | 'priceDesc' | 'rating';
  showOutOfStock: boolean;
}

const defaultState: SearchState = {
  searchTerm: '',
  selectedCategory: '',
  selectedBrands: [],
  priceRange: {
    min: 0,
    max: 10000,
  },
  minRating: 0,
  sortBy: 'name',
  showOutOfStock: true,
};

export const searchStore = new Store<SearchState>(defaultState);

export const searchActions = {
  setSearchTerm: (term: SearchState['searchTerm']) => {
    searchStore.setState((state) => ({ ...state, searchTerm: term }));
  },

  setCategory: (category: SearchState['selectedCategory']) => {
    searchStore.setState((state) => ({ ...state, selectedCategory: category }));
  },

  toggleBrand: (brand: string) => {
    searchStore.setState((state) => {
      const selectedBrands = state.selectedBrands.includes(brand)
        ? state.selectedBrands.filter(b => b !== brand)
        : [...state.selectedBrands, brand];
      return { ...state, selectedBrands };
    });
  },

  setPriceRange: (min: SearchState['priceRange']['min'], max: SearchState['priceRange']['max']) => {
    searchStore.setState((state) => ({ ...state, priceRange: { min, max } }));
  },

  setMinRating: (rating: SearchState['minRating']) => {
    searchStore.setState((state) => ({ ...state, minRating: rating }));
  },

  setSortBy: (sortBy: SearchState['sortBy']) => {
    searchStore.setState((state) => ({ ...state, sortBy }));
  },

  toggleShowOutOfStock: () => {
    searchStore.setState((state) => ({ ...state, showOutOfStock: !state.showOutOfStock }));
  },

  resetFilters: () => {
    searchStore.setState(defaultState);
  },
};

export const hasActiveFilters = () => {
  return (
    searchStore.state.searchTerm !== '' ||
    searchStore.state.selectedCategory !== '' ||
    searchStore.state.selectedBrands.length > 0 ||
    searchStore.state.priceRange.min > 0 ||
    searchStore.state.priceRange.max < 10000 ||
    searchStore.state.minRating > 0 ||
    searchStore.state.showOutOfStock !== true
  );
};
