// packages
import React, { Fragment } from 'react';
import { Statistic } from 'antd';

// internal
import { useSelector } from './compound-context';

function Statistics() {
  const { click, keypress } = useSelector((state) => ({
    click: state.click,
    keypress: state.keypress,
  }));

  return (
    <Fragment>
      <Statistic title="Active Clicks" value={click} />
      <Statistic title="Active Keypress" value={keypress} />
    </Fragment>
  );
}

export default Statistics;
