import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.string.isRequired
  };

  static defaultProps = {
    checked: false
  };

  render() {
    const { checked, children, ...props } = this.props;
    return (
      <div className="checkbox unselectable">
        <label
          style={{
            fontSize: '24px'
          }}
        >
          <i className="material-icons">
            {checked ? 'check_box' : 'check_box_outline_blank'}
          </i>
          <input
            type="checkbox"
            className="sr-only"
            {...props}
          />
          {children}
        </label>
      </div>
    );
  }
}
