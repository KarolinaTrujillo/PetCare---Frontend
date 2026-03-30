import { Suspense } from 'react'
import { LoaderOne } from '@/src/core/components/ui/loader'
import { AuthCallbackContent } from './AuthCallbackContent'

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="h-screen flex items-center justify-center">
        <LoaderOne />
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}