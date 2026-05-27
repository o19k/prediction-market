import type { Metadata } from 'next'
import { getExtracted, setRequestLocale } from 'next-intl/server'
import PlatformAuthRequiredState from '@/app/[locale]/(platform)/_components/PlatformAuthRequiredState'
import SettingsNotificationsContent from '@/app/[locale]/(platform)/settings/_components/SettingsNotificationsContent'
import SectionErrorBoundary from '@/components/SectionErrorBoundary'
import { UserRepository } from '@/lib/db/queries/user'

export async function generateMetadata({ params }: PageProps<'/[locale]/settings/notifications'>): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getExtracted()

  return {
    title: t('Notification Settings'),
  }
}

export default async function NotificationsSettingsPage({ params }: PageProps<'/[locale]/settings/notifications'>) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getExtracted()

  const user = await UserRepository.getCurrentUser({ disableCookieCache: true, minimal: true })
  if (!user) {
    return (
      <PlatformAuthRequiredState
        title={t('Sign in to manage notifications.')}
        description={t('Notification preferences will be available here after you log in again.')}
      />
    )
  }

  return (
    <section className="grid gap-8">
      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t('Notifications')}</h1>
        <p className="text-muted-foreground">
          {t('Configure how you receive notifications.')}
        </p>
      </div>

      <div className="mx-auto w-full max-w-2xl lg:mx-0">
        <SectionErrorBoundary
          title={t('Notification settings are temporarily unavailable.')}
          description={t('Try again in a moment without leaving this page.')}
        >
          <SettingsNotificationsContent user={user} />
        </SectionErrorBoundary>
      </div>
    </section>
  )
}
