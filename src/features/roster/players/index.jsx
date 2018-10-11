import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Players extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      id: this.props.match.params.id
    }
  }

  componentWillMount() {

  }
  render() {
    const { id } = this.state;

    return (
      <div>
        ID player: {id}
        <br/> <br/>
        <Link to='/roster'>Back</Link>
      </div>
    )
  }
}