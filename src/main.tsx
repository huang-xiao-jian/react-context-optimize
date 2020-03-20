/**
 * @description - just render real time component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React from 'react';
import { render } from 'react-dom';

// internal
import App from './App';

// scope
const container = document.querySelector('.main');

render(<App />, container);
