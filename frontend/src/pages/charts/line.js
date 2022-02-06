import React from 'react'
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

function Linechart(props) {
  console.log(props.cpuMetrics)

  const cpuMetricsChunk = props.cpuMetrics

  let data_to_display = []

  for (let i = 0; i < cpuMetricsChunk[0].values.length; i++) {
    let element = {}
    cpuMetricsChunk.map((metric, index) => {
      if (cpuMetricsChunk[index].values.length > i) {
        console.log(new Date(metric.values[0][0] * 1000).toTimeString(), metric.cluster)

        let time = new Date(metric.values[i][0] * 1000).toTimeString().slice(0, 5)

        console.log(time, metric.cluster)
        if (index == 0) {
          element['time'] = time
        }

        element[metric.cluster] = metric.values[i][1]
        console.log('element', element)
      }
    })

    data_to_display.push(element)
  }

  const colors = ['#0095FF', '#FF0000', '#379732']

  return (
    <div style={{ width: '100%' }}>
      <h4>CPU usage</h4>
      <ResponsiveContainer width={700} height={250}>
        <LineChart data={data_to_display} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='time' />
          <YAxis />
          <Tooltip />
          <Legend />
          {cpuMetricsChunk.map((metric, index) => (
            <Line type='monotone' dataKey={metric.cluster} stroke={colors[index]} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Linechart
