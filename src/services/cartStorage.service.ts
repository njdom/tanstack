import { cartActions, cartStore } from '../store/cart.store';
import type { CartItem } from '../types';
import { LocalStorageService } from './localStorage.service';

const CART_STORAGE_KEY = 'tanstack-cart-items';

class CartStorageService extends LocalStorageService<CartItem[]> {
  constructor() {
    super(CART_STORAGE_KEY);
  }

  saveAllItems(items: CartItem[]): void {
    this.save(items);
  }

  getAllItems(): CartItem[] {
    return this.load() ?? [];
  }

  clearAll(): void {
    this.clear();
  }

  initializeCart(): void {
    const items = this.getAllItems();
    if (items.length > 0) {
      cartActions.loadCart(items);
    }
  }

  syncToStorage(items: CartItem[]): void {
    this.saveAllItems(items);
  }
}

const cartStorageService = new CartStorageService();

function setupCartSync() {
  let isInitialized = false;

  cartStore.subscribe(() => {
    if (!isInitialized) {
      isInitialized = true;
      return;
    }

    cartStorageService.syncToStorage(cartStore.state.items);
  });
}

export function initializeCartDB() {
  cartStorageService.initializeCart();
  setupCartSync();
}
