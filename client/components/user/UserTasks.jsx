import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import * as userActions from '../../actions/UserActions';

/**
 * @desc component used to display the user tasks
 * @class UserTasks
 * @extends {Component}
 */
class UserTasks extends Component {
  /**
   * Creates an instance of AllUsers.
   * @param {any} props property of component
   * @param {any} context property of component
   * @returns {*} no return value
   * @memberof AllUsers
   */
  constructor(props, context) {
    super(props, context);

    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * @desc handles the user profile delete
   * @param {any} event html event
   * @returns {*} no return value
   */
  deleteUser(event) {
    event.preventDefault();
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to undo this!!!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, GO AHEAD!',
      timer: 5000,
      closeOnConfirm: false,
    }, (isConfirm) => {
      if (isConfirm) {
        this.props.actions.deleteUser(this.props.userId)
        .then(() =>
          swal('Deleted!', 'The selected profile has been deleted.', 'success'),
        )
        .catch(() =>
          swal('Cancelled', 'Unable to delete user profile', 'error'),
        );
      } else {
        swal('Cancelled', 'The user profile is safe :)', 'error');
      }
    });
  }

  /**
   * React Render
   * @return {object} html
   */
  render() {
    return (
      <span>
        <Link
          to={`/users/${this.props.userId}`}
          className="waves-effect waves-light btn #1b5e20 green darken-4"
        >Edit
        </Link>
        &nbsp;&nbsp;
        <a className="waves-effect waves-light btn red darken-4"
          onClick={this.deleteUser}
        >Delete
        </a>
      </span>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
UserTasks.propTypes = {
  userId: PropTypes.number,
  actions: PropTypes.object.isRequired,
};

/**
 *
 * @param {any} state
 * @returns {*} props
 */
const mapStateToProps = state => ({
  loggedInID: state.isAuth.loggedInUser.id,
  loggedInUserDocuments: state.loggedInUserDocuments,
});

/**
 * @param {any} dispatch
 * @returns {any} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTasks);
