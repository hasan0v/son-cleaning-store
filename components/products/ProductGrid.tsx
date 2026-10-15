import { PackageSearch } from 'lucide-react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import Reveal from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

interface Product {
  id: string
  title: string
  description?: string | null
  imageUrl?: string | null
  volume?: string | null
  packSize?: string | null
  featured: boolean
  category: {
    id: string
    name: string
    slug: string
  }
}

interface ProductGridProps {
  products: Product[]
  prioritizeFirst?: number
  columns?: 3 | 4
}

export default function ProductGrid({ products, prioritizeFirst = 0, columns = 4 }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="card-surface flex flex-col items-center px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-brand-mist text-brand-blue">
          <PackageSearch className="size-7" aria-hidden />
        </span>
        <p className="mt-5 text-lg font-semibold text-brand-ink">Bu bölmədə hələ məhsul yoxdur</p>
        <p className="mt-1 text-slate-500">Digər kateqoriyalara baxın və ya bizimlə əlaqə saxlayın.</p>
        <Link href="/products" className="btn-outline mt-6">
          Bütün məhsullar
        </Link>
      </div>
    )
  }

  return (
    <ul className={cn('grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3', columns === 4 && 'lg:grid-cols-4')}>
      {products.map((product, index) => (
        <Reveal as="li" key={product.id} delay={(index % columns) * 0.06}>
          <ProductCard
            product={product}
            priority={index < prioritizeFirst}
            sizes={columns === 4 ? undefined : '(max-width: 768px) 50vw, 33vw'}
          />
        </Reveal>
      ))}
    </ul>
  )
}
