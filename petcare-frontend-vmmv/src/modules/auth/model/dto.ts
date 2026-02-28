// ─── Request DTOs (lo que enviamos al backend) ───────────

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface RegisterRequestDTO {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;  
  password: string;
}

// ─── Response DTOs (lo que recibimos del backend) ────────

export interface LoginResponseDTO {
  token: string;
  user: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
    tipo_usuario: 'PERSONAL' | 'CLIENTE';
    id_rol?: number;
  };
}

export interface RegisterResponseDTO {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
    nombre: string;
    apellido: string;
  };
}