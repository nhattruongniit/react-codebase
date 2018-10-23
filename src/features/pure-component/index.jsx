import React, { PureComponent } from 'react';

class ComponentPure extends PureComponent {

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

  componentDidUpdate() {
    const { name } = this.state;
    console.log('componentDidUpdate: ', name);
  }

  
  render() {
    const { name } = this.state;

    return (
      <div>this is demo ve pure component: {name}</div>
    )
  };
}

export default ComponentPure