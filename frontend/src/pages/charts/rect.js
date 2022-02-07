
import { useRef, useEffect,useState } from 'react';
import * as React from 'react';
import * as d3 from 'd3';


const sample = [
        {cluster:'Cluster 1', load: 40},
        {cluster:'Cluster 2', load: 151},
        {cluster:'Cluster 3', load: 89},
        {cluster:'Cluster 4', load: 124}
]


const Chart = () => {

	const d3Chart = useRef()
	// Ref for updating dimention 
	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight
	})
	// Ref for resize event update
	const update = useRef(false)

	useEffect(()=>{

		// wait for resize
		window.addEventListener('resize', ()=>{
			setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
			})

			// If resize, remove the previous chart
			if(update.current){
				d3.selectAll('g').remove()
			} else {update.current = true}
		})

		// Draw chart 
		DrawChart(sample,dimensions)

	},[dimensions])

	const margin = {top: 50, right:30, bottom: 30, left:60}

	function DrawChart(data, dimensions){

		// set dims

		const chartwidth = parseInt(d3.select('#d3demo').style('width')) - margin.left - margin.right
		const chartheight = parseInt(d3.select('#d3demo').style('height')) - margin.top - margin.bottom


		const svg = d3.select(d3Chart.current)
						.attr('width', dimensions.bandwidth + margin.left + margin.right)
						.attr('height', dimensions.bandwidth + margin.top + margin.bottom)

		// x 
		const x = d3.scaleBand()
					.domain(d3.range(data.length))
					.range([margin.left, chartwidth - margin.right])
					.padding(0.1)

		svg.append('g')
			.attr('transform', 'translate(0,'+ chartheight + ')')
			.call(d3.axisBottom(x).tickFormat(i=>data[i].cluster).tickSizeOuter(0))

		const max = d3.max(data, function(d){return d.load})

		// y 
		const y = d3.scaleLinear()
					.domain([0, max])
					.range([chartheight, margin.top])

		svg.append('g')
			.attr('transform', 'translate(' + margin.left + ',0)')
			.call(d3.axisLeft(y))

		// Draw
		svg.append('g')
			.attr('fill','#1976d2')
			.selectAll('rect')
			.data(data)
			.join('rect')
				.attr('x', (d,i) => x(i))
				.attr('y', d => y(d.load))
				.attr('height', d=>y(0)-y(d.load))
				.attr('width', x.bandwidth())
	}

	return (
		<div id='d3demo'>
		  <svg className='charts' ref={d3Chart}></svg>
		</div>
	)
}

export default Chart
