import React from 'react';
import PropTypes from 'prop-types';

/**
 * @desc component used to display the document actionBar
 */
const DocumentSearch = ({ onViewAccessChange,
    sitewide, onSearchChange }) =>
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
                  placeholder="Search documents"
                />
                <i className="material-icons">close</i>
              </div>
            </form>
          </div>
        </div>
      </div>);

/**
 * @desc Set the PropTypes
 */
DocumentSearch.propTypes = {
  onViewAccessChange: PropTypes.func,
  sitewide: PropTypes.string,
  onSearchChange: PropTypes.func,
};

export default DocumentSearch;
