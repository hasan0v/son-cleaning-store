import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCategoriesWithCounts, getFeaturedProducts } from '@/lib/data'
import { faqSchema } from '@/lib/faq'
import Hero from '@/components/home/Hero'
import CategoryGrid from '@/components/home/CategoryGrid'
import About from '@/components/home/About'
import Contact from '@/components/home/Contact'
import ProductGrid from '@/components/products/ProductGrid'
import FAQSection from '@/components/sections/FAQSection'
import SectionHeading from '@/components/common/SectionHeading'

export const revalidate = 3600

export const metadata = {
  title: 'SON — Təmizlik Məhsullarında Güvənilir Brend',
  description: 'Qabyuyan Maye, Ağardıcı, Sabun və daha çox məhsul — topdan satış üçün keyfiyyətli həllər. SON brendinin yüksək keyfiyyətli təmizlik məhsulları.',
  keywords: 'son, təmizlik məhsulları, qabyuyan maye, ağardıcı, sabun, topdan satış, Gəncə',
  openGraph: {
    title: 'SON — Təmizlik Məhsullarında Güvənilir Brend',
    description: 'Qabyuyan Maye, Ağardıcı, Sabun və daha çox məhsul — topdan satış üçün keyfiyyətli həllər',
    type: 'website',
  },
}

export default async function Page() {
  const [categories, featuredProducts] = await Promise.all([getCategoriesWithCounts(), getFeaturedProducts()])
  const productCount = categories.reduce((sum, category) => sum + category._count.products, 0)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Hero productCount={productCount} categoryCount={categories.length} />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Kateqoriyalar"
            title="Hər ehtiyac üçün təmizlik vasitəsi"
            description="Mətbəxdən vanna otağına — gündəlik və peşəkar təmizlik üçün geniş çeşid."
          />
          <div className="mt-12">
            <CategoryGrid categories={categories} />
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-slate-50/70 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Seçilmiş"
              title="Ən çox seçilən məhsullar"
              description="Müştərilərimizin ən çox etibar etdiyi məhsullar."
            />
            <Link href="/products" className="btn-outline group shrink-0 self-start sm:self-auto">
              Bütün məhsullar
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <div className="mt-12">
            <ProductGrid products={featuredProducts} columns={3} />
          </div>
        </div>
      </section>

      <About />
      <FAQSection />
      <Contact />
    </>
  )
}
