import type { Category } from '../types'

interface CategoryCardProps {
  category: Category
  className?: string
  size?: 'large' | 'small'
}

export function CategoryCard({ category, className = '', size = 'small' }: CategoryCardProps) {
  if (size === 'large') {
    return (
      <div
        className={`relative rounded-xl overflow-hidden group cursor-pointer ${className}`}
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

  return (
    <div
      className={`relative rounded-xl overflow-hidden group cursor-pointer ${className}`}
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
