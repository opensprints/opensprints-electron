import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Dropdown extends Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    placeholder: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    baseClassName: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.value || {
        label: props.placeholder || 'Select...',
        value: ''
      },
      isOpen: false
    };
    this.fireChangeEvent = this.fireChangeEvent.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({ selected: newProps.value });
    } else if (!newProps.value && newProps.placeholder) {
      this.setState({ selected: { label: newProps.placeholder, value: '' } });
    }
  }

  setValue(option) {
    const newState = {
      selected: option,
      isOpen: false
    };
    this.fireChangeEvent(option);
    this.setState(newState);
  }

  handleMouseDown(event) {
    if (event.type === 'mousedown' && event.button !== 0) return;
    event.stopPropagation();
    event.preventDefault();

    this.setState({
      isOpen: !this.state.isOpen
    });
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

  fireChangeEvent(option) {
    if (option !== this.state.selected && this.props.onChange) {
      this.props.onChange(option);
    }
  }

  buildMenu() {
    const { options, baseClassName } = this.props;
    const ops = options.map((option) => {
      if (option.type === 'group') {
        const groupTitle = (<div className={`${baseClassName}-title`}>{option.name}</div>);

        return (
          <div className={`${baseClassName}-group`} key={option.name}>
            {groupTitle}
            {option.items.map(item => this.renderOption(item))}
          </div>
        );
      }
      return this.renderOption(option);
    });

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>No options found</div>;
  }

  renderOption(option) {
    const optionClass = classNames({
      [`${this.props.baseClassName}-option`]: true,
      'is-selected': option === this.state.selected
    });

    const value = typeof option.value === 'undefined' ? option : option.value;
    const label = typeof option.label === 'undefined' ? option : option.label;

    return (
      <div
        key={value}
        className={optionClass}
        onMouseDown={this.setValue.bind(this, option)}
        onClick={this.setValue.bind(this, option)}
      >
        {label}
      </div>
    );
  }

  render() {
    const { baseClassName } = this.props;
    const placeHolderValue = typeof this.state.selected === 'string' ?
      this.state.selected : this.state.selected.label;
    const value = (<div className={`${baseClassName}-placeholder`}>{placeHolderValue}</div>);

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
          className={`${baseClassName}-control`}
          onMouseDown={this.handleMouseDown.bind(this)}
          onTouchEnd={this.handleMouseDown.bind(this)}
          onMouseEnter={this.handleKeepDropdownOpen.bind(this)}
        >
          {value}
          <span className={`${baseClassName}-arrow`} />
        </div>
        {this.state.isOpen ? (
          <div
            className={`${baseClassName}-menu`}
            onMouseEnter={this.handleKeepDropdownOpen.bind(this)}
            onMouseLeave={this.handleDropdownClose.bind(this)}
          >
            {this.buildMenu()}
          </div>
        ) : null}
      </div>
    );
  }
}

Dropdown.defaultProps = { baseClassName: 'Dropdown' };
export default Dropdown;
