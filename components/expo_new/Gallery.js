"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/expo_new/Gallery.module.css";
import Image from "next/image";
import { imageKitLoader, ImagePath } from "@/helper/Helper";
import Link from "next/link";

const Gallery = ({ data = [], section, event = [] }) => {
  const activeExpos = Array.isArray(event)
    ? event.filter((expo) => {
      const status = (expo.status || "").toUpperCase();
      return (
        status === "ACTIVE" ||
        (status === "UPCOMING" && Number(expo.default_status) === 1)
      );
    })
    : [];

  const description =
    ImagePath(section?.sectionSubHeading) ||
    "Browse stunning snapshots and exclusive property showcases from the Expo, capturing every memorable moment.";

  const img_gallery = data.filter(
    (item) => item.fileType === "image" || item.fileType === "undefined"
  );

  const slidesWrapperRef = useRef(null);
  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Responsive items per view
  useEffect(() => {
    const calcItems = () => (window.innerWidth < 600 ? 1 : 1);
    setItemsPerView(calcItems());

    const handleResize = () => setItemsPerView(calcItems());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slide transform
  useEffect(() => {
    if (!slidesWrapperRef.current) return;
    const offset = currentIndex * (100 / itemsPerView);
    slidesWrapperRef.current.style.transform = `translateX(-${offset}%)`;
  }, [currentIndex, itemsPerView]);

  const handleNext = () => {
    const slides =
      slidesWrapperRef.current?.querySelectorAll(`.${styles.gridSlide}`) || [];
    const maxIndex = slides.length - itemsPerView;
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const handlePrev = () => {
    const slides =
      slidesWrapperRef.current?.querySelectorAll(`.${styles.gridSlide}`) || [];
    const maxIndex = slides.length - itemsPerView;
    setCurrentIndex((prev) => (prev - 1 + maxIndex + 1) % (maxIndex + 1));
  };

  return (
    <section className={styles.gallerySection} ref={galleryRef}>
      <div className={styles.container}>
        <div className={styles.dFlex}>
          <div>
            <h2 className={`${styles.textCenter} ${styles.galleryHeading}`}>
              {section?.sectionHeading || "Gallery of Expo Moments that Matter"}
            </h2>
            <p
              className={styles.lead}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {activeExpos.length > 0 ? (
            <Link className={styles.btnClass} href="/expo-invitation">
              Grab FREE VIP Pass
            </Link>
          ) : (
            <Link className={`${styles.btn} ${styles.ghost}`} href="/contact-us">
              Talk to Us
            </Link>
          )}
        </div>
      </div>

      {/* ---------- SLIDER ---------- */}
      <div className={styles.gallerySlider}>
        <div className={styles.slides} ref={slidesWrapperRef}>
          {(() => {
            const chunks = [];
            for (let i = 0; i < img_gallery.length; i += 3) {
              chunks.push(img_gallery.slice(i, i + 3));
            }

            return chunks.map((chunk, slideIndex) => (
              <div key={slideIndex} className={styles.gridSlide}>
                {/* BIG IMAGE */}
                <div className={styles.bigColumn}>
                  {chunk[0] && (
                    <div className={styles.imageCardBig}>
                      <Image
                        loader={imageKitLoader}
                        src={chunk[0].thumbnails}
                        alt={chunk[0].title || "Gallery Image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        priority={slideIndex === 0}
                        loading={slideIndex === 0 ? "eager" : "lazy"}
                        className={styles.image}
                      />
                    </div>
                  )}
                </div>

                {/* SMALL IMAGES */}
                <div className={styles.smallColumn}>
                  {chunk.slice(1).map((img, idx) => (
                    <div key={idx} className={styles.imageCardSmall}>
                      <Image
                        loader={imageKitLoader}
                        src={img.thumbnails}
                        alt={img.title || "Gallery Image"}
                        fill
                        sizes="(max-width: 768px) 40vw, 20vw"
                        loading="lazy"
                        className={styles.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ));
          })()}
        </div>

        {/* NAV ARROWS */}
        <div className={`${styles.arrow} ${styles.left}`} onClick={handlePrev}>
          ❮
        </div>
        <div className={`${styles.arrow} ${styles.right}`} onClick={handleNext}>
          ❯
        </div>
      </div>
    </section>
  );
};

export default Gallery;
