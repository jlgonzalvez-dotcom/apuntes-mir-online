import Link from 'next/link'
import Image from 'next/image'
import LogoImg from '@/public/images/logo.svg'

export default function Logo() {
  return (
    <Link className="inline-flex items-center gap-2.5 mb-2 md:mb-0" href="/" aria-label="Tus apuntes para el MIR">
      <Image src={LogoImg} width={32} height={32} alt="Logo" />
      <span className="text-sm font-[650] text-slate-800 dark:text-slate-200 leading-tight">
        Tus apuntes<br className="hidden sm:block" /> para el MIR
      </span>
    </Link>
  )
}
