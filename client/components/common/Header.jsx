import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/UserActions';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };

    this.onLogout = this.onLogout.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.redirect && this.state.redirect) {
      this.setState({ redirect: false });
    }
  }

  onLogout(event) {
    event.preventDefault();
    this.props.userActions.logout();
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    const linkColor = {
      color: 'white',
      fontSize: 20,
    };
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper">&nbsp;
            <a href="#" className="brand-logo"> SHELFDMS </a>
            <ul className="right hide-on-med-and-down">
              <li><a href="sass.html"><Link style={linkColor} to="/dashboard"> My Dashboard</Link></a></li>
              <li><a href="badges.html"><Link style={linkColor} to="/document">Create a Document</Link></a></li>
              <li><a href="collapsible.html"><Link style={linkColor} to="/documents">All Documents</Link></a></li>
              <li><a href="sass.html">{this.props.isAdmin === 'admin' ? <Link to="/users" style={linkColor}> All Users</Link> : '' }</a></li>
              <li><a href="collapsible.html">{this.props.isAuthenticated === true ? <Link style={linkColor} to="#" onClick={this.onLogout}>Logout</Link> : '' }</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    isAuthenticated: state.isAuth.isAuthenticated,
    isAdmin: state.isAuth.loggedInUserRole,
  });
};

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
