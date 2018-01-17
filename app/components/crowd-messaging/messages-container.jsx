import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './messages.css';
import Message from './Message';

export default class MessagesContainer extends Component {
  static propTypes = {
    audienceMessages: PropTypes.array.isRequired,
    addMessage: PropTypes.func.isRequired,
    editMessage: PropTypes.func.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    style: undefined
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      newMessageCreated: false,
      newMessageId: null,
      newHover: false
    };
  }

  createNewMessage() {
    const { addMessage } = this.props;
    const newMessageAction = addMessage();
    this.setState({
      newMessageCreated: true,
      newMessageId: newMessageAction.message.id
    });
  }

  editMessage(message) {
    const { newMessageCreated, newMessageId } = this.state;
    const { editMessage } = this.props;
    if (newMessageCreated && message.id === newMessageId) {
      this.setState({
        newMessageCreated: false,
        newMessageId: null
      });
    }
    editMessage(message);
  }

  render() {
    const { audienceMessages, style } = this.props;
    const { newMessageCreated, newMessageId, newHover } = this.state;
    return (
      <div
        className="col-xs-3"
        style={Object.assign({}, {
          height: '85vh',
          backgroundColor: 'rgba(0,0,0,0.6)'
        }, style)}
      >
        <div
          style={{
            minHeight: '30px'
          }}
        >
          <div
            className="pull-right"
            style={{
              userSelect: 'none',
              padding: '6px 0 6px 6px',
              backgroundColor: newHover && 'rgba(255,255,255,0.1)'
            }}
            tabIndex="0"
            role="button"
            onMouseOver={() => this.setState({ newHover: true })}
            onMouseOut={() => this.setState({ newHover: false })}
            onFocus={() => this.setState({ newHover: true })}
            onBlur={() => this.setState({ newHover: false })}
            onClick={this.createNewMessage.bind(this)}
          >
            <span className={styles['add-message']}>
              Add Message
            </span>
            <i
              style={{ verticalAlign: 'text-bottom' }}
              className="material-icons md-24"
            >
              add_circle
            </i>
          </div>
        </div>
        {audienceMessages.map(message => (
          <Message
            {...this.props}
            key={`audienceMessage-${message.id}`}
            message={message}
            isNewMessage={(newMessageCreated && newMessageId === message.id)}
            editMessage={this.editMessage.bind(this)}
          />
        ))}
      </div>
    );
  }
}
