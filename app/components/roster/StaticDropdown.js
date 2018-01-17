import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/* FIXME: refactor class to use same mechanics as Dropdown */
class StaticDropdown extends Component {
  static propTypes = {
    baseClassName: PropTypes.string,
    label: PropTypes.element,
    options: PropTypes.array,
    onOptionClicked: PropTypes.func
  };

  static defaultProps = {
    label: '',
    options: [],
    onOptionClicked: undefined
  };

  constructor(props, state) {
    super(props, state);
    this.state = {
      isOpen: false
    };
  }

  handleDropdownClose(e) {
    e.stopPropagation();
    e.preventDefault();
    const { isOpen } = this.state;
    if (isOpen && !this.timeOut) {
      this.timeOut = setTimeout(() => this.setState({ isOpen: false }), 250);
    }
  }

  handleKeepDropdownOpen(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.timeOut) {
      clearTimeout(this.timeOut);
      this.timeOut = null;
    }
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
        onMouseEnter={this.handleKeepDropdownOpen.bind(this)}
        onMouseLeave={this.handleDropdownClose.bind(this)}
        onMouseDown={this.handleOptionClick.bind(this, option)}
        onClick={this.handleOptionClick.bind(this, option)}
      >
        {option.label}
      </div>
    ));
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
      <div
        className={dropdownClass}
        onMouseLeave={this.handleDropdownClose.bind(this)}
      >
        <div
          tabIndex="-1"
          role="menu"
          className={`${baseClassName}-control`}
          onMouseDown={this.handleMouseDown.bind(this)}
          onTouchEnd={this.handleMouseDown.bind(this)}
          onMouseEnter={this.handleKeepDropdownOpen.bind(this)}
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
