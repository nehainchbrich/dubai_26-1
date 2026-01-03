import React from 'react'
import Chart from 'react-google-charts';
const TopArea = () => {
  const top_5 = [
    ['Task', ''],
    ['JUMEIRAH LAKE TOWERS', 3184],
    ['JUMEIRAH VILLAGE CIRCLE', 7759],
    ['DUBAI CREEK HARBOUR', 3605],
    ['BUSINESS BAY', 5342],
    ['DUBAI MARINA', 6192],
  ];
  return (
    <>
      <div className='container topArea my-5'>
        <h4 className='text-center section-title'>TOP 5 PERFORMING AREAS OF DUBAI 2023 ( SALES VOLUME )</h4>
        <div className='row'>
          <div className='col-md-6'>
            <p>The government has a lot in store for development in Dubai. This not only includes the construction of new roads to connect far-off areas but several new attractions as well.As per Q1 2023, Jumeirah lake towers is ranking first with 3184 sales transactions till now whereas Dubai Marina registered as top with sales value of AED 7895M</p>
          </div>
          <div className='col-md-6'>
            <Chart chartType="PieChart" loader={<div>Loading Chart</div>} data={top_5}
              options={{
                title: 'TOTAL SALES TRANSACTIONS', titleTextStyle: {
                  color: '#333',
                }, backgroundColor: 'transparent',
                tooltip: {
                  isHtml: true,
                  textStyle: { color: '#333' },
                  showColorCode: false,
                }, slices: {
                  0: { color: '#4FFBDF' },
                  1: { color: '#FEFEDF' },
                  2: { color: '#00AAA9' },
                  3: { color: '#845EC2' },
                  4: { color: '#c5a059' }, // Changed from #fff to gold
                },
                pieSliceTextStyle: { color: '#fff', bold: true, }, // Changed to white
                legend: {
                  textStyle: {
                    color: '#333',
                  },
                },
                chartArea: {
                  left: '5%',   // Adjust the margins within the chart area
                  top: '10%',
                  width: '70%', // Set the width of the chart area
                  height: '80%', // Set the height of the chart area
                },
                responsive: true,
                width: '500px', // Set the width of the chart
                height: '400px',
                is3D: true,
              }} />
          </div>
        </div>
      </div>
      <style>
        {`
             .section-title{
              font-size: 25px;
              font-weight: bolder;
              border: 6px solid;
              border-image: var(--two-side-border);
              padding: 10px;
             }
             .topArea p {
              font-size: 24px;
              margin-top: 50px;
              line-height: 1.5;
          }
             `}
      </style>
    </>
  )
}

export default TopArea
