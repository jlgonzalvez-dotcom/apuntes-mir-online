import WaitlistForm from './waitlist-form'
import StatsCounter from './stats-counter'
import Footer from '@/components/ui/footer'

const avatars = [
  { initials: 'AM', color: '#8B5CF6' },
  { initials: 'CR', color: '#EC4899' },
  { initials: 'JP', color: '#3B82F6' },
  { initials: 'LG', color: '#06B6D4' },
  { initials: 'SV', color: '#10B981' },
]

export default function Home() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">

        {/* Orbes de luz animados */}
        <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
          <div
            className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-violet-400/20 blur-[140px] animate-glow"
          />
          <div
            className="absolute top-20 -right-40 w-[600px] h-[600px] rounded-full bg-pink-400/15 blur-[120px] animate-glow"
            style={{ animationDelay: '1.5s' }}
          />
          <div
            className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-400/15 blur-[100px] animate-glow"
            style={{ animationDelay: '3s' }}
          />
        </div>

        {/* Cuadrícula sutil de fondo */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(to right, #64748b 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">

          {/* Badge con indicador pulsante */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium border border-violet-200/60 dark:border-violet-700/60 animate-fade-up"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            Lista de espera abierta · Plazas limitadas
          </div>

          {/* Headline principal — enorme */}
          <h1
            className="text-[clamp(3rem,10vw,88px)] font-[650] tracking-tighter text-slate-900 dark:text-white leading-[0.92] mb-6 animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            Aprueba el MIR<br />
            <span className="bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              sin perder el norte.
            </span>
          </h1>

          {/* Subtítulo */}
          <p
            className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            Apuntes prácticos, lectura ágil y centrados en lo que <em>realmente</em> se pregunta.
            Para médicos que quieren aprobar con cabeza, no a base de horas.
          </p>

          {/* Formulario de waitlist */}
          <div id="waitlist" className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <WaitlistForm />
          </div>

          {/* Social proof — avatar stack */}
          <div
            className="flex items-center justify-center gap-3 mt-8 animate-fade-up"
            style={{ animationDelay: '0.45s' }}
          >
            <div className="flex -space-x-2.5">
              {avatars.map(({ initials, color }, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-[10px] font-semibold text-white shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300">+340 médicos</span>
              {' '}ya en la lista de espera
            </p>
          </div>

        </div>
      </section>

      {/* ── MOCK PREVIEW — lo que verás ───────────────────────────── */}
      <section className="py-16 md:py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold tracking-widest uppercase text-violet-500 mb-2">Vista previa</p>
            <h2 className="text-3xl md:text-4xl font-[650] tracking-tighter text-slate-800 dark:text-slate-200">
              Así de claros son los apuntes
            </h2>
          </div>

          {/* Tarjeta mock de apunte */}
          <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 shadow-2xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden max-w-3xl mx-auto">
            {/* Barra de título del documento */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
              </div>
              <span className="text-xs text-slate-400 ml-2 font-medium">Cardiología · Tema 04 — Insuficiencia Cardíaca</span>
            </div>
            {/* Contenido del apunte */}
            <div className="p-6 md:p-8 space-y-5">
              {/* Alerta clave */}
              <div className="flex gap-3 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200/60 dark:border-violet-700/40 p-4">
                <span className="text-lg">🎯</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-violet-600 dark:text-violet-400 mb-1">Lo más preguntado</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    El <strong>BNP &gt; 100 pg/mL</strong> es el marcador de elección para el diagnóstico de IC. Preguntado <strong>9 veces</strong> en los últimos 10 años.
                  </p>
                </div>
              </div>
              {/* Tabla rápida */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Clasificación NYHA — memorízala así</p>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {[['I', 'Sin síntomas', 'bg-emerald-50 dark:bg-emerald-900/20', 'text-emerald-700 dark:text-emerald-400'],
                    ['II', 'Síntomas con esfuerzo moderado', 'bg-yellow-50 dark:bg-yellow-900/20', 'text-yellow-700 dark:text-yellow-400'],
                    ['III', 'Síntomas con mínimo esfuerzo', 'bg-orange-50 dark:bg-orange-900/20', 'text-orange-700 dark:text-orange-400'],
                    ['IV', 'Síntomas en reposo', 'bg-red-50 dark:bg-red-900/20', 'text-red-700 dark:text-red-400'],
                  ].map(([grade, desc, bg, text]) => (
                    <div key={grade} className={`rounded-lg p-3 ${bg}`}>
                      <p className={`font-[650] text-base ${text}`}>{grade}</p>
                      <p className="text-slate-600 dark:text-slate-400 mt-1 leading-tight">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Regla mnemotécnica */}
              <div className="flex gap-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200/60 dark:border-blue-700/40 p-4">
                <span className="text-lg">⚡</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-1">Truco rápido</p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Tto. IC sistólica: <strong>IECA + BB + ARM</strong>. Añade diurético si hay congestión. El sacubitrilo/valsartán sustituye al IECA si hay intolerancia o evolución.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-400 mt-5">Vista previa ilustrativa del formato de los apuntes</p>
        </div>
      </section>

      {/* ── FEATURES — sección oscura ─────────────────────────────── */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">

        {/* Luz ambiental superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-violet-600/10 blur-[100px] pointer-events-none" aria-hidden="true" />
        {/* Cuadrícula sutil oscura */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(to right, #94a3b8 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">

          <div className="text-center mb-16">
            <p className="text-violet-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Por qué funciona
            </p>
            <h2 className="text-4xl md:text-5xl font-[650] tracking-tighter text-white mb-4">
              Diseñado para que apruebes,<br className="hidden sm:block" />
              no para que estudies más horas
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Cada decisión de contenido tiene un único objetivo: que en el examen sepas responder con seguridad.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="group rounded-2xl p-8 bg-white/[0.03] border border-white/8 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:bg-violet-500/25 transition-colors">
                <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-[650] text-white mb-3">Material muy práctico</h3>
              <p className="text-slate-400 leading-relaxed text-[15px]">
                Cero relleno. Solo lo que necesitas para contestar bien. Cada concepto tiene una razón de estar ahí.
              </p>
              <div className="mt-6 pt-6 border-t border-white/8">
                <p className="text-violet-400 text-sm font-medium">→ Sin teoría que no te van a preguntar</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl p-8 bg-white/[0.03] border border-white/8 hover:border-pink-500/50 hover:bg-pink-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/20 flex items-center justify-center mb-6 group-hover:bg-pink-500/25 transition-colors">
                <svg className="w-6 h-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-[650] text-white mb-3">Lectura ágil</h3>
              <p className="text-slate-400 leading-relaxed text-[15px]">
                Estructurado para que tu cerebro procese rápido: esquemas, tablas y puntos clave. Sin parrafadas que no llevan a ningún lado.
              </p>
              <div className="mt-6 pt-6 border-t border-white/8">
                <p className="text-pink-400 text-sm font-medium">→ Repasa una especialidad en horas, no días</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl p-8 bg-white/[0.03] border border-white/8 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:bg-cyan-500/25 transition-colors">
                <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="text-xl font-[650] text-white mb-3">Centrado en lo que más se pregunta</h3>
              <p className="text-slate-400 leading-relaxed text-[15px]">
                Análisis de los exámenes MIR de los últimos 10 años. Sabes exactamente qué priorizar y qué puedes dejar para el final.
              </p>
              <div className="mt-6 pt-6 border-t border-white/8">
                <p className="text-cyan-400 text-sm font-medium">→ Prioriza lo que da puntos de verdad</p>
              </div>
            </div>

          </div>

          {/* Stats row — animado */}
          <StatsCounter />

        </div>
      </section>

      {/* ── TESTIMONIAL ───────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">

          {/* Comillas decorativas */}
          <svg className="w-10 h-10 text-violet-300 dark:text-violet-700 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>

          <blockquote className="text-2xl md:text-3xl font-[650] text-slate-800 dark:text-slate-200 tracking-tight leading-snug mb-8">
            "Ojalá hubiera tenido algo así cuando me preparé.
            Los apuntes que existen son o demasiado extensos o demasiado vagos.
            Esto es exactamente lo que necesitaba."
          </blockquote>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
              AM
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Ana M.</p>
              <p className="text-sm text-slate-400">MIR 2024 · Medicina Interna · Madrid</p>
            </div>
          </div>

        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ────────────────────────────────────── */}
      <section className="py-12 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { initials: 'CR', color: '#EC4899', name: 'Carlos R.', role: 'MIR 2023 · Cirugía · Barcelona', text: 'Repasé Cardiología completa en una tarde. Impresionante.' },
              { initials: 'JP', color: '#3B82F6', name: 'Julia P.', role: 'MIR 2024 · Pediatría · Sevilla', text: 'Por fin unos apuntes que van al grano. Sin relleno.' },
              { initials: 'LG', color: '#06B6D4', name: 'Luis G.', role: 'Preparando MIR 2025 · Valencia', text: 'Los trucos rápidos y las tablas me salvan la vida.' },
            ].map(({ initials, color, name, role, text }) => (
              <div key={name} className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/40 p-5 shadow-sm">
                {/* Estrellas */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold text-white shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{name}</p>
                    <p className="text-xs text-slate-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">

        <div className="absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-blue-50 dark:from-violet-950/50 dark:via-slate-900 dark:to-blue-950/50" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-400/15 dark:bg-violet-600/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-[650] tracking-tighter text-slate-900 dark:text-white mb-4">
            Sé el primero en acceder.
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-lg mx-auto">
            Reserva tu plaza en la lista de espera. Sin compromiso, sin spam.
            Solo te avisamos cuando lancemos.
          </p>
          <WaitlistForm />
          <p className="text-sm text-slate-400 mt-4">
            Gratuito para los primeros 500 registrados.
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Footer />
      </div>
    </>
  )
}
