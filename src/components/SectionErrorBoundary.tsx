'use client'

import type { ErrorInfo, ReactNode } from 'react'
import { Component } from 'react'
import RecoverableErrorState from '@/components/RecoverableErrorState'

interface SectionErrorBoundaryProps {
  children: ReactNode
  title: string
  description: string
  retryLabel?: string
  className?: string
  resetKeys?: unknown[]
}

interface SectionErrorBoundaryState {
  hasError: boolean
}

function haveResetKeysChanged(previous: unknown[] = [], next: unknown[] = []) {
  if (previous.length !== next.length) {
    return true
  }

  return previous.some((value, index) => !Object.is(value, next[index]))
}

class SectionErrorBoundaryInner extends Component<SectionErrorBoundaryProps, SectionErrorBoundaryState> {
  override state: SectionErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SectionErrorBoundary caught an error.', error, errorInfo)
  }

  override componentDidUpdate(previousProps: SectionErrorBoundaryProps) {
    if (
      this.state.hasError
      && haveResetKeysChanged(previousProps.resetKeys, this.props.resetKeys)
    ) {
      this.setState({ hasError: false })
    }
  }

  private readonly handleRetry = () => {
    this.setState({ hasError: false })
  }

  override render() {
    if (this.state.hasError) {
      return (
        <RecoverableErrorState
          title={this.props.title}
          description={this.props.description}
          retryLabel={this.props.retryLabel}
          onRetry={this.handleRetry}
          className={this.props.className}
        />
      )
    }

    return this.props.children
  }
}

export default function SectionErrorBoundary(props: SectionErrorBoundaryProps) {
  return <SectionErrorBoundaryInner {...props} />
}
