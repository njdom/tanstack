import { Store } from '@tanstack/react-store'
import type { Product } from '../types'

export interface CartItem {
  productId: number
  quantity: number
}

export interface CartState {
  items: CartItem[]
}

// Initialize the store
export const cartStore = new Store<CartState>({
  items: [],
})

// Cart actions
export const cartActions = {
  // Add item to cart
  addItem: (product: Product, quantity = 1) => {
    cartStore.setState((state) => {
      const existingItem = state.items.find(item => item.productId === product.id)
      
      if (existingItem) {
        // Update quantity if item already exists
        return {
          items: state.items.map(item =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        }
      }
      
      // Add new item
      return {
        items: [...state.items, { productId: product.id, quantity }],
      }
    })
  },

  // Remove item from cart
  removeItem: (productId: number) => {
    cartStore.setState((state) => ({
      items: state.items.filter(item => item.productId !== productId),
    }))
  },

  // Update item quantity
  updateQuantity: (productId: number, quantity: number) => {
    cartStore.setState((state) => {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return {
          items: state.items.filter(item => item.productId !== productId),
        }
      }
      
      return {
        items: state.items.map(item =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        ),
      }
    })
  },

  // Increment quantity
  incrementQuantity: (productId: number) => {
    cartStore.setState((state) => ({
      items: state.items.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }))
  },

  // Decrement quantity
  decrementQuantity: (productId: number) => {
    cartStore.setState((state) => {
      const item = state.items.find(i => i.productId === productId)
      if (!item || item.quantity <= 1) {
        // Remove item if quantity would become 0
        return {
          items: state.items.filter(i => i.productId !== productId),
        }
      }
      
      return {
        items: state.items.map(i =>
          i.productId === productId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        ),
      }
    })
  },

  // Clear cart
  clearCart: () => {
    cartStore.setState({ items: [] })
  },

  // Load cart from storage
  loadCart: (items: CartItem[]) => {
    cartStore.setState({ items })
  },
}

// Selectors
export const cartSelectors = {
  // Get all cart items
  getItems: () => cartStore.state.items,

  // Get cart item count
  getItemCount: () => 
    cartStore.state.items.reduce((total, item) => total + item.quantity, 0),

  // Get cart total
  getCartTotal: (products: Product[]) => {
    return cartStore.state.items.reduce((total, item) => {
      const product = products.find(p => p.id === item.productId)
      return total + (product ? product.price * item.quantity : 0)
    }, 0)
  },

  // Check if product is in cart
  isInCart: (productId: number) =>
    cartStore.state.items.some(item => item.productId === productId),

  // Get quantity of specific product
  getQuantity: (productId: number) => {
    const item = cartStore.state.items.find(i => i.productId === productId)
    return item ? item.quantity : 0
  },
}
