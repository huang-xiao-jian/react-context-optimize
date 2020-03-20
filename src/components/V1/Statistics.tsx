// packages
import React, { Fragment, useContext } from 'react';
import { Statistic } from 'antd';
// internal
import { CompoundContext } from './compound-context';

function Statistics() {
  const { click, keypress } = useContext(CompoundContext);

  return (
    <Fragment>
      <Statistic title="Active Clicks" value={click} />
      <Statistic title="Active Keypress" value={keypress} />
    </Fragment>
  );
}

export default Statistics;
