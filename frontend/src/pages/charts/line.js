import React from 'react'
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Linechart(props) {
  const resourcesMetricsChunk = props.resourcesMetrics

  let data_to_display = []

  for (let i = 0; i < resourcesMetricsChunk[0].values.length; i++) {
    let element = {}
    resourcesMetricsChunk.map((metric, index) => {
      if (resourcesMetricsChunk[index].values.length > i) {
        let time = new Date(metric.values[i][0] * 1000).toTimeString().slice(0, 5)

        if (index === 0) {
          element['time'] = time
        }

        element[metric.cluster] = metric.values[i][1]
      }
    })

    data_to_display.push(element)
  }

  const colors = ['#0095FF', '#FF0000', '#379732', '#ff9200', '#828E9A', '#244a51', '#f0e68c']

  return (
    <div style={{ width: '100%' }}>
      <h4
        style={{
          fontSize: '1.5em',
          color: '#000',
          textAlign: 'center',
        }}
      >
        {props.name} usage
      </h4>
      <LineChart width={700} height={250} data={data_to_display} margin={{ top: 5, right: 20, left: 20, bottom: 10 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='time' />
        <YAxis />
        <Tooltip />
        <Legend />
        {resourcesMetricsChunk.map((metric, index) => (
          <Line type='monotone' dataKey={metric.cluster} stroke={colors[index]} />
        ))}
      </LineChart>
    </div>
  )
}

export default Linechart
