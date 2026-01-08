import React from 'react';
import Website from '../layouts/website';
import API_URLS from '@/config/apiconfig';
import LocationCard from '@/components/website/common/LocationCard';
import { fetchData, fetchWebsitePage } from '@/config/fetchApi';
import styles from '@/styles/property/BuyProperty_luxury.module.css';
import dynamic from 'next/dynamic';

const LatestBlog = dynamic(() => import('@/components/website/blogs/LatestBlog'));
const LatestProperty = dynamic(() => import('@/components/website/property/LatestProperty'));
const imageKitLoader = ({ src, width, quality }) => {
  return `https://ik.imagekit.io/hpv7v2nu1/${src}?tr=w-${width},q-${quality || 75}`;
};
const Index = ({ location, locationPage, meta }) => {
  const { data } = location;

  return (
    <div className={styles.pageWrapper}>
      <header className={`${styles.titleSection} ${styles.lightHeader}`}>
        <div className="container">
          <span className={styles.countLabel}>Explore Dubai</span>
          <h1 className={styles.mainTitle}>{locationPage.title}</h1>

          <p className={styles.headerDesc}>Discover the most sought-after communities and neighborhoods across Dubai</p>
        </div>
      </header>

      <div className="container mt-4">
        <main className="row">
          <div className="col-lg-9">
            {locationPage?.description && (
              <div
                className="mb-5 p-4 bg-white shadow-sm rounded-4"
                style={{ borderLeft: '4px solid #c5a059' }}
                dangerouslySetInnerHTML={{ __html: locationPage.description }}
              />
            )}

            <div className={`${styles.locationGrid} row`}>
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <div className={`${styles.gridCol} col-lg-6 col-md-6 mb-5`} key={index}>
                    <LocationCard item={item} />
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <h3>No locations found</h3>
                  <p>Try checking back later for updates.</p>
                </div>
              )}
            </div>
          </div>

          <div className="col-lg-3">
            <aside className={styles.editorialSidebar}>
              <section className={styles.knowledgeCard}>
                <h4>Latest Insights</h4>
                <LatestBlog />
              </section>

              <section className={styles.knowledgeCard}>
                <h4>Hot Properties</h4>
                <LatestProperty />
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

Index.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
};

export const getStaticProps = async () => {
  try {
    const options = { status: 1, columns: 'name,thumbnail,slug,rating,country,shortDesc,state' };
    const meta = await fetchData(API_URLS.META, { slug: 'location-in-dubai', columns: 'title,description,thumbnail,slug' });
    const location = await fetchData(API_URLS.LOCATION, options);
    const locationPage = await fetchWebsitePage('location-in-dubai');

    if (location.status === true) {
      return {
        props: { location, locationPage, meta: meta.data[0] || null },
        revalidate: 43200,
      };
    } else {
      return { props: { location: { data: [] }, locationPage: [], meta: null }, revalidate: 10 };
    }
  } catch (error) {
    return { props: { location: { data: [] }, locationPage: [], meta: null }, revalidate: 10 };
  }
};