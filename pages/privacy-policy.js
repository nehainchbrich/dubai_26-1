import React from 'react'
import Website from './layouts/website'
import API_URLS from '@/config/apiconfig'
import { fetchData } from '@/config/fetchApi'
import styles from '@/styles/Policy.module.css'

const PrivacyPolicy = ({ policy, meta }) => {
  return (
    <div className={styles.pageWrapper}>
      {/* 1. MINIMAL DARK HERO */}
      <section className={styles.heroSection}>
        <div className="container">
          <span className={styles.kicker}>Respecting Your Data</span>
          <h1 className={styles.mainTitle}>Privacy Policy</h1>
        </div>
      </section>

      {/* 2. POLICY CONTENT */}
      <section className={styles.contentArea}>
        <div className="container">
          <div className={styles.policyContainer}>
            <div
              className={styles.policyBody}
              dangerouslySetInnerHTML={{ __html: policy?.policy || "<p>Content coming soon...</p>" }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrivacyPolicy

PrivacyPolicy.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>
}

export async function getStaticProps() {
  try {
    const policyResponse = await fetchData(API_URLS.TERMS);
    const metaResponse = await fetchData(API_URLS.META, {
      slug: 'privacy-policy',
      columns: 'title,description,thumbnail,slug'
    });

    // The API might return an array or an object depending on the endpoint
    const policyData = Array.isArray(policyResponse.data) ? policyResponse.data[0] : policyResponse.data;
    const metaData = metaResponse.data?.[0] || { title: "Privacy Policy - Inch & Brick" };

    return {
      props: {
        policy: policyData || null,
        meta: metaData
      },
      revalidate: 3600 // Hourly revalidation is enough for policy
    }
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
    return {
      props: {
        policy: null,
        meta: { title: "Privacy Policy - Inch & Brick" }
      },
      revalidate: 60
    }
  }
}