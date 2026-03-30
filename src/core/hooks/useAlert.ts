import { useState, useCallback } from 'react'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

export interface AlertState {
  isVisible: boolean
  type: AlertType
  title: string
  message: string
}

export const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({
    isVisible: false,
    type: 'info',
    title: '',
    message: '',
  })

  const showAlert = useCallback((type: AlertType, title: string, message: string) => {
    setAlert({ isVisible: true, type, title, message })
    setTimeout(() => setAlert(prev => ({ ...prev, isVisible: false })), 4000)
  }, [])

  const hideAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, isVisible: false }))
  }, [])

  const success = useCallback((title: string, message: string) => showAlert('success', title, message), [showAlert])
  const error = useCallback((title: string, message: string) => showAlert('error', title, message), [showAlert])
  const warning = useCallback((title: string, message: string) => showAlert('warning', title, message), [showAlert])
  const info = useCallback((title: string, message: string) => showAlert('info', title, message), [showAlert])

  return { alert, showAlert, hideAlert, success, error, warning, info }
}