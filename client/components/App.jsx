/*
    ./client/components/App.jsx
*/
import React, { PropTypes } from 'react';
import Header from './common/Header.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;