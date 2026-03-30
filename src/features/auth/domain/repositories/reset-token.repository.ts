import { ResetToken } from '../entities/reset-token.entity'

export interface IResetTokenRepository {
  create(userId: number, token: string, expiresAt: Date): Promise<ResetToken>
  findByToken(token: string): Promise<ResetToken | null>
  markAsUsed(id: number): Promise<void>
  deleteByUserId(userId: number): Promise<void>
}