'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Status = 'idle' | 'loading' | 'success' | 'duplicate' | 'error'

export default function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }])

    if (!error) {
      setStatus('success')
      setEmail('')
      return
    }

    // Código 23505 = unique_violation (email duplicado)
    if (error.code === '23505') {
      setStatus('duplicate')
      setEmail('')
      return
    }

    setStatus('error')
  }

  if (status === 'success') {
    return (
      <div className="inline-flex items-center gap-2.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-xl px-6 py-4 text-base font-medium shadow-sm">
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        ¡Estás apuntado! Te avisaremos pronto.
      </div>
    )
  }

  if (status === 'duplicate') {
    return (
      <div className="inline-flex items-center gap-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-xl px-6 py-4 text-base font-medium shadow-sm">
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
        </svg>
        ¡Ya estás en la lista! Te avisaremos pronto.
      </div>
    )
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          disabled={status === 'loading'}
          className="flex-1 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-400 shadow-sm text-base transition disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="relative overflow-hidden px-6 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-[650] shadow-md shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 whitespace-nowrap text-base cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {/* Efecto shine */}
          <span
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)',
              animation: status === 'loading' ? 'none' : 'shine 3.5s ease-in-out infinite',
            }}
          />
          <span className="relative">
            {status === 'loading' ? 'Guardando…' : 'Unirme a la waitlist →'}
          </span>
        </button>
      </form>

      {status === 'error' && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-3 text-center">
          Algo ha fallado. Inténtalo de nuevo en unos segundos.
        </p>
      )}
    </>
  )
}
