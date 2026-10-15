import Link from 'next/link'
import { ArrowUpRight, Droplets, FlaskConical, Sparkles, SoapDispenserDroplet, ShieldPlus, Package, type LucideIcon } from 'lucide-react'
import Reveal from '@/components/motion/Reveal'

interface CategoryWithCount {
  id: string
  name: string
  slug: string
  desc: string | null
  _count: { products: number }
}

// Matched on slug fragments so categories added later in the admin still get a fitting icon
const iconRules: { match: string; icon: LucideIcon; tint: string }[] = [
  { match: 'qab', icon: Droplets, tint: 'bg-sky-50 text-brand-blue ring-sky-100' },
  { match: 'sabun', icon: SoapDispenserDroplet, tint: 'bg-emerald-50 text-brand-green ring-emerald-100' },
  { match: 'toz', icon: Sparkles, tint: 'bg-amber-50 text-amber-600 ring-amber-100' },
  { match: 'agardici', icon: FlaskConical, tint: 'bg-indigo-50 text-indigo-600 ring-indigo-100' },
  { match: 'xlor', icon: ShieldPlus, tint: 'bg-rose-50 text-brand-red ring-rose-100' },
]

function categoryStyle(slug: string) {
  return iconRules.find((rule) => slug.includes(rule.match)) ?? { icon: Package, tint: 'bg-slate-50 text-slate-600 ring-slate-100' }
}

export default function CategoryGrid({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
      {categories.map((category, index) => {
        const { icon: Icon, tint } = categoryStyle(category.slug)
        return (
          <Reveal as="li" key={category.id} delay={index * 0.06}>
            <Link
              href={`/products?category=${category.slug}`}
              className="group card-surface flex h-full flex-col p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand-sky/40 hover:shadow-lift sm:p-6"
            >
              <span className={`grid size-12 place-items-center rounded-xl ring-1 ${tint}`}>
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-semibold leading-snug text-brand-ink">{category.name}</h3>
              <p className="mt-1 flex items-center justify-between text-sm text-slate-500">
                {category._count.products} məhsul
                <ArrowUpRight
                  className="size-4 text-slate-300 transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-blue"
                  aria-hidden
                />
              </p>
            </Link>
          </Reveal>
        )
      })}
    </ul>
  )
}
