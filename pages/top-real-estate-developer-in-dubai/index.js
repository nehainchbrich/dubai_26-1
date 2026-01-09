import React from 'react'
import Website from '../layouts/website'
import API_URLS from '@/config/apiconfig'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/DeveloperListing.module.css'
import { fetchData, fetchWebsitePage } from '@/config/fetchApi'
import { imageKitLoader } from '@/helper/Helper'

const Index = ({ developer, developerPage, meta }) => {
  const data = developer?.data || []
  const [isExpanded, setIsExpanded] = React.useState(false)

  const description = developerPage?.description || ''
  const isLongDescription = description.length > 250

  return (
    <div className={styles.pageWrapper}>
      {/* HERO */}
      <section className={styles.residentialHero}>
        <div className={styles.heroContent}>
          <span className={styles.heroKicker}>{data.length} Global Developers</span>
          <h1 className={styles.heroTitle}>
            Top <br /><span>Developers</span>
          </h1>

          <div className={`${styles.heroDesc} ${isExpanded ? styles.expanded : ''}`}>
            {description ? (
              <div dangerouslySetInnerHTML={{ __html: description }} />
            ) : (
              <p>Partnering with Dubai's most visionary real estate creators</p>
            )}
          </div>

          {isLongDescription && (
            <button
              className={styles.knowMoreBtn}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>

        <div className={styles.heroVisual}>
          <Image
            loader={meta?.thumbnail ? imageKitLoader : undefined}
            src={meta?.thumbnail || '/images/pr banner.jpg'}
            alt={meta?.title || 'Developers'}
            fill
            priority
            unoptimized={!meta?.thumbnail}
          />
        </div>
      </section>

      {/* LISTING */}
      <section className={styles.listingSection}>
        <div className="container">
          <div className={styles.developerGrid}>
            {data.map((item) => (
              <Link
                key={item.slug}
                href={`/top-real-estate-developer-in-dubai/${item.slug}`}
                className={styles.developerCard}
              >
                <div className={styles.logoWrapper}>
                  <Image className={styles.developerLogo}
                    loader={item.logo ? imageKitLoader : undefined}
                    src={item.logo || '/images/default-logo.png'}
                    alt={item.name || 'Developer'}
                    width={500}
                    height={500}
                  />
                </div>

                <h3 className={styles.devName}>{item.name || 'Developer'}</h3>
                <div className={styles.viewProfile}>View Portfolio →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index

Index.getLayout = function getLayout(page) {
  return <Website meta={page.props?.meta || {}}>{page}</Website>
}

export const getStaticProps = async () => {
  try {
    const developer = await fetchData(API_URLS.DEVELOPER, {
      status: 1,
      columns: 'name,logo,slug'
    })

    const developerPage = await fetchWebsitePage('top-real-estate-developer-in-dubai')

    const meta = await fetchData(API_URLS.META, {
      slug: 'top-real-estate-developer-in-dubai',
      columns: 'title,description,thumbnail,slug'
    })

    return {
      props: {
        developer,
        developerPage: developerPage || {},
        meta: meta?.data?.[0] || null
      },
      revalidate: 43200
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        developer: { data: [] },
        developerPage: {},
        meta: null
      }
    }
  }
}
