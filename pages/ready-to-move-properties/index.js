import React, { useEffect, useState, memo } from 'react';
import styles from '../../styles/property/BuyProperty_luxury.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { fetchData, fetchWebsitePage } from '@/config/fetchApi';
import Website from '../layouts/website';
import dynamic from 'next/dynamic';
import { currencyConverter, imageKitLoader, handleSelectForComparison } from '@/helper/Helper';
import { useCurrency } from '@/context/CurrencyProvider';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
import InfiniteScroll from 'react-infinite-scroll-component';
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
        <Link href={`/properties/${item.slug}`}>
          <h3 className={styles.rowTitle}>{item.title}</h3>
        </Link>

        <div className={styles.rowLoc}>
          <i className="fas fa-map-marker-alt"></i>
          {item.city}, {item.country}
        </div>

        <div className={styles.rowFeatures}>
          <span><i className="fas fa-expand-arrows-alt"></i> 1,400 sq ft</span>
          <span><i className="fas fa-bed"></i> {item.property_type?.includes('Bed') ? item.property_type : '4 Beds'}</span>
          <span><i className="fas fa-hard-hat"></i> {item.Developer?.name || 'Top Developer'}</span>
        </div>

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
                <i className="fab fa-whatsapp"></i>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});


const Index = ({ property, readyMovePage, meta }) => {
  const { data, total } = property;
  const limit = 20;

  const [propertyData, setPropertyData] = useState(data || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(data.length >= limit);
  const [sortOrder, setSortOrder] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const fetchMoreProperties = async (nextPage = 1, reset = false) => {
    try {
      const options = {
        status: 1,
        sort: 'id:desc',
        minAmount: '!=0',
        "PCategory.slug": 'ready-to-move-in',
        limit,
        page: nextPage,
        columns: 'id,title,Developer.name,PCategory.title,property_type,thumbnail,slug,shortDesc,minAmount,maxAmount,city,country,agentUser.firstName,agentUser.lastName,is_rental,rental_type',
      };

      if (searchInput) {
        options.search = searchInput;
        options.searchColumns = 'title,shortDesc';
      }

      if (sortOrder === 'lowToHigh') options.sort = 'minAmount:asc';
      else if (sortOrder === 'highToLow') options.sort = 'minAmount:desc';

      const res = await fetchData(API_URLS.PROPERTIES, options);
      const newData = res.data || [];

      setPropertyData((prev) => (reset ? newData : [...prev, ...newData]));
      setHasMore(newData.length === limit);
      setPage(nextPage);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchMoreProperties();
  }, []);

  const handleSort = (e) => {
    setSortOrder(e.target.value);
    fetchMoreProperties(1, true);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    fetchMoreProperties(1, true);
  };

  return (
    <div className={styles.pageWrapper}>
      <header
        className={styles.titleSection}
        style={{
          background: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${imageKitLoader({ src: meta?.thumbnail || 'https://img.freepik.com/free-photo/abstract-web-graphic-computer-element_1127-2398.jpg', width: 1920 })})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="container mb-2">
          <h1 className={styles.mainTitle}>{readyMovePage.title}</h1>
          <span className={styles.countLabel}>{total.toLocaleString()} Ready to Move-In Properties</span>
          <p className={styles.headerDesc}>Discover exceptional ready-to-move homes in prime Dubai locations</p>
        </div>
      </header>

      <div className="container">
        <section className={styles.filterContainer}>
          <div style={{ marginBottom: '10px', fontWeight: '800', fontSize: '0.75rem', color: '#c5a059', letterSpacing: '1px', textTransform: 'uppercase', opacity: '0.8' }}>
            Instant Home Search
          </div>
          <div className={styles.slimMainRow}>
            {/* Direct Search Unit */}
            <div className={styles.searchUnit}>
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search by Community, Project or City..."
                className={styles.searchInput}
                value={searchInput}
                onChange={handleSearch}
              />
            </div>

            {/* Compact Selects */}
            <select className={styles.selectUnit}>
              <option>Property Type</option>
              <option>Villas</option>
              <option>Apartments</option>
              <option>Penthouses</option>
            </select>
            <select className={styles.selectUnit}>
              <option>Bedrooms</option>
              <option>Studio - 1 Bed</option>
              <option>2 - 3 Beds</option>
              <option>4+ Beds</option>
            </select>
            <select className={styles.selectUnit} onChange={handleSort} value={sortOrder}>
              <option value="">Sort By</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>

            <button className={styles.btnAction} onClick={() => fetchMoreProperties(1, true)}>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>

          {/* Area Strip Navigation */}
          <div className={styles.areaStrip}>
            <span className={styles.stripLabel}>Popular Communities:</span>
            {['Dubai Marina', 'Downtown Dubai', 'JVC', 'Business Bay', 'Damac Hills'].map((area, idx) => (
              <span key={idx} className={styles.pill}>{area}</span>
            ))}
          </div>
        </section>

        <main className="row">
          <div className="col-lg-9">
            <InfiniteScroll
              dataLength={propertyData.length}
              next={() => fetchMoreProperties(page + 1)}
              hasMore={hasMore}
              loader={<div className="text-center py-5"><div className="spinner-border text-primary" /></div>}
              style={{ overflow: 'visible' }}
            >
              <div className={styles.propertyList}>
                {propertyData.length > 0 ? (
                  propertyData.map((item, i) => (
                    <HorizontalPropertyCard key={item.id || i} item={item} />
                  ))
                ) : (
                  <div className="text-center py-5">
                    <h3>No properties found</h3>
                    <p>Try adjusting your search filters</p>
                  </div>
                )}
              </div>
            </InfiniteScroll>
          </div>

          <div className="col-lg-3">
            <aside className={styles.editorialSidebar}>
              {readyMovePage?.description && (
                <section className={styles.knowledgeCard}>
                  <h4>Residential Insights</h4>
                  <div
                    className={styles.descText}
                    dangerouslySetInnerHTML={{ __html: readyMovePage.description }}
                  />
                </section>
              )}

              <section className={styles.knowledgeCard}>
                <h4>Latest Lifestyle Blogs</h4>
                <LatestBlog />
              </section>

              <section className={styles.knowledgeCard}>
                <h4>Exclusive Suggestions</h4>
                <LatestProperty />
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

// Layout Configuration
Index.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
};

// Fetch Static Data for SSR
export const getStaticProps = async () => {
  try {
    const options = {
      status: 1,
      limit: 20,
      page: 1,
      "PCategory.slug": 'ready-to-move-in',
      minAmount: '!=0',
      sort: 'id:desc',
      columns: 'title,Developer.name,PCategory.title,property_type,thumbnail,title,slug,shortDesc,minAmount,maxAmount,city,country,agentUser.firstName,agentUser.lastName',
    };

    const property = await fetchData(API_URLS.PROPERTIES, options);
    const readyMovePage = await fetchWebsitePage('ready-to-move-properties');
    const meta = await fetchData(API_URLS.META, {
      slug: 'ready-to-move-properties',
      columns: 'title,description,thumbnail,slug',
    });

    return {
      props: {
        property: property.total > 0 ? property : { data: [], total: 0 },
        readyMovePage,
        meta: meta.data[0],
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: { property: { data: [], total: 0 }, readyMovePage: [], meta: [] },
      revalidate: 10,
    };
  }
};
