import OwlCarousel from '../../OwlCarousel';
import Image from 'next/image';
import Link from 'next/link';
import { imageKitLoader } from '@/helper/Helper';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
import { fetchData } from '@/config/fetchApi';
import API_URLS from '@/config/apiconfig';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
const options = { loop: true, nav: false, items: 1, dots: false, autoplay: true, autoplayHoverPause: true };
const LatestProperty = () => {
  const [property, setProperty] = useState([]);
  const router = useRouter();

  const fetchProperty = async () => {
    try {
      // Check cached data
      const cachedData = JSON.parse(localStorage.getItem('populerProperty'));
      if (cachedData && !isDataStale(cachedData.timestamp)) {
        setProperty([...cachedData.data]); // Ensure a shallow copy to trigger re-render
        return;
      }

      // Fetch property data from API
      const propertyData = await fetchData(API_URLS.PROPERTIES, {
        status: 1,
        limit: 5,
        populer: 1,
        columns: 'title,thumbnail,slug',
      });

      if (propertyData?.data && Array.isArray(propertyData.data)) {
        setProperty([...propertyData.data]); // Ensure a shallow copy

        // Store in localStorage
        localStorage.setItem('populerProperty', JSON.stringify({
          data: propertyData.data,
          timestamp: Date.now(),
        }));
      } else {
        console.error("Invalid property data format:", propertyData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Helper function to check if data is stale
  const isDataStale = (timestamp) => {
    const cacheDuration = 3600000; // 1 hour
    return Date.now() - timestamp > cacheDuration;
  };

  useEffect(() => {
    fetchProperty();

    // Handle route changes
    const handleRouteChange = async () => {
      await fetchProperty();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <div className="property_card my-2">
        <h4>Popular Property</h4>
        <hr />
        {property.length > 0 ? (
          <OwlCarousel className="owl-theme" {...options} key={property.length}>
            {property.map((item, index) => (
              <div className="col-md-12" key={index}>
                <Link href={`/properties/${item.slug}`}>
                  <Image
                    loader={imageKitLoader}
                    src={item.thumbnail}
                    title={item.title}
                    alt={item.title}
                    className="img-fluid"
                    width={100}
                    height={100}
                    quality={60}
                    placeholder="blur"
                    blurDataURL={staticBlurDataUrl()}
                    sizes="(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw"
                  />
                  <p className="text-center">{item.title}</p>
                </Link>
              </div>
            ))}
          </OwlCarousel>
        ) : (
          <p>Loading properties...</p>
        )}
      </div>

      <style jsx>
        {`
          .property_card {
            border-radius: 10px;
            padding: 10px;
            cursor:pointer;
          }
          .property_card h4 {
              color:var(--brand-color-2);
              font-weight:bolder;
          }
          .property_card p {
              color:var(--brand-color-1);
              font-size:14px;
          }
        `}
      </style>
    </>
  );
};

export default LatestProperty;
