import { authService } from '@/modules/auth/services/auth.service';
import { ChangePasswordRequest } from '@/modules/auth/interfaces/auth.interfaces';

export const changePasswordUseCase = async (data: ChangePasswordRequest): Promise<void> => {
  if (data.newPassword !== data.confirmPassword) {
    throw new Error('Las contraseñas no coinciden');
  }

  if (data.newPassword.length < 8) {
    throw new Error('La nueva contraseña debe tener al menos 8 caracteres');
  }

  await authService.changePassword({
    currentPassword: data.currentPassword,
    newPassword: data.newPassword,
  });
};
