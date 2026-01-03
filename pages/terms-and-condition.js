import React from 'react'
import Website from './layouts/website'
import API_URLS from '@/config/apiconfig'
import { fetchData } from '@/config/fetchApi'
import styles from '@/styles/Policy.module.css'

const TermsAndCondition = ({ policy, meta }) => {
  return (
    <div className={styles.pageWrapper}>
      {/* 1. MINIMAL DARK HERO */}
      <section className={styles.heroSection}>
        <div className="container">
          <span className={styles.kicker}>Our Agreements</span>
          <h1 className={styles.mainTitle}>Terms & Conditions</h1>
        </div>
      </section>

      {/* 2. CONTENT AREA */}
      <section className={styles.contentArea}>
        <div className="container">
          <div className={styles.policyContainer}>
            <div
              className={styles.policyBody}
              dangerouslySetInnerHTML={{ __html: policy?.terms || "<p>Content coming soon...</p>" }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default TermsAndCondition

TermsAndCondition.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>
}

export async function getStaticProps() {
  try {
    const policyResponse = await fetchData(API_URLS.TERMS);
    const metaResponse = await fetchData(API_URLS.META, {
      slug: 'terms-and-condition',
      columns: 'title,description,thumbnail,slug'
    });

    const policyData = Array.isArray(policyResponse.data) ? policyResponse.data[0] : policyResponse.data;
    const metaData = metaResponse.data?.[0] || { title: "Terms & Conditions - Inch & Brick" };

    return {
      props: {
        policy: policyData || null,
        meta: metaData
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error("Error fetching terms:", error);
    return {
      props: {
        policy: null,
        meta: { title: "Terms & Conditions - Inch & Brick" }
      },
      revalidate: 60
    }
  }
}