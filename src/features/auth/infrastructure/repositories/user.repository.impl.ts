import { IUserRepository } from '../../domain/repositories/user.repository'
import { User } from '../../domain/entities/user.entity'
import { Veterinario } from '../../domain/entities/veterinario.entity'
import { authService } from '../services/auth.service'
import { RegisterRequest } from '../../domain/dtos/request/register.request'

export class UserRepositoryImpl implements IUserRepository {
  async findByEmail(email: string): Promise<User | Veterinario | null> {
    throw new Error('Not implemented')
  }

  async findById(id: number): Promise<User | Veterinario | null> {
    throw new Error('Not implemented')
  }

  async findByIdAndRol(id: number, rol: string): Promise<User | Veterinario | null> {
    throw new Error('Not implemented')
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const response = await authService.register(user as RegisterRequest)
    return response as unknown as User
  }

  async createVeterinario(vet: Omit<Veterinario, 'id'>): Promise<Veterinario> {
    throw new Error('Not implemented')
  }

  async updatePassword(id: number, password: string): Promise<void> {
    throw new Error('Not implemented')
  }

  async updatePasswordByRol(id: number, rol: string, password: string): Promise<void> {
    throw new Error('Not implemented')
  }

  async updateProfile(id: number, rol: string, data: any): Promise<void> {
    throw new Error('Not implemented')
  }

  async delete(id: number): Promise<void> {
    throw new Error('Not implemented')
  }
}