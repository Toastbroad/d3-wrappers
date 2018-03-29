'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';

import BarChart from '../components/barchart';

const barChart = new BarChart();

barChart.initialize();