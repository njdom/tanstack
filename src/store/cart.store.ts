import { Store } from '@tanstack/react-store';
import type { CartItem, Product } from '../types';

export interface CartState {
  items: CartItem[];
}

export const cartStore = new Store<CartState>({ items: [] });

export const cartActions = {
  addItem: (product: Product, quantity = 1) => {
    cartStore.setState((state) => {
      const existingItem = state.items.find((item) => item.productId === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item,
          ),
        };
      }

      return {
        items: [...state.items, { productId: product.id, quantity }],
      };
    });
  },

  removeItem: (productId: number) => {
    cartStore.setState((state) => ({
      items: state.items.filter((item) => item.productId !== productId),
    }));
  },

  updateQuantity: (productId: number, quantity: number) => {
    cartStore.setState((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.productId !== productId),
        };
      }

      return {
        items: state.items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
      };
    });
  },

  incrementQuantity: (productId: number) => {
    cartStore.setState((state) => ({
      items: state.items.map((item) =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    }));
  },

  decrementQuantity: (productId: number) => {
    cartStore.setState((state) => {
      const item = state.items.find((i) => i.productId === productId);
      if (!item || item.quantity <= 1) {
        return {
          items: state.items.filter((i) => i.productId !== productId),
        };
      }

      return {
        items: state.items.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i)),
      };
    });
  },

  clearCart: () => {
    cartStore.setState({ items: [] });
  },

  loadCart: (items: CartItem[]) => {
    cartStore.setState({ items });
  },
};

export const cartSelectors = {
  getItems: () => cartStore.state.items,
  getItemCount: () => cartStore.state.items.reduce((total, item) => total + item.quantity, 0),

  getCartTotal: (products: Product[]) => {
    return cartStore.state.items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  },

  isInCart: (productId: number) => cartStore.state.items.some((item) => item.productId === productId),

  getQuantity: (productId: number) => {
    const item = cartStore.state.items.find((i) => i.productId === productId);
    return item ? item.quantity : 0;
  },
};
