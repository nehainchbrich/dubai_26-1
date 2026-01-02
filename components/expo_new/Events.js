"use client";
import React, { useEffect, useRef } from "react";
import styles from "../../styles/expo_new/Events.module.css";
import Image from "next/image";
import {
  expoDateFormat,
  formatEventDatesWithSuffix,
  imageKitLoader,
} from "@/helper/Helper";
import Link from "next/link";
import OwlCarousel from "@/components/OwlCarousel";


const Events = ({ data = [] }) => {
  const contentRefs = useRef([]);

  // normalize statuses
  const normalizeStatus = (status) =>
    typeof status === "string" ? status.trim().toUpperCase() : "";

  // group expos by status
  const activeExpos = data.filter(
    (expo) =>
      normalizeStatus(expo.status) === "ACTIVE" ||
      (normalizeStatus(expo.status) === "UPCOMING" &&
        Number(expo.default_status) === 1)
  );

  const upcomingExpos = data.filter(
    (expo) => normalizeStatus(expo.status) === "UPCOMING"
  );
  const completedExpos = data.filter(
    (expo) => normalizeStatus(expo.status) === "COMPLETED"
  );

  // Helper for date formatting
  const getEventDateString = (date) => {
    if (!date) return "";
    const dates = expoDateFormat(date);
    return dates.join(", ");
  };

  // Logic to separate the Hero event (first active event)
  const heroEvent = activeExpos.length > 0 ? activeExpos[0] : null;
  const remainingActiveExpos = activeExpos.length > 1 ? activeExpos.slice(1) : [];

  const sections = [
    {
      title: "Current Events",
      desc: remainingActiveExpos.length
        ? "Other events happening now."
        : "",
      expos: remainingActiveExpos,
      isCurrent: true,
    },
    {
      title: "Scheduled Events",
      desc: `Upcoming opportunities to explore Dubai properties. Stay tuned.`,
      expos: upcomingExpos,
    },
    {
      title: "Past Events",
      desc: "A series of exclusive events that brought Dubai’s best projects to India.",
      expos: completedExpos,
    },
  ].filter((s) => s.expos.length > 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeIn);
          }
        });
      },
      { threshold: 0.1 }
    );

    contentRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.containerEvent} id="events">
      <div className={styles.OurFormulaSectionHeading}>Our Events</div>
      <div className={styles.OurFormulaFormulaSubHeading}>
        Showcasing Dubai’s Finest Properties Across India
      </div>

      {/* Hero Section for Primary Active Event */}
      {heroEvent && (
        <div className={styles.heroEventWrapper}>
          <div className={styles.heroCard}>
            <div className={styles.heroImageWrapper}>
              <div className={styles.heroBadge}>
                {heroEvent.default_status === 1 ? "Upcoming" : "Happening Now"}
              </div>
              <Image
                loader={imageKitLoader}
                src={heroEvent.venue_img || heroEvent.thumbnail || '/images/placeholder.jpg'}
                alt={heroEvent.eventName}
                fill
                className={styles.heroImage}
              />
            </div>
            <div className={styles.heroContent}>
              <h2 className={styles.heroTitle}>{heroEvent.eventName}</h2>
              <div className={styles.heroDetails}>
                <div className={styles.heroDetailItem}>
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{heroEvent.venue}, {heroEvent.city}</span>
                </div>
                <div className={styles.heroDetailItem}>
                  <i className="far fa-calendar-alt"></i>
                  <span>{getEventDateString(heroEvent.eventDate)}</span>
                </div>
              </div>
              <div className={styles.heroActions}>
                <Link href="/expo-invitation" className={styles.primaryBtn}>
                  Book VIP Pass
                </Link>
                <Link href={`/events/${heroEvent.slug}`} className={styles.secondaryBtn}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        {sections.map((section, idx) => (
          <div
            key={idx}
            className={`${styles.sectionWrapper} ${styles.fadeIn}`} // Apply fadeIn directly or via ref
            ref={(el) => (contentRefs.current[idx] = el)}
            style={{ opacity: 0, animationFillMode: 'forwards' }} // Ensure opacity starts at 0 for animation
          >
            {/* Section Header */}
            <div className={styles.sectionHeader}>
              <div>
                <h3 className={styles.sectionTitle}>{section.title}</h3>
                <p className={styles.sectionDesc}>{section.desc}</p>
              </div>
            </div>

            {/* Events Grid */}
            {section.expos.length > 1 ? (
              <OwlCarousel
                className="owl-theme"
                loop={false}
                margin={30}
                nav
                dots={true}
                responsive={{
                  0: { items: 1 },
                  768: { items: 2 },
                  992: { items: 3 },
                }}
              >
                {section.expos.map((item, i) => {
                  const isUpcoming = normalizeStatus(item.status) === "UPCOMING";
                  const linkHref = !isUpcoming
                    ? `/events/${item.slug}`
                    : `/blogs/${item.blog_link}`;

                  return (
                    <div key={i} className="item" style={{ padding: "5px" }}>
                      <Link
                        href={linkHref}
                        className={styles.eventCard}
                        style={{ textDecoration: "none", height: "100%", display: 'flex' }}
                      >
                        <div className={styles.cardImageWrapper}>
                          <div className={styles.statusBadge}>
                            {normalizeStatus(item.status)}
                          </div>
                          <Image
                            loader={imageKitLoader}
                            src={
                              item.venue_img ||
                              item.thumbnail ||
                              "/images/placeholder.jpg"
                            }
                            alt={item.title || item.eventName}
                            fill
                            className={styles.cardImage}
                          />
                        </div>
                        <div className={styles.cardContent}>
                          <div className={styles.cardVenue}>
                            <i className="fas fa-map-marker-alt"></i> {item.venue}
                          </div>
                          <h3 className={styles.cardTitle}>{item.eventName}</h3>
                          <div className={styles.cardDate}>
                            <i className="far fa-calendar-alt"></i>{" "}
                            {getEventDateString(item.eventDate)}
                          </div>

                          <div className={styles.cardActions}>
                            <span className={styles.viewMoreBtn}>
                              View Details{" "}
                              <i className="fas fa-arrow-right"></i>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </OwlCarousel>
            ) : (
              <div className={styles.eventsGrid}>
                {section.expos.map((item, i) => {
                  const isUpcoming = normalizeStatus(item.status) === "UPCOMING";
                  const linkHref = !isUpcoming
                    ? `/events/${item.slug}`
                    : `/blogs/${item.blog_link}`;

                  return (
                    <Link
                      href={linkHref}
                      key={i}
                      className={styles.eventCard}
                      style={{ textDecoration: "none" }}
                    >
                      <div className={styles.cardImageWrapper}>
                        <div className={styles.statusBadge}>
                          {normalizeStatus(item.status)}
                        </div>
                        <Image
                          loader={imageKitLoader}
                          src={
                            item.venue_img ||
                            item.thumbnail ||
                            "/images/placeholder.jpg"
                          }
                          alt={item.title || item.eventName}
                          fill
                          className={styles.cardImage}
                        />
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.cardVenue}>
                          <i className="fas fa-map-marker-alt"></i> {item.venue}
                        </div>
                        <h3 className={styles.cardTitle}>{item.eventName}</h3>
                        <div className={styles.cardDate}>
                          <i className="far fa-calendar-alt"></i>{" "}
                          {getEventDateString(item.eventDate)}
                        </div>

                        <div className={styles.cardActions}>
                          <span className={styles.viewMoreBtn}>
                            View Details <i className="fas fa-arrow-right"></i>
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
