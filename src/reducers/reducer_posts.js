import _ from "lodash";
import { FETCH_POST, FETCH_POSTS, DELETE_POST } from "../actions";
// do stuff with data receieved from action creators
export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_POSTS:
      return _.mapKeys(action.payload.data, "id");
    case FETCH_POST:
      return { ...state, [action.payload.data.id]: action.payload.data };
    case DELETE_POST:
      // deletes post from state object using the id from post
      return _.omit(state, action.payload);
    default:
      return state;
  }
}