'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useMap } from '@/lib/map-context'
import { AlertTriangle, Zap, AlertCircle, CheckCircle2, MapPin } from 'lucide-react'

// ABA, NIGERIA COORDINATES
const ABA_CENTER = { lat: 5.1098, lng: 7.3667 }

// Fix Leaflet icon issue
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.setIcon(DefaultIcon)

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

export function MapView() {
  const { incidents, highways, selectIncident } = useMap()
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const markersRef = useRef<L.CircleMarker[]>([])
  const linesRef = useRef<L.Polyline[]>([])

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      attributionControl: false,
    }).setView([ABA_CENTER.lat, ABA_CENTER.lng], 11)

    mapRef.current = map

    // Add OpenStreetMap tiles with dark theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap',
    }).addTo(map)

    // Add center marker
    L.circleMarker([ABA_CENTER.lat, ABA_CENTER.lng], {
      color: '#3b82f6',
      radius: 8,
      weight: 2,
      opacity: 1,
      fillOpacity: 0.8,
    })
      .bindPopup('Aba, Nigeria')
      .addTo(map)
  }, [])

  // Update highways
  useEffect(() => {
    if (!mapRef.current) return

    linesRef.current.forEach((line) => mapRef.current?.removeLayer(line))
    linesRef.current = []

    highways.forEach((highway) => {
      const color = highway.status === 'danger' ? '#ef4444' : highway.status === 'caution' ? '#eab308' : '#22c55e'

      const line = L.polyline(
        highway.coordinates.map(([lng, lat]) => [lat, lng]),
        {
          color,
          weight: 4,
          opacity: 0.8,
          lineCap: 'round',
          lineJoin: 'round',
        }
      ).addTo(mapRef.current)

      linesRef.current.push(line)
    })
  }, [highways])

  // Update incident markers
  useEffect(() => {
    if (!mapRef.current) return

    markersRef.current.forEach((marker) => mapRef.current?.removeLayer(marker))
    markersRef.current = []

    incidents.forEach((incident) => {
      const color = getSeverityColor(incident.severity)

      const marker = L.circleMarker([incident.lat, incident.lng], {
        color,
        radius: 10,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7,
      })
        .bindPopup(
          `<div class="text-sm"><strong>${incident.type}</strong><br/>${incident.description}<br/><small>${new Date(incident.timestamp).toLocaleTimeString()}</small></div>`
        )
        .addTo(mapRef.current)

      marker.on('click', () => selectIncident(incident))
      markersRef.current.push(marker)
    })
  }, [incidents, selectIncident])

  return (
    <div ref={containerRef} className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden"
      style={{ 
        fontSize: '14px'
      }}
    >

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
