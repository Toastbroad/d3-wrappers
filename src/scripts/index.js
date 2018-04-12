'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';

import BarChartTest from './BarChartTest';

const test = new BarChartTest();
console.log('initializing barcharttest');
test.initialize();