import { createFileRoute } from '@tanstack/react-router';
import { useMemo } from 'react';
import { ShopHeader } from '@/components/ShopHeader';
import { ShopFooter } from '@/components/ShopFooter';
import { useCart } from '@/hooks/useCart';
import { EmptyBag } from '@/components/cart/EmptyBag';
import { ProgressBar } from '@/components/cart/ProgressBar';
import { CartItem } from '@/components/cart/CartItem';
import { Summary } from '@/components/cart/Summary';
import { Recomendations } from '@/components/cart/Recomendations';
import { useProducts } from '@/hooks/useProductSearch';

export const Route = createFileRoute('/cart/')({
  component: CartPage,
  // SPA Mode - Cart is interactive, authenticated, no SEO needed
  ssr: false,
});

function CartPage() {
  const { items } = useCart();
  const productIds = useMemo(() => items.map((item) => item.productId), [items]);
  const { products: populatedCartItems = [] } = useProducts(productIds);

  // Calculate cart totals
  const subtotal = populatedCartItems?.reduce((sum, item) => sum + item.price * (items.find((i) => i.productId === item._id)?.quantity ?? 0), 0) ?? 0;
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Free shipping progress (need $200 for free shipping)
  const freeShippingThreshold = 200;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="dark bg-[#0d1217] text-slate-100 min-h-screen font-['Space_Grotesk'] grid-overlay">
      <ShopHeader />

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        {populatedCartItems.length === 0 ? (
          <EmptyBag />
        ) : (
          <>
            <ProgressBar amountToFreeShipping={amountToFreeShipping} shippingProgress={shippingProgress} />

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="grow">
                <div className="mb-8">
                  <h1 className="text-5xl font-black mb-2 tracking-tighter uppercase">Your Items</h1>
                  <p className="text-slate-500 font-medium">
                    {populatedCartItems.length} premium items ready for processing
                  </p>
                </div>

                <div className="space-y-4">
                  {populatedCartItems.map((item) => (
                    <CartItem key={item._id} item={{ ...item, quantity: items.find((i) => i.productId === item._id)?.quantity ?? 0 }} />
                  ))}
                </div>
              </div>

              <Summary subtotal={subtotal} tax={tax} total={total} />
            </div>
          </>
        )}

        <Recomendations />
      </main>

      <ShopFooter />
    </div>
  );
}
