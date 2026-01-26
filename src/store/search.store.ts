import { Store } from '@tanstack/react-store';

export interface SearchState {
  searchTerm: string;
  selectedCategory: string;
  selectedBrand: string;
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
  selectedBrand: '',
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

  setBrand: (brand: SearchState['selectedBrand']) => {
    searchStore.setState((state) => ({ ...state, selectedBrand: brand }));
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
    searchStore.state.selectedBrand !== '' ||
    searchStore.state.priceRange.min > 0 ||
    searchStore.state.priceRange.max < 10000 ||
    searchStore.state.minRating > 0 ||
    searchStore.state.showOutOfStock !== true
  );
};
