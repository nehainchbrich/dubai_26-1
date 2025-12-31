import CommonBanner from '@/components/website/common/CommonBanner'
import React from 'react'
import Website from '../../pages/layouts/website';
import API_URLS from '@/config/apiconfig';
import LeftSide from '@/components/website/blogs/LeftSide';
import RightSide from '@/components/website/blogs/RightSide';
import { fetchData } from '@/config/fetchApi';
import Link from "next/link";
import Image from "next/image";
import OfferBlog from '@/components/expo_new/OfferBlog';

import detailStyles from '@/styles/blogs/BlogDetail.module.css';

const Slug = ({ blog, blogCat, blogTag, comment, latestBlog, meta, event }) => {
  const activeExpos = Array.isArray(event)
    ? event.filter((expo) => {
      const status = (expo.status || "").toUpperCase();
      return (
        status === "ACTIVE" ||
        (status === "UPCOMING" && Number(expo.default_status) === 1)
      );
    })
    : [];

  return (
    <div className={detailStyles.pageWrapper}>
      <OfferBlog event={activeExpos} />

      <header className={detailStyles.titleSection}>
        <div className="container">
          {blog.category && (
            <span className={detailStyles.categoryBadge}>
              {typeof blog.category === 'object' ? (blog.category[0]?.title || blog.category.title) : blog.category}
            </span>
          )}
          <h1 className={detailStyles.mainTitle}>{blog.title}</h1>
          <div className={detailStyles.metaInfo}>
            <span><i className="far fa-calendar-alt"></i> {new Date(blog.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span><i className="far fa-user"></i> Inch & Brick Editorial</span>
            <span><i className="far fa-clock"></i> 5 Min Read</span>
          </div>
        </div>
      </header>

      <div className={`${detailStyles.contentBody} container`}>
        <div className="row">
          {/* Left Section */}
          <div className="col-md-8">
            <LeftSide data={blog} comment={comment} />
          </div>

          {/* Right Section */}
          <div className="col-md-4">
            <RightSide
              category={blogCat}
              tags={blogTag}
              latestBlog={latestBlog}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slug;

Slug.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  try {
    const blog = await fetchData(API_URLS.BLOG, { slug });
    const meta = await fetchData(API_URLS.META, {
      slug: `blogs/${slug}`,
      columns: "title,description,thumbnail,slug",
    });

    if (blog.total > 0) {
      const blogCode = blog.data[0].code;
      const latestBlog = await fetchData(API_URLS.BLOG, {
        status: 1,
        limit: 15,
      });
      const blogCats = await fetchData(API_URLS.BLOGCATEGORY, { status: 1 });
      const comments = await fetchData(API_URLS.COMMENT, { status: 1, blogCode });
      const blogTags = await fetchData(API_URLS.BLOG_TAG);

      // ✅ fetch expo events for activeExpos
      const eventRes = await fetchData(API_URLS.EVENTDETAILS, {
        status: "!UPCOMING",
      });
      const event = eventRes?.data || [];

      return {
        props: {
          blog: blog.data[0],
          blogCat: blogCats.data,
          blogTag: blogTags.data,
          comment: comments.data,
          latestBlog: latestBlog.data,
          meta: meta.data[0] || null,
          event, // ✅ pass to props
        },
      };
    }
    return {
      notFound: true,
    };
  } catch (error) {
    return { props: {} };
  }
}
