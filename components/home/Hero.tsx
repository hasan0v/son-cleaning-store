import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import HeroVideo from './HeroVideo'

interface HeroProps {
  productCount: number
  categoryCount: number
}

export default function Hero({ productCount, categoryCount }: HeroProps) {
  const stats = [
    { value: '15+', label: 'il təcrübə' },
    { value: productCount > 0 ? `${productCount}+` : '20+', label: 'məhsul çeşidi' },
    { value: categoryCount > 0 ? String(categoryCount) : '5', label: 'kateqoriya' },
    { value: 'Topdan', label: 'və pərakəndə satış' },
  ]

  return (
    <section className="relative isolate flex min-h-[640px] items-end overflow-hidden bg-brand-ink h-[92svh] max-h-[920px]">
      <HeroVideo />

      {/* Legibility: dark from the left and bottom, the product stays visible on the right */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-ink/90 via-brand-ink/60 to-brand-ink/10" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-ink/90 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-28 sm:px-6 sm:pb-14 lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-md">
            <MapPin className="size-4 text-brand-sky" aria-hidden />
            Gəncədən bütün Azərbaycana
          </p>

          <h1
            className="mt-6 animate-fade-up text-[2.6rem] font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '80ms' }}
          >
            <span className="sr-only">SON — </span>Təmizlikdə{' '}
            <span className="bg-gradient-to-r from-brand-sky to-[#5fd39a] bg-clip-text text-transparent">güvənilir</span>{' '}
            brend
          </h1>

          <p
            className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-white/80 sm:text-xl"
            style={{ animationDelay: '160ms' }}
          >
            Qabyuyan maye, ağardıcı, maye sabun və xlor — ev və peşəkar istifadə üçün keyfiyyətli təmizlik vasitələri,
            topdan və pərakəndə.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 sm:flex-row" style={{ animationDelay: '240ms' }}>
            <Link href="/products" className="btn-primary group !px-7 !py-3.5">
              Məhsullara bax
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <Link href="/#contact" className="btn-ghost-light !px-7 !py-3.5">
              Topdan sifariş
            </Link>
          </div>
        </div>

        <dl
          className="mt-14 grid animate-fade-up grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-4"
          style={{ animationDelay: '360ms' }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-brand-ink/30 px-5 py-4 sm:px-6 sm:py-5">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-2xl font-bold text-white sm:text-3xl">{stat.value}</span>
                <span className="mt-0.5 block text-sm text-white/65">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
