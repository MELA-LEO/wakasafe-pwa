'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const router = useRouter()
  const { user, addEmergencyContact, updateSafetyScore } = useAuth()
  const { t } = useLanguage()
  const [newContact, setNewContact] = useState('')

  if (!user) {
    return null
  }

  const handleAddContact = () => {
    if (newContact.trim()) {
      addEmergencyContact(newContact)
      setNewContact('')
    }
  }

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
            {t('profile')}
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Profile Header Card */}
        <div className="glass-dark rounded-2xl p-8 space-y-6">
          {/* User Info with Verified Badge and Profile Picture */}
          <div className="flex items-start gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-white">
                  {user.phone?.charAt(0) || 'U'}
                </span>
              </div>
              <label className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 cursor-pointer transition-colors">
                <Plus className="w-4 h-4" />
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>

            {/* User Info */}
            <div className="space-y-3 flex-1">
              <h2 className="text-3xl font-bold text-white">Hello, {user.name}!</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-slate-400">{user.phone}</span>
                <div className="flex items-center gap-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                  <span className="text-xs font-semibold text-emerald-300">Verified</span>
                </div>
                <div className="flex items-center gap-1 bg-purple-500/20 border border-purple-500/50 rounded-full px-3 py-1">
                  <span className="text-xs font-semibold text-purple-300">Premium ⭐</span>
                </div>
              </div>
              <Link href="/plans" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                View all plans →
              </Link>
            </div>
          </div>

          {/* Safety Score with Progress Ring */}
          <div className="grid grid-cols-2 gap-6">
            {/* Safety Score */}
            <div className="space-y-3">
              <label className="text-xs text-slate-400 uppercase font-semibold">{t('safetyScore')}</label>
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${(user.safetyScore / 100) * 282.7} 282.7`}
                    className="text-green-500 transition-all"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{user.safetyScore}</div>
                    <div className="text-xs text-slate-400">/100</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Contribution */}
            <div className="space-y-3">
              <label className="text-xs text-slate-400 uppercase font-semibold">Safety Contribution</label>
              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-700"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${(72 / 100) * 282.7} 282.7`}
                    className="text-blue-500 transition-all"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">72</div>
                    <div className="text-xs text-slate-400">reports</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="glass-dark rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">{t('emergencyContacts')}</h2>

          {/* Add Contact Form */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Contact name or number"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddContact()}
                className="bg-slate-900/50 border-slate-700/50 text-white"
              />
              <Button
                onClick={handleAddContact}
                size="sm"
                className="bg-green-600 hover:bg-green-700 gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </div>

          {/* Contacts List */}
          {user.emergencyContacts.length > 0 ? (
            <div className="space-y-2">
              {user.emergencyContacts.map((contact) => (
                <div
                  key={contact}
                  className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
                >
                  <span className="text-slate-200">{contact}</span>
                  <button className="p-1 hover:bg-red-500/20 rounded transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-4">No emergency contacts added</p>
          )}
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
