import { apiClient } from '@/lib/axios';
import { 
  LoginRequestDTO, 
  LoginResponseDTO, 
  RegisterRequestDTO,
  RegisterResponseDTO 
} from '../model/dto';
import { AuthMapper } from '../model/mapper';
import { UserUIModel } from '../model/ui.model';

export class AuthService {
  // Login
  static async login(credentials: LoginRequestDTO): Promise<{ user: UserUIModel; token: string }> {
    const response = await apiClient.post<LoginResponseDTO>('/api/auth/login', credentials);
    
    const user = AuthMapper.toUserUIModel(response.data.user);
    const token = response.data.token;

    return { user, token };
  }

  // Register
  static async register(data: RegisterRequestDTO): Promise<RegisterResponseDTO> {
    const response = await apiClient.post<RegisterResponseDTO>('/api/auth/register', data);
    return response.data;
  }

  // Logout (limpia token del backend si es necesario)
  static async logout(): Promise<void> {
    // Opcional: llamar endpoint de logout si existe
    // await apiClient.post('/api/auth/logout');
  }
}