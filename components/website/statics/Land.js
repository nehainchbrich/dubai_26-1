import React from 'react'
import Chart from 'react-google-charts';
const Land = () => {
    const data = [
        ['Task', ''],
        ['DUBAI', 1130],
        ['LOS ANGELES', 420],
        ['GENEVA', 398],
        ['LONDON AND SINGAPORE', 366],
        ['NEW YORK', 355],
        ['HONG KONG', 226],
        ['MONACO', 183]
    ];
    return (
        <>
            <div className='container'>
                <h4 className='text-center section-title'>HOW MUCH LAND YOU CAN GET AT 1MN IN DUBAI</h4>
                <div className='row my-5 land'>
                    <div className='col-md-12'>
                        <p>To put things in perspective, here’s the size of property you can get in luxury cities across the globe, with $1 million:</p>
                    </div>
                    <div className='col-md-5'>
                        <ul>
                            <li>Monaco: 183 sq. ft.</li>
                            <li>Hong Kong: 226 sq. ft.</li>
                            <li>New York: 355 sq. ft.</li>
                            <li>London and Singapore: 366 sq. ft.</li>
                            <li>Geneva: 398 sq. ft..</li>
                            <li>Los Angeles: 420 sq. ft.</li>
                            <li>Los Angeles: 420 sq. ft.</li>
                            <li>Dubai: 1,130 sq. ft.</li>
                        </ul>
                    </div>
                    <div className='col-md-7'>
                        <Chart
                            chartType="ColumnChart" // Use "BarChart" for horizontal bar chart
                            loader={<div>Loading Chart</div>}
                            data={data}
                            options={{
                                title: '',
                                backgroundColor: 'transparent',
                                tooltip: {
                                    isHtml: true,
                                    textStyle: { color: '#333' },
                                    showColorCode: false,
                                },
                                hAxis: {
                                    textStyle: {
                                        color: '#333', // Changed from #fff
                                        bold: true// Change the horizontal axis text color to blue
                                    },
                                    gridlines: {
                                        color: 'transparent', // Change the color of horizontal gridlines
                                    },
                                },
                                vAxis: {
                                    textStyle: {
                                        color: '#333', // Changed from #fff
                                        bold: false,
                                        fontSize: 15 // Change the vertical axis text color to green
                                    },
                                    gridlines: {
                                        color: 'transparent', // Change the color of horizontal gridlines
                                    },
                                },
                                chartArea: {
                                    left: '5%',   // Adjust the margins within the chart area
                                    top: '10%',
                                    width: '70%', // Set the width of the chart area
                                    height: '80%', // Set the height of the chart area
                                },
                                responsive: true,
                                colors: ['#00AAA9', '#FEFEDF'], // Set colors for 2022 and 2023 bars
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
             .land p {
                font-size: 24px;
                margin-top: 25px;
                line-height: 1.5;
            }
            .land ul li {
                font-size: 24px;
                margin-top: 25px;
                line-height: 1.5;
            }
             `}
            </style>
        </>
    )
}

export default Land
