/**
 * @description - v3 route
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React from 'react';
// internal
import { Provider } from './compound-context';
import Device from './Device';
import Statistics from './Statistics';

// scope
function V3() {
  return (
    <Provider>
      <Device />
      <Statistics />
    </Provider>
  );
}

export default V3;
