import axios from "axios";
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com/api";
const BASE_URL = "http://localhost:4000/api";
// const BASE_URL = "https://cs-5500a3.herokuapp.com/api";

const LOGIN_API = `${BASE_URL}/login`;
const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;

export const createUser = (user) =>
  axios.post(`${USERS_API}`, user)
    .then(response => response.data);

export const findAllUsers = () =>
    axios.get(USERS_API)
        .then(response => response.data);

export const findUserById = (uid) =>
    axios.get(`${USERS_API}/${uid}`)
        .then(response => response.data);

export const deleteUser = (uid) =>
  axios.delete(`${USERS_API}/${uid}`)
    .then(response => response.data);

export const deleteUsersByUsername = (username) =>
  axios.get(`${USERS_API}/username/${username}/delete`)
    .then(response => response.data);

export const findUserByCredentials = (credentials) =>
  axios.post(`${LOGIN_API}`, credentials)
    .then(response => response.data);

export const deleteTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const createTuit = (uid, tuit) => {
    tuit.postedBy = uid;
    return axios.post(`${TUITS_API}`, tuit)
        .then(response => response.data);
}

export const findUserByUsername = (uname) =>
    axios.get(`${USERS_API}/${uname}`)
        .then(response => response.data)


export const findAllTuits = () =>
    axios.get(TUITS_API)
        .then(response => response.data);
