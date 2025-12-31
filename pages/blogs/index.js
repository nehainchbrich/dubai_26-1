import React, { useEffect, useState } from 'react';
import Website from '../layouts/website';
import CommonBanner from '@/components/website/common/CommonBanner';
import InfiniteScroll from 'react-infinite-scroll-component';
import BlogItem2 from '@/components/website/blogs/BlogItem2';
import { fetchData } from '@/config/fetchApi';
import API_URLS from '@/config/apiconfig';
import OfferBlog from '@/components/expo_new/OfferBlog';
import blogStyles from '@/styles/blogs/BlogListing.module.css';
import RightSide from '@/components/website/blogs/RightSide';

const Blog = ({ blog, meta, event, latestBlog, blogCat, blogTag }) => {
  const activeExpos = Array.isArray(event)
    ? event.filter((expo) => {
      const status = (expo.status || "").toUpperCase();
      return (
        status === "ACTIVE" ||
        (status === "UPCOMING" && Number(expo.default_status) === 1)
      );
    })
    : [];
  const { data, total } = blog;
  const limit = 10;

  const [blogData, setBlogData] = useState(data || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(data.length >= limit);
  const [searchInput, setSearchInput] = useState('');

  // 🔹 Fetch Blogs from server with pagination + search
  const fetchMoreBlogs = async (nextPage = 1, reset = false) => {
    try {
      const options = {
        status: 1,
        limit,
        page: nextPage,
        sort: 'id:desc',
        columns: 'title,category,tags,slug,thumbnail,shortDesc',
      };

      if (searchInput) {
        options.search = searchInput;
        options.searchColumns = 'title,category,tags';
      }

      const res = await fetchData(API_URLS.BLOG, options);
      const newData = res.data || [];

      setBlogData(prev => (reset ? newData : [...prev, ...newData]));
      setHasMore(newData.length === limit);
      setPage(nextPage);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const SearchKeyPress = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
  };

  useEffect(() => {
    fetchMoreBlogs(1, true);
  }, [searchInput]);

  const loadMore = () => {
    fetchMoreBlogs(page + 1);
  };

  return (
    <div className={blogStyles.pageWrapper}>
      <OfferBlog event={activeExpos} />

      <header className={blogStyles.combinedHeader}>
        <div className="container">
          <div className={blogStyles.headerFlex}>
            <div className={blogStyles.titleBox}>
              <h1 className={blogStyles.mainTitle}>Latest <span>Insights</span></h1>
              <p className={blogStyles.headerDesc}>Real estate trends & lifestyle guides from Dubai's experts.</p>
            </div>
            <div className={blogStyles.searchBox}>
              <div className={blogStyles.searchUnit}>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className={blogStyles.search_bar}
                  value={searchInput}
                  onChange={SearchKeyPress}
                />
                <button className={blogStyles.btnAction}>
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={blogStyles.contentArea}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <InfiniteScroll
                dataLength={blogData.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<div className="text-center py-5"><h4>Loading more articles...</h4></div>}
                style={{ height: 'unset', overflow: 'unset' }}
              >
                <div className={blogStyles.blogGrid}>
                  {blogData.map((item, index) => (
                    <BlogItem2 data={item} key={index} />
                  ))}
                </div>
              </InfiniteScroll>

              {blogData.length === 0 && (
                <div className="text-center py-5 opacity-50">
                  <h3>No results found for your search</h3>
                </div>
              )}
            </div>

            <div className="col-lg-4">
              <RightSide
                category={blogCat}
                tags={blogTag}
                latestBlog={latestBlog}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;

// Layout wrapper
Blog.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
};

// Fetch initial data from server (SSR)
export async function getServerSideProps() {
  try {
    const options = {
      status: 1,
      limit: 10,
      page: 1,
      sort: 'id:desc',
      columns: 'title,category,tags,slug,thumbnail,shortDesc',
    };

    const blog = await fetchData(API_URLS.BLOG, options);
    const meta = await fetchData(API_URLS.META, {
      slug: 'blogs',
      columns: 'title,description,thumbnail,slug',
    });

    // Fetch sidebar data
    const latestBlogRes = await fetchData(API_URLS.BLOG, { status: 1, limit: 5, sort: 'id:desc' });
    const blogCatsRes = await fetchData(API_URLS.BLOGCATEGORY, { status: 1 });
    const blogTagsRes = await fetchData(API_URLS.BLOG_TAG);

    // ✅ fetch expo events for activeExpos
    const eventRes = await fetchData(API_URLS.EVENTDETAILS, {
      status: "!UPCOMING",
    });
    const event = eventRes?.data || [];

    return {
      props: {
        blog: blog.total > 0 ? blog : { data: [], total: 0 },
        meta: meta.data[0] || null,
        event,
        latestBlog: latestBlogRes?.data || [],
        blogCat: blogCatsRes?.data || [],
        blogTag: blogTagsRes?.data || [],
      },
    };
  } catch (error) {
    return {
      props: { blog: { data: [], total: 0 }, meta: null, event: [], latestBlog: [], blogCat: [], blogTag: [] },
    };
  }
}
