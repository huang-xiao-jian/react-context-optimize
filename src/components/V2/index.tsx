/**
 * @description - v1 route
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React from 'react';
// internal
import { StatisticProvider, DimensionProvider } from './compound-context';
import Device from './Device';
import Statistics from './Statistics';

// scope
function V2() {
  return (
    <StatisticProvider>
      <DimensionProvider>
        <Device />
        <Statistics />
      </DimensionProvider>
    </StatisticProvider>
  );
}

export default V2;
