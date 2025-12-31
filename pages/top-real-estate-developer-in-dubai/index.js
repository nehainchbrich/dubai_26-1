import CommonBanner from '@/components/website/common/CommonBanner'
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

  return (
    <div className={styles.pageWrapper}>
      <header className={`${styles.titleSection} ${styles.lightHeader}`}>
        <div className="container">
          <span className={styles.countLabel}>{data.length} Global Developers</span>
          <h1 className={styles.mainTitle}>{developerPage.title}</h1>
          <p className={styles.headerDesc}>Partnering with Dubai's most visionary real estate creators</p>
        </div>
      </header>

      <section className={styles.listingSection}>
        <div className='container'>
          {developerPage && (
            <div className={styles.titleWrapper}>
              <h2 className={styles.gridTitle}>Featured <span>Developers</span></h2>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: developerPage.description }}
              />
            </div>
          )}

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
