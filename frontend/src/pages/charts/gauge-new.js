import React, { Component } from 'react'
import Chart from 'react-google-charts'
const gaugeData = [
//not all of them have to be used of course just a sample
  ['Label', 'Value'],
  ['Memory', 80],
  ['CPU', 55],
  ['Network', 68],
]
function GaugeChart(props) {
 
    return (
      <div className="container mt-5">
        <h2>React Gauge Chart Example</h2>
         <Chart
                width={600}
                height={140}
                chartType="Gauge"
                loader={<div>Loading Chart</div>}
                data={gaugeData}
                options={{
                  redFrom: 90,
                  redTo: 100,
                  yellowFrom: 75,
                  yellowTo: 90,
                  minorTicks: 5,
                }}
                rootProps={{ 'data-testid': '1' }}
              />
      </div>
    )
  }

export default GaugeChart