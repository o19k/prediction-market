'use client'

import { useEffect } from 'react'
import RecoverableErrorState from '@/components/RecoverableErrorState'

export default function PortfolioError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Portfolio route error boundary caught an error.', error)
  }, [error])

  return (
    <RecoverableErrorState
      title="Portfolio is temporarily unavailable."
      description="Something failed while loading your portfolio. Try again without leaving the page."
      onRetry={reset}
    />
  )
}
