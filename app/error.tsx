'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { TriangleAlert } from 'lucide-react'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <section className="grid min-h-[80vh] place-items-center px-4 pb-16 pt-32">
      <div className="max-w-md text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-red-50 text-brand-red">
          <TriangleAlert className="size-8" aria-hidden />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-brand-ink">Xəta baş verdi</h1>
        <p className="mt-3 text-slate-600">Təəssüf ki, nəsə alınmadı. Zəhmət olmasa yenidən cəhd edin.</p>
        {process.env.NODE_ENV === 'development' && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-left font-mono text-sm text-red-700">{error.message}</p>
        )}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={reset} className="btn-primary">Yenidən cəhd et</button>
          <Link href="/" className="btn-outline">Ana səhifə</Link>
        </div>
      </div>
    </section>
  )
}
