import React, { useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import AWS from 'aws-sdk'

import { Consumer } from 'sqs-consumer'

AWS.config.update({ accessKeyId: '', secretAccessKey: '', region: 'us-east-1' })

const AlertNotify = () => {
  const app = Consumer.create({
    queueUrl: 'https://sqs.eu-central-1.amazonaws.com/704085658970/alert-queue',
    handleMessage: async (message) => {
      console.log(message)

      const alertObj = fromStringToJson(message.Body)

      console.log(alertObj)
      if (alertObj.groupLabels.severity === 'error') {
        toast.error(<Msg alertObj={alertObj} />, {
          position: 'top-right',
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
        })
      } else {
        toast.warn(<Msg alertObj={alertObj} />, {
          position: 'top-right',
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          closeButton: false,
        })
      }
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

  console.log(app.isRunning)

  const Msg = ({ alertObj }) => (
    <div>
      <h2>Severity: {alertObj.groupLabels.severity}</h2>
      <h4>Cluster: {alertObj.groupLabels.cluster}</h4>
      <h5>Alert: {alertObj.groupLabels.alertname}</h5>
      <br />
      <label>Summary: </label>
      <p> {alertObj.commonAnnotations.summary} </p>
    </div>
  )

  useEffect(() => {
    app.start()
    console.log(app.isRunning)
    return () => {
      app.stop()
      console.log('deleted all and stoped')
    }
  }, [])

  return (
    <div>
      <ToastContainer />
    </div>
  )
}

export default AlertNotify
