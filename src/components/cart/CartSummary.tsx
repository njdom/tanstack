import { Link } from '@tanstack/react-router';
import { ShoppingCart, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { allProducts } from '@/data/shop';

interface CartSummaryProps {
  onClose?: () => void;
}

/**
 * Cart Summary Component - Shows a mini cart preview
 * Can be used in dropdowns, sidebars, or modals
 */
export function CartSummary({ onClose }: CartSummaryProps) {
  const { items, removeItem, getCartTotal } = useCart();

  const populatedItems = items
    .map(({ productId, quantity }) => {
      const product = allProducts.find((p) => p._id === productId);
      return product ? { ...product, quantity } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const total = getCartTotal(allProducts);

  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="size-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="text-slate-600" size={32} />
        </div>
        <p className="text-slate-400 mb-4">Your cart is empty</p>
        <Link
          to="/shop"
          onClick={onClose}
          className="inline-block px-6 py-2 bg-[#00a388] hover:bg-[#008f77] text-white font-bold rounded-lg text-sm transition-all"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-md">
      <div className="max-h-96 overflow-y-auto">
        {populatedItems.map((item) => (
          <div key={item._id} className="flex gap-4 p-4 border-b border-white/10 hover:bg-white/5 transition-colors">
            <div className="size-16 bg-black rounded-lg overflow-hidden shrink-0">
              <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-sm mb-1 truncate">{item.name}</h4>
              <p className="text-xs text-slate-500 mb-2">
                Qty: {item.quantity} × ${item.price.toFixed(2)}
              </p>
              <p className="font-bold text-[#00a388]">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeItem(item._id)}
              className="size-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-red-400"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-white/10 bg-[#1C1E22]">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold">Subtotal</span>
          <span className="text-xl font-black">${total.toFixed(2)}</span>
        </div>
        <Link
          to="/cart"
          onClick={onClose}
          className="w-full block text-center py-3 bg-[#00a388] hover:bg-[#008f77] text-white font-bold rounded-xl transition-all"
        >
          View Cart
        </Link>
      </div>
    </div>
  );
}
