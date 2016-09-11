import React, { Component, PropTypes } from 'react';

export default class Checkbox extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: false
    };
  }

  checkboxClicked() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const { checked } = this.state;
    const { children } = this.props;
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
            defaultChecked={checked}
            onChange={() => {
              this.checkboxClicked();
            }}
          />
          {children}
        </label>
      </div>
    );
  }
}
