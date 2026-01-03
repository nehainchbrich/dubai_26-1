import Image from 'next/image';
import React from 'react'
import Chart from 'react-google-charts';
const OffPlan = () => {
    const offPlan = [
        ['Property Type', '2022', '2023'],
        ['Commercial', 83, 70],
        ['Villa', 3835, 4076],
        ['Apartment', 6954, 13548],
    ];
    return (
        <>
            <div className='container off_plan my-5'>
                <h4 className='text-center section-title'>OFF-PLAN SALES TRANSACTION REPORT Q1 2023</h4>
                <div className='row'>
                    <div className='col-md-6'>
                        <p>According to DLD, overall sales transaction increased by 50.6% as he report stated that the of offplan properties in by 62.7%.</p>
                        <Image src={`${process.env.API_URL}/common/static-icons.png`} width={1200} height={900} className='img-fluid' />
                    </div>
                    <div className='col-md-5'>
                        <Chart
                            chartType="ColumnChart" // Use "ColumnChart" for vertical bar chart
                            loader={<div>Loading Chart</div>}
                            data={offPlan}
                            options={{
                                backgroundColor: 'transparent',
                                legend: {
                                    textStyle: {
                                        color: '#333', // Changed from #fff to dark
                                    },
                                },
                                tooltip: {
                                    isHtml: true,
                                    textStyle: { color: '#333', bold: true },
                                    showColorCode: false,
                                },
                                hAxis: {
                                    textStyle: {
                                        color: '#333', // Changed from #fff
                                        bold: true
                                    },
                                    gridlines: {
                                        color: 'transparent',
                                    },
                                },
                                vAxis: {
                                    textStyle: {
                                        color: '#333', // Changed from #fff
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
                                colors: ['#c5a059', '#00aaa9'], // Changed #fff to gold for visibility
                                width: '550px',
                                height: '400px',
                            }}
                        />

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
             .off_plan p {
              font-size: 24px;
              margin-top: 50px;
              line-height: 1.5;
          }
             `}
            </style>
        </>
    )
}

export default OffPlan
