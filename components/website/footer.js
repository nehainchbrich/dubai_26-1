"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSites } from "@/context/SiteProvider";
import SearchProperty from "./home/SearchProperty";
import styles from "../../styles/Footer.module.css";

export default function Footer() {
  const { siteSettings: sites } = useSites() || {};
  const currentYear = new Date().getFullYear();

  if (!sites || Object.keys(sites).length === 0) return null;

  const getVal = (key, fallback = "") => sites?.[key] || fallback;

  const seoLinks = [
    "Apartments for Sale",
    "Villas for Sale",
    "Townhouses",
    "Luxury Properties",
    "Off-Plan Projects",
    "Penthouse for Sale",
    "Dubai Marina",
    "Palm Jumeirah",
    "Downtown Dubai",
    "Business Bay",
    "Emaar Beachfront",
    "Dubai Hills Estate",
  ];

  return (
    <>
      <footer className={styles.footerMaster}>
        <div className={styles.footerDivider}></div>

        {/* Main Grid */}
        <div className="container pt-5 pb-5">
          <div className="row g-5">
            {/* Brand */}
            <div className="col-lg-4 col-md-12">
              <Image
                src={`${process.env.API_URL}/common/logo.png`}
                width={160}
                height={55}
                alt="INCH&BRICK"
                style={{ filter: "brightness(0) invert(1)" }}
              />

              <p className={styles.brandBio}>
                Inch & Brick is Dubai’s premier real estate agency, offering
                exclusive access to the city's most prestigious properties.
              </p>

              <div className={styles.socialRack}>
                <a href={getVal("linkedin")} target="_blank" className={styles.socItem}><i className="fab fa-linkedin-in" /></a>
                <a href={getVal("yt")} target="_blank" className={styles.socItem}><i className="fab fa-youtube" /></a>
                <a href={getVal("fb")} target="_blank" className={styles.socItem}><i className="fab fa-facebook-f" /></a>
                <a href={getVal("instagram")} target="_blank" className={styles.socItem}><i className="fab fa-instagram" /></a>
                <a href={getVal("twitter")} target="_blank" className={styles.socItem}><i className="fab fa-twitter" /></a>
              </div>
            </div>

            {/* Company */}
            <div className="col-lg-2 col-md-3 col-6">
              <h5 className={styles.navHead}>Company</h5>
              <ul className={styles.navList}>
                <li><Link href="/about-us">Our Story</Link></li>
                <li><Link href="/career-opportunities">Careers</Link></li>
                <li><Link href="/press-release">Press & Media</Link></li>
                <li><Link href="/blogs">Market Insights</Link></li>
                <li><Link href="/dubai-real-estate-faqs">FAQ's</Link></li>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms-and-condition">Terms & Conditions</Link></li>
                <li><Link href="/contact-us">Contact</Link></li>
              </ul>
            </div>

            {/* Discover */}
            <div className="col-lg-2 col-md-3 col-6">
              <h5 className={styles.navHead}>Discover</h5>
              <ul className={styles.navList}>
                <li><Link href="/top-real-estate-developer-in-dubai">Developers</Link></li>
                <li><Link href="/luxury-properties">Luxury Collection</Link></li>
                <li><Link href="/off-plan-projects">Off-Plan</Link></li>
                <li><Link href="/location-in-dubai">Areas Guide</Link></li>
                <li><Link href="/dubai-property-market">Market Reports</Link></li>
              </ul>
            </div>
            {/* Offices */}
            <div className="col-lg-4 col-md-6">
              <h5 className={styles.navHead}>Our Offices</h5>

              <div className={styles.officeCard}>
                <div className="d-flex">
                  <div className={styles.locIcon}><i className="fas fa-map-marker-alt" /></div>
                  <div>
                    <h6 className={styles.locTitle}>Dubai</h6>
                    <p className={styles.locAddr}>{getVal("dubai_addr")}</p>

                  </div>
                </div>
              </div>

              <div className={styles.officeCard}>
                <div className="d-flex">
                  <div className={`${styles.locIcon} ${styles.locIconInd}`}>
                    <i className="fas fa-landmark" />
                  </div>
                  <div>
                    <h6 className={styles.locTitle}>India Office</h6>
                    <p className={styles.locAddr}>{getVal("ind_addr")}</p>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Trending */}
        <div className={styles.footerTrending}>
          <div className="container">
            <div className={styles.trendingWrap}>
              <span className={styles.trendLabel}>Trending:</span>
              <div className={styles.trendTags}>
                {seoLinks.map((tag, i) => (
                  <Link key={i} href={`/${tag.toLowerCase().replace(/ /g, "-")}`}>
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className={styles.footerBottom}>
          <div className="container d-flex justify-content-between flex-wrap">
            <p>© {currentYear} Inch & Brick. All rights reserved.</p>
            <div className={styles.legalLinks}>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-and-condition">Terms</Link>
              <Link href="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Nav */}
      <div className="footerNav">
        <Link href="/"><i className="fa fa-home" /> Home</Link>
        <SearchProperty />
        <Link href="/residential-properties"><i className="fas fa-building" /> Buy</Link>
        <Link href="/contact-us"><i className="fas fa-tags" /> Sell</Link>
      </div>
    </>
  );
}
