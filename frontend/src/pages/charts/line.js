import React from 'react'
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function Linechart(props) {
  console.log(props.cpuMetrics)

  let met = []

  for (var cluster_name of Object.keys(props.cpuMetrics)) {
    met.push({ cluster: cluster_name, load: Math.abs(Number(props.cpuMetrics[cluster_name].result[0].value[1])), time: props.cpuMetrics[cluster_name].result[0].value[0] })
    //console.log('Result part is ', metrics[cluster_name].result[0].value[1]);
  }
  console.log(met[0].time)

  console.log(new Date(met[0].time * 1000))

  const data = [
    {
      time: new Date(met[0].time * 1000).toDateString().split(' ')[1],
      remote_cluster: met[0].load,
      catena_cluster: met[0].load + 50,
    },
    {
      time: new Date(met[0].time * 2000).toDateString().split(' ')[1],
      remote_cluster: met[0].load + 100,
      catena_cluster: met[0].load + 150,
    },
    {
      time: new Date(met[0].time * 3000).toDateString().split(' ')[1],
      remote_cluster: met[0].load - 100,
      catena_cluster: met[0].load + 200,
    },
    // {
    //   name: 'Feb 2019',
    //   'Product A': 2342,
    //   'Procuct B': 3246,
    // },
    // {
    //   name: 'Mar 2019',
    //   'Product A': 4565,
    //   'Procuct B': 4556,
    // },
    // {
    //   name: 'Apr 2019',
    //   'Product A': 6654,
    //   'Procuct B': 4465,
    // },
    // {
    //   name: 'May 2019',
    //   'Product A': 8765,
    //   'Procuct B': 4553,
    // },
  ]

  return (
    <div style={{ width: '100%' }}>
      <h4>A demo of cpu usage in time series</h4>
      <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='time' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type='monotone' dataKey='remote_cluster' stroke='#0095FF' />
        <Line type='monotone' dataKey='catena_cluster' stroke='#FF0000' />

        {/* <Line type='monotone' dataKey='Procuct B' stroke='#FF0000' /> */}
      </LineChart>
    </div>
  )
}

export default Linechart
