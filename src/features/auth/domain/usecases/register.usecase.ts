import { RegisterRequest } from '../dtos/request/register.request'
import { AuthResponse } from '../dtos/response/auth.response'

interface IAuthService {
  register: (data: RegisterRequest) => Promise<AuthResponse>
}

export class RegisterUseCase {
  constructor(private readonly authService: IAuthService) {}

  async execute(data: RegisterRequest): Promise<AuthResponse> {
    return await this.authService.register(data)
  }
}