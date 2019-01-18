import axios from 'axios';

const { KYC_API } = process.env;

export default {
  token: undefined,

  headers: {},

  setJwtToken(token) {
    this.token = token;
    this.establishHeaderRequest();
  },

  establishHeaderRequest() {
    this.headers = {
      'content-type': 'application/json',
      'x-kyc-auth': `Bearer ${this.token}`,
    };
  },

  get({ path = '', params = {} }) {
    // if (!this.token) {
    //   throw new Error('The API require token !!!');
    // }

    axios.defaults.baseURL = KYC_API;
    axios.defaults.withCredentials = true;
    return axios.get(path, { headers: this.headers, params });
  },

  put({ path = '', payload }) {
    return axios({
      baseURL: KYC_API,
      data: payload,
      method: 'PUT',
      url: path,
      headers: this.headers,
    });
  },

  post({ path = '', payload }) {
    return axios({
      withCredentials: true,
      baseURL: KYC_API,
      data: payload,
      method: 'POST',
      url: path,
      headers: this.headers,
    });
  },
};
