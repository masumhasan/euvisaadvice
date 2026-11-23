'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import SmartLoader from '@/components/SmartLoader'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    // When pathname changes, trigger loader
    setIsChanging(true)
    const timer = setTimeout(() => {
      setIsChanging(false)
    }, 800) // Slightly faster for page transitions

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {isChanging && <SmartLoader />}
      <div className={isChanging ? 'page-transition-fade' : ''}>
        {children}
      </div>
      
      <style jsx>{`
        .page-transition-fade {
          opacity: 0.3;
          filter: blur(5px);
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  )
}
