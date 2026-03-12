'use client'

import { useEffect, useRef } from 'react'
import Map, { Marker, Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useMap } from '@/lib/map-context'
import { AlertTriangle, Zap, AlertCircle, CheckCircle2 } from 'lucide-react'

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example'

// ABA, NIGERIA COORDINATES
const ABA_CENTER = { lat: 5.1098, lng: 7.3667 }

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
  const mapRef = useRef(null)

  return (
    <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden">
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: ABA_CENTER.lng,
          latitude: ABA_CENTER.lat,
          zoom: 10,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {/* Highway Routes */}
        {highways.map((highway) => {
          const geojson = {
            type: 'Feature' as const,
            geometry: {
              type: 'LineString' as const,
              coordinates: highway.coordinates.map(([lng, lat]) => [lng, lat]),
            },
          }

          const color = highway.status === 'danger' ? '#ef4444' : highway.status === 'caution' ? '#eab308' : '#22c55e'

          return (
            <Source key={highway.id} id={`route-${highway.id}`} type="geojson" data={geojson}>
              <Layer
                id={`route-layer-${highway.id}`}
                type="line"
                paint={{
                  'line-color': color,
                  'line-width': 4,
                  'line-opacity': 0.7,
                }}
              />
              <Layer
                id={`route-glow-${highway.id}`}
                type="line"
                paint={{
                  'line-color': color,
                  'line-width': 8,
                  'line-opacity': 0.3,
                  'line-blur': 4,
                }}
              />
            </Source>
          )
        })}

        {/* Incident Markers */}
        {incidents.map((incident) => (
          <Marker
            key={incident.id}
            longitude={incident.lng}
            latitude={incident.lat}
            onClick={() => selectIncident(incident)}
          >
            <div
              className="cursor-pointer transition-transform hover:scale-110 animate-pulse-marker"
              style={{
                filter: `drop-shadow(0 0 10px ${getSeverityColor(incident.severity)})`,
              }}
            >
              <div className="bg-slate-950 border-2 rounded-full p-2 flex items-center justify-center" style={{ borderColor: getSeverityColor(incident.severity) }}>
                {getSeverityIcon(incident.type, incident.severity)}
              </div>
            </div>
          </Marker>
        ))}
      </Map>

      {/* Map controls info */}
      <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur border border-slate-700/30 rounded-lg p-3 text-xs text-slate-400 max-w-xs">
        <p className="text-slate-300 font-medium mb-2">Aba, Nigeria</p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <span>Caution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span>Danger</span>
          </div>
        </div>
      </div>
    </div>
  )
}
