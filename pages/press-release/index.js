import React from 'react';
import Website from '../layouts/website';
import Image from 'next/image';
import { fetchData, fetchPress } from '@/config/fetchApi';
import API_URLS from '@/config/apiconfig';
import { imageKitLoader } from '@/helper/Helper';
import styles from '@/styles/press-release/PressRelease.module.css';

const Index = ({ press, meta }) => {
  return (
    <>
      {/* PREMIUM HERO SECTION */}
      <section className={styles.pressHero}>
        <div className={styles.pressContent}>
          <span className={styles.pressKicker}>Industry Recognition</span>
          <h1 className={styles.pressTitle}>
            PRESS<span>RELEASE</span>
          </h1>
          <p className={styles.pressDescription}>
            {meta?.description || "Stay updated with Inchbrick Realty's latest milestones, market insights, and exclusive coverage in leading global publications."}
          </p>
        </div>

        <div className={styles.pressVisual}>
          <Image
            loader={imageKitLoader}
            src={meta?.thumbnail || "/common/press-bg.jpg"}
            alt="Press Release Background"
            fill
            priority
            className={styles.pressImage}
          />
        </div>
      </section>

      {/* PREMIUM GRID SECTION */}
      <section className={styles.pressGridContainer}>
        <div className='container'>
          <div className={styles.pressGrid}>
            {press && press.map((item, index) => (
              <div className={styles.premiumCard} key={index}>
                <a href={item.slug || '#'} target='_blank' rel="noopener noreferrer" className={styles.cardLogoWrapper}>
                  <Image
                    loader={imageKitLoader}
                    src={item.logo}
                    width={180}
                    height={80}
                    alt={item.title}
                    className={styles.cardLogo}
                  />
                </a>
                <div className={styles.cardBody}>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <a href={item.slug || '#'} target='_blank' rel="noopener noreferrer" className={styles.cardLink}>
                    Read Article <i className="fa fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;

Index.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
};
export const getServerSideProps = async () => {
  const press = await fetchPress({ status: 1 });
  const meta = await fetchData(API_URLS.META, { slug: 'press-release', columns: 'title,description,thumbnail,slug' });
  return {
    props: { press, meta: meta.data[0] || null }
  }
}