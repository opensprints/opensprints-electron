import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './messages.css';

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
      hover: false,
      // previousScrollHeight: 50,
      // textAreaRows: 4
    };
  }

  componentWillReceiveProps(newProps) {
    const { title: oldTitle, subtext: oldSubtext } = this.props.message;
    const { title, subtext } = newProps.message;

    if (oldTitle !== title || oldSubtext !== subtext) {
      this.setState({
        title: newProps.message.title,
        subtext: newProps.message.subtext,
        // textAreaRows: Math.floor(this.textArea.scrollHeight / 20)
      });
    }
  }

  onHover() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleSubtextChange(e) {
    // const { previousScrollHeight } = this.state;
    this.setState({
      subtext: e.target.value,
      // textAreaRows: (Math.abs(previousScrollHeight - this.textArea.scrollHeight) >= 20 &&
      // Math.floor(this.textArea.scrollHeight / 20))
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
    const {
      title,
      subtext,
      hover,
      editing,
      // textAreaRows
    } = this.state;

    return (
      <div
        className={styles['message-container']}
        style={{
          background: (hover || editing) && 'rgba(255,255,255,0.1)'
        }}
        onFocus={this.onHover.bind(this)}
        onBlur={this.onMouseLeave.bind(this)}
        onMouseOver={this.onHover.bind(this)}
        onMouseOut={this.onMouseLeave.bind(this)}
      >
        <div>
          <input
            className={`form-control ${styles['message-title-input']}`}
            type="text"
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
        <div
          style={{
            textAlign: 'right'
          }}
        >
          <textarea
            className={styles['message-subtext-textarea']}
            // ref={(ta => this.textArea = ta)}
            // rows={textAreaRows}
            rows={2}
            onFocus={() => this.setState({ editing: true })}
            onBlur={this.handleUpdate.bind(this)}
            onChange={this.handleSubtextChange.bind(this)}
            value={subtext}
          />
        </div>
      </div>
    );
  }
}
