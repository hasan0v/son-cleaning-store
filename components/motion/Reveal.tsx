'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Seconds; use small steps (0.06–0.08) to stagger siblings */
  delay?: number
  as?: 'div' | 'li' | 'section'
}

// The single scroll-reveal used across the site, so every section enters the same way.
// Styles live in globals.css ([data-reveal]); reduced-motion users get the content without movement.
export default function Reveal({ children, className, delay = 0, as: Component = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Component
      ref={ref as React.Ref<never>}
      data-reveal={visible ? 'in' : ''}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}
