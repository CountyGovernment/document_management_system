import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @desc component used to display the document actionBar
 */
const DocumentSearch = ({ redirectToAllDocuments, onSearchChange }) =>
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
            {/* <Link
              to={"/documents"}
              className="waves-effect waves-light btn #1b5e20 green darken-4"
            >Close
        </Link> */}
            <a
              onClick={redirectToAllDocuments}
              className="waves-effect waves-light btn #1b5e20 green darken-4"
            >
              <i className="material-icons">close</i>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>);

/**
 * @desc Set the PropTypes
 */
DocumentSearch.propTypes = {
  onSearchChange: PropTypes.func,
};

export default DocumentSearch;
