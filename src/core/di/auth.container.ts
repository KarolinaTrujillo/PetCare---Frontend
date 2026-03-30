import { authService } from '@/src/features/auth/infrastructure/services/auth.service'
import { LoginUseCase } from '@/src/features/auth/domain/usecases/login.usecase'
import { RegisterUseCase } from '@/src/features/auth/domain/usecases/register.usecase'

export const authContainer = {
  loginUseCase: new LoginUseCase(authService),
  registerUseCase: new RegisterUseCase(authService),
}