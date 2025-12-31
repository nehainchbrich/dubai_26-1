import React from 'react'
import Website from '../layouts/website'
import { fetchData } from '@/config/fetchApi'
import API_URLS from '@/config/apiconfig'
import { ImagePath } from '@/helper/Helper'
import ResidentialCard from '@/components/website/property/ResidentialCard'
import styles from '@/styles/ResidentialLuxury.module.css'
import dynamic from 'next/dynamic'

// Import Sidebar Widgets
const LatestBlog = dynamic(() => import('@/components/website/blogs/LatestBlog'))
const LatestProperty = dynamic(() => import('@/components/website/property/LatestProperty'))

const Slug = ({ ptype, property, meta }) => {
  const description = ImagePath(ptype.description)

  return (
    <div className={styles.pageWrapper}>
      <header className={`${styles.titleSection} ${styles.lightHeader}`}>
        <div className="container">
          <span className={styles.countLabel}>Exclusive Collection</span>
          <h1 className={styles.mainTitle}>
            {ptype.title} <span>Properties</span>
          </h1>
          <div className={styles.headerDesc} dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </header>

      <div className='container'>
        <section className={styles.filterContainer}>
          <div className={styles.slimMainRow}>
            <div className={styles.searchUnit}>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search developments or areas..."
                className={styles.searchInput}
              />
            </div>
            <select className={styles.selectUnit}>
              <option>Type</option>
            </select>
            <select className={styles.selectUnit}>
              <option>Status</option>
            </select>
            <button className={styles.btnAction}>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </section>

        <div className='row'>
          {/* Main Listing Area */}
          <div className="col-lg-9">
            <div className={styles.propertyList}>
              {property && property.length ? (
                property.map((item, index) => (
                  <ResidentialCard key={item.id || index} item={item} />
                ))
              ) : (
                <div className="text-center py-5">
                  <h3>No properties found</h3>
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
                <h4>Exclusive Suggestions</h4>
                <LatestProperty />
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slug

Slug.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
}

export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    const propertyType = await fetchData(API_URLS.PROPERTIES_TYPE, { slug, status: 1 });
    if (propertyType.total > 0) {
      const meta = await fetchData(API_URLS.META, { slug: `residential-properties/${slug}`, columns: 'title,description,thumbnail,slug' });
      const pTypeCode = propertyType.data[0].code;
      const options = { status: 1, property_type: pTypeCode };
      const property = await fetchData(API_URLS.PROPERTIES, options);
      return {
        props: {
          ptype: propertyType.data[0],
          property: property.data,
          meta: meta.data[0] || null
        }
      }
    }
    return {
      notFound: true,
    };

  } catch (error) {
    return { props: {} };
  }
}