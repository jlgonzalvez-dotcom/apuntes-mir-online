# Apuntes MIR Online

## Descripción
Landing page + plataforma de documentación para médicos que se preparan el examen MIR.
Proporciona material de estudio de la forma más eficiente. Actualmente en fase **waitlist**.

## Para quién
Para estudiantes MIR que necesitan optimizar su tiempo de estudio.

## URLs
- **Producción**: https://mi-proyecto-mu.vercel.app
- **Admin**: https://mi-proyecto-mu.vercel.app/admin (contraseña: `1234`)
- **GitHub**: https://github.com/jlgonzalvez-dotcom/apuntes-mir-online

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
| Base de datos | Supabase (tabla `waitlist`) |
| Despliegue | Vercel (conectado al repo de GitHub, rama `master`) |

### Estructura clave
```
app/
  page.tsx              → Landing page (hero + preview + features + testimonial + CTA)
  waitlist-form.tsx     → Formulario email waitlist conectado a Supabase
  stats-counter.tsx     → Contador animado de stats (IntersectionObserver)
  admin/page.tsx        → Panel admin: lista de emails de la waitlist
  layout.tsx            → Layout raíz (Header sin sidebar)
  css/style.css         → Tailwind v4 + animaciones CSS custom
  [topic]/[slug]/       → Páginas de documentación (incluye su propio Sidebar)

components/ui/
  header.tsx            → Header con "Unirme gratis" CTA violeta → #waitlist
  footer.tsx            → Footer con "Tus apuntes para el MIR"
  logo.tsx              → Logo + nombre del proyecto
  sidebar.tsx           → Solo se usa en páginas de docs (/[topic]/[slug])

lib/
  supabase.ts           → Cliente de Supabase (usa variables de entorno)

supabase/migrations/
  20260226194152_create_waitlist_table.sql   → Crea tabla waitlist
  20260226200644_add_rls_policies_waitlist.sql → Políticas RLS (INSERT + SELECT para anon)
```

### Decisión arquitectónica importante
El **Sidebar** fue eliminado del layout raíz y movido directamente a `app/[topic]/[slug]/page.tsx`.
Así la landing `/` no tiene sidebar, pero las páginas de documentación sí.

## Supabase
- **Proyecto**: PROYECTO MIR (`uxpqzahmycroqqhgitoo`)
- **Región**: Central Europe (Zurich)
- **Tabla**: `waitlist` — campos: `id` (uuid), `email` (text UNIQUE), `created_at` (timestamptz)
- **RLS**: habilitado con políticas que permiten INSERT y SELECT al rol `anon`
- **Variables de entorno** (en `.env.local` y en Vercel):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Vincular proyecto local: `supabase link --project-ref uxpqzahmycroqqhgitoo`
- Aplicar migraciones: `supabase db push --linked --yes`

## Panel /admin
- Ruta: `/admin`
- Protegido con contraseña simple `1234` (localStorage)
- Muestra: total de registros, último registro, estado de waitlist
- Tabla con email y fecha de registro ordenada de más reciente a más antiguo
- Usa la clave `anon` de Supabase (RLS permite SELECT)

## Estado actual
- [x] Landing page con formulario de waitlist
- [x] Formulario conectado a Supabase con manejo de duplicados y errores
- [x] Tabla `waitlist` en Supabase con RLS correctamente configurado
- [x] Contador animado en stats (IntersectionObserver)
- [x] Anchor `#waitlist` funcional desde el header
- [x] Social proof strip entre testimonial y CTA
- [x] Panel /admin con dashboard de emails registrados
- [x] Repositorio en GitHub
- [x] Desplegado en Vercel (producción)
- [ ] Contenido MDX real para las secciones de documentación
- [ ] Personalizar el sidebar con las especialidades MIR reales
- [ ] Imágenes/capturas reales de los apuntes
- [ ] Conectar formulario a servicio de email (Resend, Mailchimp...)

## Convenciones
- Idioma: español
- Componentes React funcionales con TypeScript
- Variables de entorno en `.env.local` (no subir a git)
- Instalar siempre con `npm install --legacy-peer-deps`
- `.npmrc` con `legacy-peer-deps=true` para que Vercel instale correctamente

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
vercel --prod --yes  # Desplegar a producción
```

## Advertencias conocidas
- `next.config.js` produce un warning sobre `experimental.turbo`; es inofensivo.
- `baseline-browser-mapping` muestra aviso de datos desactualizados; no afecta al sitio.
- Hay 1 vulnerabilidad alta en dependencias (`npm audit`); evaluar antes de producción.
- La carpeta `docs-next/` es la plantilla original, se mantiene como referencia.
