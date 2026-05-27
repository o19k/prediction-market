'use client'

import { useEffect } from 'react'
import RecoverableErrorState from '@/components/RecoverableErrorState'

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Settings route error boundary caught an error.', error)
  }, [error])

  return (
    <RecoverableErrorState
      title="Settings are temporarily unavailable."
      description="Something failed while loading this settings section. Try again without leaving the page."
      onRetry={reset}
    />
  )
}
