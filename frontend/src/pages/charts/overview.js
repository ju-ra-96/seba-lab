import * as React from 'react'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import LineChart from './line'
import Radarchart from './radarchart'
import Speedometer from './speedometer'
import BubbleLoader from '../loader/BubbleLoader'
import useStore from '../../services/useStore'
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
      let updated_data = []
      console.log(metrics)
      for (var cluster_name of Object.keys(metrics)) {
        updated_data.push({ cluster: cluster_name, load: Math.abs(Number(metrics[cluster_name].result[0].value[1])) })
      }
      setCpuMetrics(updated_data)
    })

    ioClient.on('CPU_over_time', (metrics) => {
      setCpuMetricsChunk(metrics)
    })

    ioClient.on('RAM', (metrics) => {
      let updated_data = []

      for (var cluster_name of Object.keys(metrics)) {
        updated_data.push({ cluster: cluster_name, load: Math.abs(Number(metrics[cluster_name].result[0].value[1])) })
      }
      setRamMetrics(updated_data)
    })

    ioClient.on('RAM_over_time', (metrics) => {
      let updated_data_chunk = []

      for (var cluster_name of Object.keys(metrics)) {
        updated_data_chunk.push({ cluster: cluster_name, values: metrics[cluster_name].result[0].values })
      }
      setRamMetricsChunk(updated_data_chunk)
    })

    ioClient.on('Disk', (metrics) => {
      let updated_data = []

      for (var cluster_name of Object.keys(metrics)) {
        updated_data.push({ cluster: cluster_name, load: Math.abs(Number(metrics[cluster_name].result[0].value[1])) })
      }
      setDiskMetrics(updated_data)
    })

    ioClient.on('Disk_over_time', (metrics) => {
      let updated_data_chunk = []

      for (var cluster_name of Object.keys(metrics)) {
        updated_data_chunk.push({ cluster: cluster_name, values: metrics[cluster_name].result[0].values })
      }
      setDiskMetricsChunk(updated_data_chunk)
    })

    return () => {}
  }, [])

  return cpuMetrics.length === 0 || ramMetrics.length === 0 || diskMetrics.length === 0 ? (
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
          fontFamily: 'Monospace',
        }}
      >
        <h3>Welcome to the SAP dashboard and happy monitoring!</h3>
      </div>

      <Box display='flex' justifyContent='center' alignItems='center'>
        {cpuMetrics.map((metric, index) => (
          <Item key={index} style={{ height: 330 }}>
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
          <Item key={index} style={{ height: 330 }}>
            <Speedometer clusterName={metric.cluster} title={'RAM of ' + metric.cluster} value={metric.load} />
          </Item>
        ))}
      </Box>

      <Box display='flex' justifyContent='center' alignItems='center'>
        {diskMetrics.map((metric, index) => (
          <Item key={index} style={{ height: 330 }}>
            <Speedometer style={{ margin: 'auto' }} clusterName={metric.cluster} title={'Disk of ' + metric.cluster} value={metric.load} />
          </Item>
        ))}
        {diskMetricsChunk.length > 0 && (
          <Item>
            <LineChart name={'Disk'} resourcesMetrics={diskMetricsChunk} />
          </Item>
        )}
      </Box>

      <Box display='flex' justifyContent='center' alignItems='center'>
        <Item>
          <Radarchart ram={ramMetrics} cpu={cpuMetrics} disk={diskMetrics} />
        </Item>
      </Box>
    </div>
  )
}
