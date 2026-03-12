'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserType = 'individual' | 'logistics'

interface User {
  id: string
  phone: string
  name: string
  nickname?: string
  email?: string
  address?: string
  userType: UserType
  safetyScore: number
  lastLocation?: { lat: number; lng: number }
  emergencyContacts: string[]
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  userType: UserType
  setUserType: (type: UserType) => void
  register: (fullName: string, email: string, phone: string, password: string, nickname?: string, address?: string) => Promise<void>
  login: (phone: string, otp: string) => Promise<void>
  loginWithGoogle: (idToken: string) => Promise<void>
  logout: () => Promise<void>
  updateSafetyScore: (score: number) => void
  updateLocation: (lat: number, lng: number) => void
  addEmergencyContact: (contact: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userType, setUserType] = useState<UserType>('individual')

  useEffect(() => {
    // Check localStorage for existing user session
    const stored = localStorage.getItem('wakasafe-user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('wakasafe-user')
      }
    }
    setIsLoading(false)
  }, [])

  const register = async (fullName: string, email: string, phone: string, password: string, nickname?: string, address?: string) => {
    setIsLoading(true)
    try {
      // Firebase registration would be implemented here
      // For now, using mock implementation with localStorage
      const newUser: User = {
        id: `user-${Date.now()}`,
        phone,
        name: fullName,
        nickname,
        email,
        address,
        userType,
        safetyScore: 50,
        emergencyContacts: [],
      }
      setUser(newUser)
      localStorage.setItem('wakasafe-user', JSON.stringify(newUser))
      localStorage.setItem('wakasafe-email', email)
    } catch (error) {
      console.error('Registration failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (phone: string, otp: string) => {
    setIsLoading(true)
    try {
      // Firebase Phone Auth would be implemented here
      // For now, using mock implementation
      const newUser: User = {
        id: `user-${Date.now()}`,
        phone,
        name: phone,
        userType,
        safetyScore: 85,
        emergencyContacts: [],
      }
      setUser(newUser)
      localStorage.setItem('wakasafe-user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGoogle = async (idToken: string) => {
    setIsLoading(true)
    try {
      // Google OAuth would be implemented here
      const newUser: User = {
        id: `user-${Date.now()}`,
        phone: 'google-user',
        name: 'Google User',
        userType,
        safetyScore: 85,
        emergencyContacts: [],
      }
      setUser(newUser)
      localStorage.setItem('wakasafe-user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Google login failed:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem('wakasafe-user')
  }

  const updateSafetyScore = (score: number) => {
    if (user) {
      const updated = { ...user, safetyScore: score }
      setUser(updated)
      localStorage.setItem('wakasafe-user', JSON.stringify(updated))
    }
  }

  const updateLocation = (lat: number, lng: number) => {
    if (user) {
      const updated = { ...user, lastLocation: { lat, lng } }
      setUser(updated)
      localStorage.setItem('wakasafe-user', JSON.stringify(updated))
    }
  }

  const addEmergencyContact = (contact: string) => {
    if (user && !user.emergencyContacts.includes(contact)) {
      const updated = {
        ...user,
        emergencyContacts: [...user.emergencyContacts, contact],
      }
      setUser(updated)
      localStorage.setItem('wakasafe-user', JSON.stringify(updated))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        userType,
        setUserType,
        register,
        login,
        loginWithGoogle,
        logout,
        updateSafetyScore,
        updateLocation,
        addEmergencyContact,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
