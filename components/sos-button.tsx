'use client'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { AlertTriangle, X } from 'lucide-react'

export function SOSButton() {
  const { user, addEmergencyContact } = useAuth()
  const { t } = useLanguage()
  const [isActive, setIsActive] = useState(false)
  const [pressProgress, setPressProgress] = useState(0)
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const pressStartRef = useRef<number | null>(null)

  const handleMouseDown = () => {
    pressStartRef.current = Date.now()
    let accumulated = 0

    pressTimerRef.current = setInterval(() => {
      accumulated += 50
      const progress = Math.min((accumulated / 3000) * 100, 100)
      setPressProgress(progress)

      if (progress >= 100) {
        if (pressTimerRef.current) {
          clearInterval(pressTimerRef.current)
        }
        triggerSOS()
      }
    }, 50)
  }

  const handleMouseUp = () => {
    if (pressTimerRef.current) {
      clearInterval(pressTimerRef.current)
    }
    if (pressProgress < 100) {
      setPressProgress(0)
    }
  }

  const handleTouchStart = () => {
    handleMouseDown()
  }

  const handleTouchEnd = () => {
    handleMouseUp()
  }

  const triggerSOS = async () => {
    setIsActive(true)
    setPressProgress(0)

    // Simulate sending SOS alert
    console.log('[v0] SOS Button Activated')
    console.log('[v0] Location:', user?.lastLocation)
    console.log('[v0] Emergency Contacts:', user?.emergencyContacts)

    // Keep SOS active for 5 seconds
    setTimeout(() => {
      setIsActive(false)
    }, 5000)
  }

  const deactivateSOS = () => {
    setIsActive(false)
    setPressProgress(0)
    if (pressTimerRef.current) {
      clearInterval(pressTimerRef.current)
    }
  }

  useEffect(() => {
    return () => {
      if (pressTimerRef.current) {
        clearInterval(pressTimerRef.current)
      }
    }
  }, [])

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
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            disabled={isActive}
            className={`relative w-full h-full rounded-full font-bold text-white transition-all transform ${
              isActive
                ? 'bg-red-600 shadow-2xl shadow-red-600/50 scale-100'
                : 'bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
          >
            {/* Progress ring SVG */}
            {!isActive && pressProgress > 0 && (
              <svg className="absolute inset-0" width="80" height="80">
                <circle
                  cx="40"
                  cy="40"
                  r="35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 35}`,
                    strokeDashoffset: `${2 * Math.PI * 35 * (1 - pressProgress / 100)}`,
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                    transition: 'stroke-dashoffset 0.05s linear',
                  }}
                />
              </svg>
            )}

            {/* Button content */}
            <div className="flex flex-col items-center justify-center h-full gap-1">
              <AlertTriangle className="w-6 h-6" />
              <span className="text-xs font-bold">SOS</span>
            </div>
          </button>

          {/* Time indicator */}
          {!isActive && pressProgress > 0 && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-red-400 font-medium">
              {Math.round(pressProgress / 100 * 3)}s
            </div>
          )}
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
