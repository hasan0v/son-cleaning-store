'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { faqs } from '@/lib/faq'
import { cn } from '@/lib/utils'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Suallar"
            title="Tez-tez verilən suallar"
            description="Təmizlik məhsulları, topdan satış və çatdırılma barədə ən çox soruşulanlar."
          />
          <Reveal delay={0.1}>
            <Link href="/#contact" className="btn-secondary mt-8">
              Sualınızı göndərin
            </Link>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-8">
          <ul className="divide-y divide-border rounded-2xl border border-border bg-white">
            {faqs.map((faq, index) => {
              const open = openIndex === index
              const panelId = `${baseId}-panel-${index}`
              const buttonId = `${baseId}-button-${index}`
              return (
                <li key={faq.question}>
                  <h3>
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : index)}
                      className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left text-base font-semibold text-brand-ink transition-colors hover:text-brand-blue sm:px-7 sm:text-lg"
                    >
                      {faq.question}
                      <span
                        className={cn(
                          'grid size-8 shrink-0 place-items-center rounded-full border border-border transition-[transform,background-color,color,border-color] duration-300',
                          open && 'rotate-45 border-brand-blue bg-brand-blue text-white'
                        )}
                      >
                        <Plus className="size-4" aria-hidden />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                      open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    )}
                    inert={!open}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-5 pb-6 leading-relaxed text-slate-600 sm:px-7">{faq.answer}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
