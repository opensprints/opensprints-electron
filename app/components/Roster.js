import React, { Component, PropTypes } from 'react';

export default class Roster extends Component {
  static propTypes = {
    racers: PropTypes.array.isRequired,
    addRacer: PropTypes.func.isRequired,
    editRacer: PropTypes.func
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      search: ''
    };
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    let input;
    const { search } = this.state;
    const { racers, addRacer } = this.props;

    return (
      <div className="container">
        <h4>Roster</h4>
        <div className="row">
          <label>
            Racers
            <input
              type="text"
              placeholder="Search"
              autoFocus="true"
              value={this.state.text}
              onChange={this.handleChange.bind(this)}
            />
          </label>
        </div>
        <div className="row">
          <ul>
            {racers.filter((racer) => {
              if (search && search && search.trim()) {
                return ~racer.name.indexOf(search.trim());
              }
              return true;
            }).map((racer, index) => (
              <li key={`racer-${index}`}>{racer.name}</li>
            ))}
          </ul>
        </div>
        <div className="row">
          <label>
            Name
            <input
              ref={node => {
                input = node;
              }}
              type="text"
            />
          </label>
          <button
            className="btn btn-default"
            onClick={() => {
              if (input.value.trim().length > 0) {
                addRacer({ name: input.value.trim() });
                input.value = '';
              }
            }}
          >
            Add Racer
          </button>
        </div>
      </div>
    );
  }
}
