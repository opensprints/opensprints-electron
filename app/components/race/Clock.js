import React, { Component } from 'react';
import { Layer, Stage } from 'react-konva';
import styles from './Clock.css';
import Indicator from './Indicator';

export default class Clock extends Component {
  render() {
    return (
      <div className={styles['clock-frame']}>
        <div className={styles['clock-face']}>
          <div className={`${styles.poleContainer} ${styles.northContainer}`}>
            <span>100</span>
          </div>
          <div className={`${styles.poleGuideline} ${styles.northGuideline}`} />

          <div className={`${styles.tropicContainer} ${styles.eastContainer}`}>
            <span>25</span>
          </div>
          <div className={`${styles.tropicGuideline} ${styles.eastGuideline}`} />

          <div className={`${styles.poleContainer} ${styles.southContainer}`}>
            <span>50</span>
          </div>
          <div className={`${styles.poleGuideline} ${styles.southGuideline}`} />

          <div className={`${styles.tropicContainer} ${styles.westContainer}`}>
            <span>75</span>
          </div>
          <div className={`${styles.tropicGuideline} ${styles.westGuideline}`} />

          <div className={styles['clock-center']} />
          <Stage
            width={380}
            height={380}
            listening={false}
          >
            <Layer listening={false}>
              <Indicator />
            </Layer>
          </Stage>
        </div>
        <div className={styles.stopwatch}>
          00:00.2
        </div>
      </div>
    );
  }
}
