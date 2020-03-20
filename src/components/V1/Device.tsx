/**
 * @description - device information
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React, { useContext } from 'react';
import { Alert } from 'antd';
// internal
import { CompoundContext } from './compound-context';

function Device() {
  const { width, height } = useContext(CompoundContext);

  const message = `The browser viewport width: ${width}, height: ${height}, Celebration!`;

  return <Alert message={message} />;
}

export default Device;
