import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUseCase } from '@/use-cases/auth/login.use-case';
import { registerUseCase } from '@/use-cases/auth/register.use-case';
import { changePasswordUseCase } from '@/use-cases/auth/change-password.use-case';
import { logoutUseCase } from '@/use-cases/auth/logout.use-case';
import { LoginRequest, RegisterRequest, ChangePasswordRequest } from '@/modules/auth/interfaces/auth.interfaces';

export const useAuthViewModel = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginUseCase(credentials);
      router.push(result.redirectTo);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await registerUseCase(data);
      router.push('/auth/login');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (data: ChangePasswordRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await changePasswordUseCase(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cambiar contraseña';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutUseCase();
  };

  return {
    isLoading,
    error,
    login,
    register,
    changePassword,
    logout,
  };
};