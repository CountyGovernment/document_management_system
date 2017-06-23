import React from 'react';
// import { Route, IndexRoute } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Login from './components/main/Login';
import Dashboard from './components/main/Dashboard';
import SignupPage from './components/main/SignUp';
import AllUsers from './components/user/AllUsers';
import EditUserProfile from './components/user/EditUserProfiles';
import AllDocuments from './components/document/alldocuments';
import ManageDocument from './components/document/ManageDocuments';
import FourOFour from './components/common/Four0Four';
// import requireAuth from './utils/requireAuthentication';
// import requireAdminRole from './utils/requireAdminRole';
// import DocumentList from './components/document/DocumentList';

export default (
  <Router>
    <div>
      <App>
        <Switch>
          <Route path="/users" component={AllUsers} />
          <Route path="/user/:id" component={EditUserProfile} />
          <Route path="/documents" component={AllDocuments} />
          {/* <Route path="/document" component={ManageDocument} />*/}
          <Route path="/document/:id" component={ManageDocument} />
          <Route path="/signup" component={SignupPage} />
          <Route path="404" component={FourOFour} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      </App>
    </div>
  </Router>
);
