'use client'

import { useEffect, useState } from 'react'
import { Download, Users, TrendingUp, Calendar, Clock } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type WaitlistEntry = {
  id: string
  email: string
  created_at: string
}

function getWeekStart() {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  return d.toISOString()
}

function getPrevWeekStart() {
  const d = new Date()
  d.setDate(d.getDate() - 14)
  return d.toISOString()
}

function getTodayStart() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function DashboardPage() {
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

  // Cálculo de estadísticas
  const total = entries.length
  const weekStart = getWeekStart()
  const prevWeekStart = getPrevWeekStart()
  const todayStart = getTodayStart()

  const thisWeek = entries.filter(e => e.created_at >= weekStart).length
  const lastWeek = entries.filter(e => e.created_at >= prevWeekStart && e.created_at < weekStart).length
  const today = entries.filter(e => e.created_at >= todayStart).length
  const growthRate = lastWeek === 0
    ? (thisWeek > 0 ? 100 : 0)
    : Math.round(((thisWeek - lastWeek) / lastWeek) * 100)

  // Exportar CSV
  function exportCSV() {
    const header = 'Email,Fecha de registro'
    const rows = entries.map(e =>
      `${e.email},"${new Date(e.created_at).toLocaleString('es-ES')}"`
    )
    const csv = [header, ...rows].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `waitlist_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  function getEntryBadge(iso: string) {
    if (iso >= todayStart) {
      return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">Hoy</Badge>
    }
    if (iso >= weekStart) {
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">Esta semana</Badge>
    }
    return <Badge variant="secondary">Anterior</Badge>
  }

  const stats = [
    {
      label: 'Total emails',
      value: loading ? '—' : total,
      icon: Users,
      sub: null,
    },
    {
      label: 'Esta semana',
      value: loading ? '—' : thisWeek,
      icon: Calendar,
      sub: null,
    },
    {
      label: 'Hoy',
      value: loading ? '—' : today,
      icon: Clock,
      sub: null,
    },
    {
      label: 'Crecimiento',
      value: loading ? '—' : `${growthRate >= 0 ? '+' : ''}${growthRate}%`,
      icon: TrendingUp,
      sub: 'vs semana anterior',
      positive: growthRate >= 0,
    },
  ]

  return (
    <div className="min-h-screen bg-violet-50/60 dark:bg-slate-950">

      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <span className="font-[650] text-slate-900 dark:text-white tracking-tight">
              Apuntes MIR Online
            </span>
            <span className="hidden sm:inline-flex text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              Dashboard
            </span>
          </div>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-violet-100 text-violet-700 text-xs font-semibold">
              JL
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Título + acción */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-[650] text-slate-900 dark:text-white tracking-tight">
              Waitlist
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Registro de emails en lista de espera
            </p>
          </div>
          <Button
            onClick={exportCSV}
            variant="outline"
            size="sm"
            className="gap-2 shrink-0"
            disabled={loading || entries.length === 0}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar CSV</span>
            <span className="sm:hidden">CSV</span>
          </Button>
        </div>

        {/* Cards de estadísticas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, sub, positive }) => (
            <Card key={label}>
              <CardHeader className="pb-2 pt-5">
                <CardTitle className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-5">
                <p className={`text-3xl font-[650] tracking-tighter ${
                  positive === undefined
                    ? 'text-slate-900 dark:text-white'
                    : positive
                      ? 'text-emerald-600'
                      : 'text-red-500'
                }`}>
                  {value}
                </p>
                {sub && (
                  <p className="text-xs text-slate-400 mt-1">{sub}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabla */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-[650] text-slate-900 dark:text-white">
              Lista de espera
            </CardTitle>
            {!loading && (
              <span className="text-xs text-slate-400">
                {total} {total === 1 ? 'registro' : 'registros'}
              </span>
            )}
          </CardHeader>
          <CardContent className="p-0">
            {loading && (
              <div className="flex items-center justify-center py-16 text-slate-400 text-sm">
                Cargando…
              </div>
            )}
            {error && (
              <div className="flex items-center justify-center py-16 text-red-400 text-sm">
                Error al cargar los datos. Comprueba la conexión con Supabase.
              </div>
            )}
            {!loading && !error && entries.length === 0 && (
              <div className="flex items-center justify-center py-16 text-slate-400 text-sm">
                Aún no hay registros en la waitlist.
              </div>
            )}
            {!loading && !error && entries.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12 pl-6">#</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden sm:table-cell">Fecha de registro</TableHead>
                    <TableHead className="text-right pr-6">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entries.map((entry, i) => (
                    <TableRow key={entry.id}>
                      <TableCell className="pl-6 text-slate-400 tabular-nums text-xs">
                        {total - i}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900 dark:text-slate-100">
                        {entry.email}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-slate-500 text-sm">
                        {formatDate(entry.created_at)}
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        {getEntryBadge(entry.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

      </main>
    </div>
  )
}
