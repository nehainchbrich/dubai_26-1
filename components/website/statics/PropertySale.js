import React from 'react'
import Chart from 'react-google-charts';
const PropertySale = () => {
  const data = [
    ['Task', '2022'],
    ['Below 1M', 32],
    ['1-2M', 35],
    ['2-3M', 14],
    ['3-5M', 11],
    ['More than 5M', 8],
  ];
  const data1 = [
    ['Task', '2023'],
    ['Below 1M', 35],
    ['1-2M', 27],
    ['2-3M', 19],
    ['3-5M', 11],
    ['More than 5M', 9],
  ];
  return (
    <>
      <div className='container'>
        <h4 className='text-center section-title'>Property Sales By Price-Range</h4>
        <div className='row'>
          <div className='col-md-6'>
            <Chart chartType="PieChart" loader={<div>Loading Chart</div>} data={data}
              options={{
                title: 'TOTAL SALES TRANSACTIONS-2022', titleTextStyle: {
                  color: '#333',
                }, backgroundColor: 'transparent',
                tooltip: {
                  isHtml: true,
                  textStyle: { color: '#333' },
                  showColorCode: false,
                }, slices: {
                  0: { color: '#00AAA9' },
                  1: { color: '#c5a059' }, // Changed from #fff to gold
                  2: { color: '#4FFBDF' },
                  3: { color: '#FEFEDF' },
                  4: { color: '#845EC2' },
                },
                pieSliceTextStyle: { color: '#fff', bold: true, },
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
                pieHole: 0.5,
                responsive: true,
                width: '500px', // Set the width of the chart
                height: '400px',
              }} />
          </div>
          <div className='col-md-6'>
            <Chart chartType="PieChart" loader={<div>Loading Chart</div>} data={data1}
              options={{
                title: 'TOTAL SALES TRANSACTIONS-2023', titleTextStyle: {
                  color: '#333',
                }, backgroundColor: 'transparent',
                tooltip: {
                  isHtml: true,
                  textStyle: { color: '#333' },
                  showColorCode: false,
                }, slices: {
                  0: { color: '#00AAA9' },
                  1: { color: '#c5a059' }, // Changed from #fff to gold
                  2: { color: '#4FFBDF' },
                  3: { color: '#FEFEDF' },
                  4: { color: '#845EC2' },
                },
                pieSliceTextStyle: { color: '#fff', bold: true, },
                legend: {
                  textStyle: {
                    color: '#333',
                  },
                },
                pieHole: 0.5,
                chartArea: {
                  left: '5%',   // Adjust the margins within the chart area
                  top: '10%',
                  width: '70%', // Set the width of the chart area
                  height: '80%', // Set the height of the chart area
                },
                responsive: true,
                width: '500px', // Set the width of the chart
                height: '400px',
              }} />
          </div>
        </div>
      </div>
      <style>
        {`
             .section-title{
              font-size: 25px;
              font-weight: bolder;
              border: 4px solid;
              border-image: var(--two-side-border);
              padding: 10px;
             }
             `}
      </style>
    </>
  )
}

export default PropertySale
