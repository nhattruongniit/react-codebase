import React, { Component } from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const theme = createMuiTheme({
  primary: { main: purple[500] }, // Purple and green play nicely together.
  secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
});

class StopPropagation extends Component {

  componentDidMount() {
    document.addEventListener('click', this.onDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick)
  }

  onDocumentClick = event => {
    console.log('onDocumentClick: ', event.currentTarget)
  }

  onButtonClick = event => {
    event.nativeEvent.stopImmediatePropagation();
    console.log('onButtonClick: ', event.currentTarget)
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.actions.Login().then(res => {
      console.log(res, this.props.login.showLoading);
    })
    .catch(err => {
      console.log('err: ', err, this.props.login.showLoading);
    });
  }
  
  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <Button color="primary" onClick={this.onButtonClick}>Primary</Button>
        <Button color="secondary" onClick={this.onButtonClick}>Secondary</Button>
      </MuiThemeProvider>
    )
  };
}

export default (withStyles(theme)(StopPropagation))