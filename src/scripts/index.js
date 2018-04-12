'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'babel-polyfill';

import { test } from './test';
import BarChartTest from './BarChartTest';
console.log(test("THIS IS A TEST"));
const bcTest = new BarChartTest();
console.log('initializing test');
bcTest.initialize();