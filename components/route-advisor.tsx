'use client'

import { useState } from 'react'
import { ChevronUp, Navigation, Zap, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RouteOption {
  id: string
  name: string
  distance: string
  duration: string
  risk: 'low' | 'medium' | 'high'
  description: string
}

const ROUTE_OPTIONS: RouteOption[] = [
  {
    id: '1',
    name: 'Aba - Port Harcourt (Fastest)',
    distance: '62 km',
    duration: '1h 15m',
    risk: 'low',
    description: 'Major highway - well-maintained',
  },
  {
    id: '2',
    name: 'Aba - Onitsha (Scenic)',
    distance: '58 km',
    duration: '1h 30m',
    risk: 'medium',
    description: 'Secondary road - moderate traffic',
  },
  {
    id: '3',
    name: 'Aba - Umuahia (Local)',
    distance: '35 km',
    duration: '45m',
    risk: 'high',
    description: 'Local routes - variable conditions',
  },
]

export function RouteAdvisor() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-400 bg-green-500/10'
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10'
      case 'high':
        return 'text-red-400 bg-red-500/10'
      default:
        return 'text-slate-400'
    }
  }

  return (
    <>
      {/* Floating Drawer Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 right-4 z-40 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all"
          aria-label="Open route advisor"
        >
          <Navigation className="w-6 h-6" />
        </button>
      )}

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed bottom-0 right-0 z-50 w-full sm:w-96 bg-gradient-to-br from-slate-900 to-slate-950 border-l border-t border-slate-700/50 rounded-tl-2xl transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ height: isOpen ? 'auto' : '0' }}
      >
        <div className="max-h-[80vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-slate-900 to-slate-950 border-b border-slate-700/30 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Safe Routes</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close route advisor"
            >
              <ChevronUp className="w-5 h-5 text-slate-400" />
            </button>
          </div>

          {/* Routes List */}
          <div className="p-4 space-y-3">
            {ROUTE_OPTIONS.map((route) => (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedRoute === route.id
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-slate-700/30 bg-slate-900/40 hover:border-slate-600/50 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{route.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">{route.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(route.risk)}`}>
                    {route.risk.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex gap-4">
                    <span className="text-slate-300">
                      📍 {route.distance}
                    </span>
                    <span className="text-slate-300">
                      ⏱️ {route.duration}
                    </span>
                  </div>
                </div>

                {selectedRoute === route.id && (
                  <Button className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                    Navigate
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Footer Tips */}
          <div className="p-4 border-t border-slate-700/30 space-y-3">
            <div className="flex gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <Zap className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-green-300">Green routes are safer with recent safety reports</p>
            </div>
            <div className="flex gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-300">Red routes have recent incident reports</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
