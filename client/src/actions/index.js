import axios from "axios";
import { FETCH_USER, LOGOUT_USER } from "./types";

export const fetchUser = () => async dispatch => {
  let response = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: response.data[0] });
};

export const logoutUser = () => async dispatch => {
  await axios.get("/api/logout");
  dispatch({ type: LOGOUT_USER, payload: "" });
};
