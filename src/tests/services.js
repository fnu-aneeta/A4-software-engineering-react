import axios from "axios";
// const BASE_URL = "https://cs5500-01-sp22.herokuapp.com/api";
const BASE_URL = "http://localhost:4000/api";

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
// Tuits API

export const findAllTuits = () =>
    axios.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    axios.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findAllTuitsByUser = (uid) =>
    axios.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (uid, tuit) => {
  tuit.postedBy = uid;
  return axios.post(`${TUITS_API}`, tuit)
      .then(response => response.data);
}

export const updateTuit = (tid, tuit) =>
    axios.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

// Dislike API

export const findAllTuitsDislikedByUser = (uid) =>
    axios.get(`${USERS_API}/${uid}/dislikes`)
        .then(response => response.data);

export const findAllUsersThatDislikedTuit = (tid) =>
    axios.get(`${TUITS_API}/${tid}/dislikes`)
        .then(response => response.data);

export const doesUserDislikeTuit = (uid, tid) =>
    axios.get(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const userTogglesDislike = (uid, tid) =>
    axios.put(`${USERS_API}/${uid}/dislikes/${tid}`)
        .then(response => response.data);

export const userDislikesTuit = (uid, tid) =>
    axios.post(`${USERS_API}/${uid}/dislike/${tid}`)
        .then(response => response.data);

export const userUndislikesTuit = (uid, tid) =>
    axios.delete(`${USERS_API}/${uid}/dislike/${tid}`)
        .then(response => response.data);

// Like API

export const findAllTuitsLikedByUser = (uid) =>
    axios.get(`${USERS_API}/${uid}/likes`)
        .then(response => response.data);

export const findAllUsersThatLikedTuit = (tid) =>
    axios.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);

export const doesUserLikeTuit = (uid, tid) =>
    axios.get(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userTogglesLike = (uid, tid) =>
    axios.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userLikesTuit = (uid, tid) =>
    axios.post(`${USERS_API}/${uid}/like/${tid}`)
        .then(response => response.data);

export const userUnlikesTuit = (uid, tid) =>
    axios.delete(`${USERS_API}/${uid}/like/${tid}`)
        .then(response => response.data);
const service = {
  findAllUsers
}

export default service;
