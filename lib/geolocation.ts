'use client'

export interface GeolocationCoordinates {
  latitude: number
  longitude: number
  accuracy: number
  altitude?: number | null
  altitudeAccuracy?: number | null
  heading?: number | null
  speed?: number | null
}

export interface GeolocationError {
  code: number
  message: string
}

/**
 * Get current user location
 */
export function getCurrentLocation(): Promise<GeolocationCoordinates> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject({
        code: 0,
        message: 'Geolocation is not supported by this browser',
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('[v0] Location obtained:', {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        resolve(position.coords)
      },
      (error) => {
        console.warn('[v0] Geolocation error:', error.message)
        reject({
          code: error.code,
          message: error.message,
        })
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  })
}

/**
 * Watch user location (continuous tracking)
 */
export function watchLocation(
  onSuccess: (coords: GeolocationCoordinates) => void,
  onError?: (error: GeolocationError) => void
): number {
  if (!('geolocation' in navigator)) {
    onError?.({
      code: 0,
      message: 'Geolocation is not supported',
    })
    return 0
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      console.log('[v0] Location updated:', {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      onSuccess(position.coords)
    },
    (error) => {
      console.warn('[v0] Watch location error:', error.message)
      onError?.({
        code: error.code,
        message: error.message,
      })
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    }
  )
}

/**
 * Stop watching location
 */
export function stopWatchingLocation(watchId: number): void {
  if (watchId > 0) {
    navigator.geolocation.clearWatch(watchId)
  }
}

/**
 * Calculate distance between two points (Haversine formula)
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
