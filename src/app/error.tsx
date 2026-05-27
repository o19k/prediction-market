'use client'

import type { Route } from 'next'
import * as Sentry from '@sentry/nextjs'
import Link from 'next/link'
import { useEffect } from 'react'
import RecoverableErrorState from '@/components/RecoverableErrorState'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <RecoverableErrorState
        title="Unexpected crash"
        description="A page-level crash escaped the local safeguards. Try again, or go back to the home page."
        onRetry={reset}
        action={(
          <Button type="button" variant="ghost" size="sm" asChild>
            <Link href={'/' as Route}>
              Go home
            </Link>
          </Button>
        )}
        className="max-w-md"
      />
    </div>
  )
}
