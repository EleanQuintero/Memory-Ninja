# FlashCard Generator

Generador de tarjetas de estudio con IA, personalizables por temas de interés y sincronizadas por usuario. Permite crear, organizar y estudiar flashcards generadas automáticamente mediante inteligencia artificial.

## Tabla de Contenidos
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación y Puesta en Marcha](#instalación-y-puesta-en-marcha)
- [Uso](#uso)
- [Endpoints API](#endpoints-api)
- [Componentes Principales](#componentes-principales)
- [Gestión de Estado y Sincronización](#gestión-de-estado-y-sincronización)
- [Personalización de Temas](#personalización-de-temas)
- [Autenticación y Seguridad](#autenticación-y-seguridad)
- [Contribuir](#contribuir)
- [Despliegue](#despliegue)

---

## Características
- Generación automática de flashcards usando IA.
- Personalización de temas de interés y niveles de usuario.
- Sincronización automática y persistente de tarjetas por usuario.
- Interfaz moderna y responsiva con Next.js y Tailwind CSS.
- Autenticación y control de acceso con Clerk.
- Panel de usuario, generación y visualización de flashcards.
- Soporte para múltiples temas y gestión dinámica de intereses.
- API REST para operaciones de flashcards.

## Arquitectura

El proyecto sigue una arquitectura modular y escalable basada en los principios de separación de responsabilidades y reutilización de componentes. Los principales aspectos arquitectónicos son:

- **Next.js App Router**: Utiliza el sistema de rutas y layouts de Next.js para separar vistas, páginas y API endpoints.
- **Componentización**: Todos los elementos de UI y lógica de interacción están desacoplados en componentes reutilizables bajo `src/components`.
- **Gestión de Estado Global**: Zustand se emplea para manejar el estado global de flashcards, temas y preferencias, con persistencia local y sincronización automática.
- **Hooks Personalizados**: Los hooks (`src/hooks/`) encapsulan lógica de sincronización, mobile y otras funcionalidades transversales.
- **Dominio y Tipado**: Los tipos y modelos de dominio (`src/domain/`, `src/utils/types/`) aseguran consistencia y validación de datos en toda la app.
- **Infraestructura y Servicios**: Acceso a datos, caché, sincronización y lógica de usuario se abstraen en servicios y repositorios bajo `src/infrastructure/` y `src/utils/services/`.
- **API Interna**: Los endpoints bajo `src/app/api/` actúan como capa de integración entre el frontend y servicios externos (IA, almacenamiento, etc).
- **Autenticación y Seguridad**: Clerk gestiona la autenticación, autorización y protección de rutas, integrándose en el layout y los endpoints.
- **Persistencia y Sincronización**: El estado se sincroniza periódicamente y se limpia al cambiar de usuario, garantizando integridad y privacidad.
- **Estilos y Temas**: Tailwind CSS y utilidades personalizadas para un diseño consistente y adaptable.

Esta arquitectura permite escalar el proyecto, facilitar el testing, la colaboración y la extensión de nuevas funcionalidades.

## Estructura del Proyecto
- `src/app/` - Páginas principales, rutas y API endpoints.
- `src/components/` - Componentes reutilizables (UI, generador, modales, selectores, etc).
- `src/store/` - Gestión de estado global con Zustand (flashcards, temas, inputs).
- `src/domain/` - Tipos y modelos de dominio.
- `src/hooks/` - Hooks personalizados (sincronización, mobile, etc).
- `src/infrastructure/` - Repositorios y lógica de acceso a datos.
- `src/utils/` - Utilidades, constantes, validaciones, servicios y tipos.
- `public/` - Recursos estáticos e imágenes.

## Instalación y Puesta en Marcha
1. Instala dependencias:
   ```bash
   pnpm install
   # o npm install, yarn install, bun install
   ```
2. Ejecuta el servidor de desarrollo:
   ```bash
   pnpm dev
   # o npm run dev, yarn dev, bun dev
   ```
3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Uso
- Regístrate o inicia sesión (Clerk).
- Configura tus temas de interés y preferencias.
- Genera nuevas flashcards desde el panel de generación.
- Visualiza y estudia tus tarjetas en el dashboard.
- Sincronización automática de tus tarjetas y progreso.

## Endpoints API
- `POST /api/generate-answer` - Genera respuestas IA para preguntas y temas dados.
- `GET /api/getFlashcards` - Obtiene las flashcards del usuario autenticado.
- `POST /api/saveFlashcards` - Guarda nuevas flashcards generadas.
- `POST /api/user-data` - Sincroniza datos de usuario.
- `POST /api/batch` - Sincronización batch de tarjetas.

## Componentes Principales
- **GeneratorFlashCard**: Formulario para crear preguntas y obtener respuestas IA.
- **ThemeSelector / ThemeSetupModal**: Selección y configuración de temas personalizados.
- **InterestSelector / InterestSetupModal**: Selección de intereses iniciales.
- **AppSidebar**: Navegación principal del dashboard.
- **Flashcard**: Visualización individual de tarjetas.
- **SyncIndicator**: Estado de sincronización en tiempo real.

## Gestión de Estado y Sincronización
- Zustand para el estado global de flashcards y temas.
- Sincronización automática y periódica con hooks personalizados (`useFlashcardSync`).
- Persistencia local y limpieza de datos al cambiar de usuario.

## Personalización de Temas
- Añade, elimina y selecciona temas de interés.
- Validación de mínimo/máximo de temas y caracteres.
- Preferencias persistentes por usuario.

## Autenticación y Seguridad
- Clerk para registro, login y control de acceso.
- Protección de rutas sensibles (`Protect` de Clerk).
- Sincronización y limpieza de datos por sesión de usuario.

## Contribuir
1. Haz un fork del repositorio.
2. Crea una rama para tu feature/fix.
3. Haz tus cambios y pruebas.
4. Abre un Pull Request.

## Despliegue
- Recomendado: [Vercel](https://vercel.com/)
- Configura variables de entorno necesarias para Clerk y endpoints de IA.
- Consulta la [documentación de Next.js para despliegue](https://nextjs.org/docs/app/building-your-application/deploying).

---

**Licencia:** MIT

**Contacto:** Abre un issue o Pull Request para dudas o sugerencias.
