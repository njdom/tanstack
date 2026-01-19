import { Link } from '@tanstack/react-router'

export function ShopHeader() {
  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 bg-[#00a388] rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined">dataset</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight uppercase">
              Modern<span className="text-[#00a388]">Shop</span>
            </h2>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/shop"
              className="text-sm font-medium hover:text-[#00a388] transition-colors"
              activeProps={{ className: 'text-sm font-medium text-[#00a388] transition-colors' }}
            >
              Products
            </Link>
            <a className="text-sm font-medium hover:text-[#00a388] transition-colors" href="#">
              Categories
            </a>
            <a className="text-sm font-medium hover:text-[#00a388] transition-colors" href="#">
              Deals
            </a>
          </nav>
        </div>
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00a388] transition-colors">
              search
            </span>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-[#00a388]/50 focus:border-[#00a388] outline-none text-sm transition-all"
              placeholder="Search the future..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors relative">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="absolute top-1 right-1 size-4 bg-[#00a388] text-[10px] font-bold flex items-center justify-center rounded-full">
              3
            </span>
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-xl text-[#00a388]">
              account_circle
            </span>
            <span className="text-sm font-semibold">Account</span>
          </button>
        </div>
      </div>
    </header>
  )
}
