import * as d3 from 'd3';
import './charts.css';
import React from 'react';

class Gauge extends React.Component {
	render() {
		const gaugeProps = {
			tau: 2 * Math.PI,
			radius: 80,
			padding: 30,
			amount: 75, // Adjust me
			total: 100, // Adjust me
		}
		
		gaugeProps.boxSize = (gaugeProps.radius + gaugeProps.padding) * 2;
		gaugeProps.ratio = gaugeProps.amount / gaugeProps.total;

		return ( 
			<section> 
				<h2 className="bx--graph-header">Usage</h2>
				<GaugeGraph {...gaugeProps} />
			</section>
			)
	}
}

class GaugeGraph extends React.Component {
	componentDidMount() {
		const { tau, radius, padding, amount, total, boxSize, ratio } = this.props;
		
		this.renderSVG(radius, boxSize, tau, ratio);
		this.renderText(amount, total);
	}
	
	renderSVG(radius, boxSize, tau, ratio) {
		// Transition function
		const arcTween = function(newAngle) {
			return function(d) {
				const interpolate = d3.interpolate(d.endAngle, newAngle);

				return function(t) {
					d.endAngle = interpolate(t);

					return arc(d);
				}
			}
		}
		
		// Arc function
		const arc = d3.arc()
			.innerRadius(radius)
			.outerRadius(radius - 10)
			.startAngle(0);
		
		// Initial SVG render
		this.svg = d3.select(this.refs.container)
			.attr('width', boxSize)
			.attr('height', boxSize)
			.append('g')
			.attr('transform', `translate(${boxSize / 2}, ${boxSize / 2})`);
		
		// Background Arc
		this.svg.append('path')
			.datum({ endAngle: tau })
			.style('fill', '#dfe3e6')
			.attr('d', arc);
		
		// Foreground Arc
		this.svg.append('path')
			.datum({ endAngle: 0 })
			.style('fill', '#00a68f')
			.transition()
			.duration(1000)
			.delay(1000)
			.attrTween('d', arcTween(ratio * tau));
		
	}
	
	renderText(amount, total) {
		// 	// Text Labels
		const amountText = d3.select('.amount');
		const totalText = d3.select('.total');
		amountText
			.style('opacity', 0)
			.transition()
			.duration(1000)
			.delay(1500)
			.style('opacity', 1)
			.text(`${amount}%`);

		totalText
			.style('opacity', 0)
			.transition()
			.duration(1000)
			.delay(1700)
			.style('opacity', 1)
			.text(`/${total}`);
	}
	
	render() {	
		return (
      <div className='gauge'>
			<div className="bx--graph-container">
				<svg ref="container"></svg>
				<div className="text">
					<p className="amount"></p>
				
				</div>
			</div>
      </div>
		)
	}
}


export default Gauge;