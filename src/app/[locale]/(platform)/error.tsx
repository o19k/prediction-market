'use client'

import { useEffect } from 'react'
import RecoverableErrorState from '@/components/RecoverableErrorState'

export default function PlatformError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Platform route error boundary caught an error.', error)
  }, [error])

  return (
    <main className="container py-8">
      <RecoverableErrorState
        title="This page is temporarily unavailable."
        description="Something failed while loading this section. Try again without leaving the page."
        onRetry={reset}
      />
    </main>
  )
}
