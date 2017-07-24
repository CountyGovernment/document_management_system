import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Login from './components/main/Sigin';
import Dashboard from './components/main/Dashboard';
import SignupPage from './components/main/SignUp';
import AllUsers from './components/user/AllUsers';
import EditUserProfile from './components/user/EditUserProfiles';
import AllDocuments from './components/document/AllDocuments';
import ManageDocument from './components/document/ManageDocuments';
import requireAuth from './utils/RequireAuthentication';
import requireAdminRole from './utils/RequireAdminRole';

export default (
  <Router>
    <div>
      <App>
        <Switch>
          <Route path="/users/:id" component={requireAuth(EditUserProfile)} />
          <Route path="/users" component={requireAuth(AllUsers)} />
          <Route path="/documents" component={requireAuth(AllDocuments)} />
          <Route path="/document/:id" component={requireAuth(ManageDocument)} />
          <Route path="/document" component={requireAuth(ManageDocument)} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/dashboard" component={requireAuth(Dashboard)} />
          <Route path="/" component={Login} />
        </Switch>
      </App>
    </div>
  </Router>
);
