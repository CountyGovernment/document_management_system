import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
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

    constructor(props) {
      super(props);

      this.state = {
        redirect: false,
      };
    }

    /**
     * @desc Performs tasks before the component mounts.
     */
    componentWillMount() {
      const isAuthenticated = this.props.isAuthenticated;
      let isAdmin;
      if (this.props.isAdmin !== 1) {
        toastr.error('Unauthorized Access Denied. You need to be an admin to access this page.');
        this.setState({ redirect: true });
      }
    }

    /**
     * @desc Performs tasks before the component mounts.
     * @param {any} nextProps the next set of props for the component
     */
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        <Redirect to="/dashboard" />;
      }
    }

    redirectToDashboard() {
      this.setState({ redirect: true });
    }

    render() {
      const { redirect } = this.state;
      if (redirect) {
        return <Redirect to="/dashboard" />;
      }
      return <ComposedComponent {...this.props} />;
    }
  }

  /**
   * @desc Set the PropTypes
   */
  RequireAuth.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isAdmin: PropTypes.number,
  };

  /**
   *
   *
   * @param {any} state
   * @returns {boolean} isAuthenticated
   * @returns {*} isAdmin
   */
  const mapStateToProps = (state) => {
    return ({
      isAuthenticated: state.isAuth.isAuthenticated,
      isAdmin: state.isAuth.loggedInUser.data,
    });
  };

  return connect(mapStateToProps)(RequireAuth);
};
