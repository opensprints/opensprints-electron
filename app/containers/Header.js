import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink, withRouter } from 'react-router';
import { push } from 'react-router-redux';
import styles from './Header.css';

const logoSrc = '../images/logo.png';

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
    dispatch: PropTypes.func,
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      navigationVisible: false
    };
  }

  navigateToIntermission() {
    const { dispatch } = this.props;
    dispatch(push('/intermission'));
    return false;
  }

  navigateBack() {
    const { router } = this.props;
    router.goBack();
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
    const { router } = this.props;
    const intermission = router.isActive('/intermission');
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
                  <NavLink isIndex to="/">Home</NavLink>
                  <NavLink to="/roster">Roster</NavLink>
                  <NavLink to="/default-settings">Default Settings</NavLink>
                  <NavLink to="/race-preview/0">Race Preview</NavLink>
                  <NavLink to="/race/0">Race Screen</NavLink>
                </div>
              </div>
            ) : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Header));
