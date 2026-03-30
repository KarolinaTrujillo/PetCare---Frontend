export const getErrorMessage = (e: any): string => {
  const raw = e.response?.data?.error ?? e.response?.data?.message ?? e.message ?? ''

  if (!raw) return 'Ocurrió un error inesperado. Intenta de nuevo.'

  if (raw.includes('Credenciales') || raw.includes('Invalid') || raw.includes('inválidas'))
    return 'El correo o la contraseña son incorrectos.'
  if (raw.includes('desactivada') || raw.includes('desactivado'))
    return 'Tu cuenta ha sido desactivada. Contacta al administrador.'
  if (raw.includes('ya está registrado') || raw.includes('already exists') || raw.includes('duplicate'))
    return 'Este correo ya está registrado. Intenta con otro.'
  if (raw.includes('No autorizado') || raw.includes('Unauthorized') || raw.includes('401'))
    return 'No tienes permiso para realizar esta acción.'
  if (raw.includes('Not found') || raw.includes('no encontrado') || raw.includes('404'))
    return 'No se encontró el recurso solicitado.'
  if (raw.includes('Internal server') || raw.includes('500'))
    return 'Error en el servidor. Intenta de nuevo más tarde.'
  if (raw.includes('network') || raw.includes('Network') || raw.includes('ECONNREFUSED'))
    return 'No se pudo conectar al servidor. Verifica tu conexión.'
  if (raw.includes('timeout') || raw.includes('Timeout'))
    return 'La solicitud tardó demasiado. Intenta de nuevo.'
  if (raw.includes('contraseña') || raw.includes('password'))
    return 'La contraseña actual es incorrecta.'
  if (raw.includes('No tienes') || raw.includes('forbidden') || raw.includes('403'))
    return 'No tienes permiso para realizar esta acción.'

  return raw.length > 100 ? 'Ocurrió un error inesperado. Intenta de nuevo.' : raw
}