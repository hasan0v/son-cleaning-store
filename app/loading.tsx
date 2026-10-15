export default function GlobalLoading() {
  return (
    <div className="grid min-h-[70vh] place-items-center pt-16" role="status">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-[3px] border-brand-mist border-t-brand-blue" />
        <p className="text-sm text-slate-500">Yüklənir…</p>
      </div>
    </div>
  )
}
