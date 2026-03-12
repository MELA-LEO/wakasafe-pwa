'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { MapProvider } from '@/lib/map-context'
import { MapView } from './map-view'
import { WakaSheet } from './waka-sheet'
import { SOSButton } from './sos-button'
import { ReportGrid } from './report-grid'
import { RouteAdvisor } from './route-advisor'
import { LanguageSwitcher } from './language-switcher'
import { Button } from '@/components/ui/button'
import { Menu, LogOut, User, Settings } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

export function Dashboard() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading && !user) {
      router.push('/auth/onboarding')
    }
  }, [user, isLoading, mounted, router])

  if (!mounted || isLoading || !user) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-slate-700 border-t-green-500 rounded-full animate-spin mx-auto" />
          <p className="text-slate-400">{t('loading')}</p>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <MapProvider>
      <div className="w-full h-screen bg-slate-950 flex flex-col">
        {/* Header */}
        <header className="border-b border-slate-800/30 backdrop-blur-md bg-slate-950/40 z-20">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                WAKASAFE
              </div>
              <span className="text-xs text-slate-500 uppercase">
                {user.userType === 'logistics' ? 'Logistics' : 'Traveler'}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-slate-900/50 border-slate-700/30 hover:bg-slate-800/50"
                  >
                    <Menu className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 glass-dark border-slate-700/30">
                  {/* User Info */}
                  <div className="px-3 py-2 border-b border-slate-700/30">
                    <p className="text-xs font-medium text-slate-300">{user.phone}</p>
                    <p className="text-xs text-slate-500">{t('safetyScore')}: {user.safetyScore}/100</p>
                  </div>

                  <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    <span>{t('profile')}</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    <span>{t('settings')}</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-slate-700/30" />

                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 focus:text-red-400">
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>{t('logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <div className="w-full h-full relative p-4">
            {/* Map */}
            <MapView />

            {/* Waka Sheet */}
            <WakaSheet />

            {/* Report Grid */}
            <ReportGrid />

            {/* Route Advisor */}
            <RouteAdvisor />

            {/* SOS Button */}
            <SOSButton />
          </div>
        </main>
      </div>
    </MapProvider>
  )
}
