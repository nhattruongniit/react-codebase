import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

/* === import component ===*/
import Sidebar from "component/Sidebar";
import Header from "component/Header";

import { SidebarRoutes, SettingRoutes } from './Routes';

import lblSession from 'libs/lbl-session';

const logo = '/assets/images/logo.png';

const switchRoutes = (
    <Switch>
        {SidebarRoutes.map((prop, key) => {
            if(prop.redirect) return <Route path={prop.path} component={prop.component} key={key} /> //<Redirect from={prop.path} to={prop.to} key={key} />;
            return <Route path={prop.path} component={prop.component} key={key} />
        })}
    </Switch>
)

const titlePage = () => {
    let name;
    SidebarRoutes.map(prop => {
        if (prop.path === window.location.pathname) {
            name = prop.text
        }
        return null;
    })
    return name;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openExpand: false
        }
    }

    componentWillMount() {
        const token = lblSession.getSession('token');
        if(token === null) this.props.history.push('/login');
    }

    handleOpenExpand = () => {
        this.setState({ openExpand: !this.state.openExpand })
    }

    handleLogout = () => {
        lblSession.removeSession();
        this.props.history.push('/login');
    }

    render() {
        const { openExpand } = this.state;

        return (
            <div>
                <Sidebar 
                    routes={SidebarRoutes}
                    settingRoutes={SettingRoutes}
                    logoText={"ADMIN"}
                    logo={logo} 
                    openExpand={openExpand}
                    handleOpenExpand={this.handleOpenExpand}
                    handleLogout={this.handleLogout}
                />
                <div className="c-panel">
                    <Header />
                    <div className="c-panel__content">
                        <div className="c-card">
                            <div className="c-card__header">
                                <h4 className="c-heading c-heading__h4">{titlePage()}</h4>
                            </div>
                            <div className="c-card__body">
                                {switchRoutes}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;