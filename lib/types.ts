// User & Auth Types
export interface User {
  id: string
  phone: string
  name: string
  email?: string
  userType: 'individual' | 'logistics'
  safetyScore: number
  lastLocation?: Location
  emergencyContacts: string[]
  createdAt: number
  lastLogin: number
}

export interface Location {
  lat: number
  lng: number
  timestamp: number
}

// Map & Incidents
export interface Incident {
  id: string
  lat: number
  lng: number
  type: 'accident' | 'traffic' | 'hazard' | 'checkpoint'
  severity: 'low' | 'medium' | 'high'
  description: string
  timestamp: number
  reportedBy?: string
  resolved?: boolean
}

export interface Highway {
  id: string
  name: string
  coordinates: [number, number][]
  status: 'safe' | 'caution' | 'danger'
  incidents: number
}

// Ride Tracking
export interface Ride {
  id: string
  driverId: string
  passengerId: string
  startLocation: Location
  endLocation: Location
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
  fare: number
  startTime: number
  endTime?: number
  rating?: number
}

// SOS & Emergency
export interface SOSAlert {
  id: string
  userId: string
  location: Location
  timestamp: number
  contacts: string[]
  status: 'active' | 'responded' | 'resolved'
  message?: string
}

// Language & i18n
export interface Translations {
  [key: string]: string
}

export type Language = 'en' | 'ig' | 'pidgin'
