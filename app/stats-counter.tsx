'use client'

import { useEffect, useRef, useState } from 'react'

function useCountUp(from: number, to: number, duration: number, trigger: boolean) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (!trigger) return
    const start = Date.now()
    const diff = to - from
    const frame = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(from + diff * eased))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [trigger, from, to, duration])

  return count
}

function StatItem({
  from, to, prefix = '', suffix = '', label, trigger,
}: {
  from: number; to: number; prefix?: string; suffix?: string; label: string; trigger: boolean
}) {
  const count = useCountUp(from, to, 1500, trigger)
  return (
    <div className="text-center">
      <p className="text-3xl md:text-4xl font-[650] text-white tracking-tighter">
        {prefix}{count}{suffix}
      </p>
      <p className="text-slate-500 text-sm mt-1">{label}</p>
    </div>
  )
}

export default function StatsCounter() {
  const [triggered, setTriggered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/8">
      <StatItem from={0} to={10} suffix=" años" label="de exámenes MIR analizados" trigger={triggered} />
      <StatItem from={0} to={100} suffix="%" label="centrado en el MIR, nada más" trigger={triggered} />
      <StatItem from={60} to={30} prefix="< " suffix=" min" label="para repasar una especialidad" trigger={triggered} />
    </div>
  )
}
