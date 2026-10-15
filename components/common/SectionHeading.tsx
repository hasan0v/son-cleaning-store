import { cn } from '@/lib/utils'
import Reveal from '@/components/motion/Reveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  className?: string
  /** Use h1 when the heading opens a page */
  as?: 'h1' | 'h2'
}

export default function SectionHeading({ eyebrow, title, description, align = 'left', className, as: Heading = 'h2' }: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className={cn('eyebrow', align === 'center' && 'justify-center')}>{eyebrow}</p>}
      <Heading className="mt-3 text-3xl font-bold leading-tight text-brand-ink sm:text-4xl">{title}</Heading>
      {description && <p className="mt-4 text-lg leading-relaxed text-slate-600">{description}</p>}
    </Reveal>
  )
}
