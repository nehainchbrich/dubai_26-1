import React from 'react'
import Website from '../layouts/website'
import API_URLS from '@/config/apiconfig'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../../styles/DeveloperListing.module.css';
import { fetchData, fetchWebsitePage } from '@/config/fetchApi'
import { imageKitLoader } from '@/helper/Helper'

const index = ({ developer, developerPage, meta }) => {
  const { data } = developer;
  const [isExpanded, setIsExpanded] = React.useState(false);
  const description = developerPage.description || "";
  const isLongDescription = description.length > 250;

  return (
    <div className={styles.pageWrapper}>
      {/* LUXURY HERO BANNER */}
      <section className={styles.residentialHero}>
        <div className={styles.heroContent}>
          <span className={styles.heroKicker}>{data.length} Global Developers</span>
          <h1 className={styles.heroTitle}>
            Top <br /><span>Developers</span>
          </h1>
          <div className={`${styles.heroDesc} ${isExpanded ? styles.expanded : ""}`}>
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
              {isExpanded ? "Show Less" : "Read More"}
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
              >
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.heroVisual}>
          <Image
            loader={meta?.thumbnail ? imageKitLoader : undefined}
            src={meta?.thumbnail || "/images/pr banner.jpg"}
            alt={developerPage.title || "Developers"}
            fill
            priority
            className={styles.heroImage}
            unoptimized={!meta?.thumbnail}
          />
        </div>
      </section>

      <section className={styles.listingSection}>
        <div className='container'>
          <div className={styles.developerGrid}>
            {data && data.map((item, index) => (
              <Link
                href={`/top-real-estate-developer-in-dubai/${item.slug}`}
                key={index}
                className={styles.developerCard}
              >
                <div className={styles.logoWrapper}>
                  <Image
                    loader={imageKitLoader}
                    className={styles.developerLogo}
                    src={`${item.logo}`}
                    alt={item.name}
                    width={500}
                    height={500}
                  />
                </div>
                <h3 className={styles.devName}>{item.name || 'Developer'}</h3>
                <div className={styles.viewProfile}>
                  View Portfolio
                  <svg viewBox="0 0 24 24">
                    <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default index

index.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
}

export const getStaticProps = async () => {
  try {
    const options = { status: 1, columns: 'name,logo,slug' };
    const developer = await fetchData(API_URLS.DEVELOPER, options);
    const developerPage = await fetchWebsitePage('top-real-estate-developer-in-dubai');
    const meta = await fetchData(API_URLS.META, {
      slug: "top-real-estate-developer-in-dubai",
      columns: 'title,description,thumbnail,slug'
    });

    if (developer.status === true) {
      return {
        props: {
          developer,
          developerPage,
          meta: meta.data ? meta.data[0] : null
        },
        revalidate: 43200,
      };
    } else {
      return { props: { developer: [], developerPage: [] }, revalidate: 10 };
    }
  } catch (error) {
    console.error("Error fetching developer data:", error);
    return { props: { developer: [], developerPage: [] }, revalidate: 10 };
  }
};
