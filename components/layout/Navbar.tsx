'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Ana səhifə' },
  { href: '/products', label: 'Məhsullar' },
  { href: '/#about', label: 'Haqqımızda' },
  { href: '/#faq', label: 'Suallar' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  // The admin panel has its own chrome
  const hidden = pathname?.startsWith('/admin')
  // Over the home hero the bar starts transparent with light text
  const overHero = pathname === '/' && !scrolled && !open

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (hidden) return null

  const isActive = (href: string) => (href === '/products' ? pathname?.startsWith('/products') : false)

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300',
        overHero
          ? 'border-b border-transparent bg-transparent'
          : 'border-b border-border/70 bg-white/85 shadow-[0_1px_0_rgb(11_31_51/0.02)] backdrop-blur-xl'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[4.5rem] lg:px-8" aria-label="Əsas naviqasiya">
        <Link
          href="/"
          aria-label="SON — ana səhifə"
          className={cn(
            'flex items-center rounded-xl px-2 py-1 transition-colors',
            overHero && 'bg-white/90 shadow-soft backdrop-blur'
          )}
        >
          <Image src="/brand/son-logo.png" alt="SON" width={480} height={335} priority className="h-9 w-auto lg:h-10" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'rounded-full px-4 py-2 text-[0.94rem] font-medium transition-colors',
                  overHero ? 'text-white/85 hover:bg-white/10 hover:text-white' : 'text-slate-600 hover:bg-brand-mist hover:text-brand-ink',
                  isActive(link.href) && !overHero && 'bg-brand-mist text-brand-ink'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/#contact" className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            Əlaqə saxla
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Menyunu bağla' : 'Menyunu aç'}
            className={cn(
              'grid size-10 place-items-center rounded-full transition-colors md:hidden',
              overHero ? 'text-white hover:bg-white/10' : 'text-brand-ink hover:bg-brand-mist'
            )}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'grid overflow-hidden bg-white transition-[grid-template-rows] duration-300 ease-out md:hidden',
          open ? 'grid-rows-[1fr] border-t border-border' : 'grid-rows-[0fr]'
        )}
        inert={!open}
      >
        <div className="min-h-0">
          <ul className="space-y-1 px-4 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-brand-ink hover:bg-brand-mist"
                >
                  {link.label}
                  <ArrowRight className="size-4 text-slate-400" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-4 pb-5">
            <Link href="/#contact" onClick={() => setOpen(false)} className="btn-primary w-full">
              Əlaqə saxla
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
