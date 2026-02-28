import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../services/auth.service';
import { LoginRequestDTO, RegisterRequestDTO } from '../model/dto';
import { getRedirectByRole } from '@/lib/routes';

export function useAuthViewModel() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ─── Login ───────────────────────────────────────────

  const login = async (credentials: LoginRequestDTO) => {
    setIsLoading(true);
    setError(null);

    try {
      const { user, token } = await AuthService.login(credentials);

      // Guardar en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir según el rol (determinado automáticamente por el backend)
      const redirectPath = getRedirectByRole(user.role);
      router.push(redirectPath);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Credenciales incorrectas';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Register ────────────────────────────────────────

  const register = async (data: RegisterRequestDTO) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.register(data);

      if (response.success) {
        // Redirigir a login después del registro
        router.push('/login');
        return { success: true, message: response.message };
      } else {
        setError(response.message || 'Error al registrarse');
        return { success: false, message: response.message };
      }

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
      setError(errorMessage);
      console.error('Register error:', err);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Logout ──────────────────────────────────────────

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirigir a login
      router.push('/login');
    }
  };

  return {
    isLoading,
    error,
    login,
    register,
    logout,
  };
}