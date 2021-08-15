import React from 'react';
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './modules/home/home'
import SideNavBar from './shared/components/navbar/side-navbar';

function App() {
  return (
    <>
      <Router>
        <div>
          <SideNavBar />
        </div>
        {/* <Switch>
          <Route component={Home} exact path="/" />
        </Switch> */}
      </Router>
    </>
  );
}

export default App;
