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
  constructor(props, context) {
    super(props, context);
    this.state = {
      navigationVisible: false
    };
  }

  toggleNav() {
    const { navigationVisible } = this.state;
    this.setState({ navigationVisible: !navigationVisible });
  }

  closeNav() {
    this.setState({ navigationVisible: false });
  }

  render() {
    const { navigationVisible } = this.state;
    const intermission = undefined;
    return (
      <div className="container">
        <img className={styles.logo} alt="Open Sprints Logo" src={logoSrc} />
        <div className="pull-right">
          <div className={styles.intermission}>
            {intermission ? (
              <button className="btn btn-primary btn-xs">End Intermission</button>
            ) : (
              <button className="btn btn-default btn-xs">Intermission</button>
            )}
          </div>
          <div className={styles['drop-down-container']} onClick={() => this.toggleNav()}>
            <div className={styles['nav-icon']}>
              <i className="material-icons md-36">menu</i>
            </div>
            {navigationVisible ? (
              <div className={styles['drop-down']} onMouseLeave={() => this.closeNav()}>
                <div className={styles.list}>
                  <NavLink isIndex to="/">Home</NavLink>
                  <NavLink to="/roster">roster</NavLink>
                  <NavLink to="/default-settings">default settings</NavLink>
                  <NavLink to="/race-preview/0">Pre-Race Review</NavLink>
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
