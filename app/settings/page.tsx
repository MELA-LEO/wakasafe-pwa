'use client'

import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/language-context'
import { LanguageSwitcher } from '@/components/language-switcher'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Bell, Shield, Smartphone } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const router = useRouter()
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/30 backdrop-blur-md bg-slate-950/40 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-800/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            {t('settings')}
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Language Settings */}
        <div className="glass-dark rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-white">Language</h2>
          </div>
          <p className="text-sm text-slate-400 mb-4">Choose your preferred language</p>
          <div className="flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-dark rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-yellow-400" />
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-800/30 transition-colors">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-slate-300">Incident alerts</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-800/30 transition-colors">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-slate-300">Safety score updates</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-800/30 transition-colors">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-slate-300">Ride reminders</span>
            </label>
          </div>
        </div>

        {/* Safety Settings */}
        <div className="glass-dark rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-semibold text-white">Safety</h2>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-800/30 transition-colors">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-slate-300">Share location with contacts</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-800/30 transition-colors">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-slate-300">Auto-SOS on high-impact crash</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-800/30 transition-colors">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-sm text-slate-300">Emergency call on SOS</span>
            </label>
          </div>
        </div>

        {/* Back to Dashboard */}
        <Link href="/dashboard">
          <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
            Back to Dashboard
          </Button>
        </Link>
      </main>
    </div>
  )
}
