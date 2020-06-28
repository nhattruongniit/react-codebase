import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { SubspaceProvider } from 'react-redux-subspace'
import Loading from '../components/common/Loading';
import TopNavigation from '../containers/TopNavigation';
import { IdfEditor } from '../modules/IdfEditor';
import ProjectsModule from '../modules/Projects';
import path from '../config/path';

const Container = styled.div`
  height: 100%;
`;

const Content = styled.div`
  height: 100%;
  padding-top: 67px;

  ${props => props.showMenu === false && css`
    height: 100%;
  `}
`;

const IdfEditorModule = (props) => {
  return (
    <SubspaceProvider mapState={(state) => state.idfEditor}>
      <IdfEditor {...props} />
    </SubspaceProvider>
  )
}

const Main = (props) => (
  <Container>
    {props.loading && (
      <Loading />
    )}
    <TopNavigation {...props} />
    <Content showMenu={props.showMenu}>
      <Switch>
        <Route path={path.idfEditor.classDetail} component={IdfEditorModule} />
        <Route path={path.idfEditor.allClasses} component={IdfEditorModule} />
        <Route path={path.dashboard} component={ProjectsModule} />
        <Redirect from='/' to='/dashboard' exact={true} />
      </Switch>
    </Content>
  </Container>
);

export default Main;
