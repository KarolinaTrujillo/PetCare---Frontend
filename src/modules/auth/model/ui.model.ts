export type UserRole = 'CLIENTE' | 'ADMIN' | 'VETERINARIO';

export interface UserUIModel {
  id: number;
  fullName: string;        // Nombre + Apellido combinados
  email: string;
  role: UserRole;          // Rol traducido y simplificado
  isStaff: boolean;        // true si es PERSONAL
}

export interface AuthStateUIModel {
  user: UserUIModel | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}