'use client'

import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { WordRotate } from '@/src/core/components/ui/word-rotate'

interface WordRotateConfettiProps {
  words: string[]
  className?: string
}

const COLORS: Record<string, string[]> = {
  'Salud':     ['#267A6E', '#5DCAA5', '#9FE1CB'],
  'Bienestar': ['#FFE87C', '#FFC300', '#FFD700'],
  'Cuidado':   ['#FF6B6B', '#FF8E8E', '#FFB3B3'],
  'Amor':      ['#FF69B4', '#FF1493', '#FFB6C1'],
}

export const WordRotateConfetti = ({ words, className }: WordRotateConfettiProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)

  useEffect(() => {
    const duration = 2500

    const fire = () => {
      const word = words[indexRef.current % words.length]
      const colors = COLORS[word] ?? ['#267A6E']

      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (rect.left + rect.width / 2) / window.innerWidth
      const y = (rect.top + rect.height / 2) / window.innerHeight

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x, y },
        colors,
        scalar: 0.8,
        gravity: 1.2,
      })

      indexRef.current++
    }

    fire()
    const interval = setInterval(fire, duration)
    return () => clearInterval(interval)
  }, [words])

  return (
    <div ref={containerRef}>
      <WordRotate
        className={className}
        words={words}
        duration={2500}
      />
    </div>
  )
}