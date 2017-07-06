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
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">&nbsp;
            <a href="#!" className="brand-logo"> SHELFDMS </a>
            <ul className="right hide-on-med-and-down">
              <li><a href="sass.html"><Link style={linkColor} to="/dashboard"> My Dashboard</Link></a></li>
              <li><a href="badges.html"><Link style={linkColor} to="/document">Create a Document</Link></a></li>
              <li><a href="collapsible.html"><Link style={linkColor} to="/documents">All Documents</Link></a></li>
              <li><a href="sass.html"><Link to="/users" style={linkColor}> All Users</Link></a></li>
              <li><a href="collapsible.html"><Link style={linkColor} to="#" onClick={this.onLogout}>Logout</Link></a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});
export default connect(null, mapDispatchToProps)(Header);
