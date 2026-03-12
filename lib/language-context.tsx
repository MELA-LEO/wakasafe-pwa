'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'ig' | 'pidgin'

interface Translations {
  [key: string]: string
}

const translations: { [key in Language]: Translations } = {
  en: {
    getStarted: 'Get Started',
    welcome: 'Welcome to WAKASAFE',
    subtitle: 'Real-time Transit Safety Platform',
    phoneAuth: 'Phone Authentication',
    googleAuth: 'Continue with Google',
    enterPhone: 'Enter your phone number',
    sendOTP: 'Send OTP',
    verifyOTP: 'Verify OTP',
    enterOTP: 'Enter the 6-digit code',
    individual: 'Individual Traveler',
    logistics: 'Logistics Partner',
    selectUserType: 'Select your user type',
    dashboard: 'Dashboard',
    safetyScore: 'Safety Score',
    incidents: 'Recent Incidents',
    bookRide: 'Book a Ride',
    tracking: 'Live Tracking',
    emergencySOS: 'Emergency SOS',
    profile: 'Profile',
    logout: 'Logout',
    english: 'English',
    igbo: 'Igbo',
    pidgin: 'Pidgin',
    settings: 'Settings',
    map: 'Map',
    incidents_nearby: 'Incidents Nearby',
    alert: 'Alert',
    warning: 'Warning',
    safe: 'Safe',
    loading: 'Loading...',
    error: 'Error',
    noIncidents: 'No incidents reported',
    addEmergencyContact: 'Add Emergency Contact',
    emergencyContacts: 'Emergency Contacts',
    sosActive: 'SOS Active',
    callHelp: 'Calling for help',
  },
  ig: {
    getStarted: 'Malite',
    welcome: 'Bialu ọmụmụ WAKASAFE',
    subtitle: 'Ihe Ichebe Nsosu N\'oge Ahụ',
    phoneAuth: 'Mmasị Ekwentị',
    googleAuth: 'Gaa maka Google',
    enterPhone: 'Tinye nọmba gị',
    sendOTP: 'Ziga OTP',
    verifyOTP: 'Nyocha OTP',
    enterOTP: 'Tinye numer isii',
    individual: 'Onye Ije',
    logistics: 'Ndị Oru Nta',
    selectUserType: 'Họrọ ụdị gị',
    dashboard: 'Ụlọ',
    safetyScore: 'Ihe Ọnụ Ichebe',
    incidents: 'Ihe Merenụ',
    bookRide: 'Buo Ụgbọ',
    tracking: 'Nlekota Dị Ngwa',
    emergencySOS: 'SOS Ọrịa',
    profile: 'Profaịlụ',
    logout: 'Pụọ',
    english: 'Asụsụ Bekee',
    igbo: 'Asụsụ Igbo',
    pidgin: 'Pidgin',
    settings: 'Ntọonụ',
    map: 'Mapu',
    incidents_nearby: 'Ihe Merenụ N\'ogide',
    alert: 'Iguzo',
    warning: 'Iguzo Mma',
    safe: 'Ichebe',
    loading: 'Elolọ...',
    error: 'Ọkpụkpu',
    noIncidents: 'A dịghị ihe merenụ',
    addEmergencyContact: 'Tinye Okwu Ọrịa',
    emergencyContacts: 'Okwu Ọrịa',
    sosActive: 'SOS Rụrụ',
    callHelp: 'Akpọ Maka Enyemaka',
  },
  pidgin: {
    getStarted: 'Start Now',
    welcome: 'Welcome to WAKASAFE',
    subtitle: 'Safe Travel for All',
    phoneAuth: 'Phone Number',
    googleAuth: 'Use Google',
    enterPhone: 'Put your number',
    sendOTP: 'Send Code',
    verifyOTP: 'Check Code',
    enterOTP: 'Put the code wey dem send',
    individual: 'Person Wey Travel',
    logistics: 'Business Person',
    selectUserType: 'Choose wetin you be',
    dashboard: 'Home',
    safetyScore: 'Safety Level',
    incidents: 'Wetin Happen',
    bookRide: 'Get Transport',
    tracking: 'See Where Motor Dey',
    emergencySOS: 'Emergency Call',
    profile: 'Your Profile',
    logout: 'Go Out',
    english: 'English',
    igbo: 'Igbo Language',
    pidgin: 'Pidgin Talk',
    settings: 'Settings',
    map: 'Map',
    incidents_nearby: 'Wetin Happen Close By',
    alert: 'Alert Come',
    warning: 'Be Careful',
    safe: 'All Good',
    loading: 'Wait Small...',
    error: 'Problem Happen',
    noIncidents: 'No problem report',
    addEmergencyContact: 'Add Person to Call',
    emergencyContacts: 'Persons to Call',
    sosActive: 'Help Come',
    callHelp: 'Calling for help now',
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const stored = localStorage.getItem('wakasafe-language')
    if (stored && (stored === 'en' || stored === 'ig' || stored === 'pidgin')) {
      setLanguageState(stored as Language)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('wakasafe-language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
