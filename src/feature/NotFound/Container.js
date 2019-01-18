/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    Your accout doesn't exits in systems. Please check link website again.
    Click
    <Link to="login">here</Link>
    back to Login page.
  </div>
);

export default NotFound;
