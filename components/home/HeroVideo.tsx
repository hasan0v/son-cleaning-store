'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } }

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Keep the still poster for people who asked for less motion or less data
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true
    if (reduceMotion || saveData) return

    video.preload = 'auto'
    video.load()

    // Only decode while the hero is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.1 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div aria-hidden className="absolute inset-0">
      <picture>
        <source srcSet="/media/hero-poster.avif" type="image/avif" />
        <img
          src="/media/hero-poster.webp"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </picture>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        onPlaying={() => setPlaying(true)}
        className={cn(
          'absolute inset-0 size-full object-cover transition-opacity duration-1000 ease-out',
          playing ? 'opacity-100' : 'opacity-0'
        )}
      >
        <source src="/media/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/media/hero-1080.webm" type="video/webm" />
        <source src="/media/hero-1080.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
