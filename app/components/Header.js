import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import styles from './Header.css';

const logoSrc = '../images/logo_with_text.png';

const NavLink = ({ isIndex, to, children }) => (isIndex ?
  (<IndexLink to={to} className={styles.link} activeClassName="active">{children}</IndexLink>) :
  (<Link to={to} className={styles.link} activeClassName="active">{children}</Link>)
);
NavLink.propTypes = {
  isIndex: PropTypes.bool,
  to: PropTypes.string.isRequired,
  children: PropTypes.string
};

class Header extends Component {
  static propTypes = {
    navigationVisible: PropTypes.bool,
    toggle: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  };

  render() {
    const { navigationVisible, toggle, close } = this.props;
    return (
      <div className="container">
        <img className={styles.logo} alt="Open Sprints Logo" src={logoSrc} />
        <div className="pull-right">
          <div className={styles['drop-down-container']} onClick={toggle}>
            <div className={styles['nav-icon']}>
              <i className="material-icons md-36">menu</i>
            </div>
            {navigationVisible ? (
              <div className={styles['drop-down']} onMouseLeave={close}>
                <div className={styles.list}>
                  <NavLink isIndex to="/">Home</NavLink>
                  <NavLink to="/roster">roster</NavLink>
                  <NavLink to="/default-settings">default settings</NavLink>
                </div>
              </div>
            ) : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
