import OwlCarousel from '../../OwlCarousel';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { fetchBlog } from '@/config/fetchApi';
import { useRouter } from 'next/router';
import { imageKitLoader } from '@/helper/Helper';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const options = { loop: true, nav: false, items: 1, dots: false, autoplay: true, autoplayHoverPause: true };
const LatestBlog = () => {
  const [blogData, setBlogData] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      // Check cached data (optional)
      const cachedData = JSON.parse(localStorage.getItem('blogData'));
      if (cachedData && !isDataStale(cachedData.timestamp)) {
        setBlogData(cachedData.data);
        return;
      }

      // Fetch property data from API
      const res = await fetchBlog({ status: 1, limit: 5, popular: 1 });
      setBlogData(res);

      // Store data in localStorage with a timestamp (optional)
      localStorage.setItem('blogData', JSON.stringify({
        data: res,
        timestamp: Date.now(),
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Helper function to check data staleness (optional)
  const isDataStale = (timestamp) => {
    const cacheDuration = 3600000; // 1 hour in milliseconds (adjust as needed)
    return Date.now() - timestamp > cacheDuration;
  };

  useEffect(() => {
    const handleRouteChange = async () => {
      await fetchData();
    };

    // Subscribe to router events
    router.events.on('routeChangeComplete', handleRouteChange);

    // Fetch data on initial mount and page changes
    fetchData();

    // Cleanup event listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      {blogData ? (
        <div className='blog_card my-3'>
          <h4>Popular Blog</h4>
          <hr />
          <OwlCarousel className="owl-theme" {...options}>
            {blogData && blogData.slice(0, 5).map((item, index) => (
              <div className='col-md-12' key={index}>
                <Image loader={imageKitLoader} src={`${item.thumbnail}`} title={item.title} alt={item.title} className='img-fluid' width={100} height={100} quality={60} placeholder="blur" blurDataURL={staticBlurDataUrl()} sizes='(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw' />
                <Link href={`/blogs/${item.slug}`}> <p className='text-center'>{item.title}</p></Link>
              </div>
            ))}
          </OwlCarousel>
        </div>
      ) : (
        <p>Loading blog data...</p>
      )}
      <style jsx>
        {`
    .blog_card {
   
      border-radius: 10px;
      padding: 10px;
      cursor:pointer;
  }
    .blog_card h4 {
      color:var(--brand-color-2);
      font-weight:bolder;
   }
   .blog_card p {
      color:var(--brand-color-1);
      font-size:14px;
   }
   `}
      </style>
    </>
  )
}

export default LatestBlog
