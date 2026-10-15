import { Award, BadgePercent, Truck, Building2, Check } from 'lucide-react'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/common/SectionHeading'

const pillars = [
  {
    icon: Award,
    title: 'Keyfiyyətli məhsullar',
    text: 'Azərbaycanda istehsal olunan, keyfiyyət standartlarına uyğun təmizlik vasitələri.',
  },
  {
    icon: BadgePercent,
    title: 'Topdan qiymətlər',
    text: 'Mağazalar və iş yerləri üçün bütün çeşiddə əlverişli topdan qiymətlər.',
  },
  {
    icon: Truck,
    title: 'Sürətli çatdırılma',
    text: 'Gəncə, Goranboy, Samux və ətraf rayonlara çatdırılma xidməti.',
  },
  {
    icon: Building2,
    title: 'Peşəkar həllər',
    text: 'Hotellər, restoranlar və ofislər üçün güclü, qənaətcil formullar.',
  },
]

const range = [
  'Qabyuyan maye — 1 L-dən 5 L-ə qədər müxtəlif həcmlər',
  'Duru və toz ağardıcılar',
  'Əl üçün yumşaq tərkibli maye sabunlar',
  'Dezinfeksiya üçün xlor məhsulları',
]

export default function About() {
  return (
    <section id="about" className="bg-brand-mist/60 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Niyə SON?"
              title={<>Gəncədə ən keyfiyyətli <span className="text-brand-blue">təmizlik məhsulları</span></>}
              description={
                <>
                  <strong className="font-semibold text-brand-ink">SON Təmizlik Məhsulları</strong> olaraq 15 ildən artıqdır ki,
                  ev və peşəkar istifadə üçün etibarlı təmizlik vasitələri təqdim edirik.
                </>
              }
            />
            <Reveal delay={0.1}>
              <ul className="mt-8 space-y-3">
                {range.map((item) => (
                  <li key={item} className="flex gap-3 text-slate-700">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-green/15 text-brand-green">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-8 rounded-2xl border border-white bg-white/70 p-5 text-[0.95rem] leading-relaxed text-slate-600">
                Zülfü Hacıyev 56 ünvanında yerləşən mağazamızdan bütün növ təmizlik məhsullarını əldə edə bilərsiniz.
                Gəncə, Goranboy, Samux və ətraf rayonlara çatdırılma mövcuddur.
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
            {pillars.map((pillar, index) => (
              <Reveal as="li" key={pillar.title} delay={index * 0.07}>
                <div className="card-surface h-full p-6 sm:p-7">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-blue text-white shadow-[0_8px_20px_-8px_rgb(22_104_184/0.6)]">
                    <pillar.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-brand-ink">{pillar.title}</h3>
                  <p className="mt-2 leading-relaxed text-slate-600">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
