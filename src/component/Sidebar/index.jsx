import React from 'react';
import { NavLink } from 'react-router-dom';

/* === material ui ===*/
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from "@material-ui/core/Icon";
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SettingsIcon from '@material-ui/icons/Settings';

const Sidebar = ({ ...props }) => {
    const { logo, logoText, routes, settingRoutes, openExpand } = props;
    const sidebarLink = (
        <List>
            {routes.map((prop, key) => {
                if (prop.redirect) return null; 
                return (
                    <NavLink to={prop.path} className="c-sidebar__link" activeClassName="active" key={key}>
                        <ListItem button className="c-sidebar__button">
                            <ListItemIcon className="c-sidebar__icon">
                                {typeof prop.icon === "string" ? (
                                    <Icon>{prop.icon}</Icon>
                                ) : (
                                    <prop.icon />
                                )}
                            </ListItemIcon>
                            <ListItemText 
                                className="c-sidebar__text"
                                primary={prop.text}
                                disableTypography={true} 
                            />
                        </ListItem>
                    </NavLink>
                )
            })}
        </List>
    )
    const settingLink = (
        <div  className="c-sidebar__expand">
            <ListItem 
                button  
                className="" 
                onClick={props.handleOpenExpand}
            >
                <ListItemIcon className="c-sidebar__icon">
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText 
                    className="c-sidebar__text"
                    primary="Settings"
                    disableTypography={true}
                />
                {openExpand ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openExpand} timeout="auto" className="c-sidebar__expand--right" unmountOnExit>
                {settingRoutes.map((prop, key) => {
                    return (
                        <List component="div" disablePadding onClick={props.handleLogout} key={key}>
                            <ListItem button>
                                <ListItemIcon className="c-sidebar__icon">
                                    {typeof prop.icon === "string" ? (
                                        <Icon>{prop.icon}</Icon>
                                    ) : (
                                        <prop.icon />
                                    )}
                                </ListItemIcon>
                                <ListItemText 
                                    className="c-sidebar__text"
                                    primary={prop.text}
                                    disableTypography={true} 
                                />
                            </ListItem>
                        </List>
                    )
                })}
            </Collapse>
        </div>
    )

    return (
        <div className="c-sidebar">
            <div className="c-sidebar__top">
                <NavLink to="/dashboard" className="c-sidebar__logoLink">
                    <div className="c-sidebar__logo">
                        <img className="c-sidebar__img" src={logo} alt="logo" />
                    </div>
                    {logoText}
                </NavLink>
            </div>
            <div className="c-sidebar__nav">
                {sidebarLink}
                {settingLink}
            </div>
            <div className="c-sidebar__bg"></div>
        </div>
    );
}

  
export default Sidebar;


// if (prop.hasExpand) {
//     return (
//         <div  className="c-sidebar__expand" key={key}>
//             <ListItem 
//                 button  
//                 className="c-sidebar__button" 
//                 onClick={props.handleOpenExpand}
//             >
//                 <ListItemIcon className="c-sidebar__icon">
//                     {typeof prop.icon === "string" ? (
//                         <Icon>{prop.icon}</Icon>
//                     ) : (
//                         <prop.icon />
//                     )}
//                 </ListItemIcon>
//                 <ListItemText 
//                     className="c-sidebar__text"
//                     primary={prop.text}
//                     disableTypography={true}
//                 />
//                 {openExpand ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openExpand} timeout="auto" className="c-sidebar__expand--right" unmountOnExit>
//                 {prop.navExpand.map((prop, key) => {
//                     if (prop.text === 'Logout') {
//                         return (
//                             <List component="div" disablePadding onClick={props.handleLogout} key={key}>
//                                 <ListItem button>
//                                     <ListItemIcon className="c-sidebar__icon">
//                                         {typeof prop.icon === "string" ? (
//                                             <Icon>{prop.icon}</Icon>
//                                         ) : (
//                                             <prop.icon />
//                                         )}
//                                     </ListItemIcon>
//                                     <ListItemText 
//                                         className="c-sidebar__text"
//                                         primary={prop.text}
//                                         disableTypography={true} 
//                                     />
//                                 </ListItem>
//                             </List>
//                         )
//                     }
//                 })}
               
//             </Collapse>
//         </div>
//     )
// }