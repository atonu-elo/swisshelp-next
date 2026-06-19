import SiteHeader from '@/components/SiteHeader/SiteHeader'
import SiteFooter from '@/components/SiteFooter/SiteFooter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import PageSkeleton from '@/components/PageSkeleton/PageSkeleton'

export default function DienstleistungenLoading() {
  return (
    <>
      <SiteHeader />
      <PageWrapper>
        <PageSkeleton type="list" />
      </PageWrapper>
      <SiteFooter />
    </>
  )
}
