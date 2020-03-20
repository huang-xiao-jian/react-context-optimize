/**
 * @description - device information
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React from 'react';
import { Alert } from 'antd';

// internal
import { useSelector } from './compound-context';

function Device() {
  const { width, height } = useSelector((state) => ({
    width: state.width,
    height: state.height,
  }));

  const message = `The browser viewport width: ${width}, height: ${height}, Celebration!`;

  return <Alert message={message} />;
}

export default Device;
