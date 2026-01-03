import React from 'react'
import Website from '../layouts/website'
import LatestProperty from '@/components/website/property/LatestProperty'
import LatestBlog from '@/components/website/blogs/LatestBlog'
import Link from 'next/link'
import Image from 'next/image'
import API_URLS from '@/config/apiconfig'
import { formatDate, imageKitLoader } from '@/helper/Helper'
import { fetchData, fetchWebsitePage } from '@/config/fetchApi'
import PreLoader from '@/components/website/common/PreLoader'
import styles from '@/styles/career/Careers.module.css'

const Index = ({ career, careerPage, meta }) => {
    const { data } = career;

    if (!data) return <PreLoader />;

    return (
        <div className={styles.pageWrapper}>
            {/* 1. MINIMAL HERO */}
            <header className={styles.heroSection}>
                <div className="container">
                    <span className={styles.kicker}>Join the industry leaders</span>
                    <h1 className={styles.mainTitle}>
                        Shape the future of <br /><b>Dubai Real Estate.</b>
                    </h1>
                    <div className={styles.heroDesc}>
                        {careerPage && (
                            <div dangerouslySetInnerHTML={{ __html: careerPage.description }} />
                        )}
                    </div>
                </div>
            </header>

            {/* 2. JOB LISTINGS */}
            <section className={styles.jobListContainer}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className={styles.sectionLabel}>
                                <h2>Currently Open</h2>
                                <div className={styles.line}></div>
                            </div>

                            <div className={styles.editorialStack}>
                                {data && data.map((item, index) => (
                                    <Link href={`/career-opportunities/${item.slug}`} className={styles.editorialItem} key={index}>
                                        <div className={styles.accentBar}></div>
                                        <div className={styles.titleMain}>
                                            <span>{item.jobtype}</span>
                                            <h3>{item.title}</h3>
                                        </div>
                                        <div className={styles.jobDetails}>
                                            <div className={styles.loc}><i className="fas fa-map-marker-alt"></i> {item.address}</div>
                                            <div className={styles.deadline}>Apply by {formatDate(item.deadline)}</div>
                                        </div>
                                        <div className={styles.applyArrow}>
                                            <i className="fas fa-arrow-right"></i>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <aside className={styles.sidebarWrapper}>
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
    );
}

export default Index
Index.getLayout = function getLayout(page) {
    const { props } = page;
    return <Website meta={props.meta}>{page}</Website>;
}
export const getStaticProps = async () => {
    try {
        const options = { status: 1, columns: 'deadline,title,slug,address,jobtype' };
        const career = await fetchData(API_URLS.MANAGE_CAREER, options);
        const careerPage = await fetchWebsitePage('career-opportunities');
        const meta = await fetchData(API_URLS.META, { slug: 'career-opportunities', columns: 'title,description,thumbnail,slug' });
        if (career.status === true) {
            return {
                props: { career, careerPage, meta: meta.data[0] },
                revalidate: 43200, // Set ISR and revalidate at midnight every day
            };
        } else {
            return { props: { career: [], careerPage: [] }, revalidate: 10 };
        }

    } catch (error) {
        return { props: { career: [], careerPage: [] }, revalidate: 10 }; // Fallback revalidate time
    }
};