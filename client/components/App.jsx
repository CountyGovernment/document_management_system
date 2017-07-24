import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './common/Header';
import SignUp from './main/SignUp';
import Login from './main/Sigin';
import Footer from './common/Footer';

class App extends Component {
  render() {
    return (
      <div className="container-fluid #f5f5f5 grey lighten-4">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
