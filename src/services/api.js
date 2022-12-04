const { default: axios } = require('axios');

const BASE_URL = 'http://localhost:8000/';

const getHeaders = (token) => {
  let headers = {};
  if (token) {
    headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return headers;
};

const get = (url, token = '') => {
  return axios.get(BASE_URL + url, getHeaders(token));
};

const post = (url, data = {}, token = '') => {
  return axios.post(BASE_URL + url, data, getHeaders(token));
};

const patch = (url, data = {}, token = '') => {
  return axios.patch(BASE_URL + url, data, getHeaders(token));
};

const delete1 = (url, token = '') => {
  return axios.delete(BASE_URL + url, getHeaders(token));
};

module.exports = { get, post, patch, delete1 };
