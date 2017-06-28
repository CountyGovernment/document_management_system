import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import DocumentTasks from './DocumentTasks';

/**
 * @desc component used to display the list of documents
 */
class DocumentList extends Component {
  render() {
    return (
      <div className="col s12 m6 l4">
        <div className="card medium hoverable z-depth-5">
          <div className="card-content">
            <h4>{this.props.document.title}</h4>
            <hr />
            <div className="col s12 light">
              <b>Content:</b>{this.props.document.content.slice(0, 200)}
            </div>
            <div className="col s12 light">
              <b>Published on:</b> {this.props.document.createdAt.slice(0, 10)}
            </div>
            <div className="col s12 light">
              <b>Access:</b> {this.props.document.access}
            </div>
          </div>
          <div className="card-action">
            <DocumentTasks
              loggedInUserID={this.props.loggedInUserID}
              documentId={this.props.document.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * @desc Set the PropTypes
 */
DocumentList.propTypes = {
  document: PropTypes.object.isRequired,
  loggedInUserID: PropTypes.number,
};

export default DocumentList;
