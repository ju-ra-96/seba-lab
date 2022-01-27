import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import AWS from 'aws-sdk'

import { Consumer } from 'sqs-consumer'

AWS.config.update({ accessKeyId: '', secretAccessKey: '', region: 'us-east-1' })

const AlertNotify = () => {
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

  console.log(alert)
  console.log(app.isRunning)

  useEffect(() => {
    app.start()
    console.log(app.isRunning)
    return () => {
      app.stop()
      setAlert({})
      console.log('deleted all and stoped')
    }
  }, [])

  return (
    <div>
      <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  )
}

export default AlertNotify
