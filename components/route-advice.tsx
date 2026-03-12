'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useMap } from '@/lib/map-context'
import { MapPin, TrendingDown, Navigation, ArrowRight, ChevronDown } from 'lucide-react'

const SOUTHEAST_CITIES = [
  'Aba',
  'Onitsha',
  'Port Harcourt',
  'Enugu',
  'Umuahia',
  'Owerri',
  'Nsukka',
  'Abakaliki',
  'Calabar',
  'Ogbomosho',
  'Warri',
]

interface Route {
  id: string
  from: string
  to: string
  distance: string
  time: string
  safetyScore: number
  incidents: number
  color: 'green' | 'red' | 'yellow'
}

export function RouteAdvice() {
  const { t } = useLanguage()
  const { highways } = useMap()
  const [isOpen, setIsOpen] = useState(false)
  const [fromCity, setFromCity] = useState('Aba')
  const [toCity, setToCity] = useState('Onitsha')
  const [showFromDropdown, setShowFromDropdown] = useState(false)
  const [showToDropdown, setShowToDropdown] = useState(false)

  // Generate recommended routes
  const routes: Route[] = [
    {
      id: 'route-1',
      from: fromCity,
      to: toCity,
      distance: '85 km',
      time: '1h 45min',
      safetyScore: 87,
      incidents: 1,
      color: 'green',
    },
    {
      id: 'route-2',
      from: fromCity,
      to: toCity,
      distance: '92 km',
      time: '2h 10min',
      safetyScore: 64,
      incidents: 3,
      color: 'yellow',
    },
    {
      id: 'route-3',
      from: fromCity,
      to: toCity,
      distance: '110 km',
      time: '2h 45min',
      safetyScore: 42,
      incidents: 6,
      color: 'red',
    },
  ]

  const getColor = (color: string) => {
    switch (color) {
      case 'green':
        return '#22c55e'
      case 'yellow':
        return '#eab308'
      case 'red':
        return '#ef4444'
      default:
        return '#3b82f6'
    }
  }

  return (
    <div className="fixed bottom-24 left-0 right-0 px-4 z-[300]">
      <div className="glass-dark rounded-2xl p-6 max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white flex items-center gap-2">
            <Navigation className="w-5 h-5 text-blue-400" />
            Safe Route Advisor
          </h3>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* City Selection */}
        <div className="space-y-3">
          <div className="flex gap-3 items-center">
            {/* From City */}
            <div className="flex-1 relative">
              <button
                onClick={() => {
                  setShowFromDropdown(!showFromDropdown)
                  setShowToDropdown(false)
                }}
                className="w-full glass rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/40 transition-colors flex items-center justify-between"
              >
                <span className="truncate">{fromCity}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </button>
              {showFromDropdown && (
                <div className="absolute top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  {SOUTHEAST_CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setFromCity(city)
                        setShowFromDropdown(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-700 transition-colors ${
                        city === fromCity ? 'bg-green-500/20 text-green-300' : 'text-slate-300'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Arrow */}
            <ArrowRight className="w-4 h-4 text-slate-400 flex-shrink-0" />

            {/* To City */}
            <div className="flex-1 relative">
              <button
                onClick={() => {
                  setShowToDropdown(!showToDropdown)
                  setShowFromDropdown(false)
                }}
                className="w-full glass rounded-lg px-3 py-2 text-left text-sm text-slate-300 hover:bg-slate-700/40 transition-colors flex items-center justify-between"
              >
                <span className="truncate">{toCity}</span>
                <ChevronDown className="w-4 h-4 flex-shrink-0" />
              </button>
              {showToDropdown && (
                <div className="absolute top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  {SOUTHEAST_CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setToCity(city)
                        setShowToDropdown(false)
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-700 transition-colors ${
                        city === toCity ? 'bg-green-500/20 text-green-300' : 'text-slate-300'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Routes List */}
        {isOpen && (
          <div className="space-y-2 pt-4 border-t border-slate-700">
            {routes.map((route) => {
              const color = getColor(route.color)
              return (
                <button
                  key={route.id}
                  className="w-full glass-dark hover:bg-slate-700/40 rounded-lg p-4 text-left transition-colors group"
                  style={{
                    borderLeft: `3px solid ${color}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">{route.distance}</span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-400">{route.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold text-white">{route.safetyScore}</span>
                          <span className="text-xs text-slate-400">/100</span>
                        </div>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-400">{route.incidents} incidents</span>
                      </div>
                    </div>
                    {route.color === 'green' && (
                      <div className="bg-green-500/20 border border-green-500/50 rounded-full px-3 py-1 flex-shrink-0">
                        <span className="text-xs font-semibold text-green-300">Recommended</span>
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
