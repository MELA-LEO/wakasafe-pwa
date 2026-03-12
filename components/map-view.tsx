'use client'

import { useEffect, useRef } from 'react'
import { useMap } from '@/lib/map-context'
import { AlertTriangle, Zap, AlertCircle, CheckCircle2, MapPin } from 'lucide-react'

// ABA, NIGERIA COORDINATES
const ABA_CENTER = { lat: 5.1098, lng: 7.3667 }
const MAP_BOUNDS = { minLat: 4.8, maxLat: 5.4, minLng: 7.0, maxLng: 7.7 }

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'high':
      return '#ef4444' // red
    case 'medium':
      return '#eab308' // yellow
    case 'low':
      return '#22c55e' // green
    default:
      return '#3b82f6'
  }
}

function getSeverityIcon(type: string, severity: string) {
  const color = getSeverityColor(severity)
  switch (type) {
    case 'accident':
      return <AlertTriangle className="w-5 h-5" style={{ color }} />
    case 'traffic':
      return <AlertCircle className="w-5 h-5" style={{ color }} />
    case 'hazard':
      return <Zap className="w-5 h-5" style={{ color }} />
    default:
      return <CheckCircle2 className="w-5 h-5" style={{ color }} />
  }
}

function latLngToCanvasCoords(lat: number, lng: number, width: number, height: number): { x: number; y: number } {
  const x = ((lng - MAP_BOUNDS.minLng) / (MAP_BOUNDS.maxLng - MAP_BOUNDS.minLng)) * width
  const y = ((MAP_BOUNDS.maxLat - lat) / (MAP_BOUNDS.maxLat - MAP_BOUNDS.minLat)) * height
  return { x, y }
}

export function MapView() {
  const { incidents, highways, selectIncident } = useMap()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const width = container.clientWidth
    const height = container.clientHeight

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Draw map background
    ctx.fillStyle = '#1e293b'
    ctx.fillRect(0, 0, width, height)

    // Draw grid pattern
    ctx.strokeStyle = '#334155'
    ctx.lineWidth = 0.5
    const gridSize = 40
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw highways with glow effect
    highways.forEach((highway) => {
      const points = highway.coordinates.map(([lng, lat]) => 
        latLngToCanvasCoords(lat, lng, width, height)
      )

      const color = highway.status === 'danger' ? '#ef4444' : highway.status === 'caution' ? '#eab308' : '#22c55e'

      // Glow
      ctx.strokeStyle = color
      ctx.lineWidth = 10
      ctx.globalAlpha = 0.2
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      points.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
      ctx.stroke()

      // Main line
      ctx.globalAlpha = 1
      ctx.strokeStyle = color
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)
      points.slice(1).forEach(p => ctx.lineTo(p.x, p.y))
      ctx.stroke()
    })

    // Draw center marker
    const centerCoords = latLngToCanvasCoords(ABA_CENTER.lat, ABA_CENTER.lng, width, height)
    ctx.fillStyle = '#3b82f6'
    ctx.globalAlpha = 0.3
    ctx.beginPath()
    ctx.arc(centerCoords.x, centerCoords.y, 30, 0, Math.PI * 2)
    ctx.fill()
    ctx.globalAlpha = 1
    ctx.fillStyle = '#3b82f6'
    ctx.beginPath()
    ctx.arc(centerCoords.x, centerCoords.y, 8, 0, Math.PI * 2)
    ctx.fill()

    // Draw incident markers
    incidents.forEach((incident) => {
      const coords = latLngToCanvasCoords(incident.lat, incident.lng, width, height)
      const color = getSeverityColor(incident.severity)

      // Glow pulse
      const now = Date.now()
      const pulse = Math.sin((now % 2000) / 2000 * Math.PI) * 0.5 + 0.5
      ctx.fillStyle = color
      ctx.globalAlpha = 0.3 * pulse
      ctx.beginPath()
      ctx.arc(coords.x, coords.y, 20, 0, Math.PI * 2)
      ctx.fill()

      // Marker circle
      ctx.globalAlpha = 1
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.fillStyle = '#000a0f'
      ctx.beginPath()
      ctx.arc(coords.x, coords.y, 10, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()

      // Icon indicator
      ctx.fillStyle = color
      ctx.font = '12px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('!', coords.x, coords.y)
    })
  }, [incidents, highways])

  return (
    <div ref={containerRef} className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
      />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 glass-dark rounded-lg p-4 text-xs max-w-xs">
        <p className="text-slate-300 font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Aba, Nigeria
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-slate-300">Safe Routes</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="text-slate-300">Caution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-slate-300">Danger Zone</span>
          </div>
        </div>
      </div>

      {/* Incident Count */}
      <div className="absolute top-4 right-4 glass-dark rounded-lg px-4 py-2">
        <div className="text-sm font-semibold text-slate-200">
          {incidents.length} Incidents
        </div>
      </div>
    </div>
  )
}
