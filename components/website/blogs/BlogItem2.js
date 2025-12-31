import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { imageKitLoader } from '@/helper/Helper';
import styles from '../../../styles/BlogItem2.module.css';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const BlogItem2 = ({ data }) => {
    return (
        <Link href={`/blogs/${data.slug}`} className={styles.blogCard}>
            <div className={styles.imageContainer}>
                {data.category && (
                    <span className={styles.categoryTag}>
                        {typeof data.category === 'object' ? (data.category[0]?.title || data.category.title) : data.category}
                    </span>
                )}
                <Image
                    loader={imageKitLoader}
                    src={`${data.thumbnail}`}
                    alt={data.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    quality={75}
                    placeholder="blur"
                    blurDataURL={staticBlurDataUrl()}
                    className={styles.imgFluid}
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{data.title}</h3>
                <p className={styles.shortDesc}>{data.shortDesc}</p>
                <div className={styles.cardFooter}>
                    <span className={styles.readMore}>
                        Read Article <i className="fas fa-arrow-right"></i>
                    </span>
                    <span className={styles.date}>Dubai Insight</span>
                </div>
            </div>
        </Link>
    );
};
export default BlogItem2