import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/roster'>Roster</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}