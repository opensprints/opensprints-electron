import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Select extends Component {
  static propTypes = {
    selectProps: PropTypes.object,
    children: PropTypes.array
  }
  render() {
    const { selectProps = {}, children } = this.props;
    const { style } = selectProps;
    return (
      <div className="select-container">
        <select
          className="form-control"
          {...selectProps}
          style={Object.assign({}, {
            color: '#6FDCFF',
            fontSize: '18px',
            lineHeight: '18px',
            fontWeight: 'bold',
            borderColor: '#0079A1'
          }, style)}
        >
          {children}
        </select>
        <span className="form-control-feedback">
          <i
            style={{
              color: (style && style.color) ? style.color : '#6FDCFF'
            }}
            className="material-icons md-36"
          >
            arrow_drop_down
          </i>
        </span>
      </div>
    );
  }
}
