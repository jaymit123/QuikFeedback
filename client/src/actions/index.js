import axios from "axios";
import { FETCH_USER, LOGOUT_USER } from "./types";

export const fetchUser = () => async dispatch => {
  const response = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: response.data[0] });
};

export const logoutUser = () => async dispatch => {
  await axios.get("/api/logout");
  dispatch({ type: LOGOUT_USER, payload: "" });
};

export const handlePaymentToken = token => async dispatch => {
  const response = await axios.post("/api/payment", token);
  dispatch({ type: FETCH_USER, payload: response.data });
};
