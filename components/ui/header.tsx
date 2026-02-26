import Logo from '@/components/ui/logo'
import ThemeToggle from './theme-toggle'

export default function Header() {
  return (
    <header className="fixed w-full z-30">
      <div
        className="absolute inset-0 bg-white/75 border-b border-slate-200/80 backdrop-blur-md -z-10 dark:bg-slate-900/80 dark:border-slate-800/80"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo + nombre */}
          <div className="flex items-center gap-6">
            <Logo />
          </div>

          {/* Nav derecha */}
          <nav className="flex items-center gap-2">
            <a
              className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition px-3 py-2"
              href="#0"
            >
              Sobre el proyecto
            </a>
            <a
              className="inline-flex items-center gap-1.5 text-sm font-[650] text-white bg-violet-600 hover:bg-violet-700 shadow-sm shadow-violet-500/25 transition px-4 py-2 rounded-lg"
              href="#waitlist"
            >
              Unirme gratis
            </a>
            <ThemeToggle />
          </nav>

        </div>
      </div>
    </header>
  )
}
