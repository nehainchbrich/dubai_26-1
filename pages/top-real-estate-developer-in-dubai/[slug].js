import React from 'react'
import Website from '../layouts/website';
import CommonBanner from '@/components/website/common/CommonBanner';
import Image from 'next/image';
import API_URLS from '@/config/apiconfig';
import { imageKitLoader } from '@/helper/Helper';
import { fetchData } from '@/config/fetchApi';
import dynamic from 'next/dynamic';
import ResidentialCard from '@/components/website/property/ResidentialCard';
import styles from '../../styles/DeveloperDetail.module.css';

// Import Sidebar Widgets
const LatestBlog = dynamic(() => import('@/components/website/blogs/LatestBlog'));
const LatestProperty = dynamic(() => import('@/components/website/property/LatestProperty'));

const slug = ({ developer, property, meta }) => {
  if (!developer || !developer.length) {
    return <div className="container py-5">Developer not found</div>;
  }
  const currentDev = developer[0];

  return (
    <div className={styles.pageWrapper}>
      {/* Creative Header */}
      <header className={styles.combinedHeader}>
        <div className="container">
          <div className={styles.headerFlex}>
            <div className={styles.titleBox}>
              <h1 className={styles.mainTitle}>Developer <span>Portfolio</span></h1>
              <p className={styles.headerDesc}>Strategic architectural excellence and urban transformation.</p>
            </div>
          </div>
        </div>
      </header>

      <section className={styles.detailSection}>
        <div className="container">
          {/* Highlighted Developer Identity Card */}
          <div className={styles.developerCard}>
            <div className={styles.identityRow}>
              <div className={styles.logoBox}>
                <Image
                  loader={imageKitLoader}
                  src={`${currentDev.logo}`}
                  alt={currentDev.name}
                  width={200}
                  height={200}
                  style={{ objectFit: 'contain' }}
                  sizes='(max-width: 768px) 150px, 200px'
                  quality={90}
                  priority={true}
                />
              </div>

              <div className={styles.contentBox}>
                <span className={styles.devBadge}>Elite Developer</span>
                <h1 className={styles.devName}>{currentDev.name}</h1>
                <div
                  className={styles.devDescription}
                  dangerouslySetInnerHTML={{ __html: currentDev.description }}
                />

                <div className={styles.statsHighlight}>
                  <div className={styles.highlightCard}>
                    <span className={styles.statVal}>{property ? property.length : 0}</span>
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

          <div className={`row ${styles.listingWrapper}`}>
            {/* Project Listing Area */}
            <div className="col-lg-8">
              <h2 className={styles.sectionTitle}>Signature Projects</h2>
              <div className={styles.projectListing}>
                {property && property.length ? (
                  property.map((item, index) => (
                    <div className="mb-4" key={item.id || index}>
                      <ResidentialCard item={item} />
                    </div>
                  ))
                ) : (
                  <div className="text-muted text-center py-5">
                    <h3>No signature projects found.</h3>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <aside className={styles.editorialSidebar}>
                <div className={styles.widgetCard}>
                  <h4 className={styles.widgetTitle}>Market Trends</h4>
                  <LatestBlog />
                </div>

                <div className={styles.widgetCard}>
                  <h4 className={styles.widgetTitle}>Exclusive Picks</h4>
                  <LatestProperty />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    const developer = await fetchData(API_URLS.DEVELOPER, { status: 1, slug });
    const meta = await fetchData(API_URLS.META, {
      slug: `top-real-estate-developer-in-dubai/${slug}`,
      columns: 'title,description,thumbnail,slug'
    });

    if (developer.total > 0) {
      const devCode = developer.data[0].code;
      const property = await fetchData(API_URLS.PROPERTIES, { status: 1, developer: devCode });
      return {
        props: {
          developer: developer.data,
          property: property.data || [],
          meta: meta.data ? meta.data[0] : null
        }
      }
    }
    return { notFound: true };
  } catch (error) {
    console.error("Error fetching developer details:", error);
    return { props: { developer: [], property: [], meta: null } };
  }
}

export default slug

slug.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
}
