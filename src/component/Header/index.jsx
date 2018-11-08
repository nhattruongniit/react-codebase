import React from 'react';
import { Link } from 'react-router-dom';

// @material-ui/icons
import Button from '@material-ui/core/Button';
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard  from "@material-ui/icons/Dashboard";

const Header = () => {
    return (
        <div className="c-header">
            <div className="c-header__title"></div>
            <div className="c-header__right">
                <Link to="/dashboard">
                    <Button className="c-header__button"> <Dashboard  /></Button>
                </Link>
                <Button className="c-header__button">
                    <Notifications  />
                </Button>
                <Button className="c-header__button">
                    <Person  />
                </Button>
            </div>
        </div>
    );
}

  
export default Header;
