import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class Header extends Component {
  render() {
    const linkColor = {
      color: 'white',
      fontSize: 20,
    };
    return (
      <div>
        <nav>
          <MuiThemeProvider>
            <AppBar
              title="Shelf"
            >
              <Link style={linkColor} to="/dashboard">Dashboard</Link>&nbsp;
              <Link to="/users" style={linkColor}>Users</Link>&nbsp;
              <Link style={linkColor} to="/documents">All Documents</Link>&nbsp;
              <Link style={linkColor} to="/login">Login</Link>&nbsp;
              <Link style={linkColor} to="/signup">Signup</Link>&nbsp;
              <Link style={linkColor} to="/document">Document</Link>
            </AppBar>
          </MuiThemeProvider>
        </nav>
      </div>
    );
  }
}

export default Header;
