import { Link, useMatches, useLocation } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

type BreadcrumbVariant = 'shop' | 'product'

interface BreadcrumbItem {
  label: string
  path?: string
}

interface RouterBreadcrumbProps {
  variant?: BreadcrumbVariant
  // currentLabel?: string // Override label for the current page
}

export function RouterBreadcrumb({ variant = 'shop' }: RouterBreadcrumbProps) {
  const matches = useMatches()
  const location = useLocation()

  const latestMatch = matches[matches.length - 1]
  // const breadcrumbItems: BreadcrumbItem[] = matches.flatMap((match) => {
  //   const staticData = match.staticData as { breadcrumb?: string } | undefined
  //   if (!staticData?.breadcrumb) return []

  //   const value = Array.isArray(staticData.breadcrumb) ? staticData.breadcrumb : [staticData.breadcrumb]
  //   return value.map((label) => ({ label, path: match.pathname }))
  // })
  const staticData = latestMatch.staticData as { breadcrumb?: string } | undefined
  const breadcrums = staticData?.breadcrumb ? Array.isArray(staticData.breadcrumb) ? staticData.breadcrumb : [staticData.breadcrumb] : []

  const breadcrumbItems: BreadcrumbItem[] = breadcrums.map((breadcrumb) => ({ label: breadcrumb.label, path: breadcrumb.path }))

  const pathSegments = location.pathname.split('/').filter(Boolean)

  if (/^\d+$/.test(pathSegments[pathSegments.length - 1])) {
    breadcrumbItems.push({
      label: latestMatch.loaderData.product.name,
    })
  }

  if (breadcrumbItems.length === 0) {
    return null
  }

  const styles = {
    shop: {
      nav: 'flex items-center gap-2 mb-8 text-sm text-slate-500 dark:text-slate-400',
      link: 'hover:text-[#00a388]',
      separator: 'text-xs',
      current: 'text-white font-medium',
    },
    product: {
      nav: 'flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 mb-8',
      link: 'hover:text-[#00a388] transition-colors',
      separator: 'text-[12px]',
      current: 'text-[#00a388]',
    },
  }

  const style = styles[variant]

  return (
    <nav className={style.nav}>
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1

        return (
          <div key={item.path + index.toString()} className="flex items-center gap-2">
            {isLast ? (
              <span className={style.current}>{item.label}</span>
            ) : (
              <>
                <Link to={item.path} className={style.link}>
                  {item.label}
                </Link>
                <ChevronRight className={style.separator} />
              </>
            )}
          </div>
        )
      })}
    </nav>
  )
}
