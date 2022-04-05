import axios from "axios";
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com";
//"http://localhost:4000";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const LOGIN_API = `${BASE_URL}/api/login`;
const USERS_API = `${BASE_URL}/api/users`;

export const createUser = (user) =>
  axios.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = () => {
  return axios.get(`${USERS_API}`)
      .then( response =>  response.data );
}

export const findUserById = (uid) =>
    axios.get(`${USERS_API}/byId/${uid}`)
        .then(response => response.data);

export const findUserByUsername = (uname) =>
    axios.get(`${USERS_API}/${uname}`)
        .then(response => response.data)

export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/byId/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
    axios.delete(`${USERS_API}/${username}`)
        .then(response => response.data);

export const findUserByCredentials = (credentials) =>
    axios.post(`${LOGIN_API}`, credentials)
        .then(response => response.data);

const service = {
  findAllUsers
}

export default service;
