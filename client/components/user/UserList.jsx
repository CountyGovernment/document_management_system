import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import UserTasks from './UserTasks';

/**
 * @desc component used to display the list of users
 */
const UserList = ({ user, roles }) =>
  (<div className="col s12 m6 l4">
    <div className="card medium hoverable z-depth-5">
      <div className="card-content">
        <h4>{user.username}</h4>
        <hr />
        <div className="col s12 light">
          <b>FirstName:</b> {user.firstName}
        </div>
        <div className="col s12 light">
          <b>SecondName:</b> {user.secondName}
        </div>
        <div className="col s12 light">
          <b>Email:</b> {user.email}
        </div>
        <div className="col s12 light">
          <b>Joined on:</b> {user.createdAt.slice(0, 10)}
        </div>
      </div>
      <div className="card-action">
        <UserTasks userId={user.id} />
      </div>
    </div>
  </div>)
;

/**
 * @desc Set the PropTypes
 */
UserList.propTypes = {
  user: PropTypes.object.isRequired,
  roles: PropTypes.array,
};

/**
 *
 * @param {any} state
 * @param {any} ownProps
 * @returns {*} props
 */
const mapStateToProps = state => ({
  roles: state.roles,
});

export default connect(mapStateToProps)(UserList);
