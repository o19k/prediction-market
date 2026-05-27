'use client'

import RecoverableErrorState from '@/components/RecoverableErrorState'
import { Button } from '@/components/ui/button'
import { useAppKit } from '@/hooks/useAppKit'

interface PlatformAuthRequiredStateProps {
  title: string
  description: string
  actionLabel?: string
  className?: string
}

export default function PlatformAuthRequiredState({
  title,
  description,
  actionLabel = 'Log in',
  className,
}: PlatformAuthRequiredStateProps) {
  const { open } = useAppKit()

  return (
    <RecoverableErrorState
      title={title}
      description={description}
      className={className}
      action={(
        <Button type="button" size="sm" onClick={() => open()}>
          {actionLabel}
        </Button>
      )}
    />
  )
}
