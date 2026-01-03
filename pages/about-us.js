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
      {/* 1. IMMERSIVE HERO */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <Image
            loader={imageKitLoader}
            src={meta?.thumbnail || "/common/press-bg.jpg"}
            alt="About Inchbrick"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>

        <div className={styles.heroContent}>
          <span className={styles.subBadge}>The Inch & Brick Legacy</span>
          <h1 className={styles.mainTitle}>
            Elegance in <span>Strategy,</span> Trust in every Inch.
          </h1>
          <p className={styles.headerDesc}>
            {meta?.description || "A Dubai-based PropTech leader dedicated to transforming the urban real estate landscape with transparency, technology, and a personal touch."}
          </p>
        </div>
      </section>

      {/* 2. THE HERITAGE SECTION (STORY) */}
      <section className={styles.storySection}>
        <div className="container">
          <div className={styles.overlapGrid}>
            <div className={styles.imageBox}>
              <Image
                loader={imageKitLoader}
                src="/common/about.jpg"
                alt="Luxury Living"
                className={styles.mainImg}
                width={500}
                height={450}
              />
              <div className={styles.metaTag}>
                <span className={styles.metaNum}>500+</span>
                <span className={styles.metaText}>Success Stories</span>
              </div>
            </div>

            <div className={styles.textSide}>
              <h2>Crafting Your <br />Premium Legacy</h2>
              <div className={styles.contentBody} dangerouslySetInnerHTML={{ __html: about }} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO CORE VALUES */}
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

      {/* 4. TECHNOLOGY STRATEGY */}
      <section className={styles.strategyArea}>
        <div className="container">
          <div className={styles.strategyFlex}>
            <div className={styles.stratText}>
              <div className={styles.sectionHeader}>
                <span className={styles.subBadge}>The PropTech Edge</span>
                <h2>Innovation at Scale</h2>
              </div>
              <div className={styles.contentBody} dangerouslySetInnerHTML={{ __html: approch }} />
            </div>
            <div className={styles.stratImg}>
              <Image
                loader={imageKitLoader}
                src="/common/about_mission.png"
                alt="PropTech Innovation"
                width={700}
                height={500}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA - BOLD & MINIMAL */}
      <section className={styles.ctaBar}>
        <div className="container">
          <Link href="/contact-us" className={styles.btnClean}>
            Start Your Premium Journey <i className="fas fa-long-arrow-right"></i>
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