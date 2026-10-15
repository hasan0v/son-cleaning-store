import Image from 'next/image'
import Link from 'next/link'
import { MapPin, FileText, Factory, ArrowUpRight } from 'lucide-react'
import HideOnAdmin from './HideOnAdmin'

const nav = [
  { href: '/products', label: 'Bütün məhsullar' },
  { href: '/products?category=qabyuyan-maye', label: 'Qabyuyan maye' },
  { href: '/products?category=maye-sabun', label: 'Maye sabun' },
  { href: '/products?category=duru-agardici', label: 'Ağardıcılar' },
  { href: '/#faq', label: 'Tez-tez verilən suallar' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <HideOnAdmin>
      <footer className="relative overflow-hidden bg-brand-ink text-slate-300">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 size-[28rem] rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Link href="/" aria-label="SON — ana səhifə" className="inline-flex rounded-2xl bg-white px-4 py-3">
                <Image src="/brand/son-logo.png" alt="SON" width={480} height={335} className="h-12 w-auto" />
              </Link>
              <p className="mt-6 max-w-sm leading-relaxed text-slate-400">
                Keyfiyyətli məhsullar, etibarlı xidmət. Ev və peşəkar təmizlik üçün Gəncədən bütün Azərbaycana.
              </p>
            </div>

            <nav className="md:col-span-3" aria-label="Footer naviqasiyası">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Kataloq</h2>
              <ul className="mt-5 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-white">Əlaqə məlumatları</h2>
              <ul className="mt-5 space-y-4">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand-sky" aria-hidden />
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Z%C3%BClf%C3%BC+Hac%C4%B1yev+56+G%C9%99nc%C9%99"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group transition-colors hover:text-white"
                  >
                    Gəncə şəhəri, Zülfü Hacıyev 56
                    <ArrowUpRight className="ml-1 inline size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </li>
                <li className="flex gap-3">
                  <FileText className="mt-0.5 size-5 shrink-0 text-brand-sky" aria-hidden />
                  <span>VÖEN: 2306001922</span>
                </li>
                <li className="flex gap-3">
                  <Factory className="mt-0.5 size-5 shrink-0 text-brand-sky" aria-hidden />
                  <span>İstehsalçı: Ə. Müseyib Azər</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentYear} SON Təmizlik Məhsulları. Bütün hüquqlar qorunur.</p>
            <p>Peşəkar təmizlik həlləri</p>
          </div>
        </div>
      </footer>
    </HideOnAdmin>
  )
}
