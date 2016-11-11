import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Undo from './Undo';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    const props = this.props;
    return (
      <div className="container-fluid">
        <Header {...props} />
        {props.children}
        <Undo {...props} />
      </div>
    );
  }
}
