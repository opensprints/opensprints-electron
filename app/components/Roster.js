import React, { Component, PropTypes } from 'react';

export default class Roster extends Component {
  static propTypes = {
    racers: PropTypes.array.isRequired,
    addRacer: PropTypes.func,
    editRacer: PropTypes.func
  }

  render() {
    let search;
    let input;
    const { racers, addRacer } = this.props;

    return (
      <div className="container">
        <h4>Roster</h4>
        <div className="row">
          <label>
            Racers
            <input // TODO get search working
              ref={node => {
                search = node;
              }}
              type="text"
            />
          </label>
        </div>
        <div className="row">
          <ul>
            {racers.filter((racer) => {
              if (search && search.value && search.value.trim()) {
                return ~racer.name.indexOf(search.value.trim());
              }
              return true;
            }).map((racer) => (
              <li>{racer.name}</li>
            ))}
          </ul>
        </div>
        {/* TODO List of Racers/Search */}
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
