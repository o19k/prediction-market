import type { Metadata } from 'next'
import { getExtracted, setRequestLocale } from 'next-intl/server'
import PlatformAuthRequiredState from '@/app/[locale]/(platform)/_components/PlatformAuthRequiredState'
import SettingsTradingContent from '@/app/[locale]/(platform)/settings/_components/SettingsTradingContent'
import SectionErrorBoundary from '@/components/SectionErrorBoundary'
import { UserRepository } from '@/lib/db/queries/user'

export async function generateMetadata({ params }: PageProps<'/[locale]/settings/trading'>): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getExtracted()

  return {
    title: t('Trading Settings'),
  }
}

export default async function TradingSettingsPage({ params }: PageProps<'/[locale]/settings/trading'>) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getExtracted()

  const user = await UserRepository.getCurrentUser({ disableCookieCache: true, minimal: true })
  if (!user) {
    return (
      <PlatformAuthRequiredState
        title={t('Sign in to manage trading settings.')}
        description={t('Your market order preferences will be available here after you log in again.')}
      />
    )
  }

  return (
    <section className="grid gap-8">
      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t('Market Order Type')}</h1>
        <p className="text-muted-foreground">
          {t('Choose how your market orders are executed.')}
        </p>
      </div>

      <div className="mx-auto w-full max-w-2xl lg:mx-0">
        <SectionErrorBoundary
          title={t('Trading settings are temporarily unavailable.')}
          description={t('Try again in a moment without leaving this page.')}
        >
          <SettingsTradingContent user={user} />
        </SectionErrorBoundary>
      </div>
    </section>
  )
}
