import React from 'react'
import ReactSpeedometer from 'react-d3-speedometer'

const styles = {
  dial: {
    display: 'inline-block',
    width: `300px`,
    height: `auto`,
    color: '#000',
    border: '0.5px solid #fff',
    padding: '2px',
  },
  title: {
    fontSize: '2em',
    color: '#000',
    marginBottom: 20,
  },
}

const Speedometer = ({ id, value, title }) => {
  return (
    <div style={styles.dial}>
      <div style={styles.title}>{title}</div>
      <ReactSpeedometer
        maxValue={100}
        minValue={0}
        height={250}
        width={290}
        value={value}
        needleTransition='easeQuadIn'
        needleTransitionDuration={1000}
        needleColor='red'
        startColor='green'
        segments={10}
        endColor='blue'
      />
    </div>
  )
}

export default Speedometer
