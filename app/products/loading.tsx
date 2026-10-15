export default function ProductsLoading() {
  return (
    <>
      <section className="bg-brand-ink pb-14 pt-32 sm:pb-16 sm:pt-36">
        <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-20 rounded bg-white/15" />
          <div className="mt-4 h-11 w-72 rounded-lg bg-white/15" />
          <div className="mt-5 h-5 w-full max-w-xl rounded bg-white/10" />
        </div>
      </section>
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl animate-pulse px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 w-28 rounded-full bg-slate-100" />
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-border">
                <div className="aspect-square bg-slate-100" />
                <div className="space-y-2 p-5">
                  <div className="h-3 w-20 rounded bg-slate-100" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-2/3 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
