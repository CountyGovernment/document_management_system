import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import SignUp from './main/SignUp';
import Login from './main/Login';
import Footer from './common/Footer';

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
        {/*<Login />*/}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
