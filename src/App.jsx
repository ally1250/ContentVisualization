import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NormalDistribution from './components/Graphs/NormalDistribution';
import SignificanceLevel from './components/Graphs/SignificanceLevel';
import TTest from './components/Graphs/T-Test';
import Lesson from './components/Lesson';

function App() {
  return (
    <Router>
      <Route
        path="/increase-sd"
        component={() => <NormalDistribution startSD={1} endSD={2} />}
      />
      <Route
        path="/increase-sample-size"
        component={() => <NormalDistribution startSD={2} endSD={1} />}
      />
      <Route
        path="/significance-level"
        component={SignificanceLevel}
      />
      <Route
        path="/two-side-t-test"
        component={TTest}
      />
      <Route
        path="/one-side-t-test"
        component={() => <TTest displayLeft={false} />}
      />
      <Route
        path="/lesson"
        component={() => (<Lesson />)}
      />
    </Router>
  );
}

export default App;
