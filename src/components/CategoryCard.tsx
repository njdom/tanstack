import type { Category } from '../types'

interface CategoryCardProps {
  category: Category
  className?: string
}

export function CategoryCard({ category, className = '' }: CategoryCardProps) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden group cursor-pointer col-span-12 md:col-span-5 row-span-1${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `linear-gradient(45deg, rgba(0,0,0,0.8), transparent), url('${category.image}')`,
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
        <h3 className="text-3xl font-bold mb-2">{category.name}</h3>
        <p className="text-slate-300">{category.description}</p>
      </div>
    </div>
  )
}
