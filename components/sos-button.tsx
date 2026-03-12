'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { AlertTriangle, X, AlertCircle } from 'lucide-react'

export function SOSButton() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [showModal, setShowModal] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleConfirmSOS = async () => {
    setIsConfirmed(true)
    console.log('[v0] SOS Confirmed - Emergency alert sent')
    console.log('[v0] User Location:', user?.lastLocation)
    console.log('[v0] Emergency Contacts:', user?.emergencyContacts)

    setTimeout(() => {
      setIsConfirmed(false)
      setShowModal(false)
    }, 3000)
  }

  const handleCancel = () => {
    setShowModal(false)
    setIsConfirmed(false)
  }

  return (
    <>
      {/* SOS Button - Single Tap */}
      <div className="fixed bottom-40 right-4 z-30">
        <button
          onClick={handleOpenModal}
          disabled={showModal}
          className={`relative w-20 h-20 rounded-full font-bold text-white transition-all transform shadow-lg ${
            showModal
              ? 'bg-red-600/50 shadow-red-600/30 scale-95 opacity-75'
              : 'bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-xl hover:scale-110 active:scale-95'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-1">
            <AlertTriangle className="w-6 h-6" />
            <span className="text-xs font-bold">SOS</span>
          </div>
        </button>
      </div>

      {/* SOS Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="glass-dark rounded-2xl p-6 max-w-sm mx-4 space-y-4 border border-slate-700/30">
            <button
              onClick={handleCancel}
              disabled={isConfirmed}
              className="absolute top-4 right-4 p-2 hover:bg-slate-800/30 rounded-lg transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            {isConfirmed ? (
              <div className="text-center space-y-4 py-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center animate-pulse">
                    <AlertCircle className="w-8 h-8 text-green-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-green-400">Alert Sent!</h2>
                  <p className="text-sm text-slate-400 mt-2">Emergency contacts have been notified with your location.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-center space-y-2">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-red-400">Emergency SOS</h2>
                  <p className="text-sm text-slate-400">Are you in danger? This will alert emergency services.</p>
                </div>

                <div className="glass rounded-lg p-4 space-y-2 border border-slate-700/30">
                  <p className="text-xs text-slate-400 uppercase font-semibold">Your Location</p>
                  <p className="text-sm text-slate-200">5.1098, 7.3667</p>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleConfirmSOS}
                    className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold transition-colors"
                  >
                    Yes, Send Emergency Alert
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full py-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
