import { useStore } from '@tanstack/react-store';
import { searchStore, searchActions } from '@/store/search.store';
import { useProductCountByCategory } from '@/hooks/useProductCountByCategory';

export default function CategoryFilter() {
  const { selectedCategory } = useStore(searchStore);
  const categoryCounts = useProductCountByCategory();

  if (categoryCounts.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold uppercase text-slate-400 tracking-widest">CATEGORY</h4>
      <div className="space-y-2">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="radio"
            name="category"
            checked={ selectedCategory === '' }
            onChange={() => searchActions.setCategory('')}
            className="appearance-none w-4 h-4 border-2 border-slate-600 rounded-full bg-transparent cursor-pointer checked:bg-[#00a388] checked:border-[#00a388] transition-all"
          />
          <span className="text-sm text-white group-hover:text-[#00a388] transition-colors">All</span>
        </label>

        {categoryCounts
          .slice()
          .sort((a, b) => a.category.localeCompare(b.category))
          .map((item) => {
            return (
              <label key={item.category} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={ selectedCategory === item.category}
                  onChange={() => searchActions.setCategory(item.category)}
                  className="appearance-none w-4 h-4 border-2 border-slate-600 rounded-full bg-transparent cursor-pointer checked:bg-[#00a388] checked:border-[#00a388] transition-all shrink-0"
                />
                <span className="text-sm text-white group-hover:text-[#00a388] transition-colors capitalize flex-1">
                  {item.category}
                </span>
                <span className="text-xs font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded-full group-hover:text-[#00a388] group-hover:bg-[#00a388]/10 transition-colors">
                  {item.total}
                </span>
              </label>
            );
          })}
      </div>
    </div>
  );
}
