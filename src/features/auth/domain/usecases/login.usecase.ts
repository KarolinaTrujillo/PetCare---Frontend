import { LoginRequest } from '../dtos/request/login.request'
import { AuthResponse } from '../dtos/response/auth.response'

interface IAuthService {
  login: (credentials: LoginRequest) => Promise<AuthResponse>
}

export class LoginUseCase {
  constructor(private readonly authService: IAuthService) {}

  async execute(credentials: LoginRequest): Promise<AuthResponse> {
    return await this.authService.login(credentials)
  }
}