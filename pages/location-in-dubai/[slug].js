import React, { useEffect, useState, memo } from 'react';
import styles from '../../styles/property/BuyProperty_luxury.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { fetchData } from '@/config/fetchApi';
import Website from '../layouts/website';
import dynamic from 'next/dynamic';
import { currencyConverter, imageKitLoader, handleSelectForComparison, ImagePath } from '@/helper/Helper';
import { useCurrency } from '@/context/CurrencyProvider';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
import API_URLS from '@/config/apiconfig';

const LatestBlog = dynamic(() => import('@/components/website/blogs/LatestBlog'));
const LatestProperty = dynamic(() => import('@/components/website/property/LatestProperty'));

// 🏨 Horizontal Property Card Component
const HorizontalPropertyCard = memo(({ item }) => {
    const { currency } = useCurrency();
    const [amount, setAmount] = useState('');

    useEffect(() => {
        const convert = async () => {
            const min = item.minAmount && parseInt(item.minAmount) ? await currencyConverter(parseInt(item.minAmount), currency) : null;
            let priceStr = min || 'Contact Us';
            if (item.is_rental == 1 && min) priceStr = `${min}`;
            setAmount(priceStr);
        };
        convert();
    }, [item, currency]);

    return (
        <div className={styles.rowCard}>
            <div className={styles.imgSide}>
                <div className={styles.saveHeart} aria-label="Save Property">
                    <i className="far fa-heart"></i>
                </div>
                <div className={styles.comparisonCheck} onClick={(e) => { e.preventDefault(); handleSelectForComparison(item); }}>
                    <i className="fas fa-plus"></i> Compare
                </div>
                {item.PCategory && <div className={styles.typeBadge}>{item.PCategory.title}</div>}
                <Link href={`/properties/${item.slug}`}>
                    <Image
                        loader={imageKitLoader}
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        placeholder="blur"
                        blurDataURL={staticBlurDataUrl()}
                        priority={false}
                    />
                </Link>
            </div>
            <div className={styles.contentSide}>
                <div className={styles.lifestyleTag}>Luxury Lifestyle</div>

                <div className={styles.rowLoc}>
                    <i className="fas fa-map-marker-alt"></i>
                    {item.city}, {item.country}
                </div>

                <div className={styles.rowFeatures}>
                    <span><i className="fas fa-expand-arrows-alt"></i> 1,400 sq ft</span>
                    <span><i className="fas fa-bed"></i> {item.property_type?.includes('Bed') ? item.property_type : '4 Beds'}</span>
                    <span><i className="fas fa-bath"></i> 3 Baths</span>
                </div>

                <Link href={`/properties/${item.slug}`}>
                    <h3 className={styles.rowTitle}>{item.title}</h3>
                </Link>

                <div className={styles.cardBottom}>
                    <div className={styles.rowPrice}>
                        {amount}
                        {item.is_rental == 1 && <span>/{item.rental_type || 'Year'}</span>}
                    </div>
                    <div className={styles.rowRating}>
                        <span>
                            <i className="fas fa-star"></i> 4.9
                        </span>
                        <div className={styles.btnActionGroup}>
                            <button className={styles.mapBtn}>
                                <i className="fas fa-compass"></i> Explore
                            </button>
                            <a
                                href={`https://wa.me/971585966666?text=Hello, I am interested in ${item.title}. Can you please provide more details?`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.whatsappBtn}
                            >
                                <i className="fa-brands fa-whatsapp"></i>
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

const Slug = ({ location, property, meta }) => {
    const description = ImagePath(location.description, location.name);

    return (
        <div className={styles.pageWrapper}>
            <header className={`${styles.titleSection} ${styles.lightHeader}`}>
                <div className="container">
                    <span className={styles.countLabel}>{property.length} Exclusive Listings</span>
                    <h1 className={styles.mainTitle}>Properties in <span>{location.name}</span></h1>

                    <p className={styles.headerDesc}>Discover exceptional homes in this premium Dubai locality</p>
                </div>
            </header>

            <div className="container mt-4">
                <main className="row">
                    <div className="col-lg-9">
                        {/* Location Description Card */}
                        <section style={{ marginBottom: '40px' }}>
                            <div className={styles.knowledgeCard} style={{ background: '#fff', padding: '30px', border: '1px solid #f0f0f0', borderRadius: '16px' }}>
                                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '20px', color: '#111', borderBottom: '2px solid #c5a059', paddingBottom: '12px', display: 'inline-block' }}>
                                    Locality Overview: {location.name}
                                </h2>
                                <div
                                    className={styles.descText}
                                    style={{ fontSize: '1.05rem', lineHeight: '1.7', color: '#555' }}
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            </div>
                        </section>

                        {/* Property Listing Area */}
                        <div className={styles.propertyList}>
                            <h3 className="mb-4" style={{ fontWeight: '800', color: '#111', fontSize: '1.5rem' }}>Available Properties</h3>
                            {property && property.length ? (
                                property.map((item, index) => (
                                    <HorizontalPropertyCard key={item.id || index} item={item} />
                                ))
                            ) : (
                                <div className="text-center py-5">
                                    <h3 style={{ color: '#111' }}>No properties found in {location.name}</h3>
                                    <p style={{ color: '#666' }}>Try checking back later for more updates.</p>
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
                                <h4>Hot Properties</h4>
                                <LatestProperty />
                            </section>
                        </aside>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Slug;

Slug.getLayout = function getLayout(page) {
    const { props } = page;
    return <Website meta={props.meta}>{page}</Website>;
}

export async function getServerSideProps(context) {
    const { slug } = context.query;
    try {
        const meta = await fetchData(API_URLS.META, { slug: `location-in-dubai/${slug}`, columns: 'title,description,thumbnail,slug' });
        const res = await fetch(`${API_URLS.LOCATIONSLUG(slug)}`);
        const location = await res.json();

        if (location.status === true) {
            const resProp = await fetch(`${API_URLS.PROPERTIES}?status=1&city=${location.data.name}`);
            const property = await resProp.json();

            return {
                props: {
                    location: location.data,
                    property: property.data || [],
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
