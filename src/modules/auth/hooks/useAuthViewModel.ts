import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUseCase } from '@/modules/auth/usecases/LoginUseCase';
import { registerUseCase } from '@/modules/auth/usecases/RegisterUseCase';
import { changePasswordUseCase } from '@/modules/auth/usecases/ChangePasswordUseCase';
import { logoutUseCase } from '@/modules/auth/usecases/LogoutUseCase';
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

  const logout = () => logoutUseCase();

  return { isLoading, error, login, register, changePassword, logout };
};