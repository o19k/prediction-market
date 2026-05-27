'use client'

import type { ReactNode } from 'react'
import { AlertTriangleIcon, RefreshCwIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface RecoverableErrorStateProps {
  title: string
  description: string
  className?: string
  onRetry?: () => void
  retryLabel?: string
  action?: ReactNode
}

export default function RecoverableErrorState({
  title,
  description,
  className,
  onRetry,
  retryLabel = 'Try again',
  action,
}: RecoverableErrorStateProps) {
  return (
    <section
      className={cn(
        'rounded-xl border border-dashed bg-background/80 p-5 sm:p-6',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="
          mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground
        "
        >
          <AlertTriangleIcon className="size-4" />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {(onRetry || action) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {onRetry && (
                <Button type="button" variant="outline" size="sm" onClick={onRetry}>
                  <RefreshCwIcon className="size-4" />
                  {retryLabel}
                </Button>
              )}
              {action}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
