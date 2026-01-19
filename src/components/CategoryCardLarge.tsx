import type { Category } from '../types'

interface CategoryCardProps {
  category: Category
  className?: string
}

export function CategoryCardLarge({ category, className = '' }: CategoryCardProps) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden group cursor-pointer col-span-12 md:col-span-7 row-span-2 ${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.8), transparent), url('${category.image}')`,
        }}
      />
      <div className="absolute bottom-10 left-10">
        <h3 className="text-4xl font-bold mb-2">{category.name}</h3>
        <p className="text-slate-300 mb-6">{category.description}</p>
        <span className="bg-[#00a388] px-6 py-3 rounded-xl font-bold inline-block">
          Shop {category.name}
        </span>
      </div>
    </div>
  )

}
