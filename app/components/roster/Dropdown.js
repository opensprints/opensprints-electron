import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Code from bobinette/react-dropdown
 */
class Dropdown extends Component {
  static propTypes = {
    value: PropTypes.any,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    baseClassName: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: props.value || {
        label: props.placeholder || 'Select...',
        value: ''
      },
      isOpen: false
    };
    this.mounted = true;
    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.fireChangeEvent = this.fireChangeEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value && newProps.value !== this.state.selected) {
      this.setState({ selected: newProps.value });
    } else if (!newProps.value && newProps.placeholder) {
      this.setState({ selected: { label: newProps.placeholder, value: '' } });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
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
            {option.items.map((item) => this.renderOption(item))}
          </div>
        );
      }
      return this.renderOption(option);
    });

    return ops.length ? ops : <div className={`${baseClassName}-noresults`}>No options found</div>;
  }

  handleDocumentClick(event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) { // eslint-disable-line
        this.setState({ isOpen: false });
      }
    }
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
          <span className={`${baseClassName}-arrow`} />
        </div>
        {menu}
      </div>
    );
  }
}

Dropdown.defaultProps = { baseClassName: 'Dropdown' };
export default Dropdown;
