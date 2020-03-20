/**
 * @description - device information
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React, { useContext, useMemo } from 'react';
import { Alert } from 'antd';
// internal
import { CompoundContext } from '../V1/compound-context';

function Device() {
  const { width, height } = useContext(CompoundContext);

  return useMemo(() => {
    const message = `The browser viewport width: ${width}, height: ${height}, Celebration!`;

    return <Alert message={message} />;
  }, [width, height]);
}

export default Device;
