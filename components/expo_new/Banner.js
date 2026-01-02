"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/expo_new/Banner.module.css";
import { imageKitLoader } from "@/helper/Helper";
import { staticBlurDataUrl } from "@/utils/staticBlurDataUrl";
import Developers from "@/components/expo_new/Developers";
import { usePathname } from "next/navigation";

function Banner({ data = {}, developer, section, dSection, event = [] }) {
  const pathname = usePathname();

  // Normalize event status
  const normalizedEvents = Array.isArray(event)
    ? event.map((e) => ({
      ...e,
      status: e.status?.toUpperCase(),
    }))
    : [];

  // Priority: ACTIVE → UPCOMING (default) → null
  const activeEvent = normalizedEvents.find(
    (e) => e.status === "ACTIVE"
  );

  const upcomingEvent = normalizedEvents.find(
    (e) => e.status === "UPCOMING" && Number(e.default_status) === 1
  );

  const bannerEvent = activeEvent || upcomingEvent || null;

  const shouldShowDeveloper =
    pathname.startsWith("/events") || Boolean(dSection);

  return (
    <section className={styles.hero} id="home">
      {/* LEFT CONTENT */}
      <div className={styles.content}>
        <span className={styles.kicker}>Dubai Property Expo</span>

        <h1 className={styles.title}>
          GRAND
          <span>PROPERTY</span>
          EXPO
        </h1>

        <p className={styles.description}>
          {bannerEvent
            ? `${bannerEvent.venue || ""}${bannerEvent.city ? `, ${bannerEvent.city}` : ""}`
            : "Meet Dubai’s most trusted developers under one roof. Discover luxury, investment opportunities, and future-ready homes."}
        </p>

        <div className={styles.actions}>
          {bannerEvent ? (
            <Link href="/expo-invitation" className={styles.primaryBtn}>
              Get VIP Pass
            </Link>
          ) : (
            <Link href="/contact-us" className={styles.secondaryBtn}>
              Speak to an Expert
            </Link>
          )}
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className={styles.visual}>
        <div className={styles.frame}>
          <Image
            loader={imageKitLoader}
            src={
              bannerEvent?.venue_img ||
              bannerEvent?.thumbnail ||
              data.thumbnail
            }
            alt={bannerEvent?.eventName || data.title || "Expo"}
            fill
            className={styles.image}
            placeholder="blur"
            blurDataURL={staticBlurDataUrl()}
            priority
          />
        </div>

        {shouldShowDeveloper && (
          <Developers data={developer} section={dSection} />
        )}
      </div>
    </section>
  );
}

export default Banner;
