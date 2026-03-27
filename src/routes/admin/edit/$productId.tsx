import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useActionState, useState } from 'react';
import { Package, DollarSign, Star, Image, Tag, Box, ArrowLeft, Zap } from 'lucide-react';
import { ShopHeader } from '@/components/ShopHeader';
import { ShopFooter } from '@/components/ShopFooter';
import { Product } from '@/types';
import { getProductById } from '@/server/product.functions';
import { productsCollection } from '@/db/products.db';

type ActionState = { saved: boolean; error: string | null };

function submitLabel(isPending: boolean, saved: boolean): string {
  if (isPending) return 'Saving…';
  if (saved) return 'Saved!';
  return 'Save Changes';
}

export const Route = createFileRoute('/admin/edit/$productId')({
  loader: async ({ params }) => {
    const product = await getProductById({ data: { id: params.productId } });
    return { product };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { product } = Route.useLoaderData();
  console.log("🚀 ~ RouteComponent ~ product:", product)
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<Product, '_id'>>({
    name: product.name,
    category: product.category,
    brand: product.brand,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    description: product.description ?? '',
    rating: product.rating,
    inStock: product.inStock,
    badge: product.badge,
  });

  const [{ saved, error }, submitAction, isPending] = useActionState<ActionState>(
    async () => {
      try {
        productsCollection.update(product._id, (draft) => {
          draft.name = formData.name;
          draft.category = formData.category;
          draft.brand = formData.brand;
          draft.price = Number(formData.price);
          draft.originalPrice = formData.originalPrice ? Number(formData.originalPrice) : undefined;
          draft.image = formData.image;
          draft.description = formData.description;
          draft.rating = Number(formData.rating);
          draft.inStock = formData.inStock;
          draft.badge = formData.badge;
        });

        setTimeout(() => router.navigate({ to: `/shop/${product._id}` }), 200);
        return { saved: true, error: null };
      } catch (err) {
        return { saved: false, error: err instanceof Error ? err.message : 'Failed to update product' };
      }
    },
    { saved: false, error: null },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    const undefinedIfEmpty = (value: string) => value === '' ? undefined : value;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefinedIfEmpty(value),
    }));
  };

  return (
    <div className="dark bg-[#0d1217] text-white min-h-screen font-['Space_Grotesk']">
      <ShopHeader />

      <main className="max-w-4xl mx-auto px-6 lg:px-12 py-8">
        <button
          onClick={() => globalThis.history.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-[#00a388] mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Page Header */}
        <div className="relative mb-12 p-8 rounded-3xl overflow-hidden bg-linear-to-br from-[#161b22] to-[#0d1217] border border-white/5">
          <div
            className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #e6ff00 0%, transparent 70%)' }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e6ff00] p-2 rounded-lg">
                <Package size={24} className="text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                Edit <span className="text-[#e6ff00]">Product</span>
              </h1>
            </div>
            <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
              Changes apply <span className="text-[#e6ff00] font-bold">instantly</span> via optimistic mutation — the UI
              updates before the server responds.
            </p>
          </div>
        </div>

        {/* Optimistic update callout */}
        <div className="flex items-start gap-3 mb-8 p-4 rounded-xl bg-[#e6ff00]/5 border border-[#e6ff00]/20 text-sm">
          <Zap size={16} className="text-[#e6ff00] mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-[#e6ff00]">Optimistic Mutation via TanStack DB</span>
            <span className="text-slate-400">
              {' '}— <code className="text-slate-300">productsCollection.update(id, draft =&gt; &#123;...&#125;)</code>{' '}
              applies the change to the local collection immediately. The <code className="text-slate-300">onUpdate</code>{' '}
              callback syncs it to MongoDB in the background. If the server fails, TanStack DB rolls back automatically.
            </span>
          </div>
        </div>

        <form action={submitAction} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-[#161b22]/40 border border-white/5 rounded-2xl p-8">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Box className="text-[#00a388]" size={20} />
              Basic Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0d1217] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0d1217] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0d1217] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description ?? ''}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#0d1217] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#161b22]/40 border border-white/5 rounded-2xl p-8">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <DollarSign className="text-[#00a388]" size={20} />
              Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full bg-[#0d1217] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                  Original Price (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice ?? ''}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full bg-[#0d1217] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Media & Details */}
          <div className="bg-[#161b22]/40 border border-white/5 rounded-2xl p-8">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Image className="text-[#00a388]" size={20} />
              Media & Details
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0d1217] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                    Rating
                  </label>
                  <div className="relative">
                    <Star
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E6FF00] fill-[#E6FF00]"
                      size={18}
                    />
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full bg-[#0d1217] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                    Badge (Optional)
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select
                      name="badge"
                      value={formData.badge ?? ''}
                      onChange={handleChange}
                      className="w-full bg-[#0d1217] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">None</option>
                      <option value="trending">Trending</option>
                      <option value="new">New</option>
                      <option value="sale">Sale</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold uppercase text-slate-400 tracking-widest">In Stock</span>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, inStock: !prev.inStock }))}
                    className={`w-14 h-7 rounded-full relative border transition-colors ${
                      formData.inStock ? 'bg-[#00a388]/20 border-[#00a388]/30' : 'bg-white/10 border-white/20'
                    }`}
                  >
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition-all ${
                        formData.inStock ? 'right-1 bg-[#00a388]' : 'left-1 bg-slate-400'
                      }`}
                    />
                  </button>
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
              <p className="font-semibold">Error updating product:</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {saved && (
            <div className="bg-[#00a388]/10 border border-[#00a388]/30 rounded-xl p-4 text-[#00a388] font-semibold flex items-center gap-2">
              <Zap size={16} />
              Optimistic update applied — syncing to server & redirecting…
            </div>
          )}

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => globalThis.history.back()}
              disabled={isPending}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || saved}
              className="px-8 py-3 bg-[#e6ff00] hover:bg-[#d4eb00] text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(230,255,0,0.2)] hover:shadow-[0_0_30px_rgba(230,255,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitLabel(isPending, saved)}
            </button>
          </div>
        </form>
      </main>

      <ShopFooter />
    </div>
  );
}
