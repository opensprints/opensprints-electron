import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Arrow } from 'react-konva';

export default class Indicator extends Component {
  static propTypes = {
    color: PropTypes.string,
    rotation: PropTypes.number
  };

  static defaultProps = {
    color: 'white',
    rotation: 0
  };

  render() {
    const { color, rotation } = this.props;
    return (
      <Arrow
        x={190}
        y={190}
        offset={{
          x: 0,
          y: 190
        }}
        points={[0, 230, 0, 25]}
        pointerLength={20}
        pointerWidth={5}
        strokeWidth={2}
        stroke={color}
        fill={color}
        rotation={rotation}
        listening={false}
      />
    );
  }
}
