import React, { PropTypes } from 'react';

/**
 * @desc component used to display the user action bar
 */
const UserSearch = ({ onSearchChange }) =>
      (<div className="card-panel">
        <div className="row">
          <div className="col l1 m1 s1">
            <h5>Search:</h5>
          </div>
          <div className="col l6 m5 s12">
            <form>
              <div className="input-field">
                <input
                  id="search"
                  type="search"
                  onKeyUp={onSearchChange}
                  placeholder="Search UserName"
                />
                <i className="material-icons">search</i>
              </div>
            </form>
          </div>
        </div>
      </div>);

/**
 * @desc Set the PropTypes
 */
UserSearch.propTypes = {
  onSearchChange: PropTypes.func,
};

export default UserSearch;
