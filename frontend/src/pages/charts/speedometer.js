import React from 'react'
import ReactSpeedometer from 'react-d3-speedometer'
import { Link } from 'react-router-dom'

const styles = {
  dial: {
    display: 'inline-block',
    width: `300px`,
    color: '#000',
    border: '0.5px solid #fff',
    padding: '2px',
  },
  title: {
    fontSize: '1.5em',
    color: '#000',
    marginBottom: 20,
  },
}

const Speedometer = ({ id, value, title, clusterName }) => {
  return (
    <div style={styles.dial}>
      <div style={styles.title}>
        {' '}
        <Link to={`/dashboard/${clusterName}`}>{title}</Link>
      </div>

      <ReactSpeedometer
        maxValue={100}
        minValue={0}
        height={250}
        width={290}
        value={value}
        needleTransition='easeQuadIn'
        needleTransitionDuration={1000}
        needleColor='blue'
        startColor='green'
        segments={10}
        endColor='red'
      />
    </div>
  )
}

export default Speedometer
