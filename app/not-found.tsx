import Link from 'next/link'
import { SearchX } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-4 pb-16 pt-32">
      <div className="max-w-md text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-mist text-brand-blue">
          <SearchX className="size-8" aria-hidden />
        </span>
        <p className="mt-6 font-display text-6xl font-extrabold text-brand-ink">404</p>
        <h1 className="mt-3 text-2xl font-bold text-brand-ink">Səhifə tapılmadı</h1>
        <p className="mt-3 text-slate-600">Axtardığınız səhifə mövcud deyil və ya köçürülüb.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">Ana səhifə</Link>
          <Link href="/products" className="btn-outline">Məhsullar</Link>
        </div>
      </div>
    </section>
  )
}
