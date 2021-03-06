import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import toastr from 'toastr';

/**
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */
export default function (ComposedComponent) {
  class RequireAuth extends Component {

    constructor(props) {
      super(props);

      this.state = {
        redirect: false,
      };
    }

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        toastr.error('You need to login to access this page');
        this.setState({ redirect: true });
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        <Redirect to="/login" />;
      }
    }

    redirectToLogin() {
      this.setState({ redirect: true });
    }

    render() {
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  /**
   * @desc Set the PropTypes
   */
  RequireAuth.propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
  };

  /**
   *
   * @param {any} state
   * @returns {boolean} isAuthenticated
   * @returns {*} isAdmin
   */
  const mapStateToProps = state => ({
    isAuthenticated: state.isAuth.isAuthenticated,
  });

  return connect(mapStateToProps)(RequireAuth);
}
