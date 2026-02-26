import Logo from '@/components/ui/logo'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 pt-8 dark:border-slate-800">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <div className="shrink-0 flex flex-col md:flex-row items-center">
            {/* Logo */}
            <Logo />
            <div className="text-sm text-slate-500 ml-4">
              © {new Date().getFullYear()} Tus apuntes para el MIR
              <span className="md:hidden lg:inline">. Todos los derechos reservados.</span>
            </div>
          </div>
        </div>
        {/* Social links */}
        <ul className="inline-flex space-x-2">
          <li>
            <a
              className="flex justify-center items-center text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out"
              href="#0"
              aria-label="Twitter / X"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="flex justify-center items-center text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out"
              href="#0"
              aria-label="Instagram"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 9.5c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5zm0 10.7a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm6.77-11.005a1.517 1.517 0 1 1-3.034 0 1.517 1.517 0 0 1 3.034 0zM24.938 10.7a7.503 7.503 0 0 0-2.048-5.31 7.553 7.553 0 0 0-5.31-2.048c-2.093-.119-8.363-.119-10.456 0a7.54 7.54 0 0 0-5.31 2.043A7.524 7.524 0 0 0-.234 10.695c-.119 2.093-.119 8.363 0 10.456a7.503 7.503 0 0 0 2.048 5.31 7.562 7.562 0 0 0 5.31 2.048c2.093.119 8.363.119 10.456 0a7.503 7.503 0 0 0 5.31-2.048 7.553 7.553 0 0 0 2.048-5.31c.119-2.093.119-8.358 0-10.451zm-2.706 12.694a4.253 4.253 0 0 1-2.395 2.395c-1.659.658-5.597.506-7.432.506s-5.778.147-7.432-.506a4.253 4.253 0 0 1-2.395-2.395c-.658-1.659-.506-5.597-.506-7.432s-.147-5.778.506-7.432A4.253 4.253 0 0 1 5.973 6.13c1.659-.658 5.597-.506 7.432-.506s5.778-.147 7.432.506a4.253 4.253 0 0 1 2.395 2.395c.658 1.659.506 5.597.506 7.432s.152 5.778-.506 7.437z" />
              </svg>
            </a>
          </li>
          <li>
            <a
              className="flex justify-center items-center text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out"
              href="#0"
              aria-label="Telegram"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.968 10.276a.338.338 0 0 0-.232-.253 1.192 1.192 0 0 0-.63.045s-14.019 5.038-14.82 5.596c-.172.121-.23.19-.259.272-.138.4.293.573.293.573l3.613 1.177a.388.388 0 0 0 .183-.011c.822-.519 8.27-5.222 8.7-5.38.068-.02.118 0 .1.049-.172.6-6.606 6.319-6.64 6.354a.138.138 0 0 0-.05.118l-.337 3.528s-.142 1.1.956 0a30.66 30.66 0 0 1 1.9-1.738c1.242.858 2.58 1.806 3.156 2.3a1 1 0 0 0 .732.283.825.825 0 0 0 .7-.622s2.561-10.275 2.646-11.658c.008-.135.021-.217.021-.317a1.177 1.177 0 0 0-.032-.316Z" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
