'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { useLanguage } from '@/lib/language-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AlertCircle, Loader2, Phone, Mail } from 'lucide-react'

export function AuthView() {
  const router = useRouter()
  const { register, login, loginWithGoogle, userType, setUserType } = useAuth()
  const { t } = useLanguage()

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin')
  const [activeTab, setActiveTab] = useState('phone')
  
  // Sign In state
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [isOtpSent, setIsOtpSent] = useState(false)
  
  // Sign Up state
  const [fullName, setFullName] = useState('')
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [signupPhone, setSignupPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSendOTP = async () => {
    if (!phone) {
      setError('Please enter a phone number')
      return
    }
    setIsLoading(true)
    setError('')
    try {
      // Simulate OTP sending
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsOtpSent(true)
    } catch (err) {
      setError('Failed to send OTP')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit code')
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

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')
    try {
      // Mock Google OAuth - in production, use @react-oauth/google
      await loginWithGoogle('mock-token')
      router.push('/dashboard')
    } catch (err) {
      setError('Failed to login with Google')
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
      await register(fullName, email, signupPhone, password, nickname || undefined, address || undefined)
      router.push('/dashboard')
    } catch (err) {
      setError('Failed to create account')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-dark backdrop-blur-xl border border-slate-700/30 rounded-2xl p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              WAKASAFE
            </h1>
            <p className="text-slate-400">Welcome to WAKASAFE - Road Safety Platform</p>
          </div>

          {/* Sign In / Sign Up Toggle */}
          <div className="flex gap-2 bg-slate-800/40 p-1 rounded-lg border border-slate-700/30">
            <button
              onClick={() => {
                setAuthMode('signin')
                setError('')
              }}
              className="flex-1 py-2 px-4 rounded-md font-medium transition-all bg-green-600 text-white hover:bg-green-700"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode('signup')
                setError('')
              }}
              className="flex-1 py-2 px-4 rounded-md font-medium transition-all text-slate-400 hover:text-slate-300 hover:bg-slate-700/20"
            >
              Sign Up
            </button>
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

          {/* Auth Tabs */}
          {authMode === 'signin' ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-800/40 border border-slate-700/30">
                <TabsTrigger value="phone" className="text-xs">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone
                </TabsTrigger>
                <TabsTrigger value="google" className="text-xs">
                  <Mail className="w-4 h-4 mr-2" />
                  Google
                </TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4">
                {isOtpSent ? (
                  <div className="space-y-4">
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
                  </div>
                ) : (
                  <div className="space-y-4">
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
                  </div>
                )}
              </TabsContent>

              {/* Google Tab */}
              <TabsContent value="google" className="space-y-4 mt-6">
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
            </TabsContent>
            </Tabs>
          ) : (
            /* Sign Up Form */
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
                <label className="text-sm text-slate-300">Nickname (Optional)</label>
                <Input
                  type="text"
                  placeholder="JD"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
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
                <label className="text-sm text-slate-300">Home Address</label>
                <Input
                  type="text"
                  placeholder="123 Main Street, Aba"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
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

          {/* Error Message */}
          {error && (
            <div className="flex gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          {/* Footer */}
          <p className="text-xs text-slate-500 text-center">
            By continuing, you agree to WAKASAFE Terms & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  )
}
