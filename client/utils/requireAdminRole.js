import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';

/**
 *
 * @export
 * @param {any} ComposedComponent
 * @returns {any}
 */
export default (ComposedComponent) => {
  class RequireAuth extends React.Component {
    /**
     * @desc Performs tasks before the component mounts.
     */
    componentWillMount() {
      const isAuthenticated = this.props.isAuthenticated;
      let isAdmin;
      if (isAuthenticated) {
        isAdmin = this.props.isAdmin.roleId;
      } else {
        isAdmin = 0;
      }

      if (isAdmin !== 1) {
        toastr.error('Unauthorized Access Denied.');
        browserHistory.push('/dashboard');
      }
    }

    /**
     * @desc Performs tasks before the component mounts.
     * @param {any} nextProps the next set of props for the component
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        browserHistory.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  /**
   * @desc Set the PropTypes
   */
  RequireAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.object,
  };

  /**
   * @desc Set the contextTypes
   */
  RequireAuth.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  /**
   *
   *
   * @param {any} state
   * @returns {boolean} isAuthenticated
   * @returns {*} isAdmin
   */
  const mapStateToProps = state => ({
    isAuthenticated: state.isAuth.isAuthenticated,
    isAdmin: state.isAuth.loggedInUser,
  });

  return connect(mapStateToProps)(RequireAuth);
};
