'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Shield, Zap, MapPin, AlertTriangle } from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-slate-800/30 backdrop-blur-md bg-slate-950/40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              WAKASAFE
            </div>
            <nav className="hidden md:flex gap-8 text-sm text-slate-400">
              <a href="#features" className="hover:text-slate-200 transition-colors">
                Features
              </a>
              <a href="#safety" className="hover:text-slate-200 transition-colors">
                Safety
              </a>
              <a href="#about" className="hover:text-slate-200 transition-colors">
                About
              </a>
            </nav>
          </div>
        </header>

        {/* Main Hero */}
        <main className="flex-1 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto w-full px-4 py-12 gap-12">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Safe Transit,<br />
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Every Journey
                </span>
              </h1>
              <p className="text-lg text-slate-400 max-w-lg">
                Real-time incident tracking, emergency SOS, and live ride safety features for Nigerian highways. Travel with confidence.
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-dark p-4 rounded-lg">
                <Shield className="w-5 h-5 text-green-400 mb-2" />
                <p className="text-sm text-slate-300">24/7 Safety</p>
              </div>
              <div className="glass-dark p-4 rounded-lg">
                <Zap className="w-5 h-5 text-blue-400 mb-2" />
                <p className="text-sm text-slate-300">Instant SOS</p>
              </div>
              <div className="glass-dark p-4 rounded-lg">
                <MapPin className="w-5 h-5 text-yellow-400 mb-2" />
                <p className="text-sm text-slate-300">Live Tracking</p>
              </div>
              <div className="glass-dark p-4 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-400 mb-2" />
                <p className="text-sm text-slate-300">Incident Alerts</p>
              </div>
            </div>

            {/* CTA Button */}
            <Link href="/auth/onboarding" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto h-12 text-base bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all">
                Get Started →
              </Button>
            </Link>
          </div>

          {/* Right - Image */}
          <div className="flex-1 relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl blur-2xl" />
            <div className="relative glass-dark rounded-2xl p-1 overflow-hidden">
              <Image
                src="/highway-dark.jpg"
                alt="Nigerian highway at night"
                width={500}
                height={600}
                className="rounded-xl object-cover w-full h-96"
                priority
              />
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section id="features" className="border-t border-slate-800/30 bg-slate-950/50 backdrop-blur-md py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Why WAKASAFE?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-dark p-6 rounded-lg">
                <AlertTriangle className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Live Incident Tracking</h3>
                <p className="text-slate-400">Real-time updates on accidents, traffic, and road hazards on your route.</p>
              </div>
              <div className="glass-dark p-6 rounded-lg">
                <Shield className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Emergency SOS</h3>
                <p className="text-slate-400">One-tap emergency button with automatic location sharing to trusted contacts.</p>
              </div>
              <div className="glass-dark p-6 rounded-lg">
                <MapPin className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Route Optimization</h3>
                <p className="text-slate-400">Get the safest and fastest routes based on real-time incident data.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
