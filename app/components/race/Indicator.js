import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Arrow } from 'react-konva';
import { connect } from 'react-redux';
import { getBikeColor, getDistance, getRace, getIndicatorRotation } from '../../selectors';

class Indicator extends Component {
  static propTypes = {
    bikeIndex: PropTypes.number.isRequired,
    raceId: PropTypes.number.isRequired,

    color: PropTypes.string,
    rotation: PropTypes.number
  }

  render() {
    const { color = 'white', rotation = 0 } = this.props;
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

function mapStateToProps(state, props) {
  return {
    ...props,
    color: getBikeColor(state, props),
    rotation: getIndicatorRotation(getDistance(state, props), getRace(state, props))
  };
}

export default connect(mapStateToProps)(Indicator);
