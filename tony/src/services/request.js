import axios from 'axios';
const { REACT_APP_BACKEND_URL } = process.env;

const request = axios.create({
  baseURL: REACT_APP_BACKEND_URL,
});

export default request;
