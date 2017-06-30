import React from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import SignUp from './main/SignUp';
import Login from './main/Login';

class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        <Login />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
