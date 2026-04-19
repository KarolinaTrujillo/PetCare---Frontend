# 🐾 PetCare Frontend

Sistema de gestión veterinaria — Aplicación web construida con Next.js 16, React 19 y TypeScript.

## 📋 Tabla de Contenidos

- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Rutas y Vistas](#rutas-y-vistas)
- [Configuración Inicial](#configuración-inicial)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecución](#ejecución)
- [Autenticación y Seguridad](#autenticación-y-seguridad)
- [Consumo de APIs](#consumo-de-apis)
- [Declaración de Uso de IA y Recursos Externos](#declaración-de-uso-de-ia-y-recursos-externos)

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.2.1 | Framework React con App Router y SSR |
| [React](https://react.dev) | 19.2.4 | Librería de interfaz de usuario |
| TypeScript | 5+ | Tipado estático |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilos utilitarios |
| [Axios](https://axios-http.com) | 1.13 | Cliente HTTP con interceptores |
| [Shadcn/ui](https://ui.shadcn.com) | 4.1 | Componentes accesibles (Radix UI) |
| [Lucide React](https://lucide.dev) | 1.7 | Iconografía |
| [Recharts](https://recharts.org) | 3.8 | Gráficas y analítica |
| [GSAP](https://gsap.com) | 3.14 | Animaciones |
| [Motion](https://motion.dev) | 12 | Animaciones declarativas |
| [jsPDF](https://parall.ax/products/jspdf) | 4.2 | Generación de PDF (historial médico) |
| [js-cookie](https://github.com/js-cookie/js-cookie) | 3.0 | Manejo de cookies |

---

## 🏗️ Arquitectura

El frontend sigue una arquitectura **feature-based** con separación de capas inspirada en Clean Architecture. Cada funcionalidad se organiza de forma independiente con sus propias capas de dominio, infraestructura y presentación.

```
src/
├── core/                    # Código compartido entre features
│   ├── components/          # Componentes reutilizables (Header, Modal, UI)
│   ├── di/                  # Contenedores de inyección de dependencias
│   ├── hooks/               # Hooks personalizados globales
│   ├── lib/
│   │   ├── http/            # Cliente HTTP centralizado (Axios + interceptores)
│   │   └── error-messages.ts # Traducción de errores del backend
│   ├── mappers/             # Transformadores de DTOs a entidades de UI
│   └── navigator/routes.ts  # Rutas tipadas de la aplicación
│
└── features/
    ├── auth/                # Autenticación (login, registro, OAuth, recuperación)
    ├── dashboard-admin/     # Panel de administrador
    ├── dashboard-cliente/   # Panel de cliente/dueño de mascota
    ├── dashboard-veterinario/ # Panel de veterinario
    └── landing/             # Página de inicio pública
```

Cada `feature` sigue esta estructura interna:

```
feature/
├── domain/
│   ├── entities/            # Modelos del negocio
│   ├── dtos/                # Contratos de entrada/salida (request/response)
│   ├── repositories/        # Interfaces (contratos abstractos)
│   └── usecases/            # Lógica de negocio del frontend
├── infrastructure/
│   ├── services/            # Llamadas HTTP al backend (Axios)
│   └── repositories/        # Implementaciones concretas de los repositorios
└── presentation/
    ├── components/          # Componentes específicos de la feature
    ├── viewmodels/          # Hooks con lógica de estado y efectos
    ├── views/               # Pantallas principales (Screen components)
    └── types/               # Tipos de props y estado local
```

---

## 📁 Estructura del Proyecto

```
petcare-frontend/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Layout raíz
│   ├── page.tsx                 # Landing page
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── terminos/page.tsx
│   ├── auth/
│   │   ├── callback/            # Callback OAuth Google
│   │   ├── forgot-password/
│   │   └── reset-password/
│   └── dashboard/
│       ├── admin/               # Rutas del panel admin (protegidas)
│       ├── cliente/             # Rutas del panel cliente (protegidas)
│       └── veterinario/         # Rutas del panel veterinario (protegidas)
├── src/                         # Código fuente (features + core)
├── public/                      # Recursos estáticos (imágenes, logos)
├── middleware.ts                # Protección de rutas por rol
├── next.config.ts
└── tailwind.config.*
```

---

## 🗺️ Rutas y Vistas

### Rutas públicas

| Ruta | Descripción |
|---|---|
| `/` | Landing page |
| `/login` | Inicio de sesión (email/contraseña + Google OAuth) |
| `/register` | Registro de nuevo cliente |
| `/terminos` | Términos y condiciones |
| `/auth/forgot-password` | Solicitar recuperación de contraseña |
| `/auth/reset-password` | Restablecer contraseña con token |
| `/auth/callback` | Callback de autenticación Google |

### Panel del Cliente (`/dashboard/cliente`) — Rol: `CLIENTE`

| Ruta | Descripción |
|---|---|
| `/dashboard/cliente` | Resumen general (citas recientes, mascotas) |
| `/dashboard/cliente/mascotas` | Listado de mascotas registradas |
| `/dashboard/cliente/mascotas/:id` | Detalle de una mascota + historial médico |
| `/dashboard/cliente/citas` | Historial y agendado de citas |
| `/dashboard/cliente/configuracion` | Perfil del usuario |

### Panel del Veterinario (`/dashboard/veterinario`) — Rol: `VETERINARIO`

| Ruta | Descripción |
|---|---|
| `/dashboard/veterinario` | Resumen general |
| `/dashboard/veterinario/citas` | Gestión de citas asignadas |
| `/dashboard/veterinario/pacientes` | Pacientes atendidos |
| `/dashboard/veterinario/agenda` | Gestión de disponibilidad (slots) |
| `/dashboard/veterinario/configuracion` | Perfil y cambio de contraseña |

### Panel del Administrador (`/dashboard/admin`) — Rol: `ADMIN`

| Ruta | Descripción |
|---|---|
| `/dashboard/admin` | Dashboard principal con estadísticas |
| `/dashboard/admin/clientes` | Gestión de clientes registrados |
| `/dashboard/admin/citas` | Todas las citas del sistema |
| `/dashboard/admin/pacientes` | Todas las mascotas |
| `/dashboard/admin/personal` | Gestión de veterinarios y admins |
| `/dashboard/admin/analisis` | Gráficas y reportes (Recharts) |
| `/dashboard/admin/configuracion` | Perfil del administrador |

---

## ⚙️ Configuración Inicial

### Requisitos previos

- Node.js 20+
- npm 10+
- Backend de PetCare corriendo (local o producción)

### 1. Clonar el repositorio

```bash
git clone https://github.com/<tu-usuario>/PetCare-Frontend.git
cd PetCare-Frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
# Editar .env.local con los valores correspondientes
```

---

## 🔑 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# URL del Gateway del backend
# Local:      http://localhost:3000/api
# Producción: https://gateway-e45z.onrender.com/api
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

> **Nota:** La variable `NEXT_PUBLIC_API_URL` es la única requerida. Apunta siempre al **gateway**, nunca directamente a los servicios individuales.

---

## 🚀 Ejecución

### Modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de producción

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

---

## 🔒 Autenticación y Seguridad

### Flujo de autenticación

1. El usuario inicia sesión vía `/login` (email + contraseña o Google OAuth).
2. El backend devuelve un `token` JWT y los datos del usuario.
3. El frontend guarda el token en `localStorage` y lo adjunta automáticamente a todas las peticiones mediante un interceptor de Axios.
4. El `middleware.ts` de Next.js protege las rutas del dashboard verificando el token y el rol del usuario antes de renderizar la página.

### Protección de rutas por rol

El archivo `middleware.ts` intercepta todas las rutas `/dashboard/*` y verifica el campo `rol` del payload JWT:

| Ruta | Rol requerido |
|---|---|
| `/dashboard/admin/*` | `ADMIN` |
| `/dashboard/veterinario/*` | `VETERINARIO` |
| `/dashboard/cliente/*` | `CLIENTE` |

Si el rol no coincide, el usuario es redirigido a `/login`.

### Autenticación con Google OAuth

El flujo de Google OAuth está manejado por el backend. El frontend redirige al usuario a:

```
GET {NEXT_PUBLIC_API_URL}/auth/google
```

El backend completa el flujo y redirige de vuelta a `/auth/callback` con el token.

---

## 🌐 Consumo de APIs

### Cliente HTTP centralizado

Todas las peticiones al backend pasan por `src/core/lib/http/http-client.ts`:

```typescript
// El token JWT se adjunta automáticamente en cada request
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
```

**Base URL:** configurada desde `NEXT_PUBLIC_API_URL` (`.env.local`).

### Endpoints consumidos

| Servicio | Método | Endpoint | Descripción |
|---|---|---|---|
| Auth | POST | `/auth/login` | Inicio de sesión |
| Auth | POST | `/auth/register` | Registro de cliente |
| Auth | GET | `/auth/me` | Usuario autenticado |
| Auth | GET | `/auth/google` | Inicio OAuth Google |
| Auth | POST | `/auth/forgot-password` | Solicitar reset |
| Auth | POST | `/auth/reset-password` | Confirmar reset |
| Clientes | GET | `/clients` | Listar clientes (admin) |
| Clientes | DELETE | `/clients/:id` | Eliminar cliente |
| Mascotas | GET | `/pets/user/:userId` | Mascotas del cliente |
| Mascotas | POST | `/pets` | Registrar mascota |
| Mascotas | PUT | `/pets/:id` | Actualizar mascota |
| Mascotas | DELETE | `/pets/:id` | Eliminar mascota |
| Citas | GET | `/citas` | Todas las citas |
| Citas | POST | `/citas` | Crear cita |
| Citas | PUT | `/citas/:id/status` | Actualizar estado |
| Agenda | GET | `/agenda/veterinario/:vetId` | Disponibilidad del vet |
| Agenda | POST | `/agenda` | Crear slot |
| Agenda | DELETE | `/agenda/:id` | Eliminar slot |
| Historial | GET | `/historial/mascota/:id` | Historial médico |
| Historial | POST | `/historial` | Crear registro médico |
| Veterinarios | GET | `/veterinarios/listar` | Listar veterinarios |
| Veterinarios | PUT | `/veterinarios/cambiar-password` | Cambiar contraseña |

### Manejo de errores

El archivo `src/core/lib/error-messages.ts` traduce los mensajes de error del backend a mensajes comprensibles para el usuario en español, cubriendo los casos más comunes: credenciales inválidas, cuenta desactivada, errores de servidor, problemas de red, etc.

---

## 🤖 Declaración de Uso de IA y Recursos Externos

### Uso de Inteligencia Artificial

Durante el desarrollo de este proyecto se utilizaron las siguientes herramientas de IA:

| Herramienta | Uso |
|---|---|
| **Claude (Anthropic)** | Generación de componentes base, revisión de lógica de arquitectura, sugerencias de mejores prácticas en TypeScript/Next.js, y apoyo en la redacción de documentación |
| **GitHub Copilot** | Autocompletado de código en el editor durante el desarrollo |

**Alcance del uso:** Las herramientas de IA fueron utilizadas como asistentes de desarrollo. Todo el diseño de arquitectura, la toma de decisiones técnicas, la integración con el backend, y la revisión/validación del código fueron realizados por el equipo. El código generado por IA fue revisado, adaptado y comprendido por los integrantes antes de integrarse al proyecto.

### Librerías y recursos externos de terceros

| Recurso | Tipo | Uso en el proyecto |
|---|---|---|
| [Shadcn/ui](https://ui.shadcn.com) | Generador de componentes | Componentes de interfaz copiados y adaptados al proyecto (botones, modales, acordeones, etc.) — el código vive en el repositorio y fue modificado según las necesidades del sistema |
| [Lucide React](https://lucide.dev) | Iconografía | Íconos en toda la interfaz |
| [Recharts](https://recharts.org) | Gráficas | Pantalla de analítica del administrador |
| [GSAP](https://gsap.com) | Animaciones | Animaciones de la landing page |
| [Motion](https://motion.dev) | Animaciones | Transiciones de componentes |
| [jsPDF](https://parall.ax/products/jspdf) | Generación PDF | Exportar historial médico de mascotas |
| [canvas-confetti](https://github.com/catdad/canvas-confetti) | Efecto visual | Animación de registro exitoso |
| [Tailwind CSS v4](https://tailwindcss.com) | Estilos | Sistema de diseño y utilidades CSS |
| [Axios](https://axios-http.com) | HTTP | Cliente HTTP con soporte para interceptores |

Todas las librerías listadas están disponibles como paquetes npm de código abierto y se incluyen como dependencias declaradas en `package.json`.