'use client'

import { useState } from 'react'
import { useLanguage } from '@/lib/language-context'
import { useMap } from '@/lib/map-context'
import {
  AlertTriangle,
  AlertCircle,
  Zap,
  TrendingDown,
  Construction,
  Cloud,
  Send,
  X,
} from 'lucide-react'

export type ReportType = 'robbery' | 'checkpoint' | 'accident' | 'hazard' | 'traffic' | 'other'

interface ReportOption {
  id: ReportType
  label: string
  icon: React.ReactNode
  color: string
}

export function ReportGrid() {
  const { t } = useLanguage()
  const { addIncident } = useMap()
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const reportOptions: ReportOption[] = [
    {
      id: 'robbery',
      label: 'Robbery',
      icon: <AlertTriangle className="w-8 h-8" />,
      color: 'from-red-600 to-red-700',
    },
    {
      id: 'checkpoint',
      label: 'Checkpoint',
      icon: <AlertCircle className="w-8 h-8" />,
      color: 'from-yellow-600 to-yellow-700',
    },
    {
      id: 'accident',
      label: 'Accident',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-orange-600 to-orange-700',
    },
    {
      id: 'hazard',
      label: 'Road Hazard',
      icon: <Construction className="w-8 h-8" />,
      color: 'from-amber-600 to-amber-700',
    },
    {
      id: 'traffic',
      label: 'Heavy Traffic',
      icon: <TrendingDown className="w-8 h-8" />,
      color: 'from-blue-600 to-blue-700',
    },
    {
      id: 'other',
      label: 'Other',
      icon: <Cloud className="w-8 h-8" />,
      color: 'from-purple-600 to-purple-700',
    },
  ]

  const handleReport = (type: ReportType) => {
    setSelectedReport(type)
    // Add incident to map
    const now = new Date()
    addIncident({
      id: `report-${Date.now()}`,
      type,
      description: `${reportOptions.find(r => r.id === type)?.label || 'Report'} reported`,
      severity: type === 'robbery' ? 'high' : type === 'checkpoint' ? 'medium' : 'low',
      lat: 5.1098 + (Math.random() - 0.5) * 0.1,
      lng: 7.3667 + (Math.random() - 0.5) * 0.1,
      timestamp: now,
    })
    setSelectedReport(type)
    setTimeout(() => {
      setIsOpen(false)
      setSelectedReport(null)
    }, 2000)
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-48 right-4 z-30 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg flex items-center justify-center transition-transform hover:scale-110"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <AlertCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Report Grid Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-dark rounded-2xl p-6 max-w-sm w-full border-slate-700/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Report Incident</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-700/30 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* 6-Icon Grid */}
            <div className="grid grid-cols-3 gap-3">
              {reportOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleReport(option.id)}
                  disabled={selectedReport === option.id}
                  className={`p-4 rounded-lg transition-all flex flex-col items-center gap-2 ${
                    selectedReport === option.id
                      ? `bg-gradient-to-br ${option.color} shadow-lg`
                      : 'glass hover:bg-slate-800/50'
                  }`}
                >
                  <div className={selectedReport === option.id ? 'text-white' : 'text-slate-400'}>
                    {option.icon}
                  </div>
                  <span className={`text-xs font-semibold text-center ${selectedReport === option.id ? 'text-white' : 'text-slate-200'}`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Status Message */}
            {selectedReport && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                <p className="text-sm text-green-300 font-medium">
                  Report sent to community!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
