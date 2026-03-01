import { LoginResponseDTO } from './dto';
import { UserUIModel, UserRole } from './ui.model';

export class AuthMapper {
  static toUserUIModel(dto: LoginResponseDTO['user']): UserUIModel {
    // Determinar el rol según tipo_usuario y id_rol
    let role: UserRole = 'CLIENTE';
    
    if (dto.tipo_usuario === 'PERSONAL') {
      // 1 = Admin, 2 = Veterinario
      role = dto.id_rol === 1 ? 'ADMIN' : 'VETERINARIO';
    }

    return {
      id: dto.id,
      fullName: `${dto.nombre} ${dto.apellido}`,
      email: dto.email,
      role,
      isStaff: dto.tipo_usuario === 'PERSONAL',
    };
  }
}