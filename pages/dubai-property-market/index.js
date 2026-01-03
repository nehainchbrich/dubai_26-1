import React from 'react'
import styles from '../../styles/Dubaiproperty.module.css'
import Website from '../layouts/website';
import DubaiMarket from '@/components/website/statics/DubaiMarket';
import OffPlan from '@/components/website/statics/OffPlan';
import ReadyToMove from '@/components/website/statics/ReadyToMove';
import TopArea from '@/components/website/statics/TopArea';
import PropertySale from '@/components/website/statics/PropertySale';
import SaleTransactions from '@/components/website/statics/SaleTransactions';
import IndianDillionaire from '@/components/website/statics/IndianDillionaire';
import SuperRich from '@/components/website/statics/SuperRich';
import Land from '@/components/website/statics/Land';
import dynamic from 'next/dynamic';
import { fetchData } from '@/config/fetchApi';
import API_URLS from '@/config/apiconfig';
import CountUp from 'react-countup';

const LazyLoad = dynamic(() => import('react-lazy-load'), {
  ssr: false
});

const DubaiMarketPage = ({ meta }) => {
  const stats = [
    { val: 63, label: "Projects Delivered", suffix: "" },
    { val: 16475, label: "Units Handed-Over", suffix: "" },
    { val: 220.7, label: "Total Sales Value", suffix: "B", decimals: 1 },
    { val: 73823, label: "Total Sales Volume", suffix: "" }
  ];

  const components = [
    { id: '01', component: <DubaiMarket /> },
    { id: '02', component: <TopArea /> },
    { id: '03', component: <OffPlan /> },
    { id: '04', component: <ReadyToMove /> },
    { id: '05', component: <PropertySale /> },
    { id: '06', component: <SaleTransactions /> },
    { id: '07', component: <IndianDillionaire />, fullWidth: true },
    { id: '08', component: <SuperRich /> },
    { id: '09', component: <Land /> }
  ];

  return (
    <div className={styles.dubai_market_wrapper}>
      {/* 1. CREATIVE CINEMATIC HERO */}
      <section className={styles.banner_wrapper}>
        <div className="container hero_content">
          <span className={styles.kicker}>Market Intelligence Report • 2024</span>
          <h1 className={styles.mainTitle}>
            DUBAI PROPERTY
            <span>INTELLIGENCE</span>
          </h1>

          {/* Integrated Statistics Grid */}
          <div className={styles.stats_container}>
            {stats.map((s, i) => (
              <div className={styles.stat_glass_card} key={i}>
                <div className={styles.stat_value}>
                  <CountUp end={s.val} duration={2.5} decimals={s.decimals || 0} suffix={s.suffix} separator="," />
                </div>
                <div className={styles.stat_label}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CREATIVE ANALYTICS AREA */}
      <div className={`container ${styles.section_container}`}>
        <div className="row g-5">
          {components.map((item, index) => (
            <div className={item.fullWidth ? "col-lg-12" : "col-lg-12"} key={index}>
              <div className={styles.analytics_card}>
                <span className={styles.card_index}>{item.id}</span>
                <LazyLoad>
                  {item.component}
                </LazyLoad>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        /* Essential Overrides for Chart Aesthetics */
        .analytics_card h3, .analytics_card h4 { 
          color: #0b0b0e !important; 
          font-family: 'Outfit', sans-serif !important;
          font-weight: 800 !important;
        }
        
        .section-title { 
          font-size: 24px !important; 
          color: #0b0b0e !important; 
          border: none !important; 
          padding: 0 !important; 
          margin-bottom: 40px !important;
          text-align: left !important;
        }

        /* Force Charts text to dark charcoal */
        svg text { fill: #222 !important; }
        
        /* Tooltip refinement */
        .google-visualization-tooltip {
            background-color: #fff !important;
            border: none !important;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1) !important;
            padding: 10px !important;
            border-radius: 4px !important;
        }
        
        .analytics_card img { border-radius: 4px !important; }
        .statics_banner { background: transparent !important; }

        /* Billionaire section adjustment */
        .billionaire p { 
          font-size: 18px !important; 
          color: #444 !important; 
          line-height: 1.8 !important; 
        }
      `}</style>
    </div>
  )
}

export default DubaiMarketPage

DubaiMarketPage.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
}

export const getStaticProps = async () => {
  try {
    const meta = await fetchData(API_URLS.META, { slug: 'dubai-property-market', columns: 'title,description,slug' });
    return {
      props: { meta: meta.data[0] || null },
      revalidate: 30,
    };
  } catch (error) {
    return { props: { meta: [] }, revalidate: 10 };
  }
};
