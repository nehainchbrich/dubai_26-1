import { useRouter } from "next/router";
import Model from '@/components/website/common/Model';
import Footer from '@/components/website/footer';
import TriggerBtn from '@/components/website/form/TriggerBtn';
import TriggerModal from '@/components/website/form/TriggerModal';
import Navbar from '@/components/website/navbar'
import { uniqueVisitor } from '@/helper/Helper';
import WebsiteSchema from '@/markup/WebsiteSchema';
import Head from 'next/head';
import Script from 'next/script';
import React, { useEffect, useState } from 'react'

const Website = ({ children, meta, category, tags, latestBlog }) => {
  const router = useRouter();
  const isHome = router.pathname === "/" || router.pathname === "/events";
  // useEffect(() => {
  //   const visitors = localStorage.getItem('visitors');
  //   if(!visitors){uniqueVisitor();}

  // }, ['']);
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="DC.title" content="Inchbrick" />
        <meta name="geo.region" content="IN-DL" />
        <meta name="geo.placename" content="Dwarka" />
        <meta name="geo.position" content="28.596953;77.041316" />
        <meta name="ICBM" content="28.596953, 77.041316" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Inch & brick Realty" />
        <meta property="og:locale" content="en_US" />
        <meta property="article:publisher" content="https://www.facebook.com/inchbrick.realestate" />
        <meta name="audience" content="all" />
        <meta name="robots" content="All" />
        <meta name="revisit-after" content="1 days" />
        <meta name="content-Language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="classification" content="Real estate company in Dubai" />
        <meta name="subject" content="Top real estate company - you can Buy, Sell, Off plan, New launch Property in Dubai, and explore Tourism places in Dubai." />
        <meta name="rating" content="General" />
        <meta name="googlebot" content="all" />
        <meta name="Author" content="inch & Brick Realty" />
        <meta name="theme-color" content="#111010" />
        <meta name='robots' content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' />
        {/* <meta name="google-site-verification" content="SUfW5mGqQLTvvHTemLeQZBTxhAeQ2aAdYmi2enH2Mtg" /> */}
        <meta name="author" content="Inch & brick Realty" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Inch & Brick Realty - Best Real Estate company in Dubai" />
        <meta name="twitter:description" content="Inchbrick Realty In one of the best Real Estate company in Dubai. Find your perfect Real Estate property in Dubai with the help of Inchbrick Realty." />
        <meta name="twitter:site" content='@inchbrick' />
        <meta property="og:url" content="https://inchbrick.com/" />
        <meta property="og:site_name" content="Inch & Brick Realty" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Inch & Brick Realty - Best Real Estate company in Dubai" />
        <meta property="og:description" content="Inchbrick Realty In one of the best Real Estate company in Dubai. Find your perfect Real Estate property in Dubai with the help of Inchbrick Realty." />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <meta property="og:image" content={`${process.env.API_URL}/common/logo.png`} />
        <meta name="twitter:image" content={`${process.env.API_URL}/common/logo.png`} />
        <link rel="canonical" href={`${process.env.DOMAIN}${meta?.slug && meta?.slug !== "home" ? `/${meta?.slug}` : ""}`} />
        <meta itemProp="name" content={meta?.title} />
        <meta itemProp="description" content={meta?.description} />
        <meta itemProp="image" content={`${process.env.API_URL}/common/logo.png`} />
        <meta itemProp="url" content={`${process.env.DOMAIN}${meta?.slug && meta?.slug !== "home" ? `/${meta?.slug}` : ""}`} />
        {/* <script type="application/ld+json"  dangerouslySetInnerHTML={{ __html: JSON.stringify(WebsiteSchema)}}/> */}
      </Head>
      <Model id="login" title="Login" />
      <Model id="signup" title="Sign Up" />
      <Model id="forget" title="Forget Password" />
      <Model id="valid_Otp" title="Validate OTP" />
      <Model id="reset_pass" title="Reset Password" />
      <TriggerModal />
      <TriggerBtn />
      <div className={isHome ? "home-navbar" : ""}>
        <Navbar />
      </div>
      <main>{children}</main>
      <Footer latestBlog={latestBlog} />
      <style jsx global>{`
        .home-navbar .navbar {
          background: transparent !important;
          transition: background 0.3s ease;
        }
        .home-navbar .sticky-top {
          background: transparent !important;
        }
          @media (max-width: 600px) {
            
          }
      `}</style>
    </>
  )
}

export default Website