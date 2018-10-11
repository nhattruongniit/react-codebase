import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const PlayerAPI = {
  players: [
    { number: 1, name: "Ben Blocker", position: "G" },
    { number: 2, name: "Dave Defender", position: "D" },
    { number: 3, name: "Sam Sweeper", position: "D" },
    { number: 4, name: "Matt Midfielder", position: "M" },
    { number: 5, name: "William Winger", position: "M" },
    { number: 6, name: "Fillipe Forward", position: "F" }
  ],
  all: function() { return this.players},
  get: function(id) {
    const isPlayer = p => p.number === id
    return this.players.find(isPlayer)
  }
}

export default class List extends Component {

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <h2> List Players </h2>
        <ul>
          {
            PlayerAPI.all().map(p => (
              <li key={p.number}>
                <Link to={`/roster/${p.number}`}> {p.name} </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}