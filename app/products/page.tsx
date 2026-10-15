import { getAllProducts, getCategoriesWithCounts, getProductsByCategory } from '@/lib/data'
import ProductGrid from '@/components/products/ProductGrid'
import CategoryFilter from '@/components/products/CategoryFilter'

export const metadata = {
  title: 'Təmizlik Məhsulları | Qabyuyan Maye, Ağardıcı, Təmizlik Vasitələri - SON Gəncə',
  description: 'Gəncədə təmizlik məhsulları - qabyuyan maye, ağardıcı, maye sabun, xlor, təmizlik vasitələri. SON keyfiyyəti ilə topdan və pərakəndə satış. Sürətli çatdırılma və ucuz qiymətlər.',
  keywords: 'təmizlik məhsulları, qabyuyan maye, ağardıcı, maye sabun, xlor, təmizlik vasitələri, təmizlik, temizlik, temizlik vasiteleri, gəncə təmizlik, duru ağardıcı, toz ağardıcı, ev təmizlik məhsulları, professional təmizlik, ucuz təmizlik məhsulları, topdan təmizlik məhsulları, son təmizlik məhsulları',
  openGraph: {
    title: 'Təmizlik Məhsulları Kataloqu | SON Gəncə',
    description: 'Keyfiyyətli təmizlik məhsulları - qabyuyan maye, ağardıcı, maye sabun və təmizlik vasitələri. Gəncədə topdan satış.',
    type: 'website',
    url: 'https://son-temizlik.com/products',
    images: [
      {
        url: '/brand/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SON Təmizlik Məhsulları',
      },
    ],
  },
  alternates: {
    canonical: 'https://son-temizlik.com/products',
  },
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category: selectedSlug } = await searchParams
  const [categories, products] = await Promise.all([
    getCategoriesWithCounts(),
    selectedSlug ? getProductsByCategory(selectedSlug) : getAllProducts(),
  ])
  const selected = categories.find((c) => c.slug === selectedSlug)
  const total = categories.reduce((sum, c) => sum + c._count.products, 0)

  return (
    <>
      <section className="relative overflow-hidden bg-brand-ink pb-14 pt-32 sm:pb-16 sm:pt-36">
        <div aria-hidden className="absolute -right-32 -top-32 size-[30rem] rounded-full bg-brand-blue/30 blur-3xl" />
        <div aria-hidden className="absolute -bottom-40 left-1/4 size-96 rounded-full bg-brand-green/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow !text-brand-sky">Kataloq</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">{selected ? selected.name : 'Bütün məhsullar'}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            {selected
              ? `${selected.name} kateqoriyasında ${products.length} məhsul. Topdan sifariş üçün bizimlə əlaqə saxlayın.`
              : 'Qabyuyan maye, ağardıcı, maye sabun və xlor — ev və peşəkar istifadə üçün tam çeşid.'}
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CategoryFilter
            categories={categories.map((c) => ({ slug: c.slug, name: c.name, count: c._count.products }))}
            selected={selected?.slug}
            total={total}
          />
          <div className="mt-8">
            <ProductGrid products={products} prioritizeFirst={4} />
          </div>
        </div>
      </section>
    </>
  )
}
