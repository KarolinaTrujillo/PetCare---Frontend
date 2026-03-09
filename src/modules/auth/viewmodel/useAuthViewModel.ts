import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '../services/auth.service';
import { 
  LoginRequestDTO, 
  RegisterRequestDTO,
  ForgotPasswordRequestDTO,
  ResetPasswordRequestDTO
} from '../model/dto';
import { getRedirectByRole } from '@/lib/routes';

export function useAuthViewModel() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequestDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.login(credentials);
      const { user, token } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      const redirectPath = getRedirectByRole(user.role);
      router.push(redirectPath);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Credenciales incorrectas';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequestDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.register(data);
      const result = response.data;

      if (result.success) {
        router.push('/login');
        return { success: true, message: result.message };
      } else {
        setError(result.message || 'Error al registrarse');
        return { success: false, message: result.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al registrarse';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (data: ForgotPasswordRequestDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.forgotPassword(data);
      const result = response.data;

      if (result.success) {
        return { success: true, message: result.message };
      } else {
        setError(result.message || 'Error al enviar email');
        return { success: false, message: result.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al enviar email de recuperación';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordRequestDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.resetPassword(data);
      const result = response.data;

      if (result.success) {
        router.push('/login');
        return { success: true, message: result.message };
      } else {
        setError(result.message || 'Error al cambiar contraseña');
        return { success: false, message: result.message };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al cambiar contraseña';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/login');
    }
  };

  return {
    isLoading,
    error,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
  };
}
