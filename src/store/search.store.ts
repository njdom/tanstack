import { Store } from '@tanstack/react-store'

export interface SearchState {
  searchTerm: string
  selectedCategory: string
  selectedBrand: string
  priceRange: {
    min: number
    max: number
  }
  sortBy: 'name' | 'priceAsc' | 'priceDesc' | 'rating'
  showOutOfStock: boolean
}

export const searchStore = new Store<SearchState>({
  searchTerm: '',
  selectedCategory: '',
  selectedBrand: '',
  priceRange: {
    min: 0,
    max: 10000,
  },
  sortBy: 'name',
  showOutOfStock: true,
})

export const searchActions = {
  setSearchTerm: (term: string) => {
    searchStore.setState((state) => ({
      ...state,
      searchTerm: term,
    }))
  },

  setCategory: (category: string) => {
    searchStore.setState((state) => ({
      ...state,
      selectedCategory: category,
    }))
  },

  setBrand: (brand: string) => {
    searchStore.setState((state) => ({
      ...state,
      selectedBrand: brand,
    }))
  },

  setPriceRange: (min: number, max: number) => {
    searchStore.setState((state) => ({
      ...state,
      priceRange: { min, max },
    }))
  },

  setSortBy: (sortBy: SearchState['sortBy']) => {
    searchStore.setState((state) => ({
      ...state,
      sortBy,
    }))
  },

  toggleShowOutOfStock: () => {
    searchStore.setState((state) => ({
      ...state,
      showOutOfStock: !state.showOutOfStock,
    }))
  },

  resetFilters: () => {
    searchStore.setState({
      searchTerm: '',
      selectedCategory: '',
      selectedBrand: '',
      priceRange: { min: 0, max: 10000 },
      sortBy: 'name',
      showOutOfStock: true,
    })
  },

  clearSearch: () => {
    searchStore.setState((state) => ({
      ...state,
      searchTerm: '',
    }))
  },
}

export const searchSelectors = {
  getSearchTerm: () => searchStore.state.searchTerm,
  getSelectedCategory: () => searchStore.state.selectedCategory,
  getSelectedBrand: () => searchStore.state.selectedBrand,
  getPriceRange: () => searchStore.state.priceRange,
  getSortBy: () => searchStore.state.sortBy,
  getShowOutOfStock: () => searchStore.state.showOutOfStock,
  hasActiveFilters: () => {
    const state = searchStore.state
    return (
      state.searchTerm !== '' ||
      state.selectedCategory !== '' ||
      state.selectedBrand !== '' ||
      state.priceRange.min !== 0 ||
      state.priceRange.max !== 10000 ||
      !state.showOutOfStock
    )
  },
}
