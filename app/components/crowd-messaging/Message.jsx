import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './messages.css';

/**
 * I'm Blue da ba dee da ba daa...
 */
const BlueMessage = ({ style, children }) => (
  <div
    style={style}
    className={styles['blue-message']}
  >
    {children}
  </div>
);
BlueMessage.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};
BlueMessage.defaultProps = {
  style: null
};

export default class Message extends Component {
  static propTypes = {
    message: PropTypes.object.isRequired,
    isNewMessage: PropTypes.bool,
    editMessage: PropTypes.func.isRequired
  };

  static defaultProps = {
    isNewMessage: false
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      title: props.message.title,
      subtext: props.message.subtext,
      editing: props.isNewMessage,
      hover: false
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      title: newProps.message.title,
      subtext: newProps.message.subtext
    });
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleSubtextChange(e) {
    this.setState({
      subtext: e.target.value
    });
  }

  handleUpdate() {
    const { message, editMessage } = this.props;
    const { title, subtext } = message;
    const { title: newTitle, subtext: newSubtext } = this.state;
    if (title !== newTitle || subtext !== newSubtext) {
      editMessage({
        ...message,
        title: newTitle,
        subtext: newSubtext
      });
    }
    this.setState({
      editing: false
    });
  }

  render() {
    const { isNewMessage } = this.props;
    const { title, subtext, hover, editing } = this.state;

    return (
      <div
        className="pull-right"
        style={{
          clear: 'right',
          background: (hover || editing) && 'rgba(255,255,255,0.1)'
        }}
        onMouseOver={() => this.setState({ hover: true })}
        onMouseOut={() => this.setState({ hover: false })}
      >
        <div
          style={{
            clear: 'right',
            marginTop: '20px',
            width: '100%'
          }}
          className="pull-right"
        >
          <input
            className="form-control"
            type="text"
            style={{
              fontSize: '16px',
              lineHeight: '16px',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '5px',
              fontWeight: 'bold',
              border: 'none',
              textAlign: 'right',
              padding: '0',
              color: 'white',
              boxShadow: 'none'
            }}
            autoFocus={isNewMessage}
            onFocus={() => this.setState({ editing: true })}
            onBlur={this.handleUpdate.bind(this)}
            value={title}
            onChange={this.handleTitleChange.bind(this)}
          />
        </div>
        <hr
          style={{
            margin: 0,
            clear: 'both'
          }}
        />
        <div style={{ float: 'right' }}>
          <BlueMessage style={{ textAlign: 'right' }}>
            {subtext}
          </BlueMessage>
        </div>
      </div>
    );
  }
}
