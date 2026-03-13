'use client'

import { useEffect, useRef } from 'react'
import { useMap } from '@/lib/map-context'
import { AlertTriangle, AlertCircle, Zap, CheckCircle2, MapPin } from 'lucide-react'

const ABA_CENTER = { lat: 5.1098, lng: 7.3667 }
const MAP_BOUNDS = { minLat: 4.8, maxLat: 5.4, minLng: 7.0, maxLng: 7.7 }

// Junction points with names for realistic map
const JUNCTIONS = [
  { lat: 5.1098, lng: 7.3667, name: 'Aba City Center' },
  { lat: 5.15, lng: 7.35, name: 'Port Harcourt Junction' },
  { lat: 5.08, lng: 7.38, name: 'Onitsha Road' },
  { lat: 5.12, lng: 7.32, name: 'Umuahia Junction' },
  { lat: 5.05, lng: 7.40, name: 'Okigwe express rounabout' },
  { lat: 5.20, lng: 7.30, name: 'Uturu Bypass' },
]

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'high':
      return '#ef4444'
    case 'medium':
      return '#eab308'
    case 'low':
      return '#22c55e'
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
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const width = container.clientWidth
    const height = container.clientHeight

    canvas.width = width
    canvas.height = height

    const render = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      // Background
      ctx.fillStyle = '#1e293b'
      ctx.fillRect(0, 0, width, height)

      // Grid
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

      // Draw highways
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
        points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y))
        ctx.stroke()

        // Main line
        ctx.globalAlpha = 1
        ctx.strokeStyle = color
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        points.slice(1).forEach((p) => ctx.lineTo(p.x, p.y))
        ctx.stroke()
      })

      // Draw junctions with labels and location arrows
      JUNCTIONS.forEach((junction, index) => {
        const coords = latLngToCanvasCoords(junction.lat, junction.lng, width, height)
        
        // Draw location arrow (triangle pointing up)
        ctx.fillStyle = '#06b6d4'
        ctx.globalAlpha = 0.8
        ctx.beginPath()
        ctx.moveTo(coords.x, coords.y - 12)
        ctx.lineTo(coords.x - 8, coords.y + 4)
        ctx.lineTo(coords.x + 8, coords.y + 4)
        ctx.closePath()
        ctx.fill()
        
        // Draw circle around junction
        ctx.strokeStyle = '#06b6d4'
        ctx.lineWidth = 1.5
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.arc(coords.x, coords.y, 12, 0, Math.PI * 2)
        ctx.stroke()
        
        // Junction label
        ctx.globalAlpha = 1
        ctx.fillStyle = '#0891b2'
        ctx.font = '11px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'top'
        ctx.fillText(junction.name, coords.x, coords.y + 16)
      })

      // Center marker (Aba)
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

      // Incident markers
      incidents.forEach((incident) => {
        const coords = latLngToCanvasCoords(incident.lat, incident.lng, width, height)
        const color = getSeverityColor(incident.severity)

        const now = Date.now()
        const pulse = Math.sin((now % 2000) / 2000 * Math.PI) * 0.5 + 0.5
        ctx.fillStyle = color
        ctx.globalAlpha = 0.3 * pulse
        ctx.beginPath()
        ctx.arc(coords.x, coords.y, 20, 0, Math.PI * 2)
        ctx.fill()

        ctx.globalAlpha = 1
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.fillStyle = '#000a0f'
        ctx.beginPath()
        ctx.arc(coords.x, coords.y, 10, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.fillStyle = color
        ctx.font = 'bold 12px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('!', coords.x, coords.y)
      })

      animationRef.current = requestAnimationFrame(render)
    }

    animationRef.current = requestAnimationFrame(render)

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      incidents.forEach((incident) => {
        const coords = latLngToCanvasCoords(incident.lat, incident.lng, width, height)
        const distance = Math.sqrt((clickX - coords.x) ** 2 + (clickY - coords.y) ** 2)
        if (distance < 20) {
          selectIncident(incident)
        }
      })
    }

    canvas.addEventListener('click', handleClick)

    return () => {
      canvas.removeEventListener('click', handleClick)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [incidents, highways, selectIncident])

  return (
    <div ref={containerRef} className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />

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
        <div className="text-sm font-semibold text-slate-200">{incidents.length} Incidents</div>
      </div>
    </div>
  )
}

// 'use client'

// import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
// import L from "leaflet"
// import { useMap } from "@/lib/map-context"

// const ABA_CENTER: [number, number] = [5.1098, 7.3667]

// export function MapView() {
//   const { incidents, highways, selectIncident } = useMap()

//   return (
//     <div className="relative w-full h-full bg-slate-900 rounded-xl overflow-hidden">

//       <MapContainer
//         center={ABA_CENTER}
//         zoom={11}
//         className="w-full h-full"
//       >
//         <TileLayer
//           attribution='© OpenStreetMap'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />

//         {/* Highways */}
//         {highways.map((highway, i) => (
//           <Polyline
//             key={i}
//             positions={highway.coordinates.map(([lng, lat]) => [lat, lng])}
//             pathOptions={{
//               color:
//                 highway.status === "danger"
//                   ? "red"
//                   : highway.status === "caution"
//                   ? "yellow"
//                   : "green",
//               weight: 5
//             }}
//           />
//         ))}

//         {/* Incidents */}
//         {incidents.map((incident, i) => (
//           <Marker
//             key={i}
//             position={[incident.lat, incident.lng]}
//             eventHandlers={{
//               click: () => selectIncident(incident)
//             }}
//           >
//             <Popup>
//               <strong>{incident.type}</strong><br />
//               Severity: {incident.severity}
//             </Popup>
//           </Marker>
//         ))}

//       </MapContainer>

//     </div>
//   )
// }