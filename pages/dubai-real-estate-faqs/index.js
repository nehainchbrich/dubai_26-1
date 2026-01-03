import React, { useState } from 'react'
import Website from '../layouts/website'
import LatestProperty from '@/components/website/property/LatestProperty';
import LatestBlog from '@/components/website/blogs/LatestBlog';
import API_URLS from '@/config/apiconfig'
import Image from 'next/image';
import { fetchData, fetchWebsitePage } from '@/config/fetchApi';
import { imageKitLoader } from '@/helper/Helper';
import styles from '@/styles/FaqsLuxury.module.css';

// Custom creative FAQ item
const FaqItemLuxury = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`${styles.faqItem} ${isOpen ? styles.active : ''}`}>
      <div
        className="d-flex justify-content-between align-items-center py-4"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        <h3 style={{
          fontSize: '20px',
          fontWeight: 700,
          margin: 0,
          color: isOpen ? 'var(--brand-gold)' : 'var(--deep-charcoal)',
          transition: 'color 0.3s ease'
        }}>
          <span style={{ color: 'var(--brand-gold)', marginRight: '15px' }}>0{index + 1}.</span>
          {item.title}
        </h3>
        <div style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.4s ease',
          color: 'var(--brand-gold)'
        }}>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      <div style={{
        maxHeight: isOpen ? '1000px' : '0',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: isOpen ? 1 : 0
      }}>
        <div
          style={{ paddingBottom: '30px', fontSize: '17px', lineHeight: '1.8', color: '#555' }}
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>
    </div>
  );
};

const Index = ({ faq, meta }) => {
  return (
    <div className={styles.pageWrapper}>
      {/* 1. CINEMATIC DARK HERO */}
      <section className={styles.heroSection}>
        <div className="container">
          <span className={styles.subBadge}>Knowledge Hub</span>
          <h1 className={styles.mainTitle}>
            Dubai Real Estate <span>FAQ's</span>
          </h1>
        </div>
      </section>

      {/* 2. FAQ AREA */}
      <section className={styles.faqArea}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-8">
              <div className={styles.accordionList}>
                {faq && faq.map((item, index) => (
                  <FaqItemLuxury item={item} index={index} key={index} />
                ))}
              </div>
            </div>

            <div className="col-lg-4">
              <aside className={styles.faqSidebar}>
                <div className={styles.sidebarImageWrap}>
                  <Image
                    loader={imageKitLoader}
                    src="/common/faq.jpg"
                    width={400}
                    height={550}
                    alt="FAQ Help Desk"
                    className={styles.sidebarImage}
                  />
                </div>
                <LatestProperty />
                <div className="mt-5">
                  <LatestBlog />
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index

Index.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
}

export async function getStaticProps() {
  try {
    const faq = await fetchData(`${API_URLS.FAQ}?status=1`);
    const meta = await fetchData(API_URLS.META, { slug: 'dubai-real-estate-faqs', columns: 'title,description,thumbnail,slug' });
    return {
      props: {
        faq: faq.data || [],
        meta: meta.data[0] || { title: "Dubai Real Estate FAQ's - Inch & Brick" }
      },
      revalidate: 60
    }
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    return {
      props: { faq: [], meta: { title: "Dubai Real Estate FAQ's - Inch & Brick" } },
      revalidate: 10
    }
  }
}
