import { authService } from '@/services/auth.service';
import { LoginRequest, LoginResult } from '@/modules/auth/interfaces/auth.interfaces';

const ROLE_REDIRECT: Record<string, string> = {
  admin: '/admin/dashboard',
  veterinario: '/veterinario/dashboard',
  cliente: '/cliente/dashboard',
};

export const loginUseCase = async (credentials: LoginRequest): Promise<LoginResult> => {
  const response = await authService.login(credentials);
  const { token, user } = response.data;

  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  const redirectTo = ROLE_REDIRECT[user.role] ?? '/';

  return { user, token, redirectTo };
};