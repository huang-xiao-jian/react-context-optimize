// packages
import React, { Fragment } from 'react';
import { Statistic } from 'antd';
// internal
import { useTrackContext } from './compound-context';

function Statistics() {
  const payload = useTrackContext();

  return (
    <Fragment>
      <Statistic title="Active Clicks" value={payload.click} />
      <Statistic title="Active Keypress" value={payload.keypress} />
    </Fragment>
  );
}

export default Statistics;
