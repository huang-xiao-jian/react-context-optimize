// packages
import React, { Fragment, useContext } from 'react';
import { Statistic } from 'antd';
// internal
import { StatisticContext } from './compound-context';

function Statistics() {
  const { click, keypress } = useContext(StatisticContext);

  return (
    <Fragment>
      <Statistic title="Active Clicks" value={click} />
      <Statistic title="Active Keypress" value={keypress} />
    </Fragment>
  );
}

export default Statistics;
