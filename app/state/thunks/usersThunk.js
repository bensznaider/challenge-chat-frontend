import axios from "axios";
import { setLoggedUser } from "../slices/userSlice.js" 

axios.defaults.withCredentials = true;

const server = "http://localhost:8080/api"

export const createUser = (user) => async () => {
  try {
    const response = await axios.post(
      `${server}/users/signup`,
      user,
      { withCredentials: true, credentials: 'include' }
    );
    return response
  } catch (err) {
    throw err;
  }
};

export const login = (user) => async () => {
  try {
    const response = await axios.post(
      `${server}/users/login`,
      user,
      { withCredentials: true, credentials: 'include' }
    );
    localStorage.setItem("token", JSON.stringify(response.data));
    return response
  }
  catch (err) {
    throw err;
  }
}

export const reloadUser = () => async () => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.post(
      `${server}/users/me`,
      token,
      { withCredentials: true, credentials: 'include' }
    );
    return response
  }
  catch (err) {
    throw err;
  }
}

export const logout = (dispatch) => async () => {
  try {
    await dispatch(setLoggedUser({ userId: null, name: null }))
    localStorage.removeItem("token");
    return
  }
  catch (err) {
    throw err;
  }
}