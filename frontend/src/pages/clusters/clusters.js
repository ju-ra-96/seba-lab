import React, { useEffect, useState } from 'react'
import Cluster from '../../components/cluster/cluster'
import axios from 'axios'
import useStore from '../../services/useStore'
import { ToastContainer, toast } from 'react-toastify'

import { Consumer } from 'sqs-consumer'
import AWS from 'aws-sdk'

import './clusters.css'

AWS.config.update({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY, region: 'us-east-1' })

const Clusters = () => {
  const clusters = useStore((state) => state.clusters)
  const setClusters = useStore((state) => state.setClusters)
  const deleteDialogState = useStore((state) => state.deleteDialogState)
  const createDialogState = useStore((state) => state.createDialogState)

  const [alert, setAlert] = useState({})

  const app = Consumer.create({
    queueUrl: 'https://sqs.eu-central-1.amazonaws.com/704085658970/alert-queue',
    handleMessage: async (message) => {
      console.log(message)
      console.log('data inside')
      const alertObj = fromStringToJson(message.Body)
      setAlert(alertObj)
      toast.configure()
      toast.warn(alertObj.groupLabels.alertname)
    },
    sqs: new AWS.SQS(),
  })
  app.on('error', (err) => {
    console.error(err.message)
  })

  app.on('processing_error', (err) => {
    console.error(err.message)
  })

  const fromStringToJson = (message) => {
    const jsonObj = JSON.parse(message)
    return jsonObj
  }

  const getClusters = async (e) => {
    const axiosConfig = {
      Headers: {
        'Content-Type': 'application/json',
      },
    }
    await axios
      .get('http://localhost:8000/api/cluster/getClusters', axiosConfig)
      .then((res) => {
        setClusters(res.data.map((cluster) => <Cluster key={cluster.id} id={cluster.id} name={cluster.name} config={cluster.config} />))
      })
      .catch((e) => {
        toast.configure()
        toast.error('Error getting the clusters')
      })
  }

  console.log(alert)
  console.log(app.isRunning)

  useEffect(() => {
    app.start()
    console.log(app.isRunning)

    getClusters()
  }, [createDialogState, deleteDialogState])

  return (
    <>
      <div className='clusters-page'>{clusters}</div>
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  )
}

export default Clusters
