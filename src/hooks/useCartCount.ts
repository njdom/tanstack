import { useStore } from '@tanstack/react-store';
import { cartStore, cartSelectors } from '../store/cart.store';
import type { Product } from '../types';

export function useCartCount() {
  const { items } = useStore(cartStore);

  return {
    items,
    itemCount: cartSelectors.getItemCount(),

    getCartTotal: (products: Product[]) => cartSelectors.getCartTotal(products),
    isInCart: cartSelectors.isInCart,
    getQuantity: cartSelectors.getQuantity,
  };
}
