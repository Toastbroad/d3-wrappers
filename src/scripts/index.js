'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';
import BarChartTest from './BarChartTest';

console.log('initializing tests!!!');

if (document.getElementById('bar-chart')) {
	const bcTest = new BarChartTest();
	bcTest.initialize();
}
