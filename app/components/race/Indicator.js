import React, { Component, PropTypes } from 'react';
import { Arrow } from 'react-konva';

export default class Indicator extends Component {
  static propTypes = {
    color: PropTypes.string,
    rotation: PropTypes.number
  }

  constructor(...args) {
    super(...args);
    this.state = {
      ticks: 0,
      rotation: 0
    };
    this.updateRotation = this.updateRotation.bind(this);
    johnnyFiveAdapter([this.updateRotation]); // eslint-disable-line
  }

  componentDidMount() {}

  componentWillUnmount() {}

  updateRotation() {
    const { ticks } = this.state;

    // total distance / distance per tick = number of ticks in a race
    // 100 m / 3.9 in (99.06 mm) = 1009.4892

    // 360 deg / (number of ticks in a race) = degrees per tick
    // 360 * ticks / (number of ticks in a race) = current needle rotation

    this.setState({
      rotation: (360 * (ticks + 1)) / 1009,
      ticks: ticks + 1
    });
  }

  render() {
    const { color = 'white' } = this.props;
    const { rotation = 0 } = this.state;
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
