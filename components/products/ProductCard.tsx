import Image from 'next/image'
import { Package } from 'lucide-react'

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

interface ProductCardProps {
  product: Product
  priority?: boolean
  sizes?: string
}

export default function ProductCard({ product, priority = false, sizes = '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw' }: ProductCardProps) {
  return (
    <article className="group card-surface flex h-full flex-col overflow-hidden transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand-sky/40 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden bg-brand-mist">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 text-slate-400">
            <Package className="size-8" aria-hidden />
            <span className="text-xs">Şəkil yoxdur</span>
          </div>
        )}

        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-red px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-white shadow-sm">
            Seçilmiş
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col border-t border-border/70 p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-blue">{product.category?.name}</p>
        <h3 className="mt-1.5 text-[0.98rem] font-semibold leading-snug text-brand-ink sm:text-base">{product.title}</h3>

        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">{product.description}</p>
        )}

        {(product.volume || product.packSize) && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {product.volume && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{product.volume}</span>
            )}
            {product.packSize && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{product.packSize}</span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
