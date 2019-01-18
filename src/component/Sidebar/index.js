import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

/* === material ui core === */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

/* === material ui icons === */
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const Sidebar = ({ logoText, openExpand, handleOpenExpand, handleLogout, routesApp }) => {
  const sidebarRoutes = (
    <List>
      {routesApp.map(item => (
        <NavLink to={item.to} key={item.to} className="c-sidebar__link" activeClassName="active">
          <ListItem button className="c-sidebar__button">
            <ListItemIcon className="c-sidebar__icon">
              <item.icon />
            </ListItemIcon>
            <ListItemText className="c-sidebar__text" primary={item.text} disableTypography />
          </ListItem>
        </NavLink>
      ))}
    </List>
  );

  return (
    <div className="c-sidebar">
      <div className="c-sidebar__top">
        <div className="c-sidebar__logoLink">
          {logoText}
        </div>
      </div>
      <div className="c-sidebar__nav">
        {sidebarRoutes}
        <div className="c-sidebar__expand">
          <ListItem button onClick={handleOpenExpand} className="c-sidebar__button">
            <ListItemIcon className="c-sidebar__icon">
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Settings" disableTypography className="c-sidebar__text" />
            {openExpand ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openExpand} timeout="auto" unmountOnExit className="c-sidebar__expand--right">
            <List component="div" disablePadding onClick={handleLogout} className="c-sidebar__link">
              <ListItem button>
                <ListItemIcon className="c-sidebar__icon">
                  <PowerSettingsNewIcon />
                </ListItemIcon>
                <ListItemText inset primary="Logout" disableTypography className="c-sidebar__text" />
              </ListItem>
            </List>
          </Collapse>
        </div>
      </div>
      <div className="c-sidebar__bg" />
    </div>
  );
};

Sidebar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  handleOpenExpand: PropTypes.func.isRequired,
  logoText: PropTypes.string.isRequired,
  openExpand: PropTypes.bool.isRequired,
  routesApp: PropTypes.any.isRequired,
};

export default Sidebar;
