import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Loading, loadingAction } from 'feature';
import { storeAuthLogin } from 'feature/Login';
import Helper from 'lib/helper';
import { Sidebar } from 'component';
import { RoutesApp } from './Routes';

const switchRoutes = (
  <Switch>
    {RoutesApp.map(item => (
      <Route exact path={item.path} component={item.component} key={item.path} />
    ))}
  </Switch>
);

class App extends Component {
  static propTypes = {
    history: PropTypes.any.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    const {
      match: {
        params: { nameApp },
      },
    } = this.props;
    this.state = {
      openExpand: false,
      hookNameApp: nameApp,
    };
  }

  componentWillMount = async () => {
    // const { hookNameApp } = this.state;
    // const { history, loadingAction } = this.props;
    // Helper.setStorage('nameApp', hookNameApp);
    // const cookie = Helper.getCookie();
    // if (cookie) {
    //   try {
    //     const { data } = await loadingAction(() => getInfo());
    //     Helper.setStorage('user', JSON.stringify(data));
    //     history.push(`/${hookNameApp}/profile`);
    //   } catch (error) {
    //     this.clearStorage();
    //     history.push('login');
    //   }
    // } else {
    //   history.push(`/${hookNameApp}/login`);
    // }
  };

  clearStorage = () => {
    Helper.removeStorage('user');
    Helper.removeCookie();
  };

  handleOpenExpand = () => {
    const { openExpand } = this.state;
    this.setState({ openExpand: !openExpand });
  };

  handleLogout = () => {
    const { history } = this.props;
    this.clearStorage();
    history.push('login');
  };

  titlePage = () => {
    let name;
    const { hookNameApp } = this.state;
    const {
      location: { pathname },
    } = this.props;
    RoutesApp.map(item => {
      if (`/${hookNameApp}/${item.to}` === pathname) name = item.text;
      return null;
    });
    return name;
  };

  render() {
    const { openExpand, hookNameApp } = this.state;
    return (
      <div className="app-container">
        <Sidebar
          routesApp={RoutesApp}
          logoText={hookNameApp}
          openExpand={openExpand}
          handleLogout={this.handleLogout}
          handleOpenExpand={this.handleOpenExpand}
        />
        <div className="c-panel">
          <div className="c-panel__content">
            <div className="c-card">
              <div className="c-card__header">
                <h4 className="c-heading c-heading__h4">{this.titlePage()}</h4>
              </div>
              <div className="c-card__body">
                <div className="container-fluid">{switchRoutes}</div>
              </div>
            </div>
          </div>
        </div>
        <Loading />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { user = {} } = auth;
  return {
    user,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadingAction,
      storeAuthLogin,
    },
    dispatch,
  );

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
