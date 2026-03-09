// Request interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Response interfaces
export interface AuthUser {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface RegisterResponse {
  message: string;
  user: AuthUser;
}

// Result interfaces (lo que devuelven los use-cases)
export interface LoginResult {
  user: AuthUser;
  token: string;
  redirectTo: string;
}

export interface RegisterResult {
  user: AuthUser;
  message: string;
}