import * as React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import LineChart from './line'
import Radarchart from './radarchart'
import data from './data'
import Speedometer from './speedometer'
import BubbleLoader from '../loader/BubbleLoader'
const io = require('socket.io-client')

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
  const [cpuMetricsChunk, setCpuMetricsChunk] = useState([])
  const [ramMetrics, setRamMetrics] = useState([])
  const [ramMetricsChunk, setRamMetricsChunk] = useState([])
  const [diskMetrics, setDiskMetrics] = useState([])
  const [diskMetricsChunk, setDiskMetricsChunk] = useState([])

  useEffect(() => {
    const ioClient = io.connect('http://localhost:4000', { transports: ['websocket'] })

    ioClient.on('CPU', (metrics) => {
      console.log('Got CPU metrics: ', metrics)
      let updated_data = []

      for (var cluster_name of Object.keys(metrics)) {
        updated_data.push({ cluster: cluster_name, load: Math.abs(Number(metrics[cluster_name].result[0].value[1])) })
        console.log('Result part is ', metrics[cluster_name].result[0].value[1], cluster_name)
      }
      setCpuMetrics(updated_data)
    })

    ioClient.on('CPU_over_time', (metrics) => {
      console.log('CPU_over_time metrics: ', metrics)
      let updated_data_chunk = []

      metrics.result
        .filter((result) => result.metric.cluster_name)
        .map((result) => {
          updated_data_chunk.push({ cluster: result.metric.cluster_name, values: result.values })
          console.log('Result part is overtime ', updated_data_chunk)
        })
      setCpuMetricsChunk(updated_data_chunk)
    })

    ioClient.on('RAM', (metrics) => {
      console.log('Got RAM metrics: ', metrics)
      let updated_data = []

      for (var cluster_name of Object.keys(metrics)) {
        updated_data.push({ cluster: cluster_name, load: Math.abs(Number(metrics[cluster_name].result[0].value[1])) })
        console.log('Result part is ', metrics[cluster_name].result[0].value[1], cluster_name)
      }
      setRamMetrics(updated_data)
    })

    ioClient.on('RAM_over_time', (metrics) => {
      console.log('RAM_over_time metrics: ', metrics)
      let updated_data_chunk = []

      for (var cluster_name of Object.keys(metrics)) {
        updated_data_chunk.push({ cluster: cluster_name, values: metrics[cluster_name].result[0].values })
        console.log('RAMResult part is ', metrics)
      }
      console.log(updated_data_chunk)
      setRamMetricsChunk(updated_data_chunk)
    })

    ioClient.on('Disk', (metrics) => {
      console.log('Got Disk metrics: ', metrics)
      let updated_data = []

      for (var cluster_name of Object.keys(metrics)) {
        updated_data.push({ cluster: cluster_name, load: Math.abs(Number(metrics[cluster_name].result[0].value[1])) })
        console.log('Result part is ', metrics[cluster_name].result[0].value[1], cluster_name)
      }
      setDiskMetrics(updated_data)
    })

    ioClient.on('Disk_over_time', (metrics) => {
      console.log('Disk_over_time metrics: ', metrics)
      let updated_data_chunk = []

      for (var cluster_name of Object.keys(metrics)) {
        updated_data_chunk.push({ cluster: cluster_name, values: metrics[cluster_name].result[0].values })
        console.log('Disk Result part is ', metrics)
      }
      console.log(updated_data_chunk)
      setDiskMetricsChunk(updated_data_chunk)
    })

    return () => {}
  }, [])

  return cpuMetrics.length === 0 ? (
    <BubbleLoader />
  ) : (
    <div
      style={{
        padding: 20,
        marginBottom: 50,
      }}
    >
      <div
        style={{
          color: '#00B9F2',
          fontSize: '3em',
          fontWeight: 'bold',
          justifyContent: 'center',
          margin: 40,
          textAlign: 'center',
        }}
      >
        Welcome to the SAP dashboard and happy monitoring!
      </div>

      <Box display='flex' justifyContent='center' alignItems='center'>
        {cpuMetrics.map((metric, index) => (
          <Item key={index}>
            <Speedometer clusterName={metric.cluster} title={'CPU of ' + metric.cluster} value={metric.load} />
          </Item>
        ))}
        {cpuMetricsChunk.length > 0 && (
          <Item>
            <LineChart name={'CPU'} resourcesMetrics={cpuMetricsChunk} />
          </Item>
        )}
      </Box>

      <Box display='flex' justifyContent='center' alignItems='center'>
        {ramMetricsChunk.length > 0 && (
          <Item>
            <LineChart name={'RAM'} resourcesMetrics={ramMetricsChunk} />
          </Item>
        )}
        {ramMetrics.map((metric, index) => (
          <Item key={index}>
            <Speedometer clusterName={metric.cluster} title={'RAM of ' + metric.cluster} value={metric.load} />
          </Item>
        ))}
      </Box>

      <Box display='flex' justifyContent='center' alignItems='center'>
        {diskMetrics.map((metric, index) => (
          <Item key={index}>
            <Speedometer clusterName={metric.cluster} title={'Disk of ' + metric.cluster} value={metric.load} />
          </Item>
        ))}
        {diskMetricsChunk.length > 0 && (
          <Item>
            <LineChart name={'Disk'} resourcesMetrics={diskMetricsChunk} />
          </Item>
        )}
      </Box>

      {/* <Item>
          <Radarchart />
        </Item>
        <Item>
          <AreaChart />
        </Item> */}
    </div>
  )
}
