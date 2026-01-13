"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../styles/TrendingProjects.module.css';
import { imageKitLoader } from '@/helper/Helper';

const TrendingProjects = ({ data }) => {
    const scrollRef = React.useRef(null);
    const [currentIndex, setCurrentIndex] = React.useState(1);
    const [isVisible, setIsVisible] = React.useState(false);
    const sectionRef = React.useRef(null);
    const projects = Array.isArray(data) ? data : [];

    const handleScroll = () => {
        if (scrollRef.current) {
            const scrollLeft = scrollRef.current.scrollLeft;
            const firstCard = scrollRef.current.querySelector('.' + styles.projectCard);
            const cardWidth = firstCard ? firstCard.offsetWidth + 30 : 350;
            const newIndex = Math.min(Math.round(scrollLeft / cardWidth) + 1, projects.length);
            if (newIndex !== currentIndex) {
                setCurrentIndex(newIndex);
            }
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const firstCard = scrollRef.current.querySelector('.' + styles.projectCard);
            const scrollAmount = firstCard ? firstCard.offsetWidth + 30 : 350;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    entry.target.classList.add(styles.animateIn);
                } else {
                    setIsVisible(false);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    if (projects.length === 0) return null;

    return (
        <section className={`${styles.trendingArea} ${isVisible ? styles.isInView : ''}`} ref={sectionRef}>
            {/* Massive Background Watermark */}
            <div className={styles.watermarkBody}>Trending</div>

            <div className={styles.container}>
                <div className={styles.splitLayout}>
                    {/* Left Column: Fixed Content */}
                    <div className={styles.leftContent}>
                        {/* Floating 3D Burj Khalifa Image (Now inside the title column) */}
                        <div className={styles.floatingBurj}>
                            <Image
                                src="/images/burj-3d.png"
                                alt="Burj Khalifa 3D"
                                width={800}
                                height={1200}
                                priority
                                className={styles.burjImage}
                            />
                        </div>

                        <h2 className={styles.titleMain}>
                            Trending <span>Projects</span>
                        </h2>
                        <p className={styles.subHeading}>
                            We have a wide selection of high-quality apartments, which can be your next living space.
                        </p>

                        <div className={styles.progressInfo}>
                            <div className={styles.divider}></div>
                            <div className={styles.currentProgress}>
                                {currentIndex} / {projects.length}
                            </div>
                        </div>

                        <div className={styles.navControls}>
                            <button className={styles.navBtn} onClick={() => scroll('left')}>
                                <i className="fas fa-chevron-left"></i>
                            </button>
                            <button className={styles.navBtn} onClick={() => scroll('right')}>
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Sliding Pane */}
                    <div className={styles.sliderPane}>
                        <div
                            className={styles.showcaseWrapper}
                            ref={scrollRef}
                            onScroll={handleScroll}
                        >
                            {projects.map((project, index) => {
                                const price = project.minAmount || project.startingPrice;
                                const formattedPrice = price ? Number(price).toLocaleString() : null;
                                const imgPath = project.thumbnail || project.featuredImage || '/images/banner.jpg';

                                return (
                                    <Link
                                        key={index}
                                        href={`/properties/${project.slug}`}
                                        className={styles.projectCard}
                                    >
                                        <div className={styles.imageBox}>
                                            <Image
                                                loader={imageKitLoader}
                                                src={imgPath}
                                                alt={project.title}
                                                fill
                                                className={styles.projectImage}
                                                sizes="400px"
                                                priority={index < 2}
                                            />
                                            <div className={styles.trendingBadge}>
                                                <i className="fas fa-fire"></i> Trending
                                            </div>
                                            {formattedPrice && (
                                                <div className={styles.priceTag}>
                                                    <span>Starting from</span>
                                                    AED {formattedPrice}
                                                </div>
                                            )}
                                        </div>

                                        <div className={styles.cardContent}>
                                            <div className={styles.categoryTag}>
                                                {project.PCategory?.title || 'Luxury Living'}
                                            </div>
                                            <h3 className={styles.projectTitle}>{project.title}</h3>
                                            <p className={styles.projectLoc}>
                                                <i className="fas fa-map-marker-alt"></i> {project.Location?.title || 'Dubai, UAE'}
                                            </p>

                                            <div className={styles.cardFooter}>
                                                <div className={styles.readMore}>
                                                    Explore Project <i className="fas fa-arrow-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrendingProjects;
