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
  HelpCircle,
  Send,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
  const [details, setDetails] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      icon: <TrendingDown className="w-8 h-8" />,
      color: 'from-amber-600 to-amber-700',
    },
    {
      id: 'traffic',
      label: 'Heavy Traffic',
      icon: <Construction className="w-8 h-8" />,
      color: 'from-blue-600 to-blue-700',
    },
    {
      id: 'other',
      label: 'Other',
      icon: <HelpCircle className="w-8 h-8" />,
      color: 'from-slate-600 to-slate-700',
    },
  ]

  const handleReportSubmit = () => {
    if (selectedReport && details.trim()) {
      addIncident({
        id: `report-${Date.now()}`,
        lat: 5.1098,
        lng: 7.3667,
        type: selectedReport,
        severity: selectedReport === 'robbery' ? 'high' : selectedReport === 'accident' ? 'high' : 'medium',
        description: details,
        timestamp: new Date(),
      })

      setIsSubmitting(true)
      setTimeout(() => {
        setSelectedReport(null)
        setDetails('')
        setIsSubmitting(false)
      }, 500)
    }
  }

  return (
    <div className="fixed bottom-48 right-4 z-[250] max-w-sm">
      <div>
        {/* Report Grid Modal */}
        {selectedReport ? (
          <div className="glass-dark rounded-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Report Details</h3>
              <button
                onClick={() => {
                  setSelectedReport(null)
                  setDetails('')
                }}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Selected Report Type */}
            <div className="flex items-center gap-3 bg-slate-700/30 rounded-lg p-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${reportOptions.find((r) => r.id === selectedReport)?.color} flex items-center justify-center text-white`}>
                {reportOptions.find((r) => r.id === selectedReport)?.icon}
              </div>
              <div>
                <p className="text-sm text-slate-400">Reporting</p>
                <p className="font-semibold text-white">{reportOptions.find((r) => r.id === selectedReport)?.label}</p>
              </div>
            </div>

            {/* Details Input */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300 font-medium">Describe what you saw</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Provide details to help other road users stay safe..."
                className="w-full glass-dark rounded-lg px-3 py-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
              />
              <p className="text-xs text-slate-500">{details.length}/200 characters</p>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleReportSubmit}
              disabled={!details.trim() || isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 disabled:opacity-50"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Sending...' : 'Report Incident'}
            </Button>
          </div>
        ) : (
          /* Report Grid */
          <div className="glass-dark rounded-2xl p-6 space-y-4">
            <h3 className="font-semibold text-white">Quick Report</h3>
            <div className="grid grid-cols-3 gap-3">
              {reportOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedReport(option.id)}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-slate-700/40 transition-colors text-center"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center text-white`}>
                    {option.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-300">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
