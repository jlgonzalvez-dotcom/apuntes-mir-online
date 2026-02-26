# Apuntes MIR Online

## Descripción
Landing page + plataforma de documentación para médicos que se preparan el examen MIR.
Proporciona material de estudio de la forma más eficiente. Actualmente en fase **waitlist**.

## Para quién
Para estudiantes MIR que necesitan optimizar su tiempo de estudio.

## Arquitectura

### Stack tecnológico
| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript 5 |
| UI | React 19 |
| Estilos | Tailwind CSS v4 (PostCSS) |
| Fuentes | Aspekta (local), Nothing You Could Do (Google) |
| Contenido | MDX vía `next-mdx-remote-client` + `@next/mdx` |
| Base de datos | Supabase (tabla waitlist) |
| Despliegue | Vercel |

### Estructura clave
```
app/
  page.tsx              → Landing page (hero + preview + features + testimonial + CTA)
  waitlist-form.tsx     → Formulario email waitlist (client component)
  stats-counter.tsx     → Contador animado de stats (client component)
  layout.tsx            → Layout raíz (Header sin sidebar)
  css/style.css         → Tailwind v4 + animaciones CSS custom
  [topic]/[slug]/       → Páginas de documentación (incluye su propio Sidebar)

components/ui/
  header.tsx            → Header con "Unirme gratis" CTA violeta → #waitlist
  footer.tsx            → Footer con "Tus apuntes para el MIR"
  logo.tsx              → Logo + nombre del proyecto
  sidebar.tsx           → Solo se usa en páginas de docs (/[topic]/[slug])
```

### Decisión arquitectónica importante
El **Sidebar** fue eliminado del layout raíz y movido directamente a `app/[topic]/[slug]/page.tsx`.
Así la landing `/` no tiene sidebar, pero las páginas de documentación sí.

## Estado actual
- [x] Landing page con formulario de waitlist
- [x] Conectado con Supabase (tabla waitlist)
- [x] Contador animado en stats (IntersectionObserver)
- [x] Anchor `#waitlist` funcional desde el header
- [x] Social proof strip entre testimonial y CTA
- [ ] Contenido MDX real para las secciones de documentación
- [ ] Personalizar el sidebar con las especialidades MIR reales
- [ ] Imágenes/capturas reales de los apuntes

## Convenciones
- Idioma: español
- Componentes React funcionales con TypeScript
- Variables de entorno en `.env.local` (no subir a git)
- Instalar siempre con `npm install --legacy-peer-deps`

## Diseño de la landing
Estilo **Linear / Notion** — world-class SaaS design:
- Hero con tipografía enorme (`clamp(3rem, 10vw, 88px)`), gradiente violet→blue→cyan
- 3 orbes de luz animados en el background (`animate-glow`)
- Badge pulsante con `animate-ping` y avatar stack (+340 médicos)
- Sección de features oscura (`bg-slate-900`) con cards hover
- Stats con count-up animado al entrar en viewport
- Testimonial con quote grande + social proof strip (3 cards con ⭐⭐⭐⭐⭐)
- CTA final con orbe de luz centrado y botón con efecto shine

## Colores del tema
- Acento principal: **violeta** (`violet-600`)
- Features cards: violeta | pink | cyan
- Sección dark: `bg-slate-900`
- Gradiente hero headline: `from-violet-600 via-blue-500 to-cyan-400`

## Comandos
```bash
npm run dev    # Desarrollo → http://localhost:3000 (o 3001/3002 si ocupado)
npm run build  # Build de producción
npm run start  # Sirve el build de producción
```

## Advertencias conocidas
- `next.config.js` produce un warning sobre `experimental.turbo`; es inofensivo.
- `baseline-browser-mapping` muestra aviso de datos desactualizados; no afecta al sitio.
- Hay 1 vulnerabilidad alta en dependencias (`npm audit`); evaluar antes de producción.
