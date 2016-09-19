import React, { Component, PropTypes } from 'react';
import { Arrow } from 'react-konva';

let id;

export default class Indicator extends Component {
  static propTypes = {
    color: PropTypes.string
  }

  constructor(...args) {
    super(...args);
    const now = new Date();
    this.state = {
      rotation: (now.getSeconds() + (now.getMilliseconds() * 0.001)) * 6
    };
    this.updateRotation = this.updateRotation.bind(this);
  }

  componentDidMount() {
    id = setInterval(this.updateRotation, 10);
  }

  componentWillUnmount() {
    clearInterval(id);
  }

  updateRotation() {
    const now = new Date();
    this.setState({
      rotation: (now.getSeconds() + (now.getMilliseconds() * 0.001)) * 6
    });
  }

  render() {
    const { color = 'white' } = this.props;
    const { rotation } = this.state;
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
