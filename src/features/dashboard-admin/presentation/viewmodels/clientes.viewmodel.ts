import { useState, useEffect } from 'react'
import { clientesService } from '../../infrastructure/services/clientes.service'
import { GetClientesUseCase } from '../../domain/usecases/get-clientes.usecase'
import { Cliente } from '../../domain/entities/cliente.entity'

const getClientesUseCase = new GetClientesUseCase(clientesService)

export const useClientesViewModel = () => {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        setIsLoading(true)
        const data = await getClientesUseCase.execute()
        setClientes(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchClientes()
  }, [])

  return { clientes, isLoading, error }
}