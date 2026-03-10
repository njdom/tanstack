import { createClientOnlyFn } from '@tanstack/react-start';
import { cartActions } from '../store/cart.store';
import type { CartItem } from '../types';

const CART_STORAGE_KEY = 'tanstack-cart-items';

// Client-only localStorage operations
const saveToLocalStorage = createClientOnlyFn((key: string, data: CartItem[]) => {
  localStorage.setItem(key, JSON.stringify(data));
});

const loadFromLocalStorage = createClientOnlyFn((key: string): CartItem[] | null => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : null;
});

const removeFromLocalStorage = createClientOnlyFn((key: string) => {
  localStorage.removeItem(key);
});

const cartLocalStorageOperations = {
  saveAllItems(items: CartItem[]) {
    try {
      saveToLocalStorage(CART_STORAGE_KEY, items);
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  },

  getAllItems(): CartItem[] {
    try {
      const items = loadFromLocalStorage(CART_STORAGE_KEY);
      return items ?? [];
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
      return [];
    }
  },

  clearAll() {
    try {
      removeFromLocalStorage(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear cart from localStorage:', error);
    }
  },

  initializeCart() {
    try {
      const items = this.getAllItems();
      if (items.length > 0) {
        cartActions.loadCart(items);
      }
    } catch (error) {
      console.error('Failed to initialize cart from storage:', error);
    }
  },

  syncToStorage(items: CartItem[]) {
    try {
      this.saveAllItems(items);
    } catch (error) {
      console.error('Failed to sync cart to storage:', error);
    }
  },
};

function setupCartSync() {
  let isInitialized = false;

  cartStore.subscribe(() => {
    if (!isInitialized) {
      isInitialized = true;
      return;
    }

    const items = cartStore.state.items;
    cartLocalStorageOperations.syncToStorage(items);
  });
}

export function initializeCartDB() {
  cartLocalStorageOperations.initializeCart();
  setupCartSync();
}

import { cartStore } from '../store/cart.store';
