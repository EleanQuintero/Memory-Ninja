# 🥷 MemoryNinja - Generador de Flashcards con IA

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.16-38bdf8?style=flat-square&logo=tailwind-css)
![pnpm](https://img.shields.io/badge/pnpm-10.20.0-F69220?style=flat-square&logo=pnpm)

**MemoryNinja** es una aplicación web moderna de generación automática de tarjetas de estudio (flashcards) potenciada por inteligencia artificial. Permite a los usuarios crear, organizar y estudiar flashcards personalizadas según sus temas de interés, con sincronización en tiempo real y una experiencia de usuario excepcional.

---

## 📑 Tabla de Contenidos

- [✨ Características Principales](#-características-principales)
- [🏗️ Arquitectura del Sistema](#️-arquitectura-del-sistema)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [📡 API y Endpoints](#-api-y-endpoints)
- [🧩 Componentes Principales](#-componentes-principales)
- [🔄 Gestión de Estado](#-gestión-de-estado)
- [🎨 Sistema de Animaciones](#-sistema-de-animaciones)
- [🔐 Autenticación y Seguridad](#-autenticación-y-seguridad)
- [🧪 Testing](#-testing)
- [📊 Características Técnicas Avanzadas](#-características-técnicas-avanzadas)
- [🌐 Despliegue](#-despliegue)
- [🤝 Contribuir](#-contribuir)
- [📄 Licencia](#-licencia)

---

## ✨ Características Principales

### Funcionalidades de Usuario
- ✅ **Generación Automática con IA**: Crea flashcards personalizadas usando dos modelos de IA:
  - **Kōga (甲賀)**: Modelo básico, rápido y preciso para respuestas confiables
  - **Kurayami (暗闇)**: Modelo premium con respuestas profundas y avanzadas
- 📚 **Gestión de Temas Personalizados**: Crea y administra temas de estudio según tus intereses
- 🔄 **Sincronización en Tiempo Real**: Los datos se sincronizan automáticamente entre dispositivos
- 📊 **Dashboard Analítico**: Visualiza estadísticas de tu progreso de estudio
- 🎯 **Sistema de Onboarding**: Proceso guiado de configuración inicial para nuevos usuarios
- 🌙 **Tema Oscuro**: Interfaz optimizada para reducir fatiga visual
- 📱 **Diseño Responsivo**: Experiencia optimizada en móviles, tablets y escritorio

### Características Técnicas
- ⚡ **Rendimiento Optimizado**: Turbopack, caché inteligente y lazy loading
- 🔒 **Rate Limiting**: Protección contra abuso con límites configurables por endpoint
- 🎭 **Animaciones Accesibles**: Sistema de animaciones con soporte para `prefers-reduced-motion`
- 🧪 **Testing E2E**: Suite completa de pruebas con Playwright
- 📈 **Observabilidad**: Monitoreo y logging estructurado de errores
- 🔄 **Gestión de Errores Robusta**: Manejo de estados de carga, error y reconexión

---

## 🏗️ Arquitectura del Sistema

MemoryNinja sigue una **arquitectura hexagonal** (ports & adapters) con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                   │
│  (Next.js App Router, React Components, UI)            │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│                  APPLICATION LAYER                      │
│  (Hooks, Stores, Business Logic, React Query)          │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│                    DOMAIN LAYER                         │
│  (Entities, Types, Interfaces, Business Rules)         │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│                INFRASTRUCTURE LAYER                     │
│  (Repositories, API Clients, External Services)        │
└─────────────────────────────────────────────────────────┘
```

### Principios Arquitectónicos

1. **Separación de Responsabilidades**: Cada capa tiene responsabilidades bien definidas
2. **Inversión de Dependencias**: Las capas superiores no dependen de las inferiores
3. **Unit of Work Pattern**: Gestión transaccional de operaciones con flashcards
4. **Repository Pattern**: Abstracción del acceso a datos
5. **Custom Hooks**: Lógica de negocio reutilizable y componentes limpios
6. **Server Components**: Renderizado en servidor cuando es posible para mejor SEO y performance

---

## 📂 Estructura del Proyecto

```
flashcards-gen/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API Routes (Backend for Frontend)
│   │   │   ├── generate-answer/     # Generación de respuestas IA
│   │   │   ├── getFlashcards/       # Obtener flashcards del usuario
│   │   │   ├── saveFlashcards/      # Guardar nuevas flashcards
│   │   │   ├── delete-flashcard/    # Eliminar flashcard
│   │   │   ├── user-data/           # Webhook de Clerk (crear usuario)
│   │   │   ├── onboarding-status/   # Estado del onboarding
│   │   │   ├── themes/              # CRUD de temas personalizados
│   │   │   └── dashboard/           # Estadísticas del dashboard
│   │   ├── dashboard/               # Dashboard protegido
│   │   │   ├── components/          # Componentes del dashboard
│   │   │   ├── flashcards/          # Vista de flashcards
│   │   │   ├── generate/            # Generador de flashcards
│   │   │   ├── hooks/               # Hooks del dashboard
│   │   │   │   ├── flashcards-query/
│   │   │   │   ├── themes-query/
│   │   │   │   ├── dashboard-stats/
│   │   │   │   └── user-sync/
│   │   │   └── user-profile/        # Perfil de usuario
│   │   ├── onboarding/              # Flujo de onboarding
│   │   │   ├── components/          # Pasos del onboarding
│   │   │   ├── register/
│   │   │   ├── verify/
│   │   │   ├── subscribe/
│   │   │   └── finished/
│   │   ├── pricing/                 # Página de precios
│   │   ├── layout.tsx               # Layout raíz
│   │   ├── page.tsx                 # Landing page
│   │   └── globals.css              # Estilos globales
│   ├── components/                   # Componentes reutilizables
│   │   ├── landing/                 # Componentes de la landing
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── Value.tsx
│   │   ├── ui/                      # Componentes UI base (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── app-sidebar.tsx      # Sidebar animado del dashboard
│   │   │   ├── sync-indicator.tsx   # Indicador de sincronización
│   │   │   └── ...
│   │   ├── fallbacks/               # Estados de carga
│   │   │   ├── LoadingModal.tsx
│   │   │   ├── SkeletonCard.tsx
│   │   │   └── subscription.tsx
│   │   └── provider/                # Providers de contexto
│   │       └── Provider.tsx         # React Query Provider
│   ├── domain/                       # Modelos de dominio
│   │   ├── flashcards.ts            # Entidades de flashcards
│   │   └── themes.ts                # Entidades de temas
│   ├── infrastructure/               # Capa de infraestructura
│   │   └── flashcardRepository.ts   # Repositorio de flashcards
│   ├── store/                        # Estado global (Zustand)
│   │   └── uiState/
│   │       └── uiState.ts           # Estado de UI global
│   ├── hooks/                        # Hooks personalizados globales
│   │   ├── use-mobile.ts            # Detección de dispositivo móvil
│   │   └── useErrorMessage.ts       # Manejo de mensajes de error
│   ├── animations/                   # Sistema de animaciones
│   │   ├── utils.ts                 # Variantes de animación
│   │   ├── onboardingVariants.ts    # Animaciones del onboarding
│   │   └── hooks/
│   │       └── useReducedMotion.ts  # Hook de accesibilidad
│   ├── middleware/                   # Middlewares
│   │   └── rate-limit.ts            # Rate limiting con Upstash
│   ├── utils/                        # Utilidades
│   │   ├── services/                # Servicios externos
│   │   │   ├── auth/                # Servicios de autenticación
│   │   │   ├── functions/           # Funciones de API
│   │   │   └── unitOfWork/          # Unit of Work pattern
│   │   ├── schemes/                 # Esquemas de validación (Zod)
│   │   │   ├── flashcards-validation/
│   │   │   ├── form-question-validation/
│   │   │   └── get-answers-validation/
│   │   ├── consts/                  # Constantes
│   │   │   └── ninjaModels.ts       # Modelos de IA disponibles
│   │   └── fonts/                   # Fuentes personalizadas
│   ├── lib/                          # Librerías y configuraciones
│   │   ├── redis.ts                 # Cliente de Upstash Redis
│   │   ├── schema.ts                # Schemas JSON-LD para SEO
│   │   └── utils.ts                 # Utilidades generales
│   └── types/                        # Tipos TypeScript globales
│       └── global.d.ts
├── tests/                            # Tests E2E con Playwright
│   └── landing.spec.ts
├── docs/                             # Documentación adicional
│   ├── SIDEBAR_ANIMATIONS_IMPLEMENTATION.md
│   └── SIDEBAR_ANIMATIONS_TESTING.md
├── public/                           # Recursos estáticos
├── .github/                          # GitHub workflows y templates
│   └── instructions/
│       └── project-manual.instructions.md
├── next.config.ts                    # Configuración de Next.js
├── tsconfig.json                     # Configuración de TypeScript
├── playwright.config.ts              # Configuración de Playwright
├── eslint.config.mjs                 # Configuración de ESLint
├── components.json                   # Configuración de shadcn/ui
├── pnpm-workspace.yaml               # Configuración de pnpm
└── package.json                      # Dependencias y scripts
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: [Next.js 16.0.1](https://nextjs.org/) (App Router, React Server Components)
- **UI Library**: [React 19.2.0](https://react.dev/)
- **Lenguaje**: [TypeScript 5.9.3](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS 4.1.16](https://tailwindcss.com/)
- **Componentes UI**: [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animaciones**: [Motion (Framer Motion) 12.23.24](https://motion.dev/)
- **Iconos**: [Lucide React 0.548.0](https://lucide.dev/)
- **Gráficos**: [Recharts 3.3.0](https://recharts.org/)

### Estado y Data Fetching
- **Estado Global**: [Zustand 5.0.8](https://zustand.docs.pmnd.rs/)
- **Data Fetching**: [TanStack Query (React Query) 5.90.5](https://tanstack.com/query)
- **Validación**: [Zod 4.1.12](https://zod.dev/)

### Backend y APIs
- **Runtime**: Next.js API Routes (Node.js + Edge Runtime)
- **Autenticación**: [Clerk 6.34.0](https://clerk.com/)
- **Rate Limiting**: [Upstash Rate Limit 2.0.6](https://upstash.com/)
- **Cache**: [Upstash Redis 1.35.6](https://upstash.com/)

### Herramientas de Desarrollo
- **Package Manager**: [pnpm 10.20.0](https://pnpm.io/)
- **Linting**: [ESLint 9.38.0](https://eslint.org/)
- **Testing E2E**: [Playwright 1.54.1](https://playwright.dev/)
- **Bundler**: Turbopack (integrado en Next.js)
- **Dev Tools**: [React Scan 0.4.3](https://github.com/aidenybai/react-scan)

### SEO y Optimización
- **Schema.org**: [schema-dts 1.1.5](https://github.com/google/schema-dts)
- **Temas**: [next-themes 0.4.6](https://github.com/pacocoursey/next-themes)
- **Toasts**: [Sonner 2.0.7](https://sonner.emilkowal.ski/)

---

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18.x o superior
- pnpm 10.20.0 o superior
- Cuenta de [Clerk](https://clerk.com/) (para autenticación)
- Cuenta de [Upstash](https://upstash.com/) (para Redis y Rate Limiting)

### 1. Clonar el Repositorio
```bash
git clone https://github.com/EleanQuintero/flashcards-gen.git
cd flashcards-gen
```

### 2. Instalar Dependencias
```bash
pnpm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Clerk Webhooks
CLERK_WEBHOOK_CREATE_USER_SIGNING_SECRET=whsec_xxxxx
CLERK_WEBHOOK_DELETE_USER_SIGNING_SECRET=whsec_xxxxx

# Upstash Redis (Rate Limiting)
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx

# Backend API Endpoints (tu servidor de IA y datos)
SERVER_GENERATE_ANSWER=https://api.tubackend.com/generate-answer
SERVER_GET_FLASHCARDS_BY_USER=https://api.tubackend.com/flashcards
SERVER_SAVE_FLASHCARDS=https://api.tubackend.com/flashcards/save
SERVER_DELETE_FLASHCARD=https://api.tubackend.com/flashcards/delete/
SERVER_CREATE_USER=https://api.tubackend.com/users
SERVER_DELETE_USER_DATA=https://api.tubackend.com/users/

# Theme Endpoints
SERVER_CREATE_THEME=https://api.tubackend.com/themes/create
SERVER_GET_THEMES=https://api.tubackend.com/themes
SERVER_DELETE_THEME=https://api.tubackend.com/themes/delete
SERVER_UPDATE_THEME_STATUS=https://api.tubackend.com/themes/status
SERVER_GET_THEME_STATUS=https://api.tubackend.com/themes/status
```

### 4. Ejecutar el Servidor de Desarrollo
```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### 5. Scripts Disponibles
```bash
# Desarrollo con Turbopack
pnpm dev

# Build de producción
pnpm build

# Iniciar servidor de producción
pnpm start

# Linting
pnpm lint

# Tests E2E
pnpm test:e2e

# Tests E2E con UI
pnpm test:e2e:ui
```

---

## 📡 API y Endpoints

### Autenticación y Usuarios
| Endpoint | Método | Descripción | Rate Limit |
|----------|--------|-------------|------------|
| `/api/user-data` | POST | Webhook de Clerk para crear usuario | N/A (webhook) |
| `/api/user-data/delete` | POST | Webhook de Clerk para eliminar usuario | N/A (webhook) |
| `/api/onboarding-status` | POST | Actualizar estado de onboarding | 3 req/60s |

### Flashcards
| Endpoint | Método | Descripción | Rate Limit |
|----------|--------|-------------|------------|
| `/api/getFlashcards` | GET | Obtener todas las flashcards del usuario | 20 req/60s |
| `/api/generate-answer` | POST | Generar respuesta IA para preguntas | 10 req/60s |
| `/api/saveFlashcards` | POST | Guardar nuevas flashcards | 10 req/60s |
| `/api/delete-flashcard` | DELETE | Eliminar una flashcard | 10 req/60s |

### Temas
| Endpoint | Método | Descripción | Rate Limit |
|----------|--------|-------------|------------|
| `/api/themes/get-themes-by-user` | GET | Obtener temas del usuario | 20 req/60s |
| `/api/themes/create-theme` | POST | Crear nuevo tema | 10 req/60s |
| `/api/themes/delete-theme` | DELETE | Eliminar tema | 10 req/60s |
| `/api/themes/get-theme-status` | GET | Obtener estado del tema | 20 req/60s |
| `/api/themes/update-status` | PUT | Actualizar estado del tema | 10 req/60s |

### Dashboard (Estadísticas)
| Endpoint | Método | Descripción | Rate Limit |
|----------|--------|-------------|------------|
| `/api/dashboard/count-flashcards-by-theme` | GET | Contar flashcards por tema | 20 req/60s |
| `/api/dashboard/latest-flashcards-created` | GET | Últimas flashcards creadas | 20 req/60s |
| `/api/dashboard/max-flashcards-by-user` | GET | Máximo de flashcards por usuario | 20 req/60s |
| `/api/dashboard/theme-with-most-flashcards` | GET | Tema con más flashcards | 20 req/60s |

### Rate Limiting

El sistema implementa rate limiting granular con Upstash Redis:

```typescript
// Configuraciones predefinidas
RATE_LIMIT_CONFIGS = {
  DEFAULT: { requests: 5, duration: "60s" },
  DASHBOARD: { requests: 20, duration: "60s" },
  AUTH: { requests: 3, duration: "60s" },
  READ: { requests: 20, duration: "60s" },
  WRITE: { requests: 10, duration: "60s" }
}
```

Cada endpoint tiene su propio identificador para evitar colisiones:
```typescript
export const GET = rateLimitter({
  fn: getFlashcards,
  options: { ...RATE_LIMIT_CONFIGS.READ, identifier: 'getFlashcards' }
});
```

---

## 🧩 Componentes Principales

### Landing Page
- **`Header`**: Barra de navegación con logo y botones de autenticación
- **`Hero`**: Sección principal con propuesta de valor y CTA
- **`HowItWorks`**: Explicación del funcionamiento en 3 pasos
- **`Value`**: Beneficios y características destacadas
- **`Pricing`**: Planes de suscripción (Free, Basic, Pro)
- **`FAQ`**: Preguntas frecuentes
- **`Footer`**: Enlaces legales y redes sociales

### Dashboard
- **`AppSidebar`**: Navegación lateral animada con Motion
  - Integración con Clerk (avatar de usuario)
  - Rutas: Home, Flashcards, Generate
  - Animaciones adaptativas según accesibilidad
- **`Dashboard`**: Vista principal con estadísticas
  - Gráficos de progreso con Recharts
  - Últimas flashcards creadas
  - Distribución por temas
- **`SyncIndicator`**: Indicador de estado de sincronización

### Generador de Flashcards
- **`GeneratorFlashCard`**: Formulario principal
  - Selector de modelo de IA
  - Selector de tema
  - Input de preguntas con validación
  - Generación y previsualización de respuestas
- **`ThemeSelector`**: Selector de temas con búsqueda
- **`ThemeSetupModal`**: Modal para crear/editar temas

### Flashcards
- **`FlashcardGrid`**: Grid responsivo de flashcards
- **`FlashcardCard`**: Tarjeta individual con efecto flip
- **`FlashcardFilters`**: Filtros por tema y fuente (modelo)

### Onboarding
- **`Start`**: Bienvenida al onboarding
- **`Register`**: Formulario de registro
- **`Verify`**: Verificación de email
- **`Subscribe`**: Selección de plan
- **`Finish`**: Confirmación y redirección

### UI Base (shadcn/ui)
Componentes reutilizables construidos sobre Radix UI:
- **Formularios**: `Button`, `Input`, `Textarea`, `Select`
- **Feedback**: `Dialog`, `Alert`, `Toast` (Sonner)
- **Navegación**: `Sidebar`, `Tabs`, `Sheet`
- **Datos**: `Card`, `Badge`, `Separator`, `Tooltip`
- **Estados**: `Skeleton`, `Progress`, `HoverCard`

---

## 🔄 Gestión de Estado

### Zustand Stores

#### 1. UI State (`src/store/uiState/uiState.ts`)
```typescript
interface UIState {
  error: string | null;
  loading: boolean;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}
```
**Uso**: Estado global de carga y errores de la aplicación.

#### 2. Source Store (`src/app/dashboard/generate/store/sourceStore.ts`)
```typescript
interface sourceState {
  source: string; // "all" | "Basic" | "Pro"
  setSource: (source: string) => void;
}
```
**Uso**: Filtro de fuente de flashcards en el dashboard.

### React Query (TanStack Query)

#### Flashcards Query (`useFlashCardsQuery`)
```typescript
// Queries
- flashcards: Query<flashcard[]>  // GET flashcards
  - staleTime: 5 minutos
  - gcTime: 30 minutos
  - refetchOnWindowFocus: false

// Mutations
- getAnswer: Mutation<AnswerData>  // Generar respuesta IA
- saveFlashcards: Mutation<void>   // Guardar flashcards
- deleteFlashcard: Mutation<void>  // Eliminar flashcard
```

#### Themes Query (`useThemeQuerys`)
```typescript
// Queries
- themes: Query<themes[]>        // GET temas del usuario
- theme_status: Query<boolean>   // GET estado de tema

// Mutations
- createTheme: Mutation<void>    // Crear nuevo tema
- deleteTheme: Mutation<void>    // Eliminar tema
- updateStatus: Mutation<void>   // Actualizar estado
```

### Unit of Work Pattern

**`FlashcardUnitOfWork`** implementa el patrón Unit of Work para gestionar operaciones transaccionales:

```typescript
class FlashcardUnitOfWork {
  // Singleton instance
  public static getInstance(): FlashcardUnitOfWork

  // Operaciones
  public async commitFlashcards(data: flashcardToSync): Promise<void>
  public async loadUserFlashCards(): Promise<flashcard[]>
  public async getAnswers(props: getAnswersProps): Promise<AnswerData>
  public async deleteFlashcard(id: string): Promise<void>
}
```

**Beneficios**:
- Centralización de lógica de negocio
- Transaccionalidad implícita
- Fácil testing y mocking
- Separación clara entre capas

---

## 🎨 Sistema de Animaciones

MemoryNinja implementa un sistema de animaciones accesible con Motion (Framer Motion):

### Características
- **Lazy Loading**: Solo carga animaciones cuando son necesarias
- **Accesibilidad**: Detecta `prefers-reduced-motion` automáticamente
- **Performance**: Usa `transform` y `opacity` para animaciones de 60fps
- **Variants**: Sistema de variantes reutilizables

### Hook de Accesibilidad
```typescript
// src/animations/hooks/useReducedMotion.ts
export const useReducedMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mediaQuery.matches);

    const handleChange = () => setShouldReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return shouldReduceMotion;
};
```

### Variantes de Animación (Sidebar)
```typescript
// src/animations/utils.ts
export const sidebarMenuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

export const sidebarIconVariants = {
  idle: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
};
```

### Transiciones de Página
```typescript
// src/components/ui/page-transition.tsx
<LazyMotion features={domAnimation}>
  <m.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </m.div>
</LazyMotion>
```

---

## 🔐 Autenticación y Seguridad

### Clerk Authentication

**Características implementadas**:
- ✅ Sign In / Sign Up con email y contraseña
- ✅ Verificación de email obligatoria
- ✅ Localización en español (`esES`)
- ✅ Protección de rutas con `<Protect>`
- ✅ Webhooks para sincronización de usuarios
- ✅ Metadata personalizada (onboarding, subscripción)

### Protección de Rutas

**Dashboard protegido**:
```tsx
<Protect
  condition={(has) => has({ feature: "pro_user" }) || Boolean(isAdmin)}
  fallback={<SubscriptionFallback />}
>
  <Dashboard />
</Protect>
```

### Rate Limiting

**Sistema multinivel con Upstash**:
- Rate limiting por usuario (no por IP)
- Identificadores únicos por endpoint
- Headers informativos en respuestas:
  - `X-RateLimit-Limit`: Límite máximo
  - `X-RateLimit-Remaining`: Requests restantes
  - `X-RateLimit-Reset`: Timestamp de reset
  - `Retry-After`: Segundos hasta poder reintentar

**Ejemplo de configuración**:
```typescript
export const POST = rateLimitter({
  fn: generateAnswer,
  options: {
    requests: 10,        // 10 requests
    duration: "60s",     // por 60 segundos
    identifier: 'generateAnswer'  // identificador único
  }
});
```

### Validación de Datos (Zod)

**Schemas de validación**:

```typescript
// Flashcards
const flashcardSchema = z.object({
  flashcard: z.array(
    z.object({
      question: z.string().min(1).max(500),
      answer: z.string().min(1).max(290),
      theme: z.string()
    })
  ).min(1, "Debe tener al menos una flashcard"),
  user_id: z.string()
});

// Generación de respuestas
const getAnswersSchema = z.object({
  questions: z.array(z.string()).min(1),
  theme: z.string().min(1),
  model: z.string().min(1)
});
```

### Seguridad en Webhooks

**Verificación de firma Clerk**:
```typescript
const evt = await verifyWebhook(req, {
  signingSecret: process.env.CLERK_WEBHOOK_CREATE_USER_SIGNING_SECRET!
});

if (evt.type !== "user.created") {
  return NextResponse.json({ received: true }, { status: 200 });
}
```

---

## 🧪 Testing

### Playwright E2E Tests

**Configuración** (`playwright.config.ts`):
```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
  ],
});
```

**Suite de Tests de Landing Page**:
- ✅ Renderizado de componentes principales
- ✅ Navegación y enlaces funcionales
- ✅ Responsividad (móvil, tablet, desktop)
- ✅ SEO (metadatos, títulos, descripciones)
- ✅ Accesibilidad (roles ARIA)

**Ejecutar tests**:
```bash
# Todos los tests
pnpm test:e2e

# Con interfaz gráfica
pnpm test:e2e:ui

# En un navegador específico
pnpm test:e2e --project=chromium

# Ver reporte
pnpm dlx playwright show-report
```

---

## 📊 Características Técnicas Avanzadas

### 1. SEO Optimizado

**JSON-LD Schemas**:
```typescript
// Organization Schema
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Memory Ninja",
  "url": "https://www.memoryninja.es",
  "logo": "https://res.cloudinary.com/...",
  "sameAs": ["twitter.com/...", "instagram.com/..."]
}

// Website Schema con SearchAction
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://memoryninja.es/search?q={search_term_string}"
  }
}
```

**Metadatos dinámicos**:
- Títulos únicos por página
- Descripciones optimizadas
- Open Graph para redes sociales
- Keywords relevantes

### 2. Performance

**Optimizaciones implementadas**:
- ✅ **Turbopack**: Bundler ultra-rápido de Next.js
- ✅ **Server Components**: Renderizado en servidor por defecto
- ✅ **Image Optimization**: Deshabilitado por configuración (imágenes estáticas)
- ✅ **Code Splitting**: Automático por ruta
- ✅ **Lazy Loading**: Componentes y animaciones
- ✅ **React Query Cache**: Reducción de llamadas redundantes
- ✅ **Debounce**: En inputs de búsqueda y generación

**Configuración de caché**:
```typescript
// Flashcards
staleTime: 5 * 60 * 1000,  // 5 minutos
gcTime: 30 * 60 * 1000,    // 30 minutos

// Themes
staleTime: 60 * 60 * 1000, // 60 minutos
gcTime: 60 * 60 * 1000,    // 60 minutos
```

### 3. Error Handling

**Sistema de gestión de errores**:
```typescript
// Hook personalizado
const { errorMessage, setError, clearError } = useErrorMessage();

// En mutations
onError: (error: Error) => {
  toast.error(error.message);
  setError(error.message);
}

// En queries
retry: 3,
retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
```

**Estados de carga**:
- Skeleton screens
- Loading modals
- Progress indicators
- Toasts informativos

### 4. Accesibilidad

**Implementaciones**:
- ✅ Semantic HTML
- ✅ ARIA roles y labels
- ✅ Navegación por teclado
- ✅ Focus visible
- ✅ `prefers-reduced-motion`
- ✅ Contraste de colores (WCAG AA)
- ✅ Textos alternativos en imágenes

### 5. Internacionalización

**Preparado para i18n**:
- Clerk con localización española (`esES`)
- Mensajes de error en español
- Estructura preparada para añadir más idiomas

---

## 🌐 Despliegue

### Vercel (Recomendado)

**1. Conecta tu repositorio**:
```bash
# Instala Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

**2. Configura variables de entorno** en el dashboard de Vercel:
- Añade todas las variables del `.env.local`
- Marca las variables sensibles como "Sensitive"

**3. Configuración de dominio**:
- Conecta tu dominio personalizado
- Configura DNS (A record o CNAME)
- SSL automático con Let's Encrypt

### Otras Plataformas

**Netlify**:
```bash
# netlify.toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**Railway / Render**:
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Variables de Entorno Requeridas

```env
# ✅ Clerk (Obligatorio)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
CLERK_WEBHOOK_CREATE_USER_SIGNING_SECRET
CLERK_WEBHOOK_DELETE_USER_SIGNING_SECRET

# ✅ Upstash Redis (Obligatorio)
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN

# ✅ Backend APIs (Obligatorio)
SERVER_GENERATE_ANSWER
SERVER_GET_FLASHCARDS_BY_USER
SERVER_SAVE_FLASHCARDS
SERVER_DELETE_FLASHCARD
SERVER_CREATE_USER
SERVER_DELETE_USER_DATA
```

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Sigue estos pasos:

### 1. Fork del Proyecto
```bash
git clone https://github.com/EleanQuintero/flashcards-gen.git
cd flashcards-gen
git remote add upstream https://github.com/EleanQuintero/flashcards-gen.git
```

### 2. Crea una Rama
```bash
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
```

### 3. Haz tus Cambios
- Sigue el estilo de código existente
- Añade tests si es necesario
- Actualiza documentación

### 4. Commit con Mensaje Descriptivo
```bash
git commit -m "feat: añade sistema de notificaciones push"
# o
git commit -m "fix: corrige bug en generación de flashcards"
```

**Formato de commits** (Conventional Commits):
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formateo, punto y coma faltantes, etc.
- `refactor:` Refactorización de código
- `test:` Añade o modifica tests
- `chore:` Tareas de mantenimiento

### 5. Push y Pull Request
```bash
git push origin feature/nueva-funcionalidad
```

Abre un Pull Request en GitHub con:
- Descripción clara de los cambios
- Screenshots si aplica
- Referencias a issues relacionados

### Código de Conducta
- Sé respetuoso y constructivo
- Acepta críticas constructivas
- Enfócate en lo mejor para la comunidad

---

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.

```
MIT License

Copyright (c) 2025 Elean Quintero

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contacto y Soporte

- **Autor**: Elean Quintero
- **GitHub**: [@EleanQuintero](https://github.com/EleanQuintero)
- **Email**: contacto@memoryninja.es
- **Issues**: [GitHub Issues](https://github.com/EleanQuintero/flashcards-gen/issues)

---

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - Framework React increíble
- [Clerk](https://clerk.com/) - Autenticación sin complicaciones
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI hermosos
- [Upstash](https://upstash.com/) - Redis serverless
- [Vercel](https://vercel.com/) - Hosting y despliegue
- Comunidad open-source ❤️

---

<div align="center">
  <strong>Hecho con ❤️ por <a href="https://github.com/EleanQuintero">Elean Quintero</a></strong>
  <br />
  <sub>⭐ Si te gusta el proyecto, dale una estrella en GitHub</sub>
</div>
