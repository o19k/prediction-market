'use client'

import { useEffect } from 'react'
import RecoverableErrorState from '@/components/RecoverableErrorState'

export default function EventRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Event route error boundary caught an error.', error)
  }, [error])

  return (
    <RecoverableErrorState
      title="This market page is temporarily unavailable."
      description="Something failed while loading this event. Try again without leaving the page."
      onRetry={reset}
      className="lg:col-span-2"
    />
  )
}
