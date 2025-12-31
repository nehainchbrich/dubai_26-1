import React from 'react'
import Website from './layouts/website'
import { about, approch, mission, vision, why } from '@/components/website/about/AboutContent'
import { fetchData } from '@/config/fetchApi'
import API_URLS from '@/config/apiconfig'
import Image from 'next/image';
import Link from 'next/link';
import { imageKitLoader } from '@/helper/Helper';
import styles from '@/styles/AboutLuxury.module.css';

const About = ({ meta }) => {
  return (
    <div className={styles.pageWrapper}>
      {/* Light Luxury Hero */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.subBadge}>Inch & Brick Realty</span>
            <h1 className={styles.mainTitle}>
              Elegance in <span>Strategy,</span> <br />Trust in every Inch.
            </h1>
            <p className={styles.headerDesc}>
              A Dubai-based PropTech leader dedicated to transforming the urban real estate landscape with transparency, technology, and a personal touch.
            </p>
          </div>
        </div>
      </section>

      {/* Overlapping Content Story */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.overlapGrid}>
            <div className={styles.imageBox}>
              <Image
                loader={imageKitLoader}
                src="/common/about.jpg"
                alt="Luxury Living"
                className={styles.mainImg}
                width={600}
                height={800}
              />
              <div className={styles.metaTag}>
                <span className={styles.metaNum}>500+</span>
                <span className={styles.metaText}>Global Success</span>
              </div>
            </div>

            <div className={styles.textSide}>
              <h2>Crafting Your <br />Premium Legacy</h2>
              <div className={styles.contentBody} dangerouslySetInnerHTML={{ __html: about }} />
            </div>
          </div>
        </div>
      </section>

      {/* Value Modules Section */}
      <section className={styles.valuesWrapper}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.subBadge}>Our Foundations</span>
            <h3>Driven by Core Pillars</h3>
          </div>

          <div className={styles.moduleGrid}>
            <div className={styles.moduleCard}>
              <div className={styles.iconCircle}><i className="fas fa-eye"></i></div>
              <h3 className={styles.moduleTitle}>Our Vision</h3>
              <div className={styles.moduleDesc} dangerouslySetInnerHTML={{ __html: vision }} />
            </div>

            <div className={styles.moduleCard}>
              <div className={styles.iconCircle}><i className="fas fa-bullseye"></i></div>
              <h3 className={styles.moduleTitle}>Our Mission</h3>
              <div className={styles.moduleDesc} dangerouslySetInnerHTML={{ __html: mission }} />
            </div>

            <div className={styles.moduleCard}>
              <div className={styles.iconCircle}><i className="fas fa-crown"></i></div>
              <h3 className={styles.moduleTitle}>Our Core</h3>
              <div className={styles.moduleDesc} dangerouslySetInnerHTML={{ __html: why }} />
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Section */}
      <section className={styles.strategyArea}>
        <div className="container">
          <div className={styles.strategyFlex}>
            <div className={styles.stratText}>
              <div className={styles.sectionHeader} style={{ textAlign: 'left', marginBottom: '30px' }}>
                <span className={styles.subBadge} style={{ margin: 0 }}>The Blueprint</span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '20px' }}>Technology-First Approach</h2>
              </div>
              <div className={styles.contentBody} dangerouslySetInnerHTML={{ __html: approch }} />
            </div>
            <div className={styles.stratImg}>
              <Image
                loader={imageKitLoader}
                src="/common/about_mission.png"
                alt="PropTech Innovation"
                width={600}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Call-To-Action */}
      <section className={styles.ctaBar}>
        <div className="container">
          <Link href="/contact-us" className={styles.btnClean}>
            Start Your Journey <i className="fas fa-arrow-right ml-3"></i>
          </Link>
        </div>
      </section>

    </div>
  )
}

export default About
About.getLayout = function getLayout(page) {
  const { props } = page;
  return (<Website meta={props.meta}>{page}</Website>)
}

export async function getStaticProps() {
  const meta = await fetchData(API_URLS.META, { slug: 'about-us', columns: 'title,description,thumbnail,slug' });
  return {
    props: { meta: meta.data[0] }, revalidate: 30
  }
}