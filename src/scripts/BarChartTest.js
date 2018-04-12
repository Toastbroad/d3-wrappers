// Imports
import BarChart from '../components/barchart';
import VotingInformation from './VotingInformation';
import * as d3 from 'd3';

class BarChartTest { // extends d3WrapperTest or something like that ???

	constructor() {
		this.options = {
			standalone: false, // this is important if you run it at runtime !!!
			transitionDuration: 500,
			svg: {
				contextClass: 'svg__bar-chart--runtime',
				height: 550,
				backgroundColor: '#f7f7f7'
			},
			xKey: 'State',
			yKey: 'TotalPopulation'

		};
	}

	/**
	 * Initialize the view
	 *
	 */
	initialize() {
        this.barChart = new BarChart(this.options);
        this.barChart.initialize();
		
		this.fetchData().then(data => {
            data = data.filter(d => d.Year == "2012");
			this.barChart.addData(data);
			this.barChart.displayChart();
			
			this.renderSelect(data);
			this.attachClickHandler()
		});
        
        this.barChart.chartContainer.querySelector('select').addEventListener('change', (e) => {
			this.barChart.setYKey(e.target.value);
			this.barChart.renderData();
		});
	}

	fetchData() {
		return new Promise((resolve, reject) => {
			resolve(VotingInformation);
		});
	}

	renderSelect(data) {
        d3.select('select').selectAll("option")
			.data(Object.keys(data[0]).filter(d => (d !== 'Year' && d !== 'State')))
			.enter().append("option")
			.attr("value", function(d){
				return d;
			})
			.text(function(d){
				return d;
			})
	}

	attachClickHandler() {
		d3
			.select(this.barChart.chartContainer)
			.selectAll('rect')
			.on('click', (d) => {
				alert(this.barChart.yKey + " of " + d[this.barChart.xKey] + ': ' + d[this.barChart.yKey]);
			});
	}
}

export default BarChartTest;