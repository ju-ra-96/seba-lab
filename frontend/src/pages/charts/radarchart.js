import React, { useState } from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const Radarchart = ({ cpu, ram, disk }) => {
  console.log(ram)
  console.log(cpu)
  console.log(disk)

  const [dataToDisplay, setDataToDisplay] = useState([{}])
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

  //   [
  //     { name: 'CPU', cluster1: -21, cluster2: 31 },
  //     { name: 'RAM', cluster1: -22, cluster2: 100 },
  //     { name: 'DISK', cluster1: -32, cluster2: 22 },
  //     /* { name: 'D', x: -14, y: -21 },
  //         { name: 'E', x: -51, y: -44 },
  //         { name: 'F', x: 16, y: 12 },
  //         { name: 'G', x: 7, y: 2 },
  //         { name: 'H', x: -8, y: -9 },
  //         { name: 'I', x: 9, y: 4 }, */
  //   ]

  return (
    <ResponsiveContainer width={700} height={250}>
      <RadarChart height={500} width={500} outerRadius='80%' data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey='name' />
        <PolarRadiusAxis />
        {/* {
            data_to_display[0].map(data => {
                <Radar dataKey={data[]} stroke='green' fill='green' fillOpacity={0.5} />
            })
        } */}
        <Radar dataKey='cluster1' stroke='green' fill='green' fillOpacity={0.5} />
        <Radar dataKey='cluster2' stroke='blue' fill='blue' fillOpacity={0.5} />
        <Legend />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default Radarchart
