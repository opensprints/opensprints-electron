import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.css';

const logoSrc = '../images/logo.png';

const NavLink = ({ to, children }) => (
  <Link to={to} className={styles.link} activeClassName="active">{children}</Link>
);
NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string
};

class Header extends Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      navigationVisible: false
    };
  }

  navigateToIntermission() {
    const { history } = this.props;
    history.push('/intermission');
    return false;
  }

  navigateBack() {
    const { history } = this.props;
    history.goBack();
    return false;
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
    const { location } = this.props;
    const intermission = location.pathname === '/intermission';
    return (
      <div className={`container ${styles.container}`}>
        <img className={styles.logo} alt="Open Sprints Logo" src={logoSrc} />
        <div className="pull-right">
          <div className={styles.intermission}>
            {intermission ? (
              <button
                className="btn btn-primary"
                onClick={() => { this.navigateBack(); }}
              >
                End Intermission
              </button>
            ) : (
              <button
                className="btn btn-default"
                onClick={() => { this.navigateToIntermission(); }}
              >
                Intermission
              </button>
            )}
          </div>
          <div className={styles['drop-down-container']} onClick={() => this.toggleNav()}>
            <div className={styles['nav-icon']}>
              <i className="material-icons md-36">menu</i>
            </div>
            {navigationVisible ? (
              <div className={styles['drop-down']} onMouseLeave={() => this.closeNav()}>
                <div className={styles.list}>
                  <NavLink to="/">Home</NavLink>
                  <NavLink to="/roster">Roster</NavLink>
                  <NavLink to="/default-settings">Default Settings</NavLink>
                  <NavLink to="/race-preview/0">Race Preview</NavLink>
                  <NavLink to="/race/0">Race Screen</NavLink>
                  <NavLink to="/race-results/0">Race Results</NavLink>
                </div>
              </div>
            ) : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Header);
