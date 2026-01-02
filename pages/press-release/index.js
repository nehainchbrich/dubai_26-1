import React from 'react';
import Website from '../layouts/website';
import CommonBanner from '@/components/website/common/CommonBanner';
import PrCard from '@/components/website/press-release/PrCard';
import { fetchData, fetchPress } from '@/config/fetchApi';
import API_URLS from '@/config/apiconfig';

const Index = ({ press, meta }) => {
  return (
    <>
      <CommonBanner title="Press Release" meta={meta} />
      <div className='container my-5'>
        <div className='row'>
          {/* Use pressData here */}
          {press && press.map((data, index) => (
            <div className='col-md-3 mb-3' key={index}>
              <PrCard data={data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;

Index.getLayout = function getLayout(page) {
  const { props } = page;
  return <Website meta={props.meta}>{page}</Website>;
};
export const getServerSideProps = async () => {
  const press = await fetchPress({ status: 1 });
  const meta = await fetchData(API_URLS.META, { slug: 'press-release', columns: 'title,description,thumbnail,slug' });
  return {
    props: { press, meta: meta.data[0] || null }
  }
}