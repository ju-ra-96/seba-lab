import * as React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Chart from './charts'
import Gauge from './gauge'
import Heatmap from './heatmap'
import LineChart from './line'
import Radarchart from './radarchart'
import Treemap from './treemap'
import AreaChart from './areachart'
import data from './data'
const io = require('socket.io-client')

// ioClient.on("CPU", (metrics) => {
//     console.log('Got CPU metrics: ', metrics);
// });

// ioClient.on("RAM", (metrics) => {
//     console.log('Got RAM metrics: ', metrics);
// });

// ioClient.on("Disk", (metrics) => {
//     console.log('Got Disk usage metrics: ', metrics);
// });

function Item(props) {
  const { sx, ...other } = props
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  )
}

Item.propTypes = {
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
}

export default function Graphs() {
  const [cpuMetrics, setCpuMetrics] = useState([])
  const [cpuGeneral, setCpuGeneral] = useState([])

  // ioClient.on("RAM", (metrics) => {
  //   console.log('Got RAM metrics: ', metrics);
  //   let updated_data = [];
  // 	for (var cluster_name of Object.keys(metrics)) {
  //     console.log(metrics[cluster_name].result);
  // 		//updated_data.push({cluster: cluster_name, load: Math.abs(Number(metrics[cluster_name].result[0].value[1]))});
  // 		//console.log('Result part is ', metrics[cluster_name].result[0].value[1]);
  // 	}
  // });

  useEffect(() => {
    const ioClient = io.connect('http://localhost:4000', { transports: ['websocket'] })

    ioClient.on('CPU', (metrics) => {
      console.log('Got CPU metrics: ', metrics)
      setCpuGeneral(metrics)
      let updated_data = []

      for (var cluster_name of Object.keys(metrics)) {
        updated_data.push({ cluster: cluster_name, load: Math.abs(Number(metrics[cluster_name].result[0].value[1])) })
        //console.log('Result part is ', metrics[cluster_name].result[0].value[1]);
      }
      setCpuMetrics(updated_data)
    })

    return () => {}
  }, [])

  return (
    <div
      style={{
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
        marginBottom: 50,
      }}
    >
      <div
        style={{
          color: 'white',
          fontSize: '30px',
          justifyContent: 'center',
          margin: 40,
        }}
      >
        Welcome to the SAP dashboard and happy monitoring{' '}
        <strong
          style={{
            marginLeft: 30,
          }}
        >
          ≧◠‿◠≦✌
        </strong>{' '}
      </div>

      <Box display='grid' justifyContent='center' alignItems='center'>
        {cpuMetrics.map((metric, index) => (
          <Item key={index}>
            <Gauge name={'CPU of ' + metric.cluster} metric={metric.load} />
          </Item>
        ))}
      </Box>
      {cpuMetrics.map((metric, index) => (
        <Item>
          <LineChart cpuMetrics={cpuGeneral} />
        </Item>
      ))}

      <Item>
        <Radarchart />
      </Item>
      <Item>
        <AreaChart />
      </Item>
    </div>
  )
}
