'use client'

import { useState } from 'react'
import { useMap } from '@/lib/map-context'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { AlertTriangle, AlertCircle, Zap, TrendingUp, X } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export function WakaSheet() {
  const { incidents, selectedIncident, selectIncident } = useMap()
  const { user } = useAuth()
  const { t } = useLanguage()
  const [isExpanded, setIsExpanded] = useState(false)

  const getIncidentIcon = (type: string, severity: string) => {
    const colorClass = severity === 'high' ? 'text-red-400' : severity === 'medium' ? 'text-yellow-400' : 'text-green-400'
    switch (type) {
      case 'accident':
        return <AlertTriangle className={`w-4 h-4 ${colorClass}`} />
      case 'traffic':
        return <AlertCircle className={`w-4 h-4 ${colorClass}`} />
      case 'hazard':
        return <Zap className={`w-4 h-4 ${colorClass}`} />
      default:
        return <AlertCircle className={`w-4 h-4 ${colorClass}`} />
    }
  }

  const getSeverityBadge = (severity: string) => {
    const badges = {
      high: 'bg-red-500/20 text-red-300 border-red-500/30',
      medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      low: 'bg-green-500/20 text-green-300 border-green-500/30',
    }
    return badges[severity as keyof typeof badges] || badges.low
  }

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-all duration-300 ease-out ${
        isExpanded ? 'h-[70vh]' : 'h-32'
      }`}
    >
      {/* Sheet */}
      <div className="h-full glass-dark border-t border-slate-700/30 rounded-t-3xl overflow-hidden flex flex-col">
        {/* Handle/Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-shrink-0 px-4 py-3 flex items-center justify-center hover:bg-slate-800/20 transition-colors"
        >
          <div className="w-12 h-1 bg-slate-600/50 rounded-full" />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {/* Safety Score Card */}
          {user && (
            <div className="glass rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-slate-300">{t('safetyScore')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-400">{user.safetyScore}</span>
                  <span className="text-xs text-slate-500">/100</span>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                  style={{ width: `${user.safetyScore}%` }}
                />
              </div>
            </div>
          )}

          {/* Incidents List */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              {t('incidents')} ({incidents.length})
            </h3>

            {incidents.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">{t('noIncidents')}</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {incidents.map((incident) => (
                  <button
                    key={incident.id}
                    onClick={() => {
                      selectIncident(incident)
                      setIsExpanded(false)
                    }}
                    className={`w-full p-3 rounded-lg border transition-all text-left ${
                      selectedIncident?.id === incident.id
                        ? 'glass-dark border-blue-500/50 bg-blue-500/10'
                        : 'glass-dark border-slate-600/30 hover:border-slate-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIncidentIcon(incident.type, incident.severity)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-slate-200 truncate">
                            {incident.description}
                          </p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded border ${getSeverityBadge(
                              incident.severity
                            )}`}
                          >
                            {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {formatDistanceToNow(incident.timestamp, {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop when expanded */}
      {isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className="absolute inset-0 bg-black/20 -z-10"
        />
      )}
    </div>
  )
}
