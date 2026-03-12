'use client'

import { useEffect } from 'react'

export function RegisterServiceWorker() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('[v0] Service Worker registered successfully:', registration)
        })
        .catch((error) => {
          console.warn('[v0] Service Worker registration failed:', error)
        })
    }
  }, [])

  return null
}
