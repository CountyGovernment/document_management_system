import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * @desc component used to display the document form
 */
const DocumentForm = ({ document, onSave, onChange, saving }) =>
  (<div className="container">
    <div className="row">
      <div className="col s12 m12">
        <div className="card">
          <div className="card-image" />
          <div className="card-content">
            <form>
              <div className="row">
                <h5 className="col l1 m1 s12">Title:</h5>
                <div className="input-field col l7 m7 s12">
                  <input
                    name="title"
                    type="text"
                    value={document.title}
                    onChange={onChange}
                    placeholder="Document title goes here"
                  />
                </div>

                <div className="row">
                  <h5 className="col l1 m1 s12">Access:</h5>
                  <div className="input-field col l3 m1 s12">
                    <select
                      className="browser-default"
                      value={document.access}
                      onChange={onChange}
                    >
                      <option value="">Choose your option</option>
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                      <option value="role">Role</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <h5 className="col l1 m1 s12">Content:</h5>
                <div className="input-field">
                  <textarea
                    rows="100"
                    name="content"
                    id="content"
                    value={document.content}
                    onChange={onChange}
                    className="materialize-textarea"
                    placeholder="Enter your document content here"
                  />
                </div>
              </div>

              <input
                id="saveDocument"
                type="submit"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                className="btn btn-primary"
                onClick={onSave}
              />

              <Link to="/dashboard" className="right btn red">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>);

/**
 * @desc Set the PropTypes
 */
DocumentForm.propTypes = {
  document: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
};

export default DocumentForm;
