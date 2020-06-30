import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NormalDistribution from './components/Graphs/NormalDistribution';
import SignificanceLevel from './components/Graphs/SignificanceLevel';
import TTest from './components/Graphs/T-Test';

function App() {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}
    >
      <div style={{ height: 400 }} />
      <nav style={{ position: 'absolute', top: 50 }}>
        <div><a href="/increase-sd">Standard Deviation Increasing</a></div>
        <div><a href="/increase-sample-size">Sample Size Increasing</a></div>
        <div><a href="/significance-level">Significance Level Increasing</a></div>
        <div><a href="/two-side-t-test">Two Sided T-Test</a></div>
        <div><a href="/one-side-t-test">One Sided T-Test</a></div>
      </nav>
      <div>Scroll down to animate.</div>
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
      </Router>
      <div style={{ height: 400 }} />
    </div>
  );
}

export default App;
