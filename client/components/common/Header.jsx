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
              <Link to="/" style={linkColor}>
                Home
              </Link>&nbsp;
              <Link style={linkColor} to="/documents">Documents</Link>
            </AppBar>
          </MuiThemeProvider>
        </nav>
      </div>
    );
  }
}

export default Header;
