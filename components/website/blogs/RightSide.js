import React from 'react'
import LatestBlog from './LatestBlog'
import Link from 'next/link'
import styles from '../../../styles/BlogRight.module.css';
import LatestProperty from '../property/LatestProperty'
import Image from 'next/image';
import { imageKitLoader } from '@/helper/Helper';

const RightSide = ({ category, tags, latestBlog }) => {
  return (
    <aside className={styles.sidebarContainer}>
      {latestBlog && (
        <div className={styles.widgetCard}>
          <h4 className={styles.widgetTitle}>Latest Articles</h4>
          <div className={styles.latestBlogList}>
            {latestBlog.slice(0, 5).map((item, i) => (
              <Link href={`/blogs/${item.slug}`} key={i} className={styles.latestItem}>
                <div className={styles.itemImage}>
                  <Image
                    loader={imageKitLoader}
                    src={`${item.thumbnail}`}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.itemContent}>
                  <div className={styles.itemTitle}>{item.title}</div>
                  <div className={styles.itemMeta}>Dubai Real Estate</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className={styles.widgetCard}>
        <h4 className={styles.widgetTitle}>Categories</h4>
        <div className={styles.taxonomyList}>
          {category && category.map((item, index) => (
            <Link href={`/blog-category/${item.slug}`} key={index} className={styles.tagLink}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.widgetCard}>
        <h4 className={styles.widgetTitle}>Explore Tags</h4>
        <div className={styles.taxonomyList}>
          {tags && tags.map((item, index) => (
            <Link href={`/blog-tag/${item.slug}`} key={index} className={styles.tagLink}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <LatestProperty />
    </aside>
  );
}

export default RightSide
