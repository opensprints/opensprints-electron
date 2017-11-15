import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

/* FIXME: refactor class to use same mechanics as Dropdown */
class StaticDropdown extends Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    label: PropTypes.element,
    options: PropTypes.array,
    onOptionClicked: PropTypes.func
  };

  constructor(props, state) {
    super(props, state);
    this.state = {
      isOpen: false
    };
    // this.handleDocumentClick = this.handleDocumentClick.bind(this);
  }

  componentDidMount() {
    // document.addEventListener('click', this.handleDocumentClick, false);
    // document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount() {
    this.mounted = false;
    // document.removeEventListener('click', this.handleDocumentClick, false);
    // document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  handleOptionClick(option) {
    const newState = {
      isOpen: false
    };
    const { onOptionClicked } = this.props;
    this.setState(newState);
    if (onOptionClicked) {
      onOptionClicked(option);
    }
  }

  handleMouseDown(event) {
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  buildMenu() {
    const { options, baseClassName } = this.props;
    return options.map(option => (
      <div
        key={option.value}
        className={`${baseClassName}-option`}
        onMouseDown={this.handleOptionClick.bind(this, option)}
        onClick={this.handleOptionClick.bind(this, option)}
      >
        {option.label}
      </div>
    ));
  }

  handleDocumentClick(event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) { // eslint-disable-line
        this.setState({ isOpen: false });
      }
    }
  }

  render() {
    const { baseClassName, label } = this.props;
    const value = <div className={`${baseClassName}-placeholder`}>{label}</div>;
    const menu = this.state.isOpen ?
      <div className={`${baseClassName}-menu`}>{this.buildMenu()}</div> : null;

    const dropdownClass = classNames({
      [`${baseClassName}-root`]: true,
      'is-open': this.state.isOpen
    });

    return (
      <div className={dropdownClass}>
        <div
          className={`${baseClassName}-control`}
          onMouseDown={this.handleMouseDown.bind(this)}
          onTouchEnd={this.handleMouseDown.bind(this)}
        >
          {value}
        </div>
        {menu}
      </div>
    );
  }
}

StaticDropdown.defaultProps = { baseClassName: 'Dropdown' };
export default StaticDropdown;
