import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Category {
  slug: string
  name: string
  count: number
}

interface CategoryFilterProps {
  categories: Category[]
  selected?: string
  total: number
}

export default function CategoryFilter({ categories, selected, total }: CategoryFilterProps) {
  const items = [{ slug: '', name: 'Hamısı', count: total }, ...categories]

  return (
    <nav aria-label="Kateqoriyalar" className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {items.map((category) => {
          const active = (selected ?? '') === category.slug
          return (
            <li key={category.slug || 'all'}>
              <Link
                href={category.slug ? `/products?category=${category.slug}` : '/products'}
                scroll={false}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'border-brand-ink bg-brand-ink text-white'
                    : 'border-border bg-white text-slate-600 hover:border-brand-blue/40 hover:text-brand-ink'
                )}
              >
                {category.name}
                <span
                  className={cn(
                    'rounded-full px-1.5 text-xs tabular-nums',
                    active ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'
                  )}
                >
                  {category.count}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
