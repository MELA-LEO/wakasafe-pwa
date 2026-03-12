'use client'

import { useLanguage, type Language } from '@/lib/language-context'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'ig', label: 'Igbo' },
  { code: 'pidgin', label: 'Pidgin' },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const currentLabel = languages.find((lang) => lang.code === language)?.label || 'EN'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-slate-900/50 border-slate-700/30 hover:bg-slate-800/50 text-slate-300"
        >
          <Globe className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">{currentLabel}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32 glass-dark border-slate-700/30">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${
              language === lang.code
                ? 'bg-green-500/20 text-green-400'
                : 'text-slate-300 hover:bg-slate-800/50'
            }`}
          >
            <span className="text-sm">{lang.label}</span>
            {language === lang.code && <span className="ml-auto text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
