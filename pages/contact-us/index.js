import React from 'react'
import Website from '../layouts/website'
import Cform from '@/components/website/contact/Cform'
import Map from '@/components/website/contact/Map';
import { fetchData, fetchWebsitePage } from '@/config/fetchApi';
import API_URLS from '@/config/apiconfig';
import { useSites } from '@/context/SiteProvider';
import Link from 'next/link';
import styles from '@/styles/ContactLuxury.module.css';

const Index = ({ contactPage }) => {
  const { siteSettings: sites } = useSites() || {};

  const getVal = (key, fallback = 'N/A') => sites?.[key] || fallback;

  return (
    <div className={styles.pageWrapper}>
      {/* Luxury Hero Section */}
      <header className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.titleBadge}>Get In Touch</span>
            <h1 className={styles.mainTitle}>Let's Build Your <span>Dubai Legacy</span></h1>
            <p className={styles.subTitle}>Expert real estate guidance is just a message away. Connect with our experts in Dubai or India today.</p>
          </div>
        </div>
      </header>

      {/* Main Contact Card Area */}
      <section className={styles.mainContactArea}>
        <div className="container">
          <div className={styles.contactCard}>
            <div className={styles.flexLayout}>

              {/* Left Side: Information */}
              <div className={styles.infoPanel}>

                {/* Dubai Office */}
                <div className={styles.officeBox}>
                  <h4 className={styles.officeTitle}><i className="fas fa-city"></i> Dubai Headquarters</h4>

                  <div className={styles.detailItem}>
                    <div className={styles.iconCircle}><i className="fas fa-map-marker-alt"></i></div>
                    <div>
                      <span className={styles.detailLabel}>Location</span>
                      <p className={styles.detailValue}>{getVal('dubai_addr')}</p>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <div className={styles.iconCircle}><i className="fas fa-phone-alt"></i></div>
                    <div>
                      <span className={styles.detailLabel}>Mobile</span>
                      <p className={styles.detailValue}><Link href={`tel:${getVal('dubai_contact')}`}>{getVal('dubai_contact')}</Link></p>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <div className={styles.iconCircle}><i className="fab fa-whatsapp"></i></div>
                    <div>
                      <span className={styles.detailLabel}>Whatsapp</span>
                      <p className={styles.detailValue}><Link href={`https://wa.me/${getVal('dubai_whatsapp').replace(/\+/g, '')}`}>{getVal('dubai_whatsapp')}</Link></p>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <div className={styles.iconCircle}><i className="fas fa-envelope"></i></div>
                    <div>
                      <span className={styles.detailLabel}>Official Email</span>
                      <p className={styles.detailValue}><Link href={`mailto:${getVal('dubai_mail')}`}>{getVal('dubai_mail')}</Link></p>
                    </div>
                  </div>
                </div>

                {/* India Office */}
                <div className={styles.officeBox}>
                  <h4 className={styles.officeTitle}><i className="fas fa-landmark"></i> India Liaison Office</h4>

                  <div className={styles.detailItem}>
                    <div className={styles.iconCircle}><i className="fas fa-map-marker-alt"></i></div>
                    <div>
                      <span className={styles.detailLabel}>Location</span>
                      <p className={styles.detailValue}>{getVal('ind_addr')}</p>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <div className={styles.iconCircle}><i className="fas fa-phone-alt"></i></div>
                    <div>
                      <span className={styles.detailLabel}>Mobile</span>
                      <p className={styles.detailValue}><Link href={`tel:${getVal('india_contact')}`}>{getVal('india_contact')}</Link></p>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <div className={styles.iconCircle}><i className="fas fa-envelope"></i></div>
                    <div>
                      <span className={styles.detailLabel}>Official Email</span>
                      <p className={styles.detailValue}><Link href={`mailto:${getVal('india_email')}`}>{getVal('india_email')}</Link></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Form */}
              <div className={styles.formPanel}>
                <div className={styles.formGreeting}>
                  <h2 className={styles.formTitle}>Send a Message</h2>
                  <p className={styles.formDesc}>Fields marked with an asterisk are required.</p>
                </div>
                <Cform page="contact" />
              </div>

            </div>
          </div>

          {/* Map Section */}
          <div className={styles.mapContainer}>
            <Map />
          </div>
        </div>
      </section>
    </div>
  )
}
export default Index
Index.getLayout = function getLayout(page) {
  const { props } = page;
  return (
    <Website meta={props.meta}>{page}</Website>
  )
}
export const getStaticProps = async () => {

  try {
    const contactPage = await fetchWebsitePage('contact-us');
    const meta = await fetchData(API_URLS.META, { slug: 'contact-us', columns: 'title,description,slug' });
    return { props: { contactPage, meta: meta.data[0] }, revalidate: 30 };
  } catch (error) {
    return { props: { contactPage: [], meta: [] }, revalidate: 10 }; // Fallback revalidate time
  }
};