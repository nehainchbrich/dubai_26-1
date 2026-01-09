import React from 'react'
import Website from '../layouts/website'
import Image from 'next/image'
import API_URLS from '@/config/apiconfig'
import { imageKitLoader } from '@/helper/Helper'
import { fetchData } from '@/config/fetchApi'
import dynamic from 'next/dynamic'
import ResidentialCard from '@/components/website/property/ResidentialCard'
import styles from '../../styles/DeveloperDetail.module.css'

const LatestBlog = dynamic(() => import('@/components/website/blogs/LatestBlog'))
const LatestProperty = dynamic(() => import('@/components/website/property/LatestProperty'))

const DeveloperDetail = ({ developer, property, meta }) => {
  if (!Array.isArray(developer) || developer.length === 0) {
    return <div className="container py-5">Developer not found</div>
  }

  const currentDev = developer[0]

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.combinedHeader}>
        <div className="container">
          <h1 className={styles.mainTitle}>
            Developer <span>Portfolio</span>
          </h1>
        </div>
      </header>

      <section className={styles.detailSection}>
        <div className="container">
          <div className={styles.developerCard}>
            <div className={styles.identityRow}>
              <div className={styles.logoBox}>
                <Image className={styles.developerLogo}
                  loader={currentDev.logo ? imageKitLoader : undefined}
                  src={currentDev.logo || '/images/default-logo.png'}
                  alt={currentDev.name || 'Developer'}
                  width={200}
                  height={60}
                />
              </div>

              <div className={styles.contentBox}>
                <span className={styles.devBadge}>Elite Developer</span>
                <h1 className={styles.devName}>{currentDev.name}</h1>

                <div
                  className={styles.devDescription}
                  dangerouslySetInnerHTML={{
                    __html: currentDev.description || ''
                  }}
                />

                <div className={styles.statsHighlight}>
                  <div className={styles.highlightCard}>
                    <span className={styles.statVal}>{property?.length || 0}</span>
                    <span className={styles.statLab}>Total Projects</span>
                  </div>
                  <div className={styles.highlightCard}>
                    <span className={styles.statVal}>Dubai</span>
                    <span className={styles.statLab}>Main Operations</span>
                  </div>
                  <div className={styles.highlightCard}>
                    <span className={styles.statVal}>Active</span>
                    <span className={styles.statLab}>Market Status</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="col-lg-8">
              <h2 className={styles.sectionTitle}>Signature Projects</h2>

              {property?.length ? (
                property.map((item) => (
                  <div key={item.id} className="mb-4">
                    <ResidentialCard item={item} />
                  </div>
                ))
              ) : (
                <p className="text-muted">No projects found.</p>
              )}
            </div>

            <div className="col-lg-4">
              <aside className={styles.editorialSidebar}>
                <LatestBlog />
                <LatestProperty />
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DeveloperDetail

DeveloperDetail.getLayout = function getLayout(page) {
  return <Website meta={page.props?.meta || {}}>{page}</Website>
}

export async function getServerSideProps({ query }) {
  try {
    const { slug } = query

    const developerRes = await fetchData(API_URLS.DEVELOPER, {
      status: 1,
      slug
    })

    if (!developerRes?.data?.length) {
      return { notFound: true }
    }

    const dev = developerRes.data[0]
    const devCode = dev?.code

    const propertyRes = devCode
      ? await fetchData(API_URLS.PROPERTIES, { status: 1, developer: devCode })
      : { data: [] }

    const metaRes = await fetchData(API_URLS.META, {
      slug: `top-real-estate-developer-in-dubai/${slug}`,
      columns: 'title,description,thumbnail,slug'
    })

    return {
      props: {
        developer: developerRes.data,
        property: propertyRes?.data || [],
        meta: metaRes?.data?.[0] || null
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        developer: [],
        property: [],
        meta: null
      }
    }
  }
}
