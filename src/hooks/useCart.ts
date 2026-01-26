import { useStore } from '@tanstack/react-store';
import { cartStore, cartActions, cartSelectors } from '../store/cart.store';
import type { Product } from '../types';

export function useCart() {
  const state = useStore(cartStore);

  return {
    // State
    items: state.items,
    itemCount: cartSelectors.getItemCount(),

    // Actions
    addItem: cartActions.addItem,
    removeItem: cartActions.removeItem,
    updateQuantity: cartActions.updateQuantity,
    incrementQuantity: cartActions.incrementQuantity,
    decrementQuantity: cartActions.decrementQuantity,
    clearCart: cartActions.clearCart,

    // Selectors
    getCartTotal: (products: Product[]) => cartSelectors.getCartTotal(products),
    isInCart: cartSelectors.isInCart,
    getQuantity: cartSelectors.getQuantity,
  };
}
