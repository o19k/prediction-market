'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

function useSentryCapture(error: Error & { digest?: string }) {
  useEffect(function captureExceptionEffect() {
    Sentry.captureException(error)
  }, [error])
}

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useSentryCapture(error)

  return (
    <html lang="en">
      <body className="m-0 flex min-h-screen items-center justify-center bg-background px-6 py-16 font-sans">
        <div className="max-w-md rounded-xl border border-dashed bg-background p-6 text-left shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">Unexpected crash</p>
          <h1 className="mt-2 text-2xl font-semibold text-foreground">The app hit a root-level error.</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This is outside the normal page safeguards. Reload the page to try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="
              mt-4 inline-flex cursor-pointer items-center rounded-md border bg-background px-3 py-2 text-sm font-medium
              text-foreground
            "
          >
            Reload page
          </button>
        </div>
      </body>
    </html>
  )
}
