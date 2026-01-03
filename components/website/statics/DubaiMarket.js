import React from 'react'
import Chart from 'react-google-charts';
const DubaiMarket = () => {
  const data = [
    ['Task', 'TOTAL SALES TRANSACTIONS'],
    ['READY TO MOVE', 13204],
    ['OFFPLAN', 17694]
  ];
  return (
    <>

      <div className='container'>
        <h4 className='text-center section-title'>DUBAI REAL ESTATE MARKET INCREASED BY 50.6% IN Q1 2023 AS COMPARED TO Q1 2022</h4>
        <div className='row'>
          <div className='col-md-6'>
            <Chart className="chart" chartType="PieChart" loader={<div>Loading Chart</div>} data={data}
              options={{
                title: 'TOTAL SALES TRANSACTIONS', titleTextStyle: {
                  color: '#333',
                  fontSize: 19,  // Increase the title font size
                  bold: true,  // Change the title color to red
                },
                backgroundColor: 'transparent',
                tooltip: {
                  isHtml: true,
                  textStyle: { color: '#333' },
                  showColorCode: false,
                }, slices: {
                  0: { color: '#00aaa9' }, // Customize the color of the first slice (READY TO MOVE)
                  1: { color: '#c5a059' }, // Customize the color of the second slice (OFFPLAN) - Changed from #fff to gold
                },
                legend: {
                  textStyle: {
                    color: '#333',
                    fontSize: 16,
                    bold: true // Change the legend text color to blue
                  },
                },
                pieSliceTextStyle: { color: '#fff', bold: true, }, // Changed slice text to white for contrast on colored slices
                chartArea: {
                  left: '5%',   // Adjust the margins within the chart area
                  top: '10%',
                  width: '70%', // Set the width of the chart area
                  height: '80%', // Set the height of the chart area
                },
                responsive: true,
                width: '500px', // Set the width of the chart
                height: '600px',
                is3D: true,
              }} />
          </div>
          <div className='col-md-6'>
            <p>Dubai is moving upwards, and only upwards, surpassing other global real estate destinations. With the official sales figures indicated a strong performance in 2022, the Dubai property market is expected to
              continue the same trend this year. In 2023, Dubai’s prime sector is expected to continue its domination with the highest prime price growth globally, leaving behind bigwigs, such as Miami and Paris, according to Knight escalate in the next five years with an estimated growth of 22 per cent.</p>
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
             .dubai_market p {
              font-size: 24px;
              margin-top: 100px;
              line-height: 1.5;
          }
             `}
      </style>
    </>
  )
}

export default DubaiMarket
