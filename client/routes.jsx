import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import App from './components/App.jsx';
import Four0Four from './components/common/Four0Four.jsx';
import Login from './components/home/signin.jsx';
import Dashboard from './components/home/dashboard.jsx';
import SignupPage from './components/home/signup.jsx';
import AllUsers from './components/user/allusers.jsx';
import EditUserProfile from './components/user/edituserprofiles.jsx';
import requireAuth from './utils/requireAuthentication';
import requireAdminRole from './utils/requireAdminRole';
// import SignupForm from './components/home/signupform';

export default (
  <Router>
    <div>
      <Route exact path="/" component={Dashboard} />
      <Route path="404" component={Four0Four} />
      <Route path="signup" component={SignupPage} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="login" component={Login} />
      <Route path="users" component={requireAdminRole(AllUsers)} />
      <Route path="user/:id" component={requireAuth(EditUserProfile)} />
    </div>
  </Router>
);
