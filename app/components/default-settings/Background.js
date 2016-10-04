import React, { Component } from 'react';

export default class Background extends Component {

  render() {
    return (
      <div
        style={{
          border: '1px solid #6FDCFF',
          position: 'relative'
        }}
      >
        <img
          width="100%"
          alt="bg"
          src="../images/open-sprints-bg.jpg"
        />
        <div
          className="text-uppercase unselectable"
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            textShadow: '-1px 0 #6FDCFF, 0 1px #6FDCFF, 1px 0 #6FDCFF, 0 -1px #6FDCFF',
            cursor: 'pointer'
          }}
        >
          <span
            style={{
              fontSize: '12px',
              verticalAlign: 'top',
              paddingRight: '10px'
            }}
          >PSD Template</span>
          <i className="material-icons">file_download</i>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '5px',
            right: '10px'
          }}
        >
          <button
            style={{
              borderColor: '#6FDCFF',
              color: '#0079A1',
              backgroundColor: 'white',
              padding: '3px 27px',
              margin: '9px 12px'
            }}
            className="btn btn-xs btn-primary"
          >
            Change
          </button>
          <i
            style={{
              verticalAlign: 'middle',
              textShadow: '-1px 0 #6FDCFF, 0 1px #6FDCFF, 1px 0 #6FDCFF, 0 -1px #6FDCFF',
              cursor: 'pointer'
            }}
            className="material-icons unselectable"
          >
            delete
          </i>
        </div>

      </div>
    );
  }
}
