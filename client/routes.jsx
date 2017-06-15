import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App.jsx';
import Four0Four from './components/common/Four0Four.jsx';

export default (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="404" component={Four0Four} />
    </div>
  </Router>
);
