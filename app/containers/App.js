import React, { Component, PropTypes } from 'react';
import HeaderContainer from './HeaderContainer';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <div className="container-fluid">
        <HeaderContainer />
        {this.props.children}
      </div>
    );
  }
}
