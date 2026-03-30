interface UsuarioLocal {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  rol: string
  avatar_url: string | null
}

export const getUsuarioLocal = (): UsuarioLocal | null => {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem('user')
    if (!raw) return null
    return JSON.parse(raw) as UsuarioLocal
  } catch {
    return null
  }
}