'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { AlertTriangle, X } from 'lucide-react'

export function SOSButton() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [isActive, setIsActive] = useState(false)

  const triggerSOS = async () => {
    setIsActive(true)
  }

  const deactivateSOS = () => {
    setIsActive(false)
  }

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIsActive(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <>
      {/* SOS Button */}
      <div className="fixed bottom-40 right-4 z-30">
        <div className="relative w-20 h-20">
          {/* Pulsing rings background */}
          {isActive && (
            <>
              <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" />
              <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-pulse" />
            </>
          )}

          {/* Main button */}
          <button
            onClick={triggerSOS}
            disabled={isActive}
            className={`relative w-full h-full rounded-full font-bold text-white transition-all transform ${
              isActive
                ? 'bg-red-600 shadow-2xl shadow-red-600/50 scale-100'
                : 'bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
          >
            {/* Button content */}
            <div className="flex flex-col items-center justify-center h-full gap-1">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-xs font-bold">SOS</span>
            </div>
          </button>
        </div>
      </div>

      {/* SOS Active Modal */}
      {isActive && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-end">
          <div className="w-full glass-dark border-t border-slate-700/30 rounded-t-3xl p-6 space-y-4 animate-in slide-in-from-bottom-5">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <div>
                  <h2 className="text-lg font-bold text-red-400">{t('sosActive')}</h2>
                  <p className="text-xs text-slate-400">{t('callHelp')}</p>
                </div>
              </div>
              <button
                onClick={deactivateSOS}
                className="p-2 hover:bg-slate-800/30 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Info */}
            <div className="space-y-3 text-sm">
              <div className="glass rounded-lg p-3">
                <p className="text-slate-300">Sending your location to emergency contacts...</p>
              </div>
              {user?.emergencyContacts.length ? (
                <div className="glass rounded-lg p-3">
                  <p className="text-xs text-slate-400 mb-2">Alerting:</p>
                  <div className="space-y-1">
                    {user.emergencyContacts.map((contact) => (
                      <p key={contact} className="text-sm text-slate-300">
                        • {contact}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="glass rounded-lg p-3 border-yellow-500/30 bg-yellow-500/5">
                  <p className="text-xs text-yellow-300">No emergency contacts added. Add contacts in settings.</p>
                </div>
              )}
            </div>

            {/* Cancel button */}
            <button
              onClick={deactivateSOS}
              className="w-full py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}
