import {
    LOGIN_BEGIN,
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from "./reducer";

import axios from 'axios';

export function Login(args = {}) {
    return (dispatch) => {
        dispatch({ type: LOGIN_BEGIN });

        const promise = new Promise((resolve, reject) => {
            axios('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: args
            })
            .then(res => {
                dispatch({ type: LOGIN_SUCCESS });
                resolve(res.data)
            })
            .catch(err => {
                dispatch({ type: LOGIN_FAIL });
                reject(err.response)
            })
        });

        return promise;
    }
}