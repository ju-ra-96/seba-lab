import React, { useState } from 'react'
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

    console.log(name)
    elem['name'] = name
    incomingData[name].map((data) => {
      elem[data.cluster] = data.load
    })
    console.log(elem)
    data_to_display.push(elem)
  }

  console.log(data_to_display)

  // Sample data
  const data = data_to_display
  const colors = ['green', 'blue', 'black', 'yellow', 'brown', 'red']

  return (
    <ResponsiveContainer width={700} height={250}>
      <RadarChart height={500} width={500} outerRadius='80%' data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey='name' />
        <PolarRadiusAxis />
        {Object.keys(data[0]).map((label, index) => {
          if (index > 0) {
            console.log(label, index)
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
