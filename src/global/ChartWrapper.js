import { merge } from 'lodash';

class ChartWrapper {
	constructor(defaultOptions, options) {
		if (!defaultOptions && !options) {
			console.error('no options provided');
			return;
		}

		if (typeof this.displayChart !== 'function') {
			console.error('no displayChart provided');
			return;
		}

		this.options = merge(defaultOptions, options);
	}

	initialize() {
		this.chartContainer = document.querySelector(this.options.chartContainer);
		if (this.options.standalone) {
			this.addData();
			this.displayChart();
		}
	}

	setXKey(key) {
		this.checkKey(key);
		this.xKey = key;
		this.xData = this.data.map(d => d[this.xKey]);
	}

	setYKey(key) {
		this.checkKey(key);
		this.yKey = key;
		this.yData = this.data.map(d => +d[this.yKey]);
	}

	addData(data = this.options.data) {
		if (typeof data === 'undefined') {
			throw new Error('The data you have passed is undefined!');
		}

		this.data = data;

		if (this.options.xKey || this.options.yKey) {
			this.keys = Object.keys(data[0]);

			this.options.xKey && this.setXKey(this.options.xKey);
			this.options.yKey && this.setYKey(this.options.yKey);
		}
	}

	checkKey(key) {
		if (this.keys.constructor !== Array) {
			throw new Error('No data keys defined.')
		}

		let keyExists = this.keys.indexOf(key) !== -1;

		if (!keyExists) {
			throw new Error(`The key "${key}" you have provided is not available in the data.`);
		}
	}

	getDefaultWidth() {
		if (!!this.chartContainer) {
			return this.chartContainer.offsetWidth;
		} else {
			console.error('No chart container found. ' +
				'Specify a selector or add a div with the default "data-js-item=\"chart\".')
		}
	}
}

export default ChartWrapper;

