'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const ADMIN_PASSWORD = '1234'

type WaitlistEntry = {
  id: string
  email: string
  created_at: string
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

// ── Login ────────────────────────────────────────────────────────────────────

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth', '1')
      onLogin()
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-sm px-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-500/20 mb-4">
              <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <h1 className="text-xl font-[650] text-white tracking-tight">Acceso al panel</h1>
            <p className="text-sm text-slate-400 mt-1">Introduce la contraseña para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              placeholder="Contraseña"
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition text-sm"
            />
            {error && (
              <p className="text-xs text-red-400 text-center">Contraseña incorrecta</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-[650] text-sm transition cursor-pointer"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('waitlist')
        .select('id, email, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        setError(true)
      } else {
        setEntries(data ?? [])
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
            </div>
            <span className="font-[650] text-sm tracking-tight">Panel de administración</span>
            <span className="text-slate-600 text-sm">·</span>
            <span className="text-slate-400 text-sm">Apuntes MIR Online</span>
          </div>
          <button
            onClick={onLogout}
            className="text-xs text-slate-500 hover:text-slate-300 transition cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">

        {/* Stat card */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Total registros</p>
            <p className="text-4xl font-[650] text-white tracking-tighter">
              {loading ? '—' : entries.length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Último registro</p>
            <p className="text-sm font-medium text-white mt-1">
              {loading ? '—' : entries[0] ? formatDate(entries[0].created_at) : 'Sin datos'}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Estado</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-sm font-medium text-emerald-400">Waitlist activa</span>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="font-[650] text-sm text-white">Lista de espera</h2>
            {!loading && (
              <span className="text-xs text-slate-500">{entries.length} {entries.length === 1 ? 'registro' : 'registros'}</span>
            )}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-16 text-slate-500 text-sm">
              Cargando…
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-16 text-red-400 text-sm">
              Error al cargar los datos. Comprueba la conexión con Supabase.
            </div>
          )}

          {!loading && !error && entries.length === 0 && (
            <div className="flex items-center justify-center py-16 text-slate-500 text-sm">
              Aún no hay registros en la waitlist.
            </div>
          )}

          {!loading && !error && entries.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">#</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Email</th>
                    <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Fecha de registro</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, i) => (
                    <tr
                      key={entry.id}
                      className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-600 tabular-nums">{entries.length - i}</td>
                      <td className="px-6 py-4 text-white font-medium">{entry.email}</td>
                      <td className="px-6 py-4 text-slate-400">{formatDate(entry.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    setAuthenticated(localStorage.getItem('admin_auth') === '1')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    setAuthenticated(false)
  }

  // Evita flash antes de leer localStorage
  if (authenticated === null) return null

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />
  }

  return <Dashboard onLogout={handleLogout} />
}
