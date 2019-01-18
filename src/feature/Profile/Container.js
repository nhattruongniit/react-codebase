import React, { Component } from 'react';

import Helper from 'lib/helper';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      status: '',
    };
  }

  componentWillMount() {
    const user = JSON.parse(Helper.getStorage(process.env.USER_STORAGE));
    if (user) {
      this.setState({
        email: user.email,
        status: user.status,
      });
    }
  }

  render() {
    const { email, status } = this.state;
    return (
      <div>
        <div className="c-row">
          <div className="col-lg-2 col-md-4 col-sm-12">Status:</div>
          <div className="col-lg-10 col-md-8 col-sm-12">
            <span className={`c-text__status is-${status}`}>{status}</span>
          </div>
        </div>
        <div className="c-row__line" />
        <div className="c-row">
          <div className="col-lg-2 col-md-4 col-sm-12">Email Address:</div>
          <div className="col-lg-10 col-md-8 col-sm-12">{email}</div>
        </div>
      </div>
    );
  }
}

export default Profile;
