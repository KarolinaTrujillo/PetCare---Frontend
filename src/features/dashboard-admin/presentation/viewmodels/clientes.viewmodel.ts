import { useState, useEffect } from 'react'
import { clientesService } from '../../infrastructure/services/clientes.service'
import { GetClientesUseCase } from '../../domain/usecases/get-clientes.usecase'
import { DeleteClienteUseCase } from '../../domain/usecases/delete-cliente.usecase'
import { Cliente } from '../../domain/entities/cliente.entity'

const getClientesUseCase    = new GetClientesUseCase(clientesService)
const deleteClienteUseCase  = new DeleteClienteUseCase(clientesService)

export const useClientesViewModel = () => {
  const [clientes, setClientes]     = useState<Cliente[]>([])
  const [isLoading, setIsLoading]   = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError]           = useState<string | null>(null)

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

  const deleteCliente = async (c: Cliente) => {
    try {
      setIsDeleting(true)
      await deleteClienteUseCase.execute(c)
      await fetchClientes()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setIsDeleting(false)
    }
  }

  useEffect(() => { fetchClientes() }, [])

  return { clientes, isLoading, isDeleting, error, refetch: fetchClientes, deleteCliente }
}