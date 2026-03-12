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
        {/* Profile Info */}
        <div className="glass-dark rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">{t('profile')}</h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 uppercase">Phone</label>
              <p className="text-white font-medium">{user.phone}</p>
            </div>
            <div>
              <label className="text-xs text-slate-400 uppercase">{t('safetyScore')}</label>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex-1 bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{ width: `${user.safetyScore}%` }}
                  />
                </div>
                <span className="text-white font-bold">{user.safetyScore}/100</span>
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
