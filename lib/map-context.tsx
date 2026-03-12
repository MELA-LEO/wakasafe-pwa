'use client'

import React, { createContext, useContext, useState } from 'react'

export interface IncidentMarker {
  id: string
  lat: number
  lng: number
  type: 'accident' | 'traffic' | 'hazard' | 'checkpoint'
  severity: 'low' | 'medium' | 'high'
  description: string
  timestamp: number
}

export interface HighwaySegment {
  id: string
  name: string
  coordinates: Array<[number, number]>
  status: 'safe' | 'caution' | 'danger'
  incidents: number
}

interface MapContextType {
  incidents: IncidentMarker[]
  highways: HighwaySegment[]
  selectedIncident: IncidentMarker | null
  addIncident: (incident: IncidentMarker) => void
  removeIncident: (id: string) => void
  selectIncident: (incident: IncidentMarker | null) => void
  updateIncidentSeverity: (id: string, severity: 'low' | 'medium' | 'high') => void
}

const MapContext = createContext<MapContextType | undefined>(undefined)

// Mock data for Aba, Nigeria highways
const MOCK_HIGHWAYS: HighwaySegment[] = [
  {
    id: 'hwy-aba-onitsha',
    name: 'Aba to Onitsha Highway',
    coordinates: [
      [5.1098, 7.3667],
      [5.1098, 7.3667],
      [6.1839, 6.7849],
    ],
    status: 'caution',
    incidents: 2,
  },
  {
    id: 'hwy-aba-enugu',
    name: 'Aba to Enugu Road',
    coordinates: [
      [5.1098, 7.3667],
      [5.5, 6.5],
      [6.4969, 5.5211],
    ],
    status: 'safe',
    incidents: 0,
  },
  {
    id: 'hwy-aba-port',
    name: 'Aba to Port Harcourt',
    coordinates: [
      [5.1098, 7.3667],
      [4.8, 6.8],
      [4.7957, 7.0146],
    ],
    status: 'danger',
    incidents: 4,
  },
]

const MOCK_INCIDENTS: IncidentMarker[] = [
  {
    id: 'inc-1',
    lat: 5.5,
    lng: 7.0,
    type: 'accident',
    severity: 'high',
    description: 'Multi-vehicle collision near Aba Market',
    timestamp: Date.now() - 15 * 60000,
  },
  {
    id: 'inc-2',
    lat: 6.0,
    lng: 6.8,
    type: 'traffic',
    severity: 'medium',
    description: 'Heavy traffic congestion',
    timestamp: Date.now() - 30 * 60000,
  },
  {
    id: 'inc-3',
    lat: 5.3,
    lng: 7.2,
    type: 'hazard',
    severity: 'medium',
    description: 'Road construction in progress',
    timestamp: Date.now() - 45 * 60000,
  },
  {
    id: 'inc-4',
    lat: 4.95,
    lng: 7.15,
    type: 'checkpoint',
    severity: 'low',
    description: 'Police checkpoint',
    timestamp: Date.now() - 60 * 60000,
  },
]

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [incidents, setIncidents] = useState<IncidentMarker[]>(MOCK_INCIDENTS)
  const [selectedIncident, setSelectedIncident] = useState<IncidentMarker | null>(null)
  const [highways] = useState<HighwaySegment[]>(MOCK_HIGHWAYS)

  const addIncident = (incident: IncidentMarker) => {
    setIncidents((prev) => [...prev, incident])
  }

  const removeIncident = (id: string) => {
    setIncidents((prev) => prev.filter((inc) => inc.id !== id))
  }

  const selectIncident = (incident: IncidentMarker | null) => {
    setSelectedIncident(incident)
  }

  const updateIncidentSeverity = (
    id: string,
    severity: 'low' | 'medium' | 'high'
  ) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, severity } : inc))
    )
  }

  return (
    <MapContext.Provider
      value={{
        incidents,
        highways,
        selectedIncident,
        addIncident,
        removeIncident,
        selectIncident,
        updateIncidentSeverity,
      }}
    >
      {children}
    </MapContext.Provider>
  )
}

export function useMap() {
  const context = useContext(MapContext)
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider')
  }
  return context
}
