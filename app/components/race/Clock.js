import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import Indicator from './Indicator';

export default class Clock extends Component {
  render() {
    return (
      <Stage
        width={380}
        height={380}
        listening={false}
      >
        <Layer
          listening={false}
        >
          <Indicator />
        </Layer>
      </Stage>
    );
  }
}
