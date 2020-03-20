/**
 * @description - develop web page component
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// external
import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// internal
import V1 from './components/V1';
import V2 from './components/V2';
import V3 from './components/V3';
import V4 from './components/V4';
import V5 from './components/V5';
import './App.pcss';

// scope
function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/v1" component={V1} />
          <Route path="/v2" component={V2} />
          <Route path="/v3" component={V3} />
          <Route path="/v4" component={V4} />
          <Route path="/v5" component={V5} />
          <Redirect to="/v1" />
        </Switch>
      </BrowserRouter>
  );
}

export default hot(module)(App);
