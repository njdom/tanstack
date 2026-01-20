import { cartActions, type CartItem } from '../store/cart.store'

const CART_STORAGE_KEY = 'tanstack-cart-items'

// Database operations using localStorage
export const cartDBOperations = {
  // Save all cart items
  saveAllItems(items: CartItem[]) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  },

  // Get all cart items from storage
  getAllItems(): CartItem[] {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    }
    return []
  },

  // Clear all items
  clearAll() {
    try {
      localStorage.removeItem(CART_STORAGE_KEY)
    } catch (error) {
      console.error('Failed to clear cart from localStorage:', error)
    }
  },

  // Initialize cart from storage
  initializeCart() {
    try {
      const items = this.getAllItems()
      if (items.length > 0) {
        cartActions.loadCart(items)
      }
    } catch (error) {
      console.error('Failed to initialize cart from storage:', error)
    }
  },

  // Sync store to storage
  syncToStorage(items: CartItem[]) {
    try {
      this.saveAllItems(items)
    } catch (error) {
      console.error('Failed to sync cart to storage:', error)
    }
  },
}

// Subscribe to cart store changes and sync to storage
export function setupCartSync() {
  let isInitialized = false

  cartStore.subscribe(() => {
    // Don't sync during initial load
    if (!isInitialized) {
      isInitialized = true
      return
    }
    
    const items = cartStore.state.items
    cartDBOperations.syncToStorage(items)
  })
}

// Initialize cart on app start
export function initializeCartDB() {
  cartDBOperations.initializeCart()
  setupCartSync()
}

// Import cartStore to set up subscription
import { cartStore } from '../store/cart.store'
