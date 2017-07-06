import React from 'react';

/**
 * @return {*} render the footer component
 *
 * @param {*}footer
*/
function Footer(footer) {
  return (
    <footer className="page-footer">
      <div className="footer-copyright">
        <div className="container">
          <p className="copyright text-muted">
                        Made with <span className="red">&#x2764;</span> by Julie Wanja.
  Hosted on <a href="https://github.com/jm-wanja/document_management_system.git">
                            Github</a>.Copyright &copy; Julie. M. Wanja, 2017 | All rights reserved
        </p>
        </div>
      </div>
    </footer>);
}

export default Footer;
