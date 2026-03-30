import { useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

export const useScrollTo = () => {
  const router = useRouter()
  const pathname = usePathname()

  return useCallback((id: string) => {
    if (pathname !== '/') {
      router.push(`/#${id}`)
      return
    }
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: `#${id}`, offsetY: 80 },
      ease: 'power3.inOut',
    })
  }, [pathname, router])
}