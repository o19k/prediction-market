import type { Metadata } from 'next'
import { getExtracted, setRequestLocale } from 'next-intl/server'
import PlatformAuthRequiredState from '@/app/[locale]/(platform)/_components/PlatformAuthRequiredState'
import SettingsProfilePanel from '@/app/[locale]/(platform)/settings/_components/SettingsProfilePanel'
import SectionErrorBoundary from '@/components/SectionErrorBoundary'
import { UserRepository } from '@/lib/db/queries/user'

export async function generateMetadata({ params }: PageProps<'/[locale]/settings'>): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getExtracted()

  return {
    title: t('Settings'),
  }
}

export default async function SettingsPage({ params }: PageProps<'/[locale]/settings'>) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getExtracted()

  const user = await UserRepository.getCurrentUser({ disableCookieCache: true })
  if (!user) {
    return (
      <PlatformAuthRequiredState
        title={t('Sign in to manage your profile.')}
        description={t('Your account settings stay available here once you log in again.')}
      />
    )
  }

  return (
    <section className="grid gap-8">
      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{t('Profile Settings')}</h1>
        <p className="text-muted-foreground">
          {t('Manage your account profile and preferences.')}
        </p>
      </div>

      <SectionErrorBoundary
        title={t('Profile settings are temporarily unavailable.')}
        description={t('Try again in a moment without leaving the page.')}
      >
        <SettingsProfilePanel user={user} />
      </SectionErrorBoundary>
    </section>
  )
}
