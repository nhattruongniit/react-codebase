import React, { Component } from 'react';

class CommentBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'Truong'
    }
  }
  
  componentDidMount() {
    this.setState({
      name: 'Truong'
    })
  }
  
  render() {
    const { name } = this.state;

    return (
      <div>this is demo ve coment: {name}</div>
    )
  };
}

export default CommentBox