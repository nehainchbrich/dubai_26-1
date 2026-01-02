"use client";
import React, { useEffect, useRef } from "react";
import styles from "../../styles/expo_new/Events.module.css";
import Image from "next/image";
import { expoDateFormat, imageKitLoader } from "@/helper/Helper";
import Link from "next/link";
import OwlCarousel from "@/components/OwlCarousel";

const ACTIVE_STATUSES = ["ACTIVE", "ONGOING", "IN_PROGRESS", "RUNNING"];

const Events = ({ data = [] }) => {
  const contentRefs = useRef([]);

  const normalizeStatus = (status) =>
    typeof status === "string" ? status.trim().toUpperCase() : "";

  // ---------- NORMALIZE EVENTS ----------
  const events = Array.isArray(data)
    ? data.map((e) => ({
      ...e,
      status: normalizeStatus(e.status),
    }))
    : [];

  // ---------- HERO EVENT ----------
  const activeEvent = events.find((e) =>
    ACTIVE_STATUSES.includes(e.status)
  );

  const upcomingDefaultEvent = events.find(
    (e) => e.status === "UPCOMING" && Number(e.default_status) === 1
  );

  const heroEvent = activeEvent || upcomingDefaultEvent || null;

  // ---------- EVENT GROUPS ----------
  const currentEvents = events.filter(
    (e) =>
      ACTIVE_STATUSES.includes(e.status) ||
      (e.status === "UPCOMING" && Number(e.default_status) === 1)
  );

  const scheduledEvents = events.filter((e) => e.status === "UPCOMING");
  const pastEvents = events.filter((e) => e.status === "COMPLETED");

  const sections = [
    {
      title: "Current Events",
      desc: "Events happening right now.",
      expos: currentEvents,
    },
    {
      title: "Scheduled Events",
      desc: "Upcoming opportunities to explore Dubai properties.",
      expos: scheduledEvents,
    },
    {
      title: "Past Events",
      desc:
        "A series of exclusive events that brought Dubai’s best projects to India.",
      expos: pastEvents,
    },
  ].filter((s) => s.expos.length > 0);

  // ---------- DATE FORMAT ----------
  const getEventDateString = (date) => {
    if (!date) return "";
    return expoDateFormat(date).join(", ");
  };

  // ---------- FADE IN ----------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeIn);
          }
        }),
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

      {/* ---------- HERO EVENT ---------- */}
      {heroEvent && (
        <div className={styles.heroEventWrapper}>
          <div className={styles.heroCard}>
            <div className={styles.heroImageWrapper}>
              <div className={styles.heroBadge}>
                {ACTIVE_STATUSES.includes(heroEvent.status)
                  ? "Happening Now"
                  : "Upcoming"}
              </div>

              <Image
                loader={imageKitLoader}
                src={
                  heroEvent.venue_img ||
                  heroEvent.thumbnail ||
                  "/images/placeholder.jpg"
                }
                alt={heroEvent.eventName}
                fill
                className={styles.heroImage}
              />
            </div>

            <div className={styles.heroContent}>
              <h2 className={styles.heroTitle}>{heroEvent.eventName}</h2>

              <div className={styles.heroDetails}>
                <div className={styles.heroDetailItem}>
                  <i className="fas fa-map-marker-alt" />
                  <span>
                    {heroEvent.venue}, {heroEvent.city}
                  </span>
                </div>
                <div className={styles.heroDetailItem}>
                  <i className="far fa-calendar-alt" />
                  <span>{getEventDateString(heroEvent.eventDate)}</span>
                </div>
              </div>

              <div className={styles.heroActions}>
                <Link href="/expo-invitation" className={styles.primaryBtn}>
                  Book VIP Pass
                </Link>
                <Link
                  href={`/events/${heroEvent.slug}`}
                  className={styles.secondaryBtn}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- EVENT SECTIONS ---------- */}
      {sections.map((section, idx) => (
        <div
          key={idx}
          className={styles.sectionWrapper}
          ref={(el) => (contentRefs.current[idx] = el)}
        >
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>{section.title}</h3>
            <p className={styles.sectionDesc}>{section.desc}</p>
          </div>

          {section.expos.length > 1 ? (
            <OwlCarousel
              className="owl-theme"
              loop={false}
              margin={30}
              nav
              dots
              responsive={{
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 },
              }}
            >
              {section.expos.map((item) => (
                <EventCard
                  key={item.id}
                  item={item}
                  heroEvent={heroEvent}
                />
              ))}
            </OwlCarousel>
          ) : (
            <div className={styles.eventsGrid}>
              {section.expos.map((item) => (
                <EventCard
                  key={item.id}
                  item={item}
                  heroEvent={heroEvent}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ---------- EVENT CARD ----------
const EventCard = ({ item, heroEvent }) => {
  const link =
    item.status === "UPCOMING"
      ? `/blogs/${item.blog_link}`
      : `/events/${item.slug}`;

  return (
    <Link href={link} className={styles.eventCard}>
      <div className={styles.cardImageWrapper}>
        <div className={styles.statusBadge}>{item.status}</div>

        {item.id === heroEvent?.id && (
          <span className={styles.featuredBadge}>Featured</span>
        )}

        <Image
          loader={imageKitLoader}
          src={item.venue_img || item.thumbnail || "/images/placeholder.jpg"}
          alt={item.eventName}
          fill
          className={styles.cardImage}
        />
      </div>

      <div className={styles.cardContent}>
        <div className={styles.cardVenue}>
          <i className="fas fa-map-marker-alt" /> {item.venue}
        </div>
        <h3 className={styles.cardTitle}>{item.eventName}</h3>
      </div>
    </Link>
  );
};

export default Events;
