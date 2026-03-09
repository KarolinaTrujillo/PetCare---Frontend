import { authService } from '@/modules/auth/services/auth.service';
import { RegisterRequest, RegisterResult } from '@/modules/auth/interfaces/auth.interfaces';

export const registerUseCase = async (data: RegisterRequest): Promise<RegisterResult> => {
  const response = await authService.register(data);
  const { user, message } = response.data;

  return { user, message };
};
