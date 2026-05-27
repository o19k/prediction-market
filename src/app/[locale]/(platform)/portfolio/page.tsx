import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { connection } from 'next/server'
import PortfolioMarketsWonCard from '@/app/[locale]/(platform)/portfolio/_components/PortfolioMarketsWonCard'
import PortfolioTabs from '@/app/[locale]/(platform)/portfolio/_components/PortfolioTabs'
import PortfolioWalletActions from '@/app/[locale]/(platform)/portfolio/_components/PortfolioWalletActions'
import PublicProfileHeroCards from '@/app/[locale]/(platform)/profile/_components/PublicProfileHeroCards'
import SectionErrorBoundary from '@/components/SectionErrorBoundary'
import { UserRepository } from '@/lib/db/queries/user'
import { fetchPortfolioSnapshot } from '@/lib/portfolio'

export const metadata: Metadata = {
  title: 'Portfolio',
}

function getFallbackChartEndDate() {
  return new Date().toISOString()
}

export default async function PortfolioPage({ params }: PageProps<'/[locale]/portfolio'>) {
  const { locale } = await params
  setRequestLocale(locale)

  await connection()
  const fallbackChartEndDate = getFallbackChartEndDate()

  const user = await UserRepository.getCurrentUser()
  const userAddress = user?.deposit_wallet_address ?? ''
  const snapshotAddress = user?.deposit_wallet_address
  const publicAddress = user?.deposit_wallet_address ?? null
  const snapshot = await fetchPortfolioSnapshot(snapshotAddress)

  return (
    <>
      <SectionErrorBoundary
        title="Portfolio summary unavailable"
        description="The top-level portfolio metrics hit a temporary error. Try again without leaving this page."
      >
        <PublicProfileHeroCards
          profile={{
            username: user?.username ?? 'Your portfolio',
            avatarUrl: user?.image ?? '',
            joinedAt: (user as any)?.created_at?.toString?.() ?? (user as any)?.createdAt?.toString?.(),
            portfolioAddress: publicAddress ?? undefined,
          }}
          snapshot={snapshot}
          actions={<PortfolioWalletActions />}
          variant="portfolio"
          fallbackChartEndDate={fallbackChartEndDate}
        />
      </SectionErrorBoundary>

      <SectionErrorBoundary
        title="Claimable markets unavailable"
        description="The claimable positions block hit a temporary error. Try again without leaving this page."
      >
        <PortfolioMarketsWonCard depositWalletAddress={publicAddress} />
      </SectionErrorBoundary>

      <SectionErrorBoundary
        title="Portfolio positions unavailable"
        description="Positions, open orders, or history hit a temporary error. Try again without leaving this page."
      >
        <PortfolioTabs userAddress={userAddress} />
      </SectionErrorBoundary>
    </>
  )
}
