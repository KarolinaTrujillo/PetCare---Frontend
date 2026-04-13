export const Routes = {
  landing: '/',
  terminos: '/terminos',
  auth: {
    login: '/login',
    register: '/register',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    callback: '/auth/callback',
  },
  dashboard: {
    cliente: {
      overview: '/dashboard/cliente',
      citas: '/dashboard/cliente/citas',
      mascotas: '/dashboard/cliente/mascotas',
      configuracion: '/dashboard/cliente/configuracion',
      mascotaDetalle: (id: number) => `/dashboard/cliente/mascotas/${id}`,
    },
    admin: {
      overview: '/dashboard/admin',
      clientes: '/dashboard/admin/clientes',
      citas: '/dashboard/admin/citas',
      pacientes: '/dashboard/admin/pacientes',
      personal: '/dashboard/admin/personal',
      analisis: '/dashboard/admin/analisis',
      configuracion: '/dashboard/admin/configuracion',
    },
    veterinario: {
      overview: '/dashboard/veterinario',
      citas: '/dashboard/veterinario/citas',
      pacientes: '/dashboard/veterinario/pacientes',
      configuracion: '/dashboard/veterinario/configuracion',
      agenda: '/dashboard/veterinario/agenda',
    }
  }
}