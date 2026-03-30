import { httpClient } from '@/src/core/lib/http/http-client'
import { Usuario } from '../../domain/entities/usuario.entity'
import { UpdatePerfilRequest } from '../../domain/dtos/request/update-perfil.request'

export const usuarioAdminService = {
    getMe: async (): Promise<Usuario> => {
        const { data } = await httpClient.get('/auth/me')
        return data.user ?? data.data ?? data
    },

    updatePerfil: async (id: number, payload: UpdatePerfilRequest): Promise<Usuario> => {
        const user = JSON.parse(localStorage.getItem('user') ?? '{}')
        const form = new FormData()
        form.append('nombre', payload.nombre)
        form.append('apellido', payload.apellido)
        form.append('telefono', payload.telefono)
        form.append('id', String(id))
        form.append('rol', user.rol ?? 'ADMIN')
        if (payload.foto_perfil) {
            form.append('foto_perfil', payload.foto_perfil)
        }
        try {
            const { data } = await httpClient.put<{ success: boolean; data: Usuario }>(
                `/auth/profile`,
                form
            )
            return data.data
        } catch (e: any) {
            console.error('400 response data:', e.response?.data)
            throw e
        }
    },

    changePassword: async (passwordActual: string, nuevaPassword: string): Promise<void> => {
        await httpClient.put('/auth/cambiar-password', {
            password_actual: passwordActual,
            password_nueva: nuevaPassword,
        })
    },
}