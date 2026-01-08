import React from 'react'
import Website from '../layouts/website'
import { fetchData } from '@/config/fetchApi'
import API_URLS from '@/config/apiconfig'
import Banner from '@/components/expo_new/Banner'
import Events from '@/components/expo_new/Events'
import Team from '@/components/expo_new/Team'
import Gallery from '@/components/expo_new/Gallery'
import VideoSection from '@/components/expo_new/Video'
import LightCreativeBlog from '@/components/website/home/LightCreativeBlog'
import RightSide from '@/components/website/blogs/RightSide'
import ExpoFrm from '@/components/website/expo/ExpoFrm'
import TrendingProjects from '@/components/website/home/TrendingProjects'


const Index = ({ developer, team, press, event, gallery, meta, blog, category, tags, trending }) => {
  return (
    <>
      <section>
        <Banner data={meta} developer={developer} event={event} />

        <div className="container-fluid" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div className="row">
            <div className="col-lg-9 col-md-12">


              {/* Show All Events (Active/Scheduled/Past) handled by the component */}
              <Events data={event} />
            </div>
            <div className="col-lg-3 col-md-12 mt-5 pe-lg-5">
              <div className="sticky-top" style={{ top: '120px', zIndex: 10 }}>
                <RightSide category={category} tags={tags} latestBlog={blog} />
              </div>
            </div>
          </div>
        </div>

        {/* Full width sections */}
        <TrendingProjects data={trending} />
        <Gallery data={gallery} />
        <VideoSection data={gallery} />
        {/* <Team data={team} /> */}
        {blog && blog.length > 0 && (
          <LightCreativeBlog data={blog} />
        )}
      </section>
      <style jsx>
        {`section{background:#fff;}`}
      </style>

    </>
  )
}

export default Index
Index.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
}

export const getServerSideProps = async () => {
  const trendingOption = { status: 1, limit: 6, "sort": "order:asc", columns: 'title,shortDesc,minAmount,maxAmount,thumbnail,slug,city,PCategory.title' };

  const event = await fetchData(API_URLS.EVENTDETAILS, { status: '!POSTPONED' });
  const developer = await fetchData(API_URLS.DEVELOPER, { status: 1 });
  const team = await fetchData(API_URLS.AGENT, { status: 1, is_agent: 1, "sort": "order:asc" });
  const press = await fetchData(API_URLS.PRESS, { status: 1, columns: 'logo,slug,title' });
  const gallery = await fetchData(API_URLS.EVENTFILE, { status: 1, limit: 15 });
  const meta = await fetchData(API_URLS.META, { slug: 'events', columns: 'title,description,thumbnail,slug' });
  const blog = await fetchData(API_URLS.BLOG, { status: 1, limit: 5, "category.title": '!News', columns: 'title,slug,shortDesc,thumbnail' });
  const category = await fetchData(API_URLS.BLOGCATEGORY, { status: 1 });
  const tags = await fetchData(API_URLS.BLOG_TAG, { status: 1 });
  const trending = await fetchData(API_URLS.PROPERTIES, trendingOption);

  return {
    props: {
      developer: developer.data,
      team: team.data,
      press: press.data,
      event: event.data,
      gallery: gallery.data,
      meta: meta.data[0] || null,
      blog: blog.data,
      category: category.data || [],
      tags: tags.data || [],
      trending: trending.data || []
    }
  }
}