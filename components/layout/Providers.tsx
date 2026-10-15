// Content inside Reveal starts hidden for the scroll animation; without JS show it immediately
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <noscript>
        <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
      </noscript>
      {children}
    </>
  )
}
