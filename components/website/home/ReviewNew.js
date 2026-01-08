"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import API_URLS from "@/config/apiconfig";
import styles from "../../../styles/ReviewNew.module.css";

export default function ReviewSection() {
  const [rating, setRating] = useState(4);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);
  const [videos, setVideos] = useState([
    { id: 1, name: "Client Stories", video_url: "/images/video/IMG_7304.MP4" },
    { id: 2, name: "Client Stories", video_url: "/images/video/IMG_7305.MP4" },
    { id: 3, name: "Client Stories", video_url: "/images/video/IMG_7306.MP4" },
    { id: 4, name: "Client Stories", video_url: "/images/video/IMG_7307.MP4" },
  ]);
  const videoRefs = useRef([]);

  // ✅ Fetch videos from API (Instagram/Review)
  useEffect(() => {
    fetch(`${API_URLS.REVIEW_GALLERY}?is_active=1`)
      .then((res) => res.json())
      .then((data) => {
        const result = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : [];
        if (result.length > 0) {
          setVideos(result);
        }
      })
      .catch((err) => {
        console.error("Error fetching Review videos, using fallbacks:", err);
      });
  }, []);

  // ✅ Detect screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Auto-slide (stops when a video is playing)
  useEffect(() => {
    if (paused || videos.length === 0) return;
    const anyPlaying = videoRefs.current.some((v) => v && !v.paused);
    if (anyPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [paused, activeIndex, videos]);

  const toggleVideo = (i) => {
    const video = videoRefs.current[i];
    if (!video) return;

    // Pause all other videos
    videoRefs.current.forEach((v, idx) => {
      if (v && idx !== i) v.pause();
    });

    if (video.paused) {
      video.play().catch(err => console.error("Video play failed:", err));
      setPlayingIndex(i);
      setPaused(true);
    } else {
      video.pause();
      setPlayingIndex(null);
      setPaused(false);
    }
  };

  return (
    <section className={styles.reviewSectionWrapper}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <div className={styles.watermark}>Reviews</div>
          <h2 className={styles.titleMain}>
            Client <span>Reviews</span>
          </h2>
          <p className={styles.subTitle}>
            Authentic experiences from those who found their perfect home with us.
          </p>
        </div>

        <div
          className={`${styles.reviewSection} ${isMobile ? styles.mobileLayout : ""
            }`}
        >
          {/* ✅ Video Section */}
          <div
            className={styles.options}
            onMouseEnter={() => !isMobile && setPaused(true)}
            onMouseLeave={() => !isMobile && setPaused(false)}
          >
            {videos.length === 0 ? (
              <p className="text-center w-full">Loading videos...</p>
            ) : (
              videos.map((item, i) => (
                <div
                  key={item.id || i}
                  className={`${styles.option} ${i === activeIndex ? styles.active : ""
                    }`}
                  onClick={() => {
                    setActiveIndex(i);
                    setPaused(true);
                  }}
                  style={{
                    display: isMobile
                      ? i === activeIndex
                        ? "block"
                        : "none"
                      : "block",
                  }}
                >
                  {/* ✅ Video without thumbnail */}
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={
                      item.video_url?.startsWith("http")
                        ? item.video_url
                        : item.video_url?.startsWith("/images/")
                          ? item.video_url
                          : `${process.env.API_URL}${item.video_url}`
                    }
                    muted
                    playsInline
                    preload="metadata"
                  />

                  <button
                    className={styles.videoToggle}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleVideo(i);
                    }}
                  >
                    <span className={styles.icon}>
                      {playingIndex === i ? "⏸" : "▶"}
                    </span>
                  </button>

                  <div className={styles.label}>
                    <div className={styles.info}>
                      <div className={styles.main}>{item.name || "Client"}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ✅ Google Review Section */}
          <div
            className={`${styles.logoGoogle} ${isMobile ? styles.logoGoogleMobile : ""
              }`}
          >
            <div>
              <Image className="googleLogo"
                src="/images/google.png"
                alt="Google"
                width={200}
                height={80}
              />
              <h1>Are You Satisfied with our Service?</h1>

              <div className={styles.starRating}>
                {[1, 2, 3, 4, 5].map((val) => (
                  <i
                    key={val}
                    onClick={() => setRating(val)}
                    className={`fas fa-star ${styles.star} ${rating >= val ? styles.active : ""
                      }`}
                  />
                ))}
                <span className={styles.ratingCount}>4.8</span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
