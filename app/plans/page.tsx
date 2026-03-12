'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PLANS = [
  {
    id: 'free',
    name: 'Starter',
    price: '₦0',
    period: 'Forever',
    description: 'Basic ride safety features',
    features: [
      'Real-time incident alerts',
      'Basic safety score',
      'Emergency SOS button',
      '5 monthly reports',
      'Limited route advice',
      'Community incident feed',
    ],
    cta: 'Current Plan',
    current: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₦2,999',
    period: '/month',
    description: 'Enhanced safety & tracking',
    features: [
      'Everything in Starter',
      'Unlimited incident reports',
      'Advanced route optimization',
      'Real-time driver tracking',
      'Priority SOS response',
      'Verified badge',
      'Trip history & analytics',
      'Ad-free experience',
    ],
    cta: 'Upgrade Now',
    current: false,
  },
  {
    id: 'business',
    name: 'Business',
    price: '₦9,999',
    period: '/month',
    description: 'Fleet & enterprise solutions',
    features: [
      'Everything in Premium',
      'Unlimited fleet vehicles',
      'Driver management dashboard',
      'Advanced analytics & reports',
      'Dedicated support',
      'Custom integrations',
      'API access',
      'Insurance eligibility',
    ],
    cta: 'Contact Sales',
    current: false,
  },
]

export default function PlansPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState('free')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800/30 backdrop-blur-md bg-slate-950/40 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-slate-800/30 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Plans & Pricing
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Intro */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl font-bold text-white">Choose Your Plan</h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Get the safety features you need at a price that works for you. All plans include access to WAKASAFE's core safety platform.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`glass-dark rounded-2xl p-8 space-y-6 transition-all ${
                selectedPlan === plan.id ? 'ring-2 ring-green-500 scale-105' : 'hover:border-slate-700'
              } ${plan.current ? 'border-2 border-green-500/50' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {/* Plan Header */}
              <div className="space-y-2">
                {plan.current && (
                  <div className="inline-block bg-green-500/20 border border-green-500/50 rounded-full px-3 py-1">
                    <span className="text-xs font-semibold text-green-300">Current Plan</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="text-slate-400 text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full py-6 ${
                  plan.current
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="glass-dark rounded-2xl p-8 space-y-6">
          <h3 className="text-2xl font-bold text-white">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {[
              {
                q: 'Can I upgrade or downgrade anytime?',
                a: 'Yes! Switch plans anytime. Changes take effect at the end of your billing cycle.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept bank transfers, card payments, and mobile money (MTN, Airtel, GLO).',
              },
              {
                q: 'Is there a free trial for Premium?',
                a: 'Yes, get 7 days free Premium access when you upgrade from Starter.',
              },
              {
                q: 'What about refunds?',
                a: '30-day money-back guarantee if youre not satisfied with Premium or Business.',
              },
            ].map((item, idx) => (
              <div key={idx} className="border-b border-slate-700 pb-4 last:border-b-0">
                <h4 className="font-semibold text-white mb-2">{item.q}</h4>
                <p className="text-slate-400 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
