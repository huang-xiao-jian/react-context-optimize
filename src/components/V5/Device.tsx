/**
 * @description - device information
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// packages
import React from 'react';
import { Alert } from 'antd';
// internal
import { useTrackContext } from './compound-context';

function Device() {
  const payload = useTrackContext();

  const message = `The browser viewport width: ${payload.width}, height: ${payload.height}, Celebration!`;

  return <Alert message={message} />;
}

export default Device;
