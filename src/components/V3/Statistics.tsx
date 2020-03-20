// packages
import React, { Fragment, useContext, useMemo } from 'react';
import { Statistic } from 'antd';

// internal
import { CompoundContext } from '../V1/compound-context';

function Statistics() {
  const { click, keypress } = useContext(CompoundContext);

  return useMemo(
    () => (
      <Fragment>
        <Statistic title="Active Clicks" value={click} />
        <Statistic title="Account Balance (CNY)" value={keypress} />
      </Fragment>
    ),
    [click, keypress]
  );
}

export default Statistics;
