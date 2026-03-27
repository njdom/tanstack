import { useStore } from '@tanstack/react-store';
import { cartStore, cartActions, cartSelectors } from '../store/cart.store';
import type { Product } from '../types';
import { useMemo } from 'react';
import { useProducts } from './useProducts';

export function useCart() {
  const { items } = useStore(cartStore);
  const productIds = useMemo(() => items.map((item) => item.productId), [items]);
  const { products: populatedCartItems = [] } = useProducts(productIds, false);

  const subtotal =
    populatedCartItems?.reduce(
      (sum, item) => sum + item.price * (items.find((i) => i.productId === item._id)?.quantity ?? 0),
      0,
    ) ?? 0;
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const freeShippingThreshold = 200;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const { addItem, removeItem, updateQuantity, incrementQuantity, decrementQuantity, clearCart } = cartActions;

  return {
    items,
    populatedCartItems,
    subtotal,
    tax,
    total,
    amountToFreeShipping,
    shippingProgress,
    itemCount: cartSelectors.getItemCount(),

    addItem,
    removeItem,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,

    getCartTotal: (products: Product[]) => cartSelectors.getCartTotal(products),
    isInCart: cartSelectors.isInCart,
    getQuantity: cartSelectors.getQuantity,
  };
}
