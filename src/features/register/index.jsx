import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Register extends Component {
    static propTypes = {
        register: PropTypes.isRequired
    }

    render() {
        return (
            <div>
                this is page register
            </div>
        )
    }
}