import { FETCH_USER, LOGOUT_USER } from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
    case LOGOUT_USER:
          return (action.payload || false);

    default:
      return state;
  }
}
