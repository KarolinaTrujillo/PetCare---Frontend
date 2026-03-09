import { authService } from '@/services/auth.service';

export const logoutUseCase = (): void => {
  authService.logout();
  window.location.href = '/auth/login';
};