import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Package, DollarSign, Star, Image, Tag, Box, ArrowLeft } from 'lucide-react'
import { ShopHeader } from '@/components/ShopHeader'
import { ShopFooter } from '@/components/ShopFooter'
import { Product } from '@/types'

type FormData = Omit<Product, 'id'>
const defaultFormData: FormData = {
  name: '',
  category: '',
  brand: '',
  price: 0,
  originalPrice: 0,
  image: '',
  description: '',
  rating: 0,
  inStock: true,
  badge: undefined,
}


export const Route = createFileRoute('/admin/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [formData, setFormData] = useState<FormData>(defaultFormData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Product data:', formData)
    // Here you would typically send the data to your backend
    alert('Product created successfully!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="dark bg-[#0d1217] text-white min-h-screen font-['Space_Grotesk']">
      <ShopHeader />

      <main className="max-w-4xl mx-auto px-6 lg:px-12 py-8">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-[#00a388] mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Page Header */}
        <div className="relative mb-12 p-8 rounded-3xl overflow-hidden bg-linear-to-br from-[#161b22] to-[#0d1217] border border-white/5">
          <div
            className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 70% 30%, #00a388 0%, transparent 70%)',
            }}
          ></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#00a388] p-2 rounded-lg">
                <Package size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                Create <span className="text-[#00a388]">Product</span>
              </h1>
            </div>
            <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
              Add a new product to your catalog. Fill in all the details below.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-[#161b22]/40 border border-white/5 rounded-2xl p-8">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Box className="text-[#00a388]" size={20} />
              Basic Information
            </h2>

            <div className="space-y-6">
              {/* Product Name */}
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
                  placeholder="Enter product name"
                />
              </div>

              {/* Brand & Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0d1217] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors"
                    placeholder="e.g., Apex Peripherals"
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
                    placeholder="e.g., Peripherals"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-[#0d1217] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors resize-none"
                  placeholder="Enter product description"
                />
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-[#161b22]/40 border border-white/5 rounded-2xl p-8">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <DollarSign className="text-[#00a388]" size={20} />
              Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                  Price
                </label>
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
                    placeholder="0.00"
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
                    value={formData.originalPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full bg-[#0d1217] border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:border-[#00a388] focus:ring-1 focus:ring-[#00a388] outline-none transition-colors"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Media & Details Section */}
          <div className="bg-[#161b22]/40 border border-white/5 rounded-2xl p-8">
            <h2 className="text-xl font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Image className="text-[#00a388]" size={20} />
              Media & Details
            </h2>

            <div className="space-y-6">
              {/* Image URL */}
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
                  placeholder="/product-image.png"
                />
              </div>

              {/* Rating & Badge Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold uppercase text-slate-400 tracking-widest mb-2">
                    Rating
                  </label>
                  <div className="relative">
                    <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-[#E6FF00] fill-[#E6FF00]" size={18} />
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
                      placeholder="5.0"
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
                      value={formData.badge}
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

              {/* In Stock Toggle */}
              <div>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-bold uppercase text-slate-400 tracking-widest">
                    In Stock
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, inStock: !prev.inStock }))}
                    className={`w-14 h-7 rounded-full relative border transition-colors ${
                      formData.inStock
                        ? 'bg-[#00a388]/20 border-[#00a388]/30'
                        : 'bg-white/10 border-white/20'
                    }`}
                  >
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full transition-all ${
                        formData.inStock
                          ? 'right-1 bg-[#00a388]'
                          : 'left-1 bg-slate-400'
                      }`}
                    ></div>
                  </button>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-bold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-[#00a388] hover:bg-[#008f77] text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(0,163,136,0.3)] hover:shadow-[0_0_30px_rgba(0,163,136,0.5)]"
            >
              Create Product
            </button>
          </div>
        </form>
      </main>

      <ShopFooter />
    </div>
  )
}
