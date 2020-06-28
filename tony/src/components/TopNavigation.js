import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { matchPath, Link, withRouter } from "react-router-dom";
import logoImage from "../assets/images/logo.svg";
import {
  DropdownV2,
  Button,
  OverflowMenu,
  OverflowMenuItem
} from "carbon-components-react";
import { iconNotificationOn } from "carbon-icons";
import ChevronDown from "@carbon/icons-react/es/chevron--down/20";
import { loadVersions } from "../actions/version";
import { Portal } from "react-portal";
import path from "../config/path";

const TopNavigationBar = styled.div`
  width: 100%;
  height: 67px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px 0 #d9ebfd;
  position: relative;
  display: flex;
  align-items: baseline;
  padding-left: 92px;
`;

const TopNavigationContainer = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999;
`;

const Logo = styled.img`
  padding-left: 5.5px;
  padding-right: 5.5px;
  width: 42px;
  height: 46px;
  position: absolute;
  top: 10.5px;
  left: 30.5px;
`;

const Title = styled(Link)`
  text-decoration: none;
  margin-top: 23.5px;
  height: 20px;
  font-size: 16px;
  font-weight: ${props => (props.active ? 600 : "normal")};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.25;
  letter-spacing: normal;
  text-align: left;
  color: ${props => (props.active ? "#5596e6" : "#5a6872")};
  left: 92px;
  margin-left: 25px;
  cursor: pointer;
  :hover {
    color: #5596e6;
  }
`;

const DropdownButton = styled(DropdownV2)`
  margin-left: 25px;
  order: 0 span {
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 0.88;
    letter-spacing: normal;
    text-align: left;
    color: #5a6872;
  }
  .bx--list-box__menu {
    max-height: 320px;
  }
`;

const CollaborationButton = styled(Title)`
  width: 160px;
  left: 560px;
`;

const DetailButton = styled(OverflowMenu)`
  position: absolute;
  fill: #5a6872;
  right: 50px;
  top: 16px;
  outline: none;
`;

const RingButton = styled(OverflowMenu)`
  position: absolute;
  fill: #5a6872;
  right: 100px;
  top: 16px;
  width: 50px;
  outline: none;
`;

const LibrariesButton = styled(DropdownButton)`
  width: 145px;
`;

const TemplatesButton = styled(DropdownButton)`
  width: 151px;
`;

const ActionMenu = styled.div`
  position: absolute;
  top: 0;
  left: calc(50% - 50px);
  width: 100px;
  height: 34px;
  box-shadow: 0 2px 10px 0 #d9ebfd;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: left;
  color: #454658;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActionMenuArrow = styled(ChevronDown)`
  transition: transform 0.3s ease;
  transform: scale(1, ${props => props.flipped});
`;

class TopNavigation extends Component {
  state = {
    item: null
  };

  componentDidMount() {
    this.props.loadVersions();
  }

  handleChangeLibraries = e => {
    const { history } = this.props;
    const selectedItem = e.selectedItem;
    const idfEditorPath = path.idfEditor.allClasses.replace(
      ":projectId",
      selectedItem.id
    );
    history.push(idfEditorPath);
  };

  handleChangeTemplates = e => {
    console.log(e);
  };

  matchIdfEditorPath = () => {
    const { history } = this.props;
    if (
      matchPath(history.location.pathname, {
        path: path.idfEditor.classDetail
      }) ||
      matchPath(history.location.pathname, { path: path.idfEditor.allClasses })
    ) {
      return true;
    }
    return false;
  };

  render() {
    const { showMenu, toggleMenu, versions, history } = this.props;
    const { item } = this.state;
    const match = matchPath(history.location.pathname, {
      path: '/dashboard/:projectId/documents/:documentId',
    });

    return (
      <TopNavigationContainer>
        {showMenu && (
          <TopNavigationBar>
            <Logo src={logoImage}></Logo>
            <Title
              active={!match}
              onClick={() => history.push(path.dashboard)}
            >
              PROJECTS
            </Title>
            {!match && (
              <React.Fragment>
                <LibrariesButton
                  light={true}
                  selectedItem={item}
                  label="LIBRARIES"
                  items={versions}
                  itemToString={item => (item ? item.version : "")}
                  onChange={this.handleChangeLibraries}
                />
                {/* <TemplatesButton
                  light={true}
                  selectedItem={item}
                  label="TEMPLATES"
                  items={versions}
                  itemToString={item => (item ? item.version : "")}
                  onChange={this.handleChangeTemplates}
                /> */}
                {/* <CollaborationButton active={false}>
                  COLLABORATION
                </CollaborationButton> */}
              </React.Fragment>
            )}
            {match && (
              <React.Fragment>
                <Title
                  active={matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/documents/:documentId/editor"
                  )}
                  to={`/dashboard/${match.params.projectId}/documents/${match.params.documentId}/editor`}
                >
                  3D EDITOR
                </Title>
                <Title
                  active={this.matchIdfEditorPath()}
                  to={`/dashboard/${match.params.projectId}/documents/${match.params.documentId}/idf-editor`}
                >
                  IDF EDITOR
                </Title>
                <Title
                  active={matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/documents/:documentId/simulator"
                  ) && !matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/documents/:documentId/simulator/:simulatorId/simulation-result"
                  )}
                  to={`/dashboard/${match.params.projectId}/documents/${match.params.documentId}/simulator`}
                >
                  SIMULATIONS & RESULT
                </Title>
                <Title
                  active={matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/documents/:documentId/simulator/:simulatorId/simulation-result"
                  )}
                >
                  RESULT
                </Title>
                <Title
                  active={matchPath(
                    window.location.pathname,
                    "/dashboard/:projectId/views"
                  )}
                  to={`/dashboard/${match.params.projectId}/views`}
                >
                  VIEWS
                </Title>
              </React.Fragment>
            )}

            <RingButton
              floatingMenu={true}
              flipped={true}
              icon={iconNotificationOn}
              iconName="icon--notification"
              kind="ghost"
            >
              <OverflowMenuItem itemText="Page 1"></OverflowMenuItem>
              <OverflowMenuItem itemText="Page 2"></OverflowMenuItem>
            </RingButton>
            <DetailButton floatingMenu={true} flipped={true} kind="ghost">
              <OverflowMenuItem itemText="Page 1"></OverflowMenuItem>
              <OverflowMenuItem itemText="Page 2"></OverflowMenuItem>
            </DetailButton>
          </TopNavigationBar>
        )}
        <Portal>
          <ActionMenu onClick={toggleMenu}>
            <ActionMenuArrow flipped={showMenu ? "-1" : "1"} />
            <div>Menu</div>
            <ActionMenuArrow flipped={showMenu ? "-1" : "1"} />
          </ActionMenu>
        </Portal>
      </TopNavigationContainer>
    );
  }
}

function mapStateToProps({ version, idfEditor }) {
  return {
    versions: version.list,
    idfEditor
  };
}

const mapDispatchToProps = dispatch => {
  return {
    loadVersions: () => {
      dispatch(loadVersions());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopNavigation));
