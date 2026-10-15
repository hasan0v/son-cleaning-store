import Link from 'next/link'
import { MapPin, Clock, Truck, ArrowRight } from 'lucide-react'
import ContactForm from '@/components/forms/ContactForm'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'

const details = [
  { icon: MapPin, title: 'Ünvan', text: 'Gəncə şəhəri, Zülfü Hacıyev 56' },
  { icon: Truck, title: 'Çatdırılma', text: 'Gəncə, Goranboy, Samux və ətraf rayonlar' },
  { icon: Clock, title: 'Cavab müddəti', text: 'Müraciətlərə ən qısa zamanda cavab veririk' },
]

export default function Contact() {
  return (
    <section id="contact" className="bg-gradient-to-b from-white to-brand-mist/70 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow="Əlaqə"
          title="Topdan sifariş və suallar üçün yazın"
          description="Məhsul, qiymət və ya çatdırılma ilə bağlı sorğunuzu göndərin — komandamız sizinlə əlaqə saxlayacaq."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-brand-ink p-7 text-white sm:p-8">
              <div aria-hidden className="absolute -bottom-24 -right-24 size-64 rounded-full bg-brand-blue/40 blur-3xl" />
              <h3 className="relative text-xl font-semibold">SON Təmizlik Məhsulları</h3>
              <ul className="relative mt-8 space-y-6">
                {details.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-sky">
                      <item.icon className="size-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-sm text-white/60">{item.title}</p>
                      <p className="mt-0.5 font-medium">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className="group relative mt-10 inline-flex items-center gap-2 self-start font-semibold text-brand-sky transition-colors hover:text-white lg:mt-auto"
              >
                Kataloqa baxın
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-8">
            <div className="card-surface p-6 sm:p-8 lg:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
