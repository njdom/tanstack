import { Database, AtSign, Globe, Share2, ArrowRight } from 'lucide-react'

export function ShopFooter() {
  return (
    <footer className="bg-[#1C1E22] border-t border-white/10 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-[#00a388] rounded-lg flex items-center justify-center text-white">
                <Database size={14} />
              </div>
              <h2 className="text-lg font-bold uppercase">
                Modern<span className="text-[#00a388]">Shop</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Redefining the digital shopping experience through AI-integration and premium
              industrial aesthetics.
            </p>
            <div className="flex items-center gap-4">
              <a
                className="size-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#00a388] transition-colors"
                href="#"
              >
                <AtSign size={18} />
              </a>
              <a
                className="size-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#00a388] transition-colors"
                href="#"
              >
                <Globe size={18} />
              </a>
              <a
                className="size-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#00a388] transition-colors"
                href="#"
              >
                <Share2 size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a className="hover:text-[#00a388] transition-colors" href="#">
                  Neural Tech
                </a>
              </li>
              <li>
                <a className="hover:text-[#00a388] transition-colors" href="#">
                  Cyber-Chic
                </a>
              </li>
              <li>
                <a className="hover:text-[#00a388] transition-colors" href="#">
                  Home Core
                </a>
              </li>
              <li>
                <a className="hover:text-[#00a388] transition-colors" href="#">
                  Daily Deals
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a className="hover:text-[#00a388] transition-colors" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-[#00a388] transition-colors" href="#">
                  Research Lab
                </a>
              </li>
              <li>
                <a className="hover:text-[#00a388] transition-colors" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-[#00a388] transition-colors" href="#">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-slate-400 mb-4">Get AI-curated updates on new drops.</p>
            <div className="relative">
              <input
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:border-[#00a388] outline-none transition-all"
                placeholder="Email address"
                type="email"
              />
              <button className="absolute right-2 top-1.5 bg-[#00a388] text-white p-1.5 rounded-lg hover:opacity-90">
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© 2026 Modern Shop Labs. All rights reserved.</p>
          <div className="flex gap-8 text-xs text-slate-500">
            <a className="hover:text-white" href="#">
              Privacy Protocol
            </a>
            <a className="hover:text-white" href="#">
              Terms of Service
            </a>
            <a className="hover:text-white" href="#">
              Cookie Matrix
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
