import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const Radarchart = ({ cpu, ram, disk }) => {
  const incomingData = {
    ram: ram,
    cpu: cpu,
    disk: disk,
  }

  let data_to_display = []

  for (var name of Object.keys(incomingData)) {
    let elem = {}

    elem['name'] = name
    incomingData[name].map((data) => {
      elem[data.cluster] = data.load
    })
    data_to_display.push(elem)
  }

  // Sample data
  const data = data_to_display
  const colors = ['green', 'blue', 'black', 'yellow', 'brown', 'red']

  return (
    <ResponsiveContainer width={1384} height={350}>
      <RadarChart height={500} width={500} outerRadius='80%' data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey='name' />
        <PolarRadiusAxis />
        {Object.keys(data[0]).map((label, index) => {
          if (index > 0) {
            return <Radar dataKey={label} stroke={colors[index]} fill={colors[index]} fillOpacity={0.5} />
          }
        })}
        <Legend />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default Radarchart
