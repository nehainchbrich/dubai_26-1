import React from 'react'
import Chart from 'react-google-charts';
const ReadyToMove = () => {
  const data = [
    ['Property Type', '2022', '2023'],
    ['Commercial', 659, 819],
    ['Villa', 1743, 1606],
    ['Apartment', 6363, 9374],
  ];
  return (
    <>

      <div className='container readyToMove'>
        <h4 className='text-center section-title'>READY TO MOVE SALES TRANSACTION REPORT Q1 2023</h4>
        <div className='row'>
          <div className='col-md-6'>
            <Chart
              chartType="ColumnChart" // Use "ColumnChart" for vertical bar chart
              loader={<div>Loading Chart</div>}
              data={data}
              options={{
                backgroundColor: 'transparent',
                legend: {
                  textStyle: {
                    color: '#333',
                  },
                },
                tooltip: {
                  isHtml: true,
                  textStyle: { color: '#333', bold: true },
                  showColorCode: false,
                },
                hAxis: {
                  textStyle: {
                    color: '#333',
                    bold: true
                  },
                  gridlines: {
                    color: 'transparent',
                  },
                },
                vAxis: {
                  textStyle: {
                    color: '#333',
                    bold: false,
                    fontSize: 15
                  },
                  gridlines: {
                    color: 'transparent',
                  },
                },
                chartArea: {
                  width: '70%',
                  height: '80%',
                },
                responsive: true,
                colors: ['#c5a059', '#00aaa9'],
                width: '550px',
                height: '400px',
              }}
            />
          </div>
          <div className='col-md-5'>
            <p>Similarly, there is 36.8% increase in overall sales transaction of ready to move in property in Dubai. Forecasts predict that the real estate sector will reach AED300 billion by the end of 2023.</p>
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
             .readyToMove p {
              font-size: 24px;
              margin-top: 50px;
              line-height: 1.5;
          }
             `}
      </style>
    </>
  )
}

export default ReadyToMove
