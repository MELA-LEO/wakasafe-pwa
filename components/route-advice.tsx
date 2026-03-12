'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useMap } from '@/lib/map-context'
import { MapPin, TrendingDown, Navigation, Search, X } from 'lucide-react'

interface Route {
  id: string
  from: string
  to: string
  distance: string
  time: string
  safetyScore: number
  incidents: number
  color: 'green' | 'red' | 'yellow'
  coordinates: Array<[number, number]>
}

export function RouteAdvice() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)

  const mockRoutes: Route[] = [
    {
      id: 'route-1',
      from: 'Aba City Center',
      to: 'Onitsha',
      distance: '85 km',
      time: '1h 45min',
      safetyScore: 87,
      incidents: 1,
      color: 'green',
      coordinates: [
        [7.3667, 5.1098],
        [7.2, 5.5],
        [6.7849, 6.1839],
      ],
    },
    {
      id: 'route-2',
      from: 'Aba City Center',
      to: 'Port Harcourt',
      distance: '63 km',
      time: '1h 30min',
      safetyScore: 45,
      incidents: 5,
      color: 'red',
      coordinates: [
        [7.3667, 5.1098],
        [7.0, 4.9],
        [7.0146, 4.7957],
      ],
    },
    {
      id: 'route-3',
      from: 'Aba City Center',
      to: 'Enugu',
      distance: '92 km',
      time: '2h 15min',
      safetyScore: 72,
      incidents: 2,
      color: 'yellow',
      coordinates: [
        [7.3667, 5.1098],
        [6.8, 5.5],
        [5.5211, 6.4969],
      ],
    },
  ]

  const filteredRoutes = mockRoutes.filter(
    (route) =>
      route.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.to.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'from-green-600 to-emerald-600 text-green-300'
      case 'red':
        return 'from-red-600 to-rose-600 text-red-300'
      case 'yellow':
        return 'from-yellow-600 to-amber-600 text-yellow-300'
      default:
        return 'from-slate-600 to-slate-700'
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-4 z-30 w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg flex items-center justify-center transition-transform hover:scale-110"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Navigation className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Route Advice Panel */}
      {isOpen && (
        <div className="fixed inset-x-0 top-0 z-50 h-screen max-h-screen overflow-auto">
          {/* Background */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="glass-dark rounded-b-3xl border-b border-slate-700/30 p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Safe Routes</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-700/30 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
              />
            </div>

            {/* Routes List */}
            <div className="space-y-3 max-h-[70vh] overflow-y-auto">
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route.id)}
                    className={`w-full p-4 rounded-lg transition-all text-left border ${
                      selectedRoute === route.id
                        ? `glass-dark border-blue-500/50 bg-blue-500/10`
                        : `glass-dark border-slate-600/30 hover:border-slate-500/30`
                    }`}
                  >
                    {/* Route Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-semibold text-slate-200">
                          {route.from} → {route.to}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-400">
                        {route.distance}
                      </span>
                    </div>

                    {/* Route Info */}
                    <div className="grid grid-cols-3 gap-2">
                      {/* Safety Score */}
                      <div className={`p-2 rounded bg-gradient-to-br ${getColorClasses(route.color)}`}>
                        <div className="text-xs font-bold">{route.safetyScore}%</div>
                        <div className="text-xs opacity-75">Safety</div>
                      </div>

                      {/* Travel Time */}
                      <div className="p-2 rounded bg-slate-800/50 text-slate-300">
                        <div className="text-xs font-bold">{route.time}</div>
                        <div className="text-xs opacity-75">ETA</div>
                      </div>

                      {/* Incidents */}
                      <div className="p-2 rounded bg-slate-800/50 text-slate-300">
                        <div className="text-xs font-bold">{route.incidents}</div>
                        <div className="text-xs opacity-75">Reports</div>
                      </div>
                    </div>

                    {/* Recommend Badge */}
                    {route.safetyScore >= 80 && (
                      <div className="mt-3 text-xs font-semibold text-emerald-300 flex items-center gap-1">
                        <TrendingDown className="w-3 h-3" /> Recommended Route
                      </div>
                    )}
                  </button>
                ))
              ) : (
                <p className="text-sm text-slate-400 text-center py-8">No routes found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
