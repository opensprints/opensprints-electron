import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';

const store = remote.getGlobal('wallpaperStore');
const defaultBackground = '../images/open-sprints-bg.jpg';
const wallpaperTemplatePreviews = {
  raceScreen: '../images/open-sprints-background.png',
  raceClock: '../images/open-sprints-clock.png',
  intermissionScreen: '../images/open-sprints-intermission.png'
};

export default class Background extends Component {
  static propTypes = {
    bKey: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      imgSrc: null,
      templatePreviewSrc: wallpaperTemplatePreviews[props.bKey],
      showPreview: false
    };
  }

  componentDidMount() {
    store.getBackground(this.props.bKey, this.onBackgroundLoaded.bind(this));
  }

  onBackgroundLoaded(err, imgSrc) {
    if (err) {
      console.error(err);
      return;
    }
    this.setState({ imgSrc });
  }

  render() {
    const { imgSrc, templatePreviewSrc, showPreview } = this.state;
    const { bKey } = this.props;
    return (
      <div
        style={{
          border: '1px solid #6FDCFF',
          position: 'relative'
        }}
      >
        <img
          style={{
            display: (showPreview ? null : 'none')
          }}
          width="100%"
          alt="bg"
          src={templatePreviewSrc}
        />
        <img
          style={{
            display: (showPreview ? 'none' : null)
          }}
          width="100%"
          alt="bg"
          src={imgSrc || defaultBackground}
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
          onMouseEnter={() => {
            this.setState({
              showPreview: true
            });
          }}
          onMouseLeave={() => {
            this.setState({
              showPreview: false
            });
          }}
          onClick={() => {
            store.downloadTemplate(bKey, () => {});
          }}
        >
          <span
            style={{
              fontSize: '12px',
              verticalAlign: 'top',
              paddingRight: '10px'
            }}
          >
            PSD Template
          </span>
          <i className="material-icons">file_download</i>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '5px',
            right: '10px'
          }}
        >
          <input
            type="file"
            className="inputFile"
            style={{ display: 'none' }}
            accept="image/*"
            ref={(input) => { this.input = input; }}
            onChange={(e) => {
              if (e.target.files.length > 0) {
                const file = e.target.files[0];
                store.setNewBackground(bKey, file.path, file.name, (err) => {
                  if (err) {
                    console.error(err);
                    return;
                  }
                  store.getBackground(bKey, this.onBackgroundLoaded.bind(this));
                });
              }
            }}
          />
          <button
            style={{
              borderColor: '#6FDCFF',
              color: '#0079A1',
              backgroundColor: 'white',
              padding: '3px 27px',
              margin: '9px 12px'
            }}
            className="btn btn-xs btn-primary"
            onClick={() => { this.input.click(); }}
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
            onClick={() => {
              store.set(bKey, defaultBackground);
              store.getBackground(bKey, this.onBackgroundLoaded.bind(this));
            }}
          >
            delete
          </i>
        </div>

      </div>
    );
  }
}
