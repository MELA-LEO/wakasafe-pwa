'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'

export function AuthView() {
  const router = useRouter()
  const { register, login, loginWithGoogle, userType, setUserType } = useAuth()

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Sign In state
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)

  // Sign Up state
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [signupPhone, setSignupPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSendOTP = async () => {
    if (!phone) {
      setError('Please enter phone number')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      setIsOtpSent(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) {
      setError('Please enter 6-digit OTP')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      await login(phone, otp)
      router.push('/dashboard')
    } catch (err) {
      setError('Failed to verify OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async () => {
    if (!fullName || !email || !signupPhone || !password) {
      setError('Please fill in all required fields')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      await register(fullName, email, signupPhone, password)
      router.push('/dashboard')
    } catch (err) {
      setError('Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')
    try {
      await loginWithGoogle('mock-token')
      router.push('/dashboard')
    } catch (err) {
      setError('Failed to login with Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-dark rounded-2xl p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              WAKASAFE
            </h1>
            <p className="text-slate-400">Welcome to WAKASAFE</p>
          </div>

          {/* User Type Selection */}
          <div className="space-y-3">
            <p className="text-sm text-slate-300">Select account type</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setUserType('individual')}
                className={`p-3 rounded-lg border transition-all ${
                  userType === 'individual'
                    ? 'glass-dark border-green-500/50 bg-green-500/10'
                    : 'glass-dark border-slate-600/30 hover:border-slate-500/30'
                }`}
              >
                <p className="text-sm font-medium text-slate-200">Individual</p>
              </button>
              <button
                onClick={() => setUserType('logistics')}
                className={`p-3 rounded-lg border transition-all ${
                  userType === 'logistics'
                    ? 'glass-dark border-blue-500/50 bg-blue-500/10'
                    : 'glass-dark border-slate-600/30 hover:border-slate-500/30'
                }`}
              >
                <p className="text-sm font-medium text-slate-200">Logistics</p>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Sign In / Sign Up Forms */}
          {authMode === 'signin' ? (
            <div className="space-y-4">
              {!isOtpSent ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300">Enter your phone number</label>
                    <Input
                      type="tel"
                      placeholder="+234..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={isLoading}
                      className="bg-slate-900/50 border-slate-700/50 text-white placeholder-slate-600"
                    />
                  </div>
                  <Button
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300">Enter OTP code</label>
                    <Input
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                      disabled={isLoading}
                      maxLength={6}
                      className="bg-slate-900/50 border-slate-700/50 text-white placeholder-slate-600 text-center text-lg tracking-widest"
                    />
                  </div>
                  <Button
                    onClick={handleVerifyOTP}
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                  <button
                    onClick={() => {
                      setIsOtpSent(false)
                      setOtp('')
                    }}
                    className="w-full text-sm text-blue-400 hover:text-blue-300"
                  >
                    Back to phone number
                  </button>
                </>
              )}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700/30" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-900 text-slate-400">Or</span>
                </div>
              </div>
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white text-slate-950 hover:bg-slate-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Sign in with Google'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Full Name *</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={isLoading}
                  className="bg-slate-900/50 border-slate-700/50 text-white placeholder-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Email Address *</label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-slate-900/50 border-slate-700/50 text-white placeholder-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="+234..."
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  disabled={isLoading}
                  className="bg-slate-900/50 border-slate-700/50 text-white placeholder-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Password *</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-slate-900/50 border-slate-700/50 text-white placeholder-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Confirm Password *</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-slate-900/50 border-slate-700/50 text-white placeholder-slate-600"
                />
              </div>
              <Button
                onClick={handleSignUp}
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
