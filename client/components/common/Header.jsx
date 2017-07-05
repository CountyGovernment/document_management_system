import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import * as userActions from '../../actions/userActions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(event) {
    event.preventDefault();
    this.props.userActions.logout();
    this.setState({ redirect: true });
  }

  redirectToLogin() {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }
    const linkColor = {
      color: 'white',
      fontSize: 20,
    };
    return (
      <div>
        <nav>
          <MuiThemeProvider>
            <AppBar
              title="Shelf"
            >
              <Link style={linkColor} to="/dashboard">Dashboard</Link>&nbsp;
              <Link to="/users" style={linkColor}>Users</Link>&nbsp;
              <Link style={linkColor} to="/documents">All Documents</Link>&nbsp;
              <Link style={linkColor} to="/login">Login</Link>&nbsp;
              <Link style={linkColor} to="/signup">Signup</Link>&nbsp;
              <Link style={linkColor} to="/document">Document</Link>&nbsp;
              <Link style={linkColor} to="#" onClick={this.onLogout}>Logout</Link>&nbsp;
            </AppBar>
          </MuiThemeProvider>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});
export default connect(null, mapDispatchToProps)(Header);
